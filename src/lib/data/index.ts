/**
 * BLAME Storefront — Medusa Data Layer
 * All API calls go through this file.
 * Replace MEDUSA_BACKEND_URL in .env.local
 */

const BACKEND_URL = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

// ─────────────────────────────────────────────────────────────────────────────
// Base fetch helper
// ─────────────────────────────────────────────────────────────────────────────

async function medusaFetch<T>(
  path: string,
  options: RequestInit = {},
  tags: string[] = []
): Promise<T> {
  const url = `${BACKEND_URL}${path}`

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(PUBLISHABLE_KEY ? { "x-publishable-api-key": PUBLISHABLE_KEY } : {}),
    ...(options.headers as Record<string, string>),
  }

  const res = await fetch(url, {
    ...options,
    headers,
    next: tags.length ? { tags } : undefined,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }))
    throw new Error(err.message || `Medusa API error: ${res.status}`)
  }

  return res.json()
}

// ─────────────────────────────────────────────────────────────────────────────
// Regions
// ─────────────────────────────────────────────────────────────────────────────

export async function listRegions() {
  const data = await medusaFetch<{ regions: any[] }>("/store/regions")
  return data.regions
}

export async function getRegion(countryCode: string) {
  const regions = await listRegions()
  return (
    regions.find((r) =>
      r.countries?.some((c: any) => c.iso_2.toLowerCase() === countryCode.toLowerCase())
    ) ?? regions[0] ?? null
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Products
// ─────────────────────────────────────────────────────────────────────────────

export async function listProducts(params?: {
  regionId?: string
  categoryId?: string
  collectionId?: string
  limit?: number
  offset?: number
  order?: string
  q?: string
}) {
  const search = new URLSearchParams()
  if (params?.regionId)     search.set("region_id",   params.regionId)
  if (params?.categoryId)   search.set("category_id", params.categoryId)
  if (params?.collectionId) search.set("collection_id", params.collectionId)
  if (params?.limit)        search.set("limit",  String(params.limit))
  if (params?.offset)       search.set("offset", String(params.offset))
  if (params?.order)        search.set("order",  params.order)
  if (params?.q)            search.set("q",      params.q)

  const data = await medusaFetch<{ products: any[]; count: number }>(
    `/store/products?${search.toString()}`,
    {},
    ["products"]
  )
  return data
}

export async function getProduct(handle: string, regionId?: string) {
  const search = new URLSearchParams({ handle })
  if (regionId) search.set("region_id", regionId)

  const data = await medusaFetch<{ products: any[] }>(
    `/store/products?${search.toString()}`,
    {},
    [`product-${handle}`]
  )
  return data.products[0] ?? null
}

// ─────────────────────────────────────────────────────────────────────────────
// Collections
// ─────────────────────────────────────────────────────────────────────────────

export async function listCollections() {
  const data = await medusaFetch<{ collections: any[] }>("/store/collections", {}, ["collections"])
  return data.collections
}

// ─────────────────────────────────────────────────────────────────────────────
// Categories
// ─────────────────────────────────────────────────────────────────────────────

export async function listCategories() {
  const data = await medusaFetch<{ product_categories: any[] }>(
    "/store/product-categories?include_descendants_tree=true",
    {},
    ["categories"]
  )
  return data.product_categories
}

// ─────────────────────────────────────────────────────────────────────────────
// Cart
// ─────────────────────────────────────────────────────────────────────────────

export async function createCart(regionId: string) {
  const data = await medusaFetch<{ cart: any }>("/store/carts", {
    method: "POST",
    body: JSON.stringify({ region_id: regionId }),
  })
  return data.cart
}

export async function getCart(cartId: string) {
  const data = await medusaFetch<{ cart: any }>(`/store/carts/${cartId}`)
  return data.cart
}

export async function addToCart(cartId: string, variantId: string, quantity = 1) {
  const data = await medusaFetch<{ cart: any }>(`/store/carts/${cartId}/line-items`, {
    method: "POST",
    body: JSON.stringify({ variant_id: variantId, quantity }),
  })
  return data.cart
}

export async function removeFromCart(cartId: string, lineId: string) {
  const data = await medusaFetch<{ cart: any }>(
    `/store/carts/${cartId}/line-items/${lineId}`,
    { method: "DELETE" }
  )
  return data.cart
}

export async function updateLineItem(cartId: string, lineId: string, quantity: number) {
  const data = await medusaFetch<{ cart: any }>(
    `/store/carts/${cartId}/line-items/${lineId}`,
    { method: "POST", body: JSON.stringify({ quantity }) }
  )
  return data.cart
}

export async function applyDiscount(cartId: string, code: string) {
  const data = await medusaFetch<{ cart: any }>(`/store/carts/${cartId}`, {
    method: "POST",
    body: JSON.stringify({ discounts: [{ code }] }),
  })
  return data.cart
}

// ─────────────────────────────────────────────────────────────────────────────
// Customer / Auth
// ─────────────────────────────────────────────────────────────────────────────

export async function loginCustomer(email: string, password: string) {
  const data = await medusaFetch<{ token: string }>("/auth/customer/emailpass", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
  return data.token
}

export async function registerCustomer(params: {
  email: string
  password: string
  first_name: string
  last_name?: string
  phone?: string
}) {
  // 1. Create auth identity
  const authData = await medusaFetch<{ token: string }>("/auth/customer/emailpass/register", {
    method: "POST",
    body: JSON.stringify({ email: params.email, password: params.password }),
  })

  // 2. Create customer profile
  const customerData = await medusaFetch<{ customer: any }>("/store/customers", {
    method: "POST",
    headers: { Authorization: `Bearer ${authData.token}` },
    body: JSON.stringify({
      email: params.email,
      first_name: params.first_name,
      last_name: params.last_name,
      phone: params.phone,
    }),
  })

  return { token: authData.token, customer: customerData.customer }
}

export async function getCustomer(token: string) {
  const data = await medusaFetch<{ customer: any }>("/store/customers/me", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  })
  return data.customer
}

// ─────────────────────────────────────────────────────────────────────────────
// Orders
// ─────────────────────────────────────────────────────────────────────────────

export async function listCustomerOrders(token: string, limit = 10, offset = 0) {
  const data = await medusaFetch<{ orders: any[] }>(
    `/store/orders?limit=${limit}&offset=${offset}`,
    { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }
  )
  return data.orders
}

export async function getOrder(id: string, token: string) {
  const data = await medusaFetch<{ order: any }>(`/store/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  })
  return data.order
}

// ─────────────────────────────────────────────────────────────────────────────
// Digital Products — download links (requires Medusa Digital Products module)
// See: https://github.com/medusajs/examples/tree/main/digital-products
// ─────────────────────────────────────────────────────────────────────────────

export async function getDownloadLinks(orderId: string, token: string) {
  const data = await medusaFetch<{ downloadLinks: { url: string; name: string }[] }>(
    `/store/digital-products/download?order_id=${orderId}`,
    { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }
  )
  return data.downloadLinks
}

// ─────────────────────────────────────────────────────────────────────────────
// Price formatting helpers
// ─────────────────────────────────────────────────────────────────────────────

export function formatAmount(amount: number, currencyCode: string = "usd"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode.toUpperCase(),
    minimumFractionDigits: 2,
  }).format(amount / 100)
}

export function getVariantPrice(variant: any, regionId?: string): number | null {
  if (!variant?.prices?.length) return null
  const price =
    regionId
      ? variant.prices.find((p: any) => p.region_id === regionId)
      : variant.prices[0]
  return price?.amount ?? null
}

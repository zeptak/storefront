import type { Metadata } from "next"
import ProductDetailClient from "@modules/products/components/product-detail"

export const metadata: Metadata = {
  title: "Void Bass Vol.1 — Sample Pack",
}

export default function ProductPage({
  params,
}: {
  params: { handle: string; countryCode: string }
}) {
  return <ProductDetailClient />
}

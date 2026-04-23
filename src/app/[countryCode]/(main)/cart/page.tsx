"use client"

import { useState } from "react"
import Link from "next/link"

interface CartItem {
  id: string
  title: string
  subtitle: string
  price: number
  format: string
  type: "digital" | "rental"
  rentalDays?: number
}

const MOCK_CART: CartItem[] = [
  {
    id: "c1",
    title: "Void Bass Vol.1",
    subtitle: "Sample Pack · WAV 24-bit",
    price: 2900,
    format: "WAV 24-bit",
    type: "digital",
  },
  {
    id: "c2",
    title: "Neural Serum Bank",
    subtitle: "200 Presets · Serum .fxp",
    price: 1200,
    format: "Serum .fxp",
    type: "digital",
  },
]

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(MOCK_CART)
  const [coupon, setCoupon] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)

  const subtotal = items.reduce((s, i) => s + i.price, 0)
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0
  const total = subtotal - discount

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  function applyCoupon() {
    if (coupon.toLowerCase() === "blame10") {
      setCouponApplied(true)
    }
  }

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <div className="border-b border-blame-teal/15 bg-blame-surface">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <p className="section-label mb-2">Checkout</p>
          <h1 className="font-display text-5xl font-bold text-white">
            Cart
            <span className="font-mono text-xl text-blame-dim ml-4 font-normal">
              {items.length} item{items.length !== 1 ? "s" : ""}
            </span>
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {items.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 gap-6">
            <div className="w-20 h-20 border border-blame-teal/20 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-blame-teal/40">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-display text-2xl font-bold text-blame-dim mb-2">Your cart is empty</p>
              <p className="text-sm text-blame-dim/60">Add some products to get started.</p>
            </div>
            <Link href="/store" className="btn-primary">Browse the Store</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Items list */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              {items.map((item) => (
                <div key={item.id} className="blame-card flex items-center gap-4 p-5">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-blame-dark border border-blame-teal/15 flex items-center justify-center shrink-0">
                    <div className="flex items-center gap-[2px]">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <span
                          key={i}
                          className="w-[2px] rounded-full bg-blame-teal/60"
                          style={{ height: `${Math.abs(Math.sin(i * 0.9) * 12) + 4}px` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-white text-base leading-tight">{item.title}</h3>
                    <p className="font-mono text-[11px] text-blame-dim mt-0.5">{item.subtitle}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`blame-tag ${item.type === "rental" ? "blame-tag-teal" : "blame-tag-teal"}`}>
                        {item.type === "rental" ? "RENTAL" : "DIGITAL"}
                      </span>
                    </div>
                  </div>

                  {/* Price + remove */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="font-display font-bold text-blame-teal-light text-lg">
                      {formatPrice(item.price)}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="font-mono text-[11px] text-blame-dim hover:text-red-400/70 transition-colors flex items-center gap-1"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" />
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              {/* Continue shopping */}
              <Link
                href="/store"
                className="flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-blame-dim hover:text-blame-text transition-colors mt-2 self-start"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Continue Shopping
              </Link>
            </div>

            {/* Order summary */}
            <div className="flex flex-col gap-4">
              <div className="blame-card p-6 flex flex-col gap-4">
                <h2 className="font-display font-bold text-white text-lg">Order Summary</h2>

                {/* Line items */}
                <div className="flex flex-col gap-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-blame-dim truncate max-w-[60%]">{item.title}</span>
                      <span className="font-mono text-blame-text shrink-0">{formatPrice(item.price)}</span>
                    </div>
                  ))}
                </div>

                <div className="blame-divider" />

                {/* Coupon */}
                <div>
                  <p className="font-mono text-[11px] text-blame-teal-light mb-2 uppercase tracking-wider">Promo Code</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="e.g. BLAME10"
                      className="blame-input text-xs flex-1"
                      disabled={couponApplied}
                    />
                    <button
                      onClick={applyCoupon}
                      disabled={couponApplied}
                      className="btn-ghost text-xs px-3 whitespace-nowrap disabled:opacity-40"
                    >
                      Apply
                    </button>
                  </div>
                  {couponApplied && (
                    <p className="font-mono text-[11px] text-blame-teal-light mt-1.5">
                      ✓ 10% discount applied
                    </p>
                  )}
                </div>

                <div className="blame-divider" />

                {/* Totals */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-blame-dim">Subtotal</span>
                    <span className="font-mono text-blame-text">{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-blame-teal-light">Discount</span>
                      <span className="font-mono text-blame-teal-light">-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between mt-1">
                    <span className="font-display font-bold text-white">Total</span>
                    <span className="font-display font-bold text-blame-teal-light text-xl">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <Link href="/checkout" className="btn-primary text-center block mt-2">
                  Proceed to Checkout
                </Link>

                <p className="font-mono text-[10px] text-blame-dim text-center leading-relaxed">
                  Secure checkout via Stripe. All digital products delivered instantly after payment.
                </p>
              </div>

              {/* Accepted payments */}
              <div className="flex items-center justify-center gap-3">
                {["Visa", "Mastercard", "PayPal", "Apple Pay"].map((p) => (
                  <span key={p} className="font-mono text-[10px] text-blame-dim border border-blame-teal/15 px-2 py-1">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

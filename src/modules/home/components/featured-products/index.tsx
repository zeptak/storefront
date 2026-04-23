import Link from "next/link"
import ProductCard from "@modules/products/components/product-card"

// Mock featured products – in production fetched from Medusa API
const FEATURED_PRODUCTS = [
  {
    id: "p1",
    title: "Void Bass Vol.1",
    subtitle: "Dark Bass Sample Pack",
    price: 2900,
    originalPrice: 4900,
    category: "samples",
    tag: "BESTSELLER",
    bpm: "130–150",
    format: "WAV 24-bit",
    sounds: 186,
    href: "/products/void-bass-vol-1",
    gradient: "from-blame-teal/20 to-transparent",
  },
  {
    id: "p2",
    title: "Spectral FX Bundle",
    subtitle: "Texture & Atmosphere Pack",
    price: 1900,
    originalPrice: null,
    category: "samples",
    tag: "NEW",
    bpm: "Any",
    format: "WAV 24-bit",
    sounds: 312,
    href: "/products/spectral-fx-bundle",
    gradient: "from-blame-teal-light/10 to-transparent",
  },
  {
    id: "p3",
    title: "BLAME MORPH",
    subtitle: "Wavetable Synth Plugin",
    price: 4900,
    originalPrice: null,
    category: "plugins",
    tag: "SOFTWARE",
    bpm: null,
    format: "VST3 / AU / AAX",
    sounds: null,
    href: "/products/blame-morph",
    gradient: "from-blame-teal/15 to-transparent",
  },
  {
    id: "p4",
    title: "Midwest Percussion",
    subtitle: "Drum & Perc Sample Kit",
    price: 1500,
    originalPrice: null,
    category: "samples",
    tag: "NEW",
    bpm: "Any",
    format: "WAV 24-bit",
    sounds: 240,
    href: "/products/midwest-percussion",
    gradient: "from-blame-teal-light/10 to-transparent",
  },
]

export default function FeaturedProducts() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      {/* Header */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="section-label mb-2">Fresh Drops</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            New & Noteworthy
          </h2>
        </div>
        <Link
          href="/store?sort=newest"
          className="hidden md:flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-blame-teal-light hover:text-white transition-colors group"
        >
          <span>All Products</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FEATURED_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* View all CTA */}
      <div className="mt-10 flex justify-center">
        <Link href="/store" className="btn-ghost">
          Browse Full Catalogue
        </Link>
      </div>
    </section>
  )
}

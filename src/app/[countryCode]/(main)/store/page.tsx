import type { Metadata } from "next"
import Link from "next/link"
import ProductCard from "@/modules/products/components/product-card"

export const metadata: Metadata = {
  title: "Store — Digital Audio Products",
  description: "Sample packs, plugins, presets, and DAW templates for modern producers.",
}

const CATEGORIES = [
  { id: "all",       label: "All" },
  { id: "samples",   label: "Sample Packs" },
  { id: "plugins",   label: "Plugins" },
  { id: "presets",   label: "Presets" },
  { id: "midi",      label: "MIDI Packs" },
  { id: "templates", label: "Templates" },
]

const SORT_OPTIONS = [
  { id: "newest",   label: "Newest" },
  { id: "popular",  label: "Most Popular" },
  { id: "price-asc",  label: "Price ↑" },
  { id: "price-desc", label: "Price ↓" },
]

// Mock products — replace with Medusa API call
const ALL_PRODUCTS = [
  { id: "p1",  title: "Void Bass Vol.1",         subtitle: "Dark Bass Sample Pack",         price: 2900,  originalPrice: 4900,  category: "samples",   tag: "BESTSELLER", bpm: "130–150", format: "WAV 24-bit", sounds: 186,  href: "/products/void-bass-vol-1" },
  { id: "p2",  title: "Spectral FX Bundle",       subtitle: "Texture & Atmosphere Pack",     price: 1900,  originalPrice: null,  category: "samples",   tag: "NEW",        bpm: "Any",     format: "WAV 24-bit", sounds: 312,  href: "/products/spectral-fx-bundle" },
  { id: "p3",  title: "BLAME MORPH",              subtitle: "Wavetable Synth Plugin",        price: 4900,  originalPrice: null,  category: "plugins",   tag: "SOFTWARE",   bpm: null,      format: "VST3/AU/AAX", sounds: null, href: "/products/blame-morph" },
  { id: "p4",  title: "Midwest Percussion",       subtitle: "Drum & Perc Sample Kit",        price: 1500,  originalPrice: null,  category: "samples",   tag: "NEW",        bpm: "Any",     format: "WAV 24-bit", sounds: 240,  href: "/products/midwest-percussion" },
  { id: "p5",  title: "Neural Serum Bank",        subtitle: "200 Serum Presets",             price: 1200,  originalPrice: 1800,  category: "presets",   tag: "SALE",       bpm: null,      format: "Serum .fxp", sounds: 200,  href: "/products/neural-serum-bank" },
  { id: "p6",  title: "Deep House Blueprint",     subtitle: "Ableton Live Template",         price: 2500,  originalPrice: null,  category: "templates", tag: "NEW",        bpm: "124",     format: "Ableton 11+", sounds: null, href: "/products/deep-house-blueprint" },
  { id: "p7",  title: "Granular Textures Vol.2",  subtitle: "Ambient Soundscape Pack",       price: 1700,  originalPrice: null,  category: "samples",   tag: "DIGITAL",    bpm: "Any",     format: "WAV 24-bit", sounds: 128,  href: "/products/granular-textures-vol-2" },
  { id: "p8",  title: "MIDI Chord Library",       subtitle: "600+ Chord Progressions",       price: 900,   originalPrice: null,  category: "midi",      tag: "DIGITAL",    bpm: "Any",     format: "MIDI",       sounds: 600,  href: "/products/midi-chord-library" },
  { id: "p9",  title: "Headroom Compressor",      subtitle: "Analog-modelled Bus Comp",      price: 6900,  originalPrice: 9900,  category: "plugins",   tag: "SALE",       bpm: null,      format: "VST3/AU",    sounds: null, href: "/products/headroom-compressor" },
  { id: "p10", title: "Vital Rave Pack",          subtitle: "120 Vital Synth Presets",       price: 1000,  originalPrice: null,  category: "presets",   tag: "NEW",        bpm: null,      format: "Vital .vital", sounds: 120, href: "/products/vital-rave-pack" },
  { id: "p11", title: "Industrial Drums Vol.1",   subtitle: "Metallic Percussion Kit",       price: 1600,  originalPrice: null,  category: "samples",   tag: "DIGITAL",    bpm: "Any",     format: "WAV 24-bit", sounds: 196,  href: "/products/industrial-drums-vol-1" },
  { id: "p12", title: "Techno Foundation",        subtitle: "FL Studio Project Template",    price: 2200,  originalPrice: null,  category: "templates", tag: "DIGITAL",    bpm: "138",     format: "FL Studio 21", sounds: null, href: "/products/techno-foundation" },
]

// Products carry a gradient field for display — attach one
const GRADIENTS = [
  "from-blame-teal/20 to-transparent",
  "from-blame-teal-light/10 to-transparent",
  "from-blame-teal/15 to-transparent",
  "from-blame-teal-light/8 to-transparent",
]

const PRODUCTS_WITH_GRADIENT = ALL_PRODUCTS.map((p, i) => ({
  ...p,
  gradient: GRADIENTS[i % GRADIENTS.length],
}))

export default function StorePage({
  searchParams,
}: {
  searchParams: { category?: string; sort?: string; q?: string }
}) {
  const activeCategory = searchParams.category || "all"
  const activeSort     = searchParams.sort || "newest"
  const query          = searchParams.q || ""

  const filtered = PRODUCTS_WITH_GRADIENT.filter((p) => {
    const catMatch = activeCategory === "all" || p.category === activeCategory
    const qMatch   = !query || p.title.toLowerCase().includes(query.toLowerCase())
    return catMatch && qMatch
  })

  return (
    <div className="min-h-screen pt-24">
      {/* Page header */}
      <div className="border-b border-blame-teal/15 bg-blame-surface">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <p className="section-label mb-2">Digital Products</p>
          <h1 className="font-display text-5xl font-bold text-white mb-4">Store</h1>
          <p className="text-sm text-blame-dim max-w-lg">
            Sample packs, plugins, presets, MIDI packs, and DAW templates for modern producers. All royalty-free, instant download.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters + sort */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/store?category=${cat.id}${activeSort !== "newest" ? `&sort=${activeSort}` : ""}`}
                className={`font-mono text-[11px] tracking-widest uppercase px-3 py-1.5 border transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-blame-teal border-blame-teal text-white"
                    : "border-blame-teal/25 text-blame-dim hover:border-blame-teal/60 hover:text-blame-text"
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-blame-dim uppercase tracking-wider">Sort:</span>
            <div className="flex gap-1">
              {SORT_OPTIONS.map((opt) => (
                <Link
                  key={opt.id}
                  href={`/store?category=${activeCategory}&sort=${opt.id}`}
                  className={`font-mono text-[11px] px-2 py-1 border transition-colors duration-200 ${
                    activeSort === opt.id
                      ? "border-blame-teal text-blame-teal-light"
                      : "border-transparent text-blame-dim hover:text-blame-text"
                  }`}
                >
                  {opt.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs text-blame-dim">{filtered.length} products</span>
          <div className="h-px flex-1 bg-blame-teal/10" />
        </div>

        {/* Product grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <span className="text-blame-teal/30 text-6xl">◎</span>
            <p className="font-display text-xl text-blame-dim">No products found</p>
            <Link href="/store" className="btn-ghost mt-2">Clear Filters</Link>
          </div>
        )}
      </div>
    </div>
  )
}

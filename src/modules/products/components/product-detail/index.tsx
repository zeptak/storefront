"use client"

import { useState } from "react"
import Link from "next/link"

// Mock product data — replace with Medusa getProduct() call
const MOCK_PRODUCT = {
  id: "p1",
  handle: "void-bass-vol-1",
  title: "Void Bass Vol.1",
  subtitle: "Dark Bass Sample Pack",
  description: `Void Bass Vol.1 is a meticulously crafted collection of dark, sub-heavy bass sounds built for modern electronic music production. Spanning 186 individual files across loops, one-shots, and processed textures, this pack covers everything from deep sub frequencies to mid-range growls and distorted reese basses.

Every sound was recorded and processed through a combination of vintage hardware — including a Moog Subsequent 37, Roland TB-303, and custom analog signal chain — before being meticulously edited and tuned in the box.

Designed for techno, industrial club music, ambient bass, and experimental production. All sounds are royalty-free for commercial use under our standard license.`,
  price: 2900,
  originalPrice: 4900,
  category: "samples",
  tag: "BESTSELLER",
  format: "WAV 24-bit / 44.1kHz",
  bpmRange: "130–150 BPM",
  sounds: 186,
  files: [
    { label: "Bass Loops",      count: 48 },
    { label: "Sub One-shots",   count: 32 },
    { label: "Reese Basses",    count: 28 },
    { label: "Processed Textures", count: 40 },
    { label: "MIDI Files",      count: 24 },
    { label: "Bonus Sounds",    count: 14 },
  ],
  tags: ["Bass", "Techno", "Sub Bass", "Dark", "Electronic", "Industrial"],
  compatibility: ["Ableton Live", "FL Studio", "Logic Pro", "Reason", "Any DAW"],
  license: "Royalty-free, commercial use included",
  previews: [
    { title: "Bass Loop 01 — 140bpm",       duration: "0:16" },
    { title: "Sub Drop — Reese Variation",   duration: "0:12" },
    { title: "Distorted Growl One-shot",     duration: "0:04" },
    { title: "Texture Loop 03 — Ambient",    duration: "0:22" },
  ],
  related: [
    { id: "p4", title: "Midwest Percussion", subtitle: "Drum Kit", price: 1500, href: "/products/midwest-percussion" },
    { id: "p2", title: "Spectral FX Bundle", subtitle: "FX Pack",  price: 1900, href: "/products/spectral-fx-bundle" },
    { id: "p7", title: "Granular Textures",  subtitle: "Ambience", price: 1700, href: "/products/granular-textures-vol-2" },
  ],
}

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`
}

function WaveformPreview({ idx, playing, onClick }: { idx: number; playing: boolean; onClick: () => void }) {
  const bars = Array.from({ length: 60 }, (_, i) =>
    Math.abs(Math.sin((i + idx * 4) * 0.45) * 18) + 3
  )
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-[1.5px] h-8 cursor-pointer group"
      aria-label="Play preview"
    >
      {bars.map((h, i) => (
        <span
          key={i}
          className="inline-block w-[2px] rounded-full transition-all duration-150"
          style={{
            height: `${h}px`,
            background: playing
              ? i % 3 === 0
                ? "var(--blame-teal-light)"
                : "var(--blame-teal)"
              : "rgba(0,96,100,0.35)",
            animation: playing
              ? `waveBar ${0.6 + (i % 4) * 0.15}s ease-in-out ${(i * 0.02) % 0.6}s infinite`
              : "none",
          }}
        />
      ))}
    </button>
  )
}

export default function ProductDetailClient() {
  const product = MOCK_PRODUCT
  const [playingIdx, setPlayingIdx] = useState<number | null>(null)
  const [added, setAdded] = useState(false)
  const [activeTab, setActiveTab] = useState<"overview" | "files" | "license">("overview")

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  function handleAddToCart() {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="min-h-screen pt-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <nav className="flex items-center gap-2 font-mono text-[11px] text-blame-dim">
          <Link href="/" className="hover:text-blame-text transition-colors">Home</Link>
          <span className="text-blame-teal/30">/</span>
          <Link href="/store" className="hover:text-blame-text transition-colors">Store</Link>
          <span className="text-blame-teal/30">/</span>
          <Link href="/store?category=samples" className="hover:text-blame-text transition-colors">Samples</Link>
          <span className="text-blame-teal/30">/</span>
          <span className="text-blame-text">{product.title}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Left: Visual + previews (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-6">

            {/* Main visual */}
            <div
              className="relative h-72 md:h-96 bg-blame-surface border border-blame-teal/20 flex flex-col items-center justify-center overflow-hidden"
            >
              {/* Grid bg */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(0,96,100,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,96,100,1) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              {/* Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10"
                style={{ background: "radial-gradient(circle, #006064, transparent 70%)" }}
              />

              {/* Big waveform */}
              <div className="relative z-10 flex items-center gap-[2.5px] h-28">
                {Array.from({ length: 80 }).map((_, i) => {
                  const h = Math.abs(Math.sin(i * 0.38) * 44) + 8
                  return (
                    <span
                      key={i}
                      className="inline-block w-[3px] rounded-full"
                      style={{
                        height: `${h}px`,
                        background:
                          i % 5 === 0
                            ? "var(--blame-teal-light)"
                            : i % 3 === 0
                            ? "var(--blame-teal)"
                            : "rgba(0,96,100,0.4)",
                      }}
                    />
                  )
                })}
              </div>

              {/* Tags */}
              <div className="relative z-10 flex items-center gap-2 mt-6">
                <span className="blame-tag blame-tag-new">{product.tag}</span>
                <span className="blame-tag blame-tag-teal">{product.category.toUpperCase()}</span>
              </div>

              {/* Discount badge */}
              {discount && (
                <div className="absolute top-4 right-4 bg-blame-teal text-white font-mono text-xs px-2 py-1">
                  -{discount}% OFF
                </div>
              )}
            </div>

            {/* Audio previews */}
            <div className="blame-card p-6">
              <div className="flex items-center gap-3 mb-5">
                <p className="section-label">Audio Previews</p>
                <div className="h-px flex-1 bg-blame-teal/10" />
                <span className="font-mono text-[11px] text-blame-dim">MP3 preview (watermarked)</span>
              </div>
              <div className="flex flex-col gap-3">
                {product.previews.map((preview, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-4 p-3 border transition-colors duration-200 ${
                      playingIdx === idx ? "border-blame-teal/60 bg-blame-teal/5" : "border-blame-teal/10 hover:border-blame-teal/30"
                    }`}
                  >
                    {/* Play/pause button */}
                    <button
                      onClick={() => setPlayingIdx(playingIdx === idx ? null : idx)}
                      className={`w-8 h-8 flex items-center justify-center border shrink-0 transition-all duration-200 ${
                        playingIdx === idx
                          ? "border-blame-teal bg-blame-teal text-white"
                          : "border-blame-teal/40 text-blame-teal hover:bg-blame-teal/10"
                      }`}
                    >
                      {playingIdx === idx ? (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                          <rect x="0" y="0" width="3.5" height="10" />
                          <rect x="5.5" y="0" width="3.5" height="10" />
                        </svg>
                      ) : (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                          <polygon points="0,0 10,5 0,10" />
                        </svg>
                      )}
                    </button>

                    {/* Waveform */}
                    <div className="flex-1 overflow-hidden">
                      <WaveformPreview
                        idx={idx}
                        playing={playingIdx === idx}
                        onClick={() => setPlayingIdx(playingIdx === idx ? null : idx)}
                      />
                    </div>

                    {/* Title + duration */}
                    <div className="text-right shrink-0">
                      <p className="font-mono text-[11px] text-blame-text leading-tight">{preview.title}</p>
                      <p className="font-mono text-[10px] text-blame-dim mt-0.5">{preview.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="blame-card">
              <div className="flex border-b border-blame-teal/10">
                {(["overview", "files", "license"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`font-mono text-[11px] tracking-widest uppercase px-6 py-4 transition-colors ${
                      activeTab === tab
                        ? "text-blame-teal-light border-b-2 border-blame-teal -mb-px"
                        : "text-blame-dim hover:text-blame-text"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="p-6">
                {activeTab === "overview" && (
                  <div className="blame-prose">
                    {product.description.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span key={tag} className="blame-tag blame-tag-teal">{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === "files" && (
                  <div>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {product.files.map(({ label, count }) => (
                        <div key={label} className="flex items-center justify-between px-3 py-2 bg-blame-dark border border-blame-teal/10">
                          <span className="text-sm text-blame-dim">{label}</span>
                          <span className="font-mono text-xs text-blame-teal-light">{count}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blame-teal/5 border border-blame-teal/20">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-blame-teal-light shrink-0">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 8v4M12 16h.01" />
                      </svg>
                      <p className="font-mono text-[11px] text-blame-teal-light">
                        All files included in a single ZIP download after purchase
                      </p>
                    </div>
                  </div>
                )}
                {activeTab === "license" && (
                  <div className="flex flex-col gap-4">
                    {[
                      ["License Type",     "Royalty-Free, Single User"],
                      ["Commercial Use",   "✓ Included"],
                      ["Streaming",        "✓ All major platforms"],
                      ["Broadcast",        "✓ TV, Film, Radio"],
                      ["Resale / Resync",  "✗ Not permitted"],
                      ["Sample Flipping",  "✓ Allowed in original music"],
                    ].map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between py-2 border-b border-blame-teal/10">
                        <span className="text-sm text-blame-dim">{key}</span>
                        <span className={`font-mono text-xs ${val.startsWith("✓") ? "text-blame-teal-light" : val.startsWith("✗") ? "text-red-400/70" : "text-blame-text"}`}>
                          {val}
                        </span>
                      </div>
                    ))}
                    <Link href="/licensing" className="font-mono text-xs text-blame-teal-light hover:underline mt-2">
                      Read full license agreement →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Purchase panel (2 cols) */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 flex flex-col gap-5">

              {/* Title */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="blame-tag blame-tag-new">{product.tag}</span>
                </div>
                <h1 className="font-display text-3xl font-bold text-white leading-tight mb-1">
                  {product.title}
                </h1>
                <p className="font-mono text-sm text-blame-teal-light">{product.subtitle}</p>
              </div>

              {/* Quick specs */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Sounds", value: `${product.sounds}` },
                  { label: "BPM",    value: product.bpmRange },
                  { label: "Format", value: "WAV" },
                  { label: "Bit",    value: "24-bit" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col px-3 py-2 bg-blame-surface border border-blame-teal/10">
                    <span className="font-mono text-[10px] text-blame-dim uppercase tracking-wider">{label}</span>
                    <span className="font-mono text-sm text-blame-text">{value}</span>
                  </div>
                ))}
              </div>

              {/* Compatibility */}
              <div className="flex flex-wrap gap-1.5">
                {product.compatibility.map((c) => (
                  <span key={c} className="font-mono text-[10px] text-blame-dim border border-blame-teal/15 px-2 py-0.5">
                    {c}
                  </span>
                ))}
              </div>

              {/* Pricing */}
              <div className="p-5 bg-blame-surface border border-blame-teal/20">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="font-display text-4xl font-bold text-blame-teal-light">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="font-mono text-sm text-blame-dim line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {discount && (
                    <span className="font-mono text-xs text-white bg-blame-teal px-2 py-0.5 ml-auto">
                      -{discount}%
                    </span>
                  )}
                </div>
                <p className="font-mono text-[11px] text-blame-dim mb-5">One-time purchase · Lifetime access</p>

                {/* Add to cart */}
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-4 font-mono text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 ${
                    added
                      ? "bg-blame-teal-light/20 border border-blame-teal-light text-blame-teal-light"
                      : "btn-primary"
                  }`}
                >
                  {added ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 01-8 0" />
                      </svg>
                      Add to Cart
                    </>
                  )}
                </button>

                {/* Buy now */}
                <Link
                  href="/checkout"
                  className="w-full mt-2 py-3 font-mono text-xs tracking-widest uppercase border border-blame-teal/30 text-blame-dim hover:border-blame-teal hover:text-blame-text transition-all duration-200 flex items-center justify-center"
                >
                  Buy Now
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-col gap-2">
                {[
                  { icon: "⬇", text: "Instant download after payment" },
                  { icon: "∞", text: "Re-download anytime from your account" },
                  { icon: "✓", text: "Royalty-free commercial license" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <span className="text-blame-teal w-4 text-center shrink-0">{icon}</span>
                    <span className="text-xs text-blame-dim">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        <div className="mt-20 pt-12 border-t border-blame-teal/10">
          <p className="section-label mb-2">Related</p>
          <h2 className="font-display text-2xl font-bold text-white mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {product.related.map((rel) => (
              <Link
                key={rel.id}
                href={rel.href}
                className="blame-card p-5 flex flex-col gap-3 group"
              >
                <div className="h-16 bg-blame-dark border border-blame-teal/10 flex items-center justify-center">
                  <div className="flex items-center gap-[2px]">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <span key={i} className="w-[2px] rounded-full bg-blame-teal/40 group-hover:bg-blame-teal/70 transition-colors"
                        style={{ height: `${Math.abs(Math.sin(i * 0.6) * 16) + 4}px` }} />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-display font-bold text-white group-hover:text-blame-teal-light transition-colors">
                    {rel.title}
                  </h3>
                  <p className="font-mono text-[11px] text-blame-dim">{rel.subtitle}</p>
                </div>
                <p className="font-display font-bold text-blame-teal-light mt-auto">
                  {formatPrice(rel.price)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

import Link from "next/link"

interface Product {
  id: string
  title: string
  subtitle: string
  price: number
  originalPrice: number | null
  category: string
  tag: string
  bpm: string | null
  format: string
  sounds: number | null
  href: string
  gradient: string
}

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`
}

function WaveformMini({ seed }: { seed: number }) {
  const heights = Array.from({ length: 20 }, (_, i) =>
    Math.abs(Math.sin((i + seed) * 0.7) * 20) + 4
  )
  return (
    <div className="flex items-center gap-[2px] h-6">
      {heights.map((h, i) => (
        <span
          key={i}
          className="inline-block w-[2px] rounded-full opacity-70"
          style={{
            height: `${h}px`,
            background:
              i % 4 === 0 ? "var(--blame-teal-light)" : "var(--blame-teal)",
          }}
        />
      ))}
    </div>
  )
}

export default function ProductCard({ product }: { product: Product }) {
  const seed = product.id.charCodeAt(1) || 1
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <Link
      href={product.href}
      className="blame-card group flex flex-col relative overflow-hidden"
    >
      {/* Thumbnail area */}
      <div
        className={`relative h-40 bg-gradient-to-br ${product.gradient} flex items-center justify-center border-b border-blame-teal/15 overflow-hidden`}
      >
        {/* Decorative bg */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,96,100,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,96,100,1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Category icon in bg */}
        <div className="absolute top-3 right-3 text-blame-teal/20">
          {product.category === "plugins" ? (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.6">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
            </svg>
          ) : (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.6">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          )}
        </div>

        {/* Waveform visualization */}
        <WaveformMini seed={seed} />

        {/* Tag */}
        <div className="absolute top-3 left-3">
          <span
            className={`blame-tag ${
              product.tag === "BESTSELLER"
                ? "blame-tag-new"
                : product.tag === "NEW"
                ? "blame-tag-teal"
                : "blame-tag-teal"
            }`}
          >
            {product.tag}
          </span>
        </div>

        {/* Discount badge */}
        {discount && (
          <div className="absolute bottom-3 right-3">
            <span className="font-mono text-[10px] text-white bg-blame-teal px-1.5 py-0.5">
              -{discount}%
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-blame-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div>
          <h3 className="font-display font-bold text-blame-text group-hover:text-blame-teal-light transition-colors text-base leading-tight">
            {product.title}
          </h3>
          <p className="font-mono text-[11px] text-blame-dim mt-0.5">{product.subtitle}</p>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-2 mt-1">
          {product.sounds && (
            <span className="font-mono text-[10px] text-blame-dim border border-blame-teal/15 px-1.5 py-0.5">
              {product.sounds} sounds
            </span>
          )}
          {product.bpm && (
            <span className="font-mono text-[10px] text-blame-dim border border-blame-teal/15 px-1.5 py-0.5">
              {product.bpm} BPM
            </span>
          )}
          <span className="font-mono text-[10px] text-blame-dim border border-blame-teal/15 px-1.5 py-0.5">
            {product.format}
          </span>
        </div>

        {/* Price + CTA */}
        <div className="mt-auto pt-3 flex items-center justify-between border-t border-blame-teal/10">
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-blame-teal-light text-lg">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-xs text-blame-dim line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <button className="font-mono text-[11px] tracking-wider uppercase text-blame-teal border border-blame-teal/40 px-3 py-1 hover:bg-blame-teal hover:text-white transition-all duration-200 group-hover:border-blame-teal">
            Add
          </button>
        </div>
      </div>
    </Link>
  )
}

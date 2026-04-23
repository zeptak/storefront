import Link from "next/link"

const CATEGORIES = [
  {
    id: "samples",
    title: "Sample Packs",
    subtitle: "Loops, one-shots & textures",
    desc: "Multi-layered sound design kits spanning dark techno, experimental bass, and cinematic textures. Royalty-free, 24-bit, 44.1kHz.",
    href: "/store?category=samples",
    accent: "#006064",
    tag: "DIGITAL",
    count: "280+ packs",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="2" y="3" width="20" height="14" rx="1" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 8l3 3-3 3M13 14h4" />
      </svg>
    ),
  },
  {
    id: "plugins",
    title: "Plugins & VSTs",
    subtitle: "Synthesizers & effects",
    desc: "Custom-built synthesizers, creative effects processors, and utility plugins. macOS & Windows. AAX / VST3 / AU.",
    href: "/store?category=plugins",
    accent: "#B2DFDB",
    tag: "SOFTWARE",
    count: "24 plugins",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    id: "presets",
    title: "Preset Banks",
    subtitle: "Synth & effect presets",
    desc: "Curated preset banks for Serum, Vital, Massive X, and FabFilter. Instant inspiration, pro-grade sound design.",
    href: "/store?category=presets",
    accent: "#006064",
    tag: "DIGITAL",
    count: "1,200+ presets",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    id: "studio",
    title: "Studio Rental",
    subtitle: "Professional recording spaces",
    desc: "Three purpose-built studios with premium monitoring, hardware synthesizers, and outboard gear. Book by the hour or day.",
    href: "/rental",
    accent: "#B2DFDB",
    tag: "RENTAL",
    count: "3 studios",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: "hardware",
    title: "Hardware Rental",
    subtitle: "Synths, samplers & outboard",
    desc: "Rent vintage and modern synthesizers, drum machines, tape echoes, and boutique outboard gear by the day.",
    href: "/rental?type=hardware",
    accent: "#006064",
    tag: "RENTAL",
    count: "60+ units",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="2" y="8" width="20" height="8" rx="1" />
        <path d="M6 8V6M10 8V6M14 8V6M18 8V6M6 16v2M10 16v2M14 16v2M18 16v2" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    id: "templates",
    title: "DAW Templates",
    subtitle: "Ableton, Logic & FL Studio",
    desc: "Production-ready session templates from working professionals. Routing, compression, effects chains — all set up for you.",
    href: "/store?category=templates",
    accent: "#B2DFDB",
    tag: "DIGITAL",
    count: "45 templates",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
]

export default function FeaturedCategories() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      {/* Section header */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="section-label mb-2">What We Offer</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            Tools for Every Stage
          </h2>
        </div>
        <Link
          href="/store"
          className="hidden md:flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-blame-teal-light hover:text-white transition-colors group"
        >
          <span>View All</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-blame-teal/10">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href}
            className="blame-card group relative p-8 bg-blame-surface flex flex-col gap-4 transition-all duration-300 hover:z-10"
          >
            {/* Tag */}
            <div className="flex items-center justify-between">
              <span className="blame-tag blame-tag-teal">{cat.tag}</span>
              <span className="font-mono text-[11px] text-blame-dim">{cat.count}</span>
            </div>

            {/* Icon */}
            <div
              className="w-12 h-12 flex items-center justify-center border transition-colors duration-300"
              style={{
                borderColor: `${cat.accent}40`,
                color: cat.accent === "#006064" ? "var(--blame-teal-light)" : "var(--blame-teal-light)",
              }}
            >
              {cat.icon}
            </div>

            {/* Text */}
            <div>
              <h3 className="font-display text-xl font-bold text-white group-hover:text-blame-teal-light transition-colors duration-300 mb-1">
                {cat.title}
              </h3>
              <p className="font-mono text-[11px] tracking-wider text-blame-teal-light/60 mb-3">
                {cat.subtitle}
              </p>
              <p className="text-sm text-blame-dim leading-relaxed">{cat.desc}</p>
            </div>

            {/* Arrow */}
            <div className="mt-auto pt-4 flex items-center gap-2 font-mono text-xs text-blame-teal/60 group-hover:text-blame-teal-light transition-colors">
              <span>Explore</span>
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </div>

            {/* Hover corner decoration */}
            <div
              className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(135deg, transparent 50%, ${cat.accent}10 100%)`,
              }}
            />
          </Link>
        ))}
      </div>
    </section>
  )
}

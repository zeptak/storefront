import Link from "next/link"

const FOOTER_LINKS = {
  Products: [
    { label: "Sample Packs",   href: "/store?category=samples" },
    { label: "Plugins & VSTs", href: "/store?category=plugins" },
    { label: "Preset Banks",   href: "/store?category=presets" },
    { label: "MIDI Packs",     href: "/store?category=midi" },
    { label: "Templates",      href: "/store?category=templates" },
  ],
  Rental: [
    { label: "Studio Time",    href: "/rental?type=studio" },
    { label: "Hardware Synths", href: "/rental?type=hardware" },
    { label: "Outboard Gear",  href: "/rental?type=outboard" },
    { label: "Microphones",    href: "/rental?type=microphones" },
    { label: "Monitoring",     href: "/rental?type=monitoring" },
  ],
  Company: [
    { label: "About Us",       href: "/about" },
    { label: "Blog",           href: "/blog" },
    { label: "Careers",        href: "/careers" },
    { label: "Contact",        href: "/contact" },
    { label: "Press",          href: "/press" },
  ],
  Support: [
    { label: "FAQ",            href: "/faq" },
    { label: "Licensing",      href: "/licensing" },
    { label: "Refund Policy",  href: "/refunds" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms",          href: "/terms" },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-blame-dark border-t border-blame-teal/15 mt-32">
      {/* Ticker */}
      <div className="overflow-hidden border-b border-blame-teal/10 py-3 bg-blame-surface">
        <div className="ticker-inner flex items-center gap-12">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center gap-12 whitespace-nowrap">
              <span className="font-mono text-xs text-blame-teal-light tracking-[0.3em] uppercase">
                Sample Packs
              </span>
              <span className="text-blame-teal/40">◆</span>
              <span className="font-mono text-xs text-blame-dim tracking-[0.3em] uppercase">
                Studio Rental
              </span>
              <span className="text-blame-teal/40">◆</span>
              <span className="font-mono text-xs text-blame-teal-light tracking-[0.3em] uppercase">
                Premium Plugins
              </span>
              <span className="text-blame-teal/40">◆</span>
              <span className="font-mono text-xs text-blame-dim tracking-[0.3em] uppercase">
                Sound Design
              </span>
              <span className="text-blame-teal/40">◆</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top: logo + newsletter */}
        <div className="flex flex-col lg:flex-row gap-12 justify-between mb-16">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-3 group mb-4">
              <div className="w-8 h-8 border border-blame-teal flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="0" y="6" width="3" height="10" fill="#006064" />
                  <rect x="4" y="2" width="3" height="14" fill="#006064" />
                  <rect x="8" y="4" width="3" height="12" fill="#B2DFDB" />
                  <rect x="12" y="0" width="3" height="16" fill="#B2DFDB" />
                </svg>
              </div>
              <span className="text-lg tracking-[0.3em] uppercase font-display font-800 text-white">
                BLAME
              </span>
            </Link>
            <p className="text-sm text-blame-dim leading-relaxed mb-6">
              Premium audio production tools crafted for producers who push the limits of modern sound design.
            </p>
            {/* Social */}
            <div className="flex items-center gap-4">
              {["Instagram", "X", "SoundCloud", "YouTube"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="font-mono text-[10px] tracking-wider uppercase text-blame-dim hover:text-blame-teal-light transition-colors border border-blame-teal/20 px-2 py-1 hover:border-blame-teal/50"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="max-w-xs">
            <p className="font-mono text-xs tracking-[0.15em] uppercase text-blame-teal-light mb-2">
              Newsletter
            </p>
            <p className="text-sm text-blame-dim mb-4">
              New releases, exclusive drops & production tips.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="your@email.com"
                className="blame-input text-sm flex-1 rounded-none"
              />
              <button className="btn-primary whitespace-nowrap text-[11px] px-4">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="blame-divider mb-12" />

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-blame-teal-light mb-4">
                {category}
              </p>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-blame-dim hover:text-blame-text transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="blame-divider mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-blame-dim tracking-wider">
            © {year} BLAME. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {["Visa", "Mastercard", "PayPal", "Stripe"].map((p) => (
              <span
                key={p}
                className="font-mono text-[10px] text-blame-dim border border-blame-teal/15 px-2 py-0.5"
              >
                {p}
              </span>
            ))}
          </div>
          <p className="font-mono text-[11px] text-blame-dim tracking-wider">
            Built on{" "}
            <a href="https://medusajs.com" className="text-blame-teal-light hover:underline" target="_blank" rel="noreferrer">
              Medusa
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Rental — Studios & Gear",
  description: "Book professional recording studios and rent hardware synthesizers, outboard gear, and microphones.",
}

const STUDIOS = [
  {
    id: "studio-a",
    name: "Studio A",
    badge: "FLAGSHIP",
    subtitle: "Full-service Production Suite",
    description:
      "Our largest space, built around a 48-channel SSL AWS 924 console with full patch bay integration. Features a separate live room and drum recording alcove. Ideal for mixing sessions, full band tracking, and premium post-production work.",
    priceHour: 80,
    priceDay: 480,
    priceWeek: 2200,
    specs: [
      "SSL AWS 924 Hybrid Console",
      "Genelec 1032C + 8340A monitoring",
      "Pro Tools HDX + Logic Pro X",
      "Live room — 45m²",
      "Yamaha C7 Grand Piano",
      "Full outboard rack (Neve, API, UA)",
    ],
    available: true,
  },
  {
    id: "studio-b",
    name: "Studio B",
    badge: "ELECTRONIC",
    subtitle: "Hardware Synthesizer Lab",
    description:
      "A dedicated electronic music production environment loaded with classic and modern synthesizers, drum machines, and a curated modular system. Perfect for hardware-centric production sessions and sound design explorations.",
    priceHour: 55,
    priceDay: 320,
    priceWeek: 1400,
    specs: [
      "Roland System-8 + TR-8S",
      "Moog Subsequent 37 + Moog One",
      "Teenage Engineering OP-1 field",
      "Buchla + Make Noise modular",
      "Elektron Octatrack MK2",
      "Dave Smith OB-6 + Prophet-6",
    ],
    available: true,
  },
  {
    id: "studio-c",
    name: "Studio C",
    badge: "INTIMATE",
    subtitle: "Vocal Booth & Overdub Suite",
    description:
      "A focused, low-noise recording environment optimised for vocal performances, acoustic instruments, and podcast recording. Treated with custom diffusion panels and a premium signal chain.",
    priceHour: 35,
    priceDay: 200,
    priceWeek: 900,
    specs: [
      "Neumann U87 + TLM 102",
      "API 512c mic preamp",
      "Pro Tools HDX interface",
      "Custom broadband absorption",
      "Steinway upright piano",
      "Isolation booth — 12m²",
    ],
    available: false,
    nextAvailable: "Tomorrow, 10:00",
  },
]

const GEAR_CATEGORIES = [
  {
    id: "hardware",
    label: "Synthesizers",
    items: [
      { name: "Moog Minimoog Voyager",   priceDay: 85,  priceWeek: 450,  badge: "VINTAGE" },
      { name: "Roland Juno-106",          priceDay: 65,  priceWeek: 340,  badge: "CLASSIC" },
      { name: "Sequential Prophet-5 Rev4", priceDay: 95,  priceWeek: 520,  badge: "REISSUE" },
      { name: "Korg MS-20 Mini",          priceDay: 45,  priceWeek: 240,  badge: "AVAILABLE" },
    ],
  },
  {
    id: "outboard",
    label: "Outboard",
    items: [
      { name: "Neve 1073 Preamp (pair)",  priceDay: 120, priceWeek: 650,  badge: "VINTAGE" },
      { name: "SSL G-Bus Compressor",     priceDay: 90,  priceWeek: 480,  badge: "AVAILABLE" },
      { name: "UA LA-2A Leveler Clone",   priceDay: 55,  priceWeek: 290,  badge: "AVAILABLE" },
      { name: "Eventide H9000",           priceDay: 80,  priceWeek: 420,  badge: "AVAILABLE" },
    ],
  },
  {
    id: "microphones",
    label: "Microphones",
    items: [
      { name: "Neumann U47 (vintage)",    priceDay: 150, priceWeek: 800,  badge: "RARE" },
      { name: "AKG C414 XLII (pair)",     priceDay: 60,  priceWeek: 320,  badge: "AVAILABLE" },
      { name: "Sennheiser MD421 (×4)",    priceDay: 40,  priceWeek: 200,  badge: "AVAILABLE" },
      { name: "Shure SM7dB (×2)",         priceDay: 30,  priceWeek: 160,  badge: "AVAILABLE" },
    ],
  },
]

export default function RentalPage({
  searchParams,
}: {
  searchParams: { type?: string }
}) {
  const activeType = searchParams.type || "studio"

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <div className="border-b border-blame-teal/15 bg-blame-surface">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <p className="section-label mb-2">Space & Gear</p>
          <h1 className="font-display text-5xl font-bold text-white mb-4">Rental</h1>
          <p className="text-sm text-blame-dim max-w-xl">
            Professional recording environments and premium hardware for hire. Engineers available on request. All bookings via online calendar.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-10">
          {[
            { id: "studio",   label: "Studios" },
            { id: "hardware", label: "Synthesizers" },
            { id: "outboard", label: "Outboard" },
            { id: "microphones", label: "Microphones" },
          ].map((tab) => (
            <Link
              key={tab.id}
              href={`/rental?type=${tab.id}`}
              className={`font-mono text-[11px] tracking-widest uppercase px-4 py-2 border transition-all duration-200 ${
                activeType === tab.id
                  ? "bg-blame-teal border-blame-teal text-white"
                  : "border-blame-teal/25 text-blame-dim hover:border-blame-teal/60 hover:text-blame-text"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        {/* Studios */}
        {activeType === "studio" && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              {STUDIOS.map((studio) => (
                <div key={studio.id} className="blame-card flex flex-col">
                  {/* Top bar */}
                  <div className="p-6 border-b border-blame-teal/10">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="blame-tag blame-tag-teal mb-2 inline-block">{studio.badge}</span>
                        <h2 className="font-display text-2xl font-bold text-white">{studio.name}</h2>
                        <p className="font-mono text-[11px] text-blame-teal-light tracking-wider mt-0.5">
                          {studio.subtitle}
                        </p>
                      </div>
                      <span
                        className={`font-mono text-[10px] tracking-wider px-2 py-1 ${
                          studio.available
                            ? "text-blame-teal-light border border-blame-teal/40"
                            : "text-yellow-400/70 border border-yellow-500/30"
                        }`}
                      >
                        {studio.available ? "● OPEN" : `● ${studio.nextAvailable}`}
                      </span>
                    </div>
                    <p className="text-sm text-blame-dim leading-relaxed">{studio.description}</p>
                  </div>

                  {/* Specs */}
                  <div className="p-6 flex-1">
                    <p className="section-label mb-3">Includes</p>
                    <ul className="flex flex-col gap-2">
                      {studio.specs.map((spec) => (
                        <li key={spec} className="flex items-start gap-2 text-sm text-blame-dim">
                          <span className="text-blame-teal mt-0.5 shrink-0">◆</span>
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing */}
                  <div className="p-6 border-t border-blame-teal/10">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="text-center">
                        <p className="font-display text-2xl font-bold text-blame-teal-light">${studio.priceHour}</p>
                        <p className="font-mono text-[10px] text-blame-dim">/ hour</p>
                      </div>
                      <div className="w-px h-8 bg-blame-teal/20" />
                      <div className="text-center">
                        <p className="font-display text-xl font-bold text-white/70">${studio.priceDay}</p>
                        <p className="font-mono text-[10px] text-blame-dim">/ day</p>
                      </div>
                      <div className="w-px h-8 bg-blame-teal/20" />
                      <div className="text-center">
                        <p className="font-display text-xl font-bold text-white/50">${studio.priceWeek}</p>
                        <p className="font-mono text-[10px] text-blame-dim">/ week</p>
                      </div>
                    </div>
                    <Link
                      href={`/rental/${studio.id}`}
                      className={studio.available ? "btn-primary w-full text-center block" : "btn-ghost w-full text-center block opacity-60 pointer-events-none"}
                    >
                      {studio.available ? "Check Availability & Book" : "Currently Unavailable"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Studio info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "Online Booking", desc: "Book in real-time via our calendar. Instant confirmation for all studios." },
                { title: "Engineer Available", desc: "Add a professional recording or mixing engineer to any studio booking." },
                { title: "Cancellation Policy", desc: "Free cancellation up to 24h before your session. 50% refund within 24h." },
              ].map(({ title, desc }) => (
                <div key={title} className="p-5 border border-blame-teal/10 flex flex-col gap-2">
                  <h4 className="font-display font-bold text-blame-teal-light text-sm">{title}</h4>
                  <p className="text-xs text-blame-dim leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Gear catalogue */}
        {activeType !== "studio" && (
          <>
            {GEAR_CATEGORIES.filter((c) => c.id === activeType).map((cat) => (
              <div key={cat.id}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {cat.items.map((item) => (
                    <div key={item.name} className="blame-card p-5 flex flex-col gap-4">
                      <div>
                        <span className="blame-tag blame-tag-teal mb-2 inline-block">{item.badge}</span>
                        <h3 className="font-display font-bold text-white text-base leading-tight">{item.name}</h3>
                      </div>
                      <div className="flex items-center gap-3 mt-auto">
                        <div>
                          <p className="font-display font-bold text-blame-teal-light text-xl">${item.priceDay}</p>
                          <p className="font-mono text-[10px] text-blame-dim">/ day</p>
                        </div>
                        <div className="w-px h-6 bg-blame-teal/20" />
                        <div>
                          <p className="font-display font-bold text-white/60 text-base">${item.priceWeek}</p>
                          <p className="font-mono text-[10px] text-blame-dim">/ week</p>
                        </div>
                      </div>
                      <button className="btn-ghost text-xs py-2">
                        Check Availability
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

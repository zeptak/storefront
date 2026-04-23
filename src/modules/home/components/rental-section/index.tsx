import Link from "next/link"

const STUDIOS = [
  {
    id: "studio-a",
    name: "Studio A",
    subtitle: "Production Suite",
    desc: "48-channel SSL console, Augmented acoustic treatment, full live room. Perfect for mixing, tracking, and large productions.",
    priceHour: 80,
    priceDay: 480,
    features: ["SSL AWS 924", "Genelec 1032C monitoring", "Yamaha C7 grand", "Live room"],
    availability: "Available",
    href: "/rental/studio-a",
  },
  {
    id: "studio-b",
    name: "Studio B",
    subtitle: "Electronic Production",
    desc: "Dedicated electronic music studio packed with hardware synthesizers, drum machines, and modular gear.",
    priceHour: 55,
    priceDay: 320,
    features: ["Roland System-8", "Moog Subsequent 37", "Teenage Engineering OP-1", "Eurorack modular"],
    availability: "Available",
    href: "/rental/studio-b",
  },
  {
    id: "studio-c",
    name: "Studio C",
    subtitle: "Vocal & Overdub Booth",
    desc: "Intimate recording space optimised for vocal performances, podcasting, and acoustic instrument overdubs.",
    priceHour: 35,
    priceDay: 200,
    features: ["Neumann U87", "API 512c preamp", "Pro Tools HDX", "Custom acoustic panels"],
    availability: "Booked until 15:00",
    href: "/rental/studio-c",
  },
]

function AvailabilityDot({ status }: { status: string }) {
  const available = status === "Available"
  return (
    <span className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider">
      <span
        className={`inline-block w-1.5 h-1.5 rounded-full ${
          available ? "bg-blame-teal-light" : "bg-yellow-500/80"
        }`}
        style={{
          boxShadow: available
            ? "0 0 6px rgba(178,223,219,0.6)"
            : "0 0 6px rgba(234,179,8,0.4)",
        }}
      />
      <span className={available ? "text-blame-teal-light" : "text-yellow-400/80"}>
        {status}
      </span>
    </span>
  )
}

export default function RentalSection() {
  return (
    <section className="py-24 bg-blame-surface border-y border-blame-teal/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-end mb-12">
          <div>
            <p className="section-label mb-2">Space + Gear</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Our Studios
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm text-blame-dim leading-relaxed">
              Three fully equipped recording and production spaces available for hourly and daily bookings. All studios include engineer assistance on request.
            </p>
          </div>
        </div>

        {/* Studios */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12">
          {STUDIOS.map((studio) => (
            <div key={studio.id} className="blame-card flex flex-col p-6 gap-5">
              {/* Name + availability */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">{studio.name}</h3>
                  <p className="font-mono text-[11px] text-blame-teal-light tracking-wider mt-0.5">
                    {studio.subtitle}
                  </p>
                </div>
                <AvailabilityDot status={studio.availability} />
              </div>

              {/* Description */}
              <p className="text-sm text-blame-dim leading-relaxed">{studio.desc}</p>

              {/* Features */}
              <ul className="flex flex-col gap-1.5">
                {studio.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-blame-dim">
                    <span className="text-blame-teal">◆</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Pricing */}
              <div className="flex items-center gap-4 py-3 border-y border-blame-teal/10">
                <div>
                  <span className="font-display font-bold text-blame-teal-light text-2xl">
                    ${studio.priceHour}
                  </span>
                  <span className="font-mono text-[11px] text-blame-dim ml-1">/hr</span>
                </div>
                <div className="h-6 w-px bg-blame-teal/20" />
                <div>
                  <span className="font-display font-bold text-white/60 text-lg">
                    ${studio.priceDay}
                  </span>
                  <span className="font-mono text-[11px] text-blame-dim ml-1">/day</span>
                </div>
              </div>

              {/* CTA */}
              <Link href={studio.href} className="btn-primary text-center mt-auto">
                Book Now
              </Link>
            </div>
          ))}
        </div>

        {/* Gear rental CTA */}
        <div className="border border-blame-teal/20 p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-blame-dark/50">
          <div>
            <h3 className="font-display text-2xl font-bold text-white mb-2">
              Need specific gear?
            </h3>
            <p className="text-sm text-blame-dim max-w-lg">
              Browse our catalogue of 60+ rental items — synthesizers, drum machines, outboard processors, and microphones available for daily hire.
            </p>
          </div>
          <Link href="/rental?type=hardware" className="btn-ghost whitespace-nowrap">
            Browse Gear Rental
          </Link>
        </div>
      </div>
    </section>
  )
}

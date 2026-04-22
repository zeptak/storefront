import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About — BLAME",
  description: "The story behind BLAME — who we are and why we build audio tools.",
}

const TEAM = [
  {
    name: "Jakub Novák",
    role: "Founder, Sound Designer",
    bio: "10 years in electronic music production. Former resident at Tresor Berlin and founding member of Prague underground collective DUSK.",
    initials: "JN",
  },
  {
    name: "Markéta Horáčková",
    role: "Lead Developer & Audio Engineer",
    bio: "Classically trained pianist turned software developer. Builds the tooling and pipelines that power every BLAME release.",
    initials: "MH",
  },
  {
    name: "Tomáš Veselý",
    role: "Studio Manager & Gear Head",
    bio: "Vintage synthesizer collector with 200+ units through his hands. Curates all hardware available through BLAME Rental.",
    initials: "TV",
  },
]

const TIMELINE = [
  { year: "2021", event: "BLAME founded in Brno, CZ — first sample pack released to Bandcamp" },
  { year: "2022", event: "Opened Studio A & B. First hardware rental units online." },
  { year: "2023", event: "BLAME MORPH plugin released. 10,000+ downloads in first month." },
  { year: "2024", event: "New storefront launch. Studio C opened. Rental catalogue reaches 60+ units." },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <div className="relative border-b border-blame-teal/15 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,96,100,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,96,100,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 py-20">
          <p className="section-label mb-4">Our Story</p>
          <h1 className="font-display text-6xl md:text-8xl font-bold text-white leading-none mb-6">
            ABOUT<br />
            <span className="text-blame-teal-light">BLAME</span>
          </h1>
          <p className="text-base text-blame-dim max-w-lg leading-relaxed">
            A small studio from the Czech Republic obsessed with the intersection of sound, hardware, and software. We build the tools we wish existed.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6">

        {/* Mission */}
        <section className="py-20 border-b border-blame-teal/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label mb-4">Philosophy</p>
              <h2 className="font-display text-4xl font-bold text-white mb-6">
                Tools Made By Producers, For Producers
              </h2>
            </div>
            <div className="blame-prose">
              <p>
                BLAME started as a frustration project. We kept buying sample packs that sounded great in previews and lifeless in the context of a real session. Plugins that promised analog warmth but delivered sterile DSP. Studio spaces optimised for profit margins instead of creativity.
              </p>
              <p>
                So we built our own. Every sample pack goes through a session test — if it doesn't feel alive in a mix, it doesn't ship. Every plugin is built around a single, strong idea rather than feature-creep. Every studio is outfitted with the gear we'd personally want to work with.
              </p>
              <p>
                We're based in Ostrava, Czech Republic. We keep the team small deliberately. Fewer people means fewer compromises.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 border-b border-blame-teal/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-blame-teal/10">
            {[
              { value: "1,200+", label: "Sounds Released" },
              { value: "24",     label: "Plugins & Presets" },
              { value: "3",      label: "Recording Studios" },
              { value: "60+",    label: "Rental Items" },
            ].map(({ value, label }) => (
              <div key={label} className="bg-blame-black p-8 flex flex-col gap-2">
                <span className="font-display text-5xl font-bold text-blame-teal-light">{value}</span>
                <span className="font-mono text-[11px] text-blame-dim uppercase tracking-widest">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="py-20 border-b border-blame-teal/10">
          <p className="section-label mb-2">The Team</p>
          <h2 className="font-display text-4xl font-bold text-white mb-10">Who We Are</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="blame-card p-6 flex flex-col gap-4">
                {/* Avatar */}
                <div className="w-14 h-14 bg-blame-teal/10 border border-blame-teal/30 flex items-center justify-center">
                  <span className="font-display font-bold text-blame-teal-light text-lg tracking-wider">
                    {member.initials}
                  </span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-lg">{member.name}</h3>
                  <p className="font-mono text-[11px] text-blame-teal-light tracking-wider mt-0.5">{member.role}</p>
                </div>
                <p className="text-sm text-blame-dim leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 border-b border-blame-teal/10">
          <p className="section-label mb-2">History</p>
          <h2 className="font-display text-4xl font-bold text-white mb-10">Timeline</h2>
          <div className="flex flex-col gap-0">
            {TIMELINE.map((item, i) => (
              <div key={item.year} className="flex items-start gap-6 group">
                {/* Year + connector */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 border border-blame-teal/40 bg-blame-surface flex items-center justify-center shrink-0 group-hover:border-blame-teal group-hover:bg-blame-teal/10 transition-colors">
                    <span className="font-mono text-[10px] text-blame-teal-light">{item.year.slice(2)}</span>
                  </div>
                  {i < TIMELINE.length - 1 && (
                    <div className="w-px flex-1 min-h-10 bg-blame-teal/15" />
                  )}
                </div>
                {/* Content */}
                <div className="pb-10 flex flex-col gap-1 pt-2">
                  <span className="font-display font-bold text-blame-teal-light text-lg">{item.year}</span>
                  <p className="text-sm text-blame-dim leading-relaxed max-w-md">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Studios */}
        <section className="py-20 border-b border-blame-teal/10">
          <p className="section-label mb-2">Space</p>
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Ostrava, Czech Republic
          </h2>
          <p className="text-sm text-blame-dim max-w-xl leading-relaxed mb-8">
            We're located in a converted industrial building in central Ostrava. Three recording studios, a hardware showroom, and our development office — all under one roof.
          </p>
          <Link href="/rental" className="btn-primary inline-flex">
            Book a Studio
          </Link>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="border border-blame-teal/20 p-10 flex flex-col md:flex-row items-center justify-between gap-6 bg-blame-surface">
            <div>
              <h2 className="font-display text-3xl font-bold text-white mb-2">
                Ready to hear the difference?
              </h2>
              <p className="text-sm text-blame-dim">
                Browse the store or book studio time — we'd love to work with you.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/store" className="btn-primary text-center">Browse Store</Link>
              <Link href="/contact" className="btn-ghost text-center">Get in Touch</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

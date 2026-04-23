import Hero from "@modules/home/components/hero"
import FeaturedCategories from "@modules/home/components/featured-categories"
import FeaturedProducts from "@modules/home/components/featured-products"
import RentalSection from "@modules/home/components/rental-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "BLAME — Audio Production Tools, Sample Packs & Studio Rental",
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <RentalSection />

      {/* Trust section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              icon: "⬇",
              title: "Instant Download",
              desc: "All digital products delivered immediately after purchase.",
            },
            {
              icon: "∞",
              title: "Lifetime Access",
              desc: "Re-download your purchases any time from your account.",
            },
            {
              icon: "✓",
              title: "Royalty Free",
              desc: "Full commercial rights included with every license.",
            },
            {
              icon: "◎",
              title: "24/7 Support",
              desc: "Dedicated support team for any technical issues.",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex flex-col gap-3 p-6 border border-blame-teal/10 hover:border-blame-teal/30 transition-colors group">
              <span className="text-blame-teal-light text-2xl">{icon}</span>
              <h4 className="font-display font-bold text-white text-base group-hover:text-blame-teal-light transition-colors">
                {title}
              </h4>
              <p className="text-xs text-blame-dim leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

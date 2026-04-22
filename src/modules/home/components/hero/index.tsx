"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

function AnimatedWaveform() {
  const bars = Array.from({ length: 48 })
  return (
    <div className="flex items-center justify-center gap-[3px] h-24 select-none pointer-events-none">
      {bars.map((_, i) => {
        const delay = (i * 0.06) % 1.2
        const minH = 4
        const maxH = 16 + Math.sin(i * 0.4) * 28
        return (
          <span
            key={i}
            className="inline-block w-[3px] rounded-full"
            style={{
              height: `${minH}px`,
              background:
                i < 16 || i > 32
                  ? "rgba(0,96,100,0.4)"
                  : i % 3 === 0
                  ? "var(--blame-teal-light)"
                  : "var(--blame-teal)",
              animation: `waveBar ${0.8 + (i % 5) * 0.12}s ease-in-out ${delay}s infinite`,
              animationFillMode: "both",
            }}
          />
        )
      })}
    </div>
  )
}

const WORDS = ["SAMPLES", "PLUGINS", "PRESETS", "RENTALS", "TOOLS"]

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0)
  const [visible, setVisible] = useState(true)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setWordIdx((p) => (p + 1) % WORDS.length)
        setVisible(true)
      }, 400)
    }, 2800)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* BG grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,96,100,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,96,100,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial teal glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, #006064 0%, transparent 70%)",
        }}
      />

      {/* Corner decorations */}
      <div className="absolute top-24 left-8 text-blame-teal/20 font-mono text-[10px] tracking-widest">
        SYS_INIT<span className="cursor-blink">_</span>
      </div>
      <div className="absolute top-24 right-8 text-blame-teal/20 font-mono text-[10px] tracking-widest text-right">
        V2.4.1_STABLE
      </div>
      <div className="absolute bottom-8 left-8 text-blame-teal/15 font-mono text-[10px]">
        44100Hz / 24BIT
      </div>
      <div className="absolute bottom-8 right-8 text-blame-teal/15 font-mono text-[10px]">
        LATENCY: 0.9MS
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-4xl">
          {/* Category label */}
          <div className="flex items-center gap-3 mb-8 fade-up fade-up-delay-1">
            <span className="blame-tag blame-tag-teal">Audio Production</span>
            <div className="h-px w-16 bg-blame-teal/40" />
            <span className="font-mono text-[11px] text-blame-teal-light tracking-wider">EST. 2024</span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold leading-none tracking-tight mb-4 fade-up fade-up-delay-1">
            <span className="block text-7xl md:text-9xl text-white mb-2">
              CRAFT
            </span>
            <span className="block text-7xl md:text-9xl">
              <span
                className="text-blame-teal-light transition-all duration-300"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(-10px)",
                  display: "inline-block",
                }}
              >
                {WORDS[wordIdx]}
              </span>
            </span>
            <span className="block text-7xl md:text-9xl text-white/20">
              THAT HIT
            </span>
          </h1>

          {/* Waveform */}
          <div className="my-10 fade-up fade-up-delay-2">
            <AnimatedWaveform />
          </div>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-blame-dim max-w-lg leading-relaxed mb-10 fade-up fade-up-delay-3">
            Premium digital audio tools, hand-crafted sample packs, and professional studio rental — for producers who refuse to settle.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 fade-up fade-up-delay-4">
            <Link href="/store" className="btn-primary">
              Browse Store
            </Link>
            <Link href="/rental" className="btn-ghost">
              Book Studio
            </Link>
            <Link
              href="/store?sort=new"
              className="font-mono text-xs tracking-widest uppercase text-blame-dim hover:text-blame-text transition-colors flex items-center gap-2 group"
            >
              <span>New Drops</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap gap-8 fade-up fade-up-delay-4">
            {[
              { value: "1,200+", label: "Sounds" },
              { value: "48kHz",  label: "Quality" },
              { value: "3",      label: "Studios" },
              { value: "∞",      label: "Downloads" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <span className="font-display text-3xl font-bold text-blame-teal-light">{value}</span>
                <span className="font-mono text-[11px] tracking-widest uppercase text-blame-dim">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-mono text-[10px] tracking-widest text-blame-dim">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-blame-teal to-transparent" />
      </div>
    </section>
  )
}

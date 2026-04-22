"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV_LINKS = [
  { label: "Store",      href: "/store",   desc: "Digital products" },
  { label: "Rental",     href: "/rental",  desc: "Studio & gear" },
  { label: "Downloads",  href: "/downloads", desc: "Your library" },
  { label: "About",      href: "/about",   desc: "Our story" },
]

function WaveformIcon({ active }: { active: boolean }) {
  const heights = [10, 18, 14, 22, 16, 26, 20, 14, 24, 18, 12]
  return (
    <span className="flex items-center gap-[2px] h-5">
      {heights.map((h, i) => (
        <span
          key={i}
          className="inline-block w-[2px] rounded-full transition-all duration-300"
          style={{
            height: `${active ? h : 4}px`,
            background: active ? "var(--blame-teal-light)" : "var(--blame-dim, #888)",
            transitionDelay: `${i * 30}ms`,
          }}
        />
      ))}
    </span>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [cartCount]               = useState(0)
  const pathname                  = usePathname()
  const menuRef                   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/")

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-blame-black/95 backdrop-blur-md border-b border-blame-teal/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-8 h-8 border border-blame-teal flex items-center justify-center group-hover:bg-blame-teal/10 transition-colors duration-300">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="0" y="6" width="3" height="10" fill="#006064" />
                  <rect x="4" y="2" width="3" height="14" fill="#006064" />
                  <rect x="8" y="4" width="3" height="12" fill="#B2DFDB" />
                  <rect x="12" y="0" width="3" height="16" fill="#B2DFDB" />
                </svg>
              </div>
              <div className="absolute -inset-1 border border-blame-teal/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span
              className="text-lg tracking-[0.25em] uppercase font-display font-800 text-white"
              style={{ letterSpacing: "0.3em" }}
            >
              BLAME
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-mono text-xs tracking-widest uppercase transition-colors duration-200 group ${
                  isActive(link.href)
                    ? "text-blame-teal-light"
                    : "text-blame-dim hover:text-blame-text"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-blame-teal transition-all duration-300 ${
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button
              className="hidden md:flex items-center gap-2 text-blame-dim hover:text-blame-text transition-colors"
              aria-label="Search"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 font-mono text-xs tracking-wider uppercase border border-blame-teal/40 px-3 py-1.5 text-blame-teal-light hover:border-blame-teal hover:bg-blame-teal/10 transition-all duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-blame-teal text-white text-[10px] flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              href="/account"
              className="hidden md:flex text-blame-dim hover:text-blame-text transition-colors"
              aria-label="Account"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col gap-1 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-px bg-blame-text transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`block w-5 h-px bg-blame-text transition-all duration-300 ${menuOpen ? "opacity-0 translate-x-2" : ""}`} />
              <span className={`block w-5 h-px bg-blame-text transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className={`fixed inset-0 z-40 bg-blame-black/98 backdrop-blur-lg flex flex-col justify-center px-8 transition-all duration-500 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Decorative waveform */}
        <div className="absolute top-24 right-8 flex items-end gap-1 opacity-20">
          {[20, 32, 48, 40, 56, 44, 60, 50, 36, 24].map((h, i) => (
            <span
              key={i}
              className="block w-1 bg-blame-teal rounded-full"
              style={{ height: `${h}px` }}
            />
          ))}
        </div>

        <nav className="flex flex-col gap-6">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group flex items-baseline gap-4 transition-all duration-300 ${
                menuOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 80 + 100}ms` }}
            >
              <span className="font-mono text-xs text-blame-teal/50 w-6">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`font-display text-4xl font-bold uppercase tracking-wide ${
                  isActive(link.href) ? "text-blame-teal-light" : "text-blame-neutral group-hover:text-blame-teal-light"
                } transition-colors`}
              >
                {link.label}
              </span>
              <span className="font-mono text-xs text-blame-dim opacity-0 group-hover:opacity-100 transition-opacity">
                {link.desc}
              </span>
            </Link>
          ))}
        </nav>

        <div className="mt-12 pt-8 border-t border-blame-teal/20">
          <div className="flex items-center gap-4">
            <Link
              href="/account"
              className="font-mono text-xs tracking-wider uppercase text-blame-dim hover:text-blame-text transition-colors"
            >
              My Account
            </Link>
            <span className="text-blame-teal/30">|</span>
            <Link
              href="/downloads"
              className="font-mono text-xs tracking-wider uppercase text-blame-dim hover:text-blame-text transition-colors"
            >
              Downloads
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

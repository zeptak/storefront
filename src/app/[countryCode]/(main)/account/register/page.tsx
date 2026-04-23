"use client"

import { useState } from "react"
import Link from "next/link"

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "", confirm: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setError("")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.email || !form.password || !form.firstName) { setError("Please fill in all required fields."); return }
    if (form.password !== form.confirm) { setError("Passwords don't match."); return }
    if (form.password.length < 8) { setError("Password must be at least 8 characters."); return }
    setLoading(true)
    // TODO: POST /auth/customer/emailpass + POST /store/customers
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    setError("Connect to Medusa backend to complete registration.")
  }

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex flex-col items-center gap-2">
            <div className="w-10 h-10 border border-blame-teal flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <rect x="0" y="6" width="3" height="10" fill="#006064" />
                <rect x="4" y="2" width="3" height="14" fill="#006064" />
                <rect x="8" y="4" width="3" height="12" fill="#B2DFDB" />
                <rect x="12" y="0" width="3" height="16" fill="#B2DFDB" />
              </svg>
            </div>
            <span className="font-display font-bold tracking-[0.3em] uppercase text-white">BLAME</span>
          </Link>
          <p className="font-mono text-xs text-blame-dim mt-4 tracking-wider uppercase">Create Account</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="px-4 py-3 border border-red-500/30 bg-red-500/5 text-red-400/80 font-mono text-xs">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[11px] text-blame-dim uppercase tracking-wider">First Name *</label>
              <input name="firstName" value={form.firstName} onChange={handleChange} className="blame-input" placeholder="Jan" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[11px] text-blame-dim uppercase tracking-wider">Last Name</label>
              <input name="lastName" value={form.lastName} onChange={handleChange} className="blame-input" placeholder="Novák" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[11px] text-blame-dim uppercase tracking-wider">Email *</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="blame-input" placeholder="you@example.com" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[11px] text-blame-dim uppercase tracking-wider">Password *</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} className="blame-input" placeholder="Min. 8 characters" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[11px] text-blame-dim uppercase tracking-wider">Confirm Password *</label>
            <input type="password" name="confirm" value={form.confirm} onChange={handleChange} className="blame-input" placeholder="Repeat password" />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full mt-2 flex items-center justify-center gap-2 disabled:opacity-60">
            {loading ? (
              <><span className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" />Creating Account...</>
            ) : "Create Account"}
          </button>
        </form>

        <p className="text-center font-mono text-xs text-blame-dim mt-6">
          Already have an account?{" "}
          <Link href="/account/login" className="text-blame-teal-light hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

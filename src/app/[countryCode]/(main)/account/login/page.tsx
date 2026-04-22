"use client"

import { useState } from "react"
import Link from "next/link"

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setError("")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.email || !form.password) { setError("Please fill in all fields."); return }
    setLoading(true)
    // TODO: Medusa auth — POST /auth/customer/emailpass
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    setError("Invalid credentials. (Connect to Medusa auth to enable login)")
  }

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
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
          <p className="font-mono text-xs text-blame-dim mt-4 tracking-wider uppercase">Sign In to Your Account</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="px-4 py-3 border border-red-500/30 bg-red-500/5 text-red-400/80 font-mono text-xs">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[11px] text-blame-dim uppercase tracking-wider">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="blame-input"
              placeholder="producer@example.com"
              autoComplete="email"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="font-mono text-[11px] text-blame-dim uppercase tracking-wider">Password</label>
              <Link href="/account/reset-password" className="font-mono text-[11px] text-blame-teal-light hover:underline">
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="blame-input"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-center font-mono text-xs text-blame-dim mt-6">
          No account yet?{" "}
          <Link href="/account/register" className="text-blame-teal-light hover:underline">
            Create one
          </Link>
        </p>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-blame-teal/10" />
          <span className="font-mono text-[10px] text-blame-dim uppercase tracking-wider">or</span>
          <div className="h-px flex-1 bg-blame-teal/10" />
        </div>

        <Link href="/store" className="btn-ghost w-full text-center block">
          Continue as Guest
        </Link>
      </div>
    </div>
  )
}

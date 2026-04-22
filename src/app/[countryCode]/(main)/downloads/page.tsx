import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Downloads — Your Library",
  description: "Access and re-download all your purchased digital products.",
}

// Mock downloads — in production fetched from Medusa Orders API
const MOCK_DOWNLOADS = [
  {
    id: "dl1",
    orderId: "ORD-20240318",
    title: "Void Bass Vol.1",
    subtitle: "Sample Pack",
    purchasedAt: "2024-03-18",
    fileSize: "1.2 GB",
    format: "WAV 24-bit / 44.1kHz",
    downloads: 2,
    maxDownloads: 5,
    files: [
      { name: "Void Bass Vol.1 — Full Pack.zip", size: "1.2 GB", type: "zip" },
    ],
  },
  {
    id: "dl2",
    orderId: "ORD-20240410",
    title: "BLAME MORPH",
    subtitle: "Plugin — VST3 / AU / AAX",
    purchasedAt: "2024-04-10",
    fileSize: "48 MB",
    format: "macOS + Windows",
    downloads: 1,
    maxDownloads: 3,
    files: [
      { name: "BLAME MORPH macOS.pkg",           size: "26 MB", type: "installer" },
      { name: "BLAME MORPH Windows Setup.exe",   size: "22 MB", type: "installer" },
      { name: "License Key.txt",                 size: "1 KB",  type: "text" },
    ],
  },
  {
    id: "dl3",
    orderId: "ORD-20240502",
    title: "Neural Serum Bank",
    subtitle: "200 Serum Presets",
    purchasedAt: "2024-05-02",
    fileSize: "18 MB",
    format: "Serum .fxp",
    downloads: 0,
    maxDownloads: 5,
    files: [
      { name: "Neural Serum Bank.zip", size: "18 MB", type: "zip" },
    ],
  },
]

function FileTypeIcon({ type }: { type: string }) {
  if (type === "installer") return <span className="text-blame-teal-light text-xs">⚙</span>
  if (type === "zip") return <span className="text-blame-teal text-xs">◼</span>
  return <span className="text-blame-dim text-xs">▸</span>
}

export default function DownloadsPage() {
  const isLoggedIn = false // Replace with actual auth check

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 border border-blame-teal/30 flex items-center justify-center mx-auto mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-blame-teal-light">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h1 className="font-display text-3xl font-bold text-white mb-3">Sign In Required</h1>
          <p className="text-sm text-blame-dim mb-8 leading-relaxed">
            Your download library is tied to your account. Sign in to access all your purchased products.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/account/login" className="btn-primary text-center">
              Sign In
            </Link>
            <Link href="/account/register" className="btn-ghost text-center">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <div className="border-b border-blame-teal/15 bg-blame-surface">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <p className="section-label mb-2">Account</p>
          <h1 className="font-display text-5xl font-bold text-white mb-2">Downloads</h1>
          <p className="text-sm text-blame-dim">
            {MOCK_DOWNLOADS.length} purchased products · Lifetime access
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Download list */}
        <div className="flex flex-col gap-4">
          {MOCK_DOWNLOADS.map((item) => (
            <div key={item.id} className="blame-card">
              {/* Header */}
              <div className="p-6 border-b border-blame-teal/10 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <h2 className="font-display text-xl font-bold text-white">{item.title}</h2>
                  <p className="font-mono text-[11px] text-blame-teal-light mt-0.5">{item.subtitle}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="font-mono text-[11px] text-blame-dim">
                      Purchased {item.purchasedAt}
                    </span>
                    <span className="text-blame-teal/30">|</span>
                    <span className="font-mono text-[11px] text-blame-dim">{item.format}</span>
                    <span className="text-blame-teal/30">|</span>
                    <span className="font-mono text-[11px] text-blame-dim">{item.fileSize}</span>
                  </div>
                </div>
                {/* Download count */}
                <div className="text-right shrink-0">
                  <div className="font-mono text-xs text-blame-dim mb-1">
                    {item.downloads}/{item.maxDownloads} downloads
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: item.maxDownloads }).map((_, i) => (
                      <span
                        key={i}
                        className={`inline-block w-5 h-1 rounded-full ${
                          i < item.downloads ? "bg-blame-teal" : "bg-blame-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Files */}
              <div className="p-6 flex flex-col gap-3">
                {item.files.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center justify-between gap-4 py-3 px-4 bg-blame-dark border border-blame-teal/10 hover:border-blame-teal/30 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <FileTypeIcon type={file.type} />
                      <div>
                        <p className="font-mono text-xs text-blame-text group-hover:text-blame-teal-light transition-colors">
                          {file.name}
                        </p>
                        <p className="font-mono text-[10px] text-blame-dim mt-0.5">{file.size}</p>
                      </div>
                    </div>
                    <button className="font-mono text-[11px] tracking-wider uppercase text-blame-teal border border-blame-teal/40 px-3 py-1.5 hover:bg-blame-teal hover:text-white transition-all duration-200 flex items-center gap-2 shrink-0">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Download
                    </button>
                  </div>
                ))}
              </div>

              {/* Order ref */}
              <div className="px-6 pb-4">
                <Link
                  href={`/account/orders/${item.orderId}`}
                  className="font-mono text-[11px] text-blame-dim hover:text-blame-teal-light transition-colors"
                >
                  View order {item.orderId} →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state (if no purchases) */}
        {MOCK_DOWNLOADS.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-6">
            <div className="w-16 h-16 border border-blame-teal/20 flex items-center justify-center text-blame-teal/30 text-3xl">
              ⬇
            </div>
            <div className="text-center">
              <p className="font-display text-2xl text-blame-dim mb-2">No downloads yet</p>
              <p className="text-sm text-blame-dim/60">Your purchased digital products will appear here.</p>
            </div>
            <Link href="/store" className="btn-primary">Browse the Store</Link>
          </div>
        )}
      </div>
    </div>
  )
}

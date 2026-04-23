import type { Metadata } from "next"
import { Syne, Space_Mono, DM_Sans } from "next/font/google"
import "../styles/globals.css"

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
})

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500"],
})

export const metadata: Metadata = {
  title: {
    default: "BLAME — Audio Production Tools",
    template: "%s | BLAME",
  },
  description:
    "Premium digital audio tools, sample packs, plugins, and professional studio rental. Crafted for producers who push boundaries.",
  keywords: ["audio production", "sample packs", "plugins", "studio rental", "music production", "sound design"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://blamepro.com",
    siteName: "BLAME",
    title: "BLAME — Audio Production Tools",
    description: "Premium digital audio tools and studio rental for modern producers.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BLAME — Audio Production Tools",
    description: "Premium digital audio tools and studio rental for modern producers.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceMono.variable} ${dmSans.variable}`}>
      <body className="grain bg-blame-black text-blame-text font-body antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}

import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "English Mastery — Smart Local AI Dictionary",
  description:
    "An ultra-premium, high-performance English learning ecosystem powered by Local AI. Search, analyze, and master vocabulary with deep bilingual breakdowns.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#0D0E12",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}

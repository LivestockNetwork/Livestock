import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rural Community Hub - Connecting Rural Australia",
  description:
    "When disaster strikes our home, who do we call? Rural people don't wait for help - they ARE the help. But first, we need to find each other.",
  keywords: "rural community, emergency preparedness, livestock, farming, Australia, disaster response",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

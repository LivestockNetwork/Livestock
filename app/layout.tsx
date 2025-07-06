import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rural Community Hub - Emergency Planning & Community Support",
  description:
    "Connect with your rural community, create emergency plans, and stay prepared for bushfires, floods, and other emergencies.",
  keywords: "rural, emergency, planning, community, bushfire, flood, livestock, farming",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">{children}</div>
        <Toaster />
      </body>
    </html>
  )
}

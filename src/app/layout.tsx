import type { Metadata } from "next"
import { Fraunces, DM_Sans } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import { TopBar } from "@/components/layout/top-bar"
import { MobileNav } from "@/components/layout/mobile-nav"
import "./globals.css"

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
})

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Todoodle",
  description:
    "A playful todo app for dog parents. Track walks, vet visits, medications, and more for all your pups.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${dmSans.variable} antialiased`}
      >
        <TopBar />
        <main className="min-h-screen pb-20 md:pb-0">
          {children}
        </main>
        <MobileNav />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  )
}

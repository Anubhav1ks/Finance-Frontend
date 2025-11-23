import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "FAIP - Finance & Accounting Internship Portal",
  description: "Find your next finance or accounting internship",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Toaster richColors position="top-right" />

        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

import type React from "react"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"
import NextAuthSessionProvider from "./NextAuthSessionProvider"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "SKY GUARD",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <NextAuthSessionProvider>
        <body className="font-sans antialiased">{children}</body>
      </NextAuthSessionProvider>
    </html>
  )
}


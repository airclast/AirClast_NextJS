import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "SkyGuard - Air Quality Forecasting",
  description: "Advanced air quality forecasting using satellite data and machine learning",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <Suspense fallback={null}>
            <div className="min-h-screen flex flex-col relative overflow-hidden">
              {/* Cosmic Aurora Background */}
              <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-[#0a0a0a] dark:bg-[#0a0a0a]"></div>
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    backgroundImage: `
                      radial-gradient(ellipse at 20% 30%, rgba(56, 189, 248, 0.4) 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 70%, rgba(139, 92, 246, 0.3) 0%, transparent 70%),
                      radial-gradient(ellipse at 60% 20%, rgba(236, 72, 153, 0.25) 0%, transparent 50%),
                      radial-gradient(ellipse at 40% 80%, rgba(34, 197, 94, 0.2) 0%, transparent 65%)
                    `,
                  }}
                />
                {/* Subtle overlay for light mode readability */}
                <div className="absolute inset-0 bg-white/5 dark:bg-transparent"></div>
              </div>

              <Navbar />
              <main className="flex-1 relative z-10">{children}</main>
              <Footer />
            </div>
          </Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

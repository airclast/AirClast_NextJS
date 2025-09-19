import { Satellite } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Satellite className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">SkyGuard</span>
          </div>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-border text-center text-sm text-muted-foreground">
          © 2024 SkyGuard. Powered by NASA TEMPO, Sentinel-5P, and advanced machine learning.
        </div>
      </div>
    </footer>
  )
}

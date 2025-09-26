import Link from "next/link"
import { Github, Linkedin, Twitter, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-cyan-500 mt-2">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">SKY GUARD</h3>
              <p className="text-[#ffffffc0] text-sm leading-relaxed">
                Advanced weather intelligence platform delivering accurate forecasts and comprehensive weather insights
                worldwide.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="w-9 h-9 p-0 text-[#ffffffc0] hover:text-white hover:bg-slate-700/50"
              >
                <Github className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-9 h-9 p-0 text-[#ffffffc0] hover:text-white hover:bg-slate-700/50"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-9 h-9 p-0 text-[#ffffffc0] hover:text-white hover:bg-slate-700/50"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-9 h-9 p-0 text-[#ffffffc0] hover:text-white hover:bg-slate-700/50"
              >
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-[#ffffffc0] hover:text-white transition-colors text-sm">
                  Weather Dashboard
                </Link>
              </li>
              <li>
                <Link href="/#maps" className="text-[#ffffffc0] hover:text-white transition-colors text-sm">
                  Interactive Maps
                </Link>
              </li>
              <li>
                <Link href="/#trends" className="text-[#ffffffc0] hover:text-white transition-colors text-sm">
                  Weather Trends
                </Link>
              </li>
              <li>
                <Link href="/#monthly" className="text-[#ffffffc0] hover:text-white transition-colors text-sm">
                  Monthly Forecast
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#ffffffc0] hover:text-white transition-colors text-sm">
                  Weather API
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-[#ffffffc0] hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#ffffffc0] hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
              {/* <li>
                <Link href="#" className="text-[#ffffffc0] hover:text-white transition-colors text-sm">
                  Careers
                </Link>
              </li> */}
              {/* <li>
                <Link href="#" className="text-[#ffffffc0] hover:text-white transition-colors text-sm">
                  Press Kit
                </Link>
              </li> */}
              <li>
                <Link href="#" className="text-[#ffffffc0] hover:text-white transition-colors text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#ffffffc0] mt-0.5 flex-shrink-0" />
                <div className="text-[#ffffffc0] text-sm">
                  123 Weather Ave
                  <br />
                  Seattle, WA 98101
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#ffffffc0] flex-shrink-0" />
                <span className="text-[#ffffffc0] text-sm">+1 (555) 123-WEATHER</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#ffffffc0] flex-shrink-0" />
                <span className="text-[#ffffffc0] text-sm">airclast81@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-slate-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[#ffffffc0] text-sm">© 2025 SKY GUARD Weather. All rights reserved.</div>
            <div className="flex gap-6">
              <Link href="#" className="text-[#ffffffc0] hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="#" className="text-[#ffffffc0] hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="#" className="text-[#ffffffc0] hover:text-white transition-colors text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

"use client"
import { Settings, User, LogIn, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NotificationDropdown } from "@/components/notification-dropdown"
import { mockNotifications } from "@/lib/mock-data"
import Link from "next/link"
import { useSession } from "next-auth/react"

export function Header() {
  const {data:session}=useSession()
  return (
    <header className="bg-card border-b border-border fixed w-full z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">SG</span>
              </div>
              <span className="font-bold text-lg text-card-foreground">SKY GUARD</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/map" className="text-muted-foreground hover:text-primary transition-colors">
              About Us
            </Link>
            <Link href="/profile" className="text-muted-foreground hover:text-primary transition-colors">
              Contact Us
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <NotificationDropdown notifications={mockNotifications} />
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hidden sm:flex items-center space-x-2">
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500">
                <UserPlus className="h-4 w-4" />
                <span>Register</span>
              </Button>
            </Link>
            {/* Mobile user icon for smaller screens */}
            <Button variant="ghost" size="icon" className="sm:hidden">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

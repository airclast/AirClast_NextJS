"use client"

import { Button } from "@/components/ui/button"
import { Satellite, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedText } from "@/components/animated-text"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-white/20 bg-black/40 backdrop-blur-xl supports-[backdrop-filter]:bg-black/40 dark:bg-black/60 dark:border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <Satellite className="h-8 w-8 text-blue-400 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
            <AnimatedText text="SkyGuard" className="text-2xl font-bold text-white" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-white/90 hover:text-blue-400 transition-all duration-300 hover:scale-105 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/workflow"
              className="text-white/90 hover:text-blue-400 transition-all duration-300 hover:scale-105 relative group"
            >
              Workflow
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/login"
              className="text-white/90 hover:text-blue-400 transition-all duration-300 hover:scale-105 relative group"
            >
              Login
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/register">
              <Button
                variant="default"
                size="sm"
                className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
              >
                Get Started
              </Button>
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm text-white"
            >
              <div className="relative w-5 h-5">
                <X
                  className={`absolute h-5 w-5 transition-all duration-300 ${isOpen ? "rotate-0 scale-100" : "rotate-90 scale-0"}`}
                />
                <Menu
                  className={`absolute h-5 w-5 transition-all duration-300 ${isOpen ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}
                />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="py-4 border-t border-white/20">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-white/90 hover:text-blue-400 transition-all duration-300 transform hover:translate-x-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/workflow"
                className="text-white/90 hover:text-blue-400 transition-all duration-300 transform hover:translate-x-2"
                onClick={() => setIsOpen(false)}
              >
                Workflow
              </Link>
              <Link
                href="/login"
                className="text-white/90 hover:text-blue-400 transition-all duration-300 transform hover:translate-x-2"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link href="/register" onClick={() => setIsOpen(false)}>
                <Button variant="default" size="sm" className="w-fit transition-all duration-300 hover:scale-105">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

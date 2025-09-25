"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  BarChart3,
  Map,
  Bell,
  Settings,
  User,
  Cloud,
  Wind,
  Thermometer,
  Droplets,
  Sun,
  Activity,
} from "lucide-react"

const sidebarItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: Home,
    description: "Dashboard overview",
  },
  // {
  //   title: "Current Conditions",
  //   href: "/dashboard/current",
  //   icon: Cloud,
  //   description: "Real-time weather & AQI",
  // },
  {
    title: "Hourly Forecast",
    href: "/dashboard/hourly",
    icon: BarChart3,
    description: "48-hour detailed forecast",
  },
  // {
  //   title: "Daily Forecast",
  //   href: "/dashboard/daily",
  //   icon: Activity,
  //   description: "10-day weather outlook",
  // },
  {
    title: "Air Quality",
    href: "/dashboard/air-quality",
    icon: Wind,
    description: "Air quality monitoring",
  },
  // {
  //   title: "Temperature",
  //   href: "/dashboard/temperature",
  //   icon: Thermometer,
  //   description: "Temperature trends",
  // },
  {
    title: "AI Chat bot",
    href: "/dashboard/chat",
    icon: Droplets,
    description: "Rain & snow data",
  },
  // {
  //   title: "UV Index",
  //   href: "/dashboard/uv",
  //   icon: Sun,
  //   description: "UV radiation levels",
  // },
  {
    title: "Interactive Map",
    href: "/map",
    icon: Map,
    description: "Weather radar & maps",
  },
  {
    title: "Alerts",
    href: "/notifications",
    icon: Bell,
    description: "Weather alerts & warnings",
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
    description: "User preferences",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    description: "App settings",
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col bg-card border-r border-border">
      {/* Logo/Brand */}
      <div className="flex h-16 items-center px-6 border-b border-border">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
            <Cloud className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">AirWatch</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="space-y-1 px-3">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                <div className="flex flex-col">
                  <span>{item.title}</span>
                  <span className="text-xs text-muted-foreground">{item.description}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </nav>

     {/* Bottom section */}
      <div className="border-t p-4">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">john@example.com</p>
          </div>
        </div>
      </div>
      
    </div>
  )
}

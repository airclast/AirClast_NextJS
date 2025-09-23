"use client"

import { Search, Grid3X3, MapPin, Cloud, Sun, Eye, Droplets } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { NotificationDropdown } from "@/components/notification-dropdown"
import { generateMockNotifications } from "@/lib/mock-data"

export function WeatherDashboardBanner() {
  const notifications = generateMockNotifications()

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white min-h-screen">
      {/* Top Navigation */}
      <nav className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <Grid3X3 className="h-5 w-5" />
          </Button>
          <div className="text-white [&_button]:text-white [&_button:hover]:bg-white/10">
            <NotificationDropdown notifications={notifications} />
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="h-4 w-4" />
            <span>Dhaka, Bangladesh</span>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search for Location"
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-300"
            />
          </div>
        </div>

        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg?height=32&width=32" />
          <AvatarFallback className="bg-orange-500 text-white">U</AvatarFallback>
        </Avatar>
      </nav>

      {/* Main Weather Content */}
      <div className="p-6">
        {/* Location Badge */}
        <div className="mb-6">
          <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full">
            <MapPin className="h-4 w-4 mr-2" />
            Bangladesh
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section - Current Weather */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <h1 className="text-4xl font-light mb-1">Sunday</h1>
              <p className="text-gray-300 text-sm">04 Aug 2024</p>
            </div>

            <div className="flex items-center mb-6">
              <div className="relative mr-6">
                <Cloud className="h-20 w-20 text-gray-300" />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="flex space-x-1">
                    <div className="w-1 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-1 h-3 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-1 h-3 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-5xl font-light mb-1">28°C</div>
                <div className="text-gray-300 text-lg">/24°C</div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-medium mb-1">Heavy Rain</h3>
              <p className="text-gray-300">Feels like 31°</p>
            </div>

            {/* Today/Week Forecast */}
            <div className="bg-white/5 rounded-2xl p-4 mb-6">
              <h4 className="text-sm font-medium mb-4">Today / Week</h4>
              <div className="flex justify-between items-center">
                {["1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM"].map((time, index) => (
                  <div key={time} className="text-center">
                    <div className="text-xs text-gray-400 mb-2">{time}</div>
                    <Sun className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                    <div className="text-xs">{20 + index}°</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tomorrow */}
            <div className="bg-white/5 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Tomorrow</h4>
                  <p className="text-gray-400 text-sm">Thunder storm</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl font-light">14°</div>
                  <Cloud className="h-8 w-8 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Today Overview */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-medium mb-6">Today Overview</h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Wind Status */}
              <div className="bg-white/5 rounded-2xl p-4">
                <h4 className="text-sm font-medium mb-4 text-gray-300">Wind Status</h4>
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-700"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2.4 * Math.PI * 36}`}
                      strokeDashoffset={`${2.4 * Math.PI * 36 * 0.3}`}
                      className="text-blue-500"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* UV Index */}
              <div className="bg-white/5 rounded-2xl p-4">
                <h4 className="text-sm font-medium mb-4 text-gray-300">UV Index</h4>
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-700"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2.4 * Math.PI * 36}`}
                      strokeDashoffset={`${2.4 * Math.PI * 36 * 0.7}`}
                      className="text-blue-400"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Visibility */}
              <div className="bg-white/5 rounded-2xl p-4">
                <h4 className="text-sm font-medium mb-4 text-gray-300">Visibility</h4>
                <div className="flex items-center justify-center">
                  <Eye className="h-12 w-12 text-gray-400" />
                </div>
              </div>

              {/* Humidity */}
              <div className="bg-white/5 rounded-2xl p-4">
                <h4 className="text-sm font-medium mb-4 text-gray-300">Humidity</h4>
                <div className="flex items-center justify-center">
                  <Droplets className="h-12 w-12 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sunrise/Sunset */}
              <div className="bg-white/5 rounded-2xl p-4">
                <h4 className="text-sm font-medium mb-4 text-gray-300">Sunrise</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-2xl font-light">6:45</span>
                    <span className="text-gray-400 text-sm">AM</span>
                  </div>
                  <div className="text-gray-400 text-sm">Sunrise</div>
                  <div className="flex justify-between mt-4">
                    <span className="text-2xl font-light">5:30</span>
                    <span className="text-gray-400 text-sm">PM</span>
                  </div>
                  <div className="text-gray-400 text-sm">Length of day</div>
                  <div className="text-lg font-medium">10h 23m</div>
                </div>
              </div>

              {/* Other Cities */}
              <div className="bg-white/5 rounded-2xl p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-sm font-medium text-gray-300">Other Cities</h4>
                  <button className="text-xs text-blue-400 hover:text-blue-300">Show All</button>
                </div>
                <div className="space-y-3">
                  {[
                    { city: "Sylhet", temp: "14°", condition: "Partly Cloudy" },
                    { city: "Cumilla", temp: "27°", condition: "Partly Cloudy" },
                    { city: "Chittagong", temp: "16°", condition: "Partly Cloudy" },
                    { city: "Dhaka", temp: "26°", condition: "Partly Cloudy" },
                  ].map((item) => (
                    <div key={item.city} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{item.temp}</div>
                        <div className="text-xs text-gray-400">{item.city}</div>
                      </div>
                      <Sun className="h-5 w-5 text-yellow-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

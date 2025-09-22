"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Thermometer, Droplets, Gauge, Wind, Sun, Eye } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface WeatherData {
  id: string
  title: string
  value: string
  subtitle: string
  description: string
  icon: React.ReactNode
  chart: React.ReactNode
  color: string
}

const weatherData: WeatherData[] = [
  {
    id: "temperature",
    title: "Temperature",
    value: "25°",
    subtitle: "Dew Point",
    description: "Steady at 94%. Temperature remains in the normal range.",
    icon: <Thermometer className="h-8 w-8" />,
    chart: (
      <div className="flex items-end space-x-1 h-16">
        {[20, 35, 45, 60, 40, 55, 70, 65, 50, 45, 35, 25].map((height, i) => (
          <div key={i} className="bg-blue-400/60 rounded-t" style={{ height: `${height}%`, width: "8px" }} />
        ))}
      </div>
    ),
    color: "from-blue-500/20 to-blue-600/20",
  },
  {
    id: "humidity",
    title: "Humidity",
    value: "91%",
    subtitle: "Relative Humidity",
    description: "Extremely humid. Steady at 94%.",
    icon: <Droplets className="h-8 w-8" />,
    chart: (
      <div className="flex items-end space-x-1 h-16">
        {[80, 85, 90, 95, 91, 88, 92, 94, 89, 87, 90, 91].map((height, i) => (
          <div key={i} className="bg-cyan-400/60 rounded-t" style={{ height: `${height}%`, width: "8px" }} />
        ))}
      </div>
    ),
    color: "from-cyan-500/20 to-cyan-600/20",
  },
  {
    id: "pressure",
    title: "Pressure",
    value: "1005",
    subtitle: "mb",
    description: "Falling slowly. Falling slowly in the last 3 hours. Expected to fall slowly in the next 3 hours.",
    icon: <Gauge className="h-8 w-8" />,
    chart: (
      <div className="relative h-16">
        <svg viewBox="0 0 100 40" className="w-full h-full">
          <path d="M 0 30 Q 25 20 50 25 T 100 20" stroke="rgb(59 130 246 / 0.6)" strokeWidth="2" fill="none" />
          <circle cx="70" cy="22" r="3" fill="rgb(59 130 246)" />
        </svg>
      </div>
    ),
    color: "from-blue-500/20 to-indigo-600/20",
  },
  {
    id: "feels-like",
    title: "Feels Like",
    value: "30°",
    subtitle: "Dominant factor: Humidity",
    description:
      "Feels Like 30°. Similar to the actual temperature. Sensitive individuals should limit outdoor activity.",
    icon: <Sun className="h-8 w-8" />,
    chart: (
      <div className="relative h-16">
        <svg viewBox="0 0 100 40" className="w-full h-full">
          <path d="M 0 35 Q 30 15 60 25 Q 80 35 100 20" stroke="rgb(251 191 36 / 0.6)" strokeWidth="2" fill="none" />
          <circle cx="60" cy="25" r="3" fill="rgb(251 191 36)" />
        </svg>
      </div>
    ),
    color: "from-yellow-500/20 to-orange-600/20",
  },
  {
    id: "aqi",
    title: "AQI",
    value: "67",
    subtitle: "Moderate",
    description: "Deteriorating air quality with primary pollutant: PM2.5",
    icon: <Wind className="h-8 w-8" />,
    chart: (
      <div className="relative h-16 flex items-center justify-center">
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90">
            <circle cx="32" cy="32" r="28" stroke="rgb(75 85 99 / 0.3)" strokeWidth="4" fill="none" />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="rgb(251 191 36)"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${67 * 1.76} 176`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-yellow-500">67</span>
          </div>
        </div>
      </div>
    ),
    color: "from-yellow-500/20 to-amber-600/20",
  },
  {
    id: "uv-index",
    title: "UV Index",
    value: "4",
    subtitle: "Moderate UV",
    description: "Moderate UV levels. Sun protection recommended during midday hours.",
    icon: <Eye className="h-8 w-8" />,
    chart: (
      <div className="relative h-16 flex items-center justify-center">
        <div className="relative">
          <Sun className="h-12 w-12 text-orange-400" />
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
            4
          </div>
        </div>
      </div>
    ),
    color: "from-orange-500/20 to-red-600/20",
  },
]

export function WeatherCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % weatherData.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % weatherData.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + weatherData.length) % weatherData.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Weather Details</h2>
        <p className="text-muted-foreground">Comprehensive weather monitoring and analysis</p>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/50 to-card border border-border/50 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />

        <div className="relative p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -100, rotateY: 15 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[300px]"
            >
              {/* Left side - Main content */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="flex items-center space-x-4">
                  <motion.div
                    className={`p-4 rounded-2xl bg-gradient-to-br ${weatherData[currentIndex].color} backdrop-blur-sm border border-white/10`}
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {weatherData[currentIndex].icon}
                  </motion.div>
                  <div>
                    <h3 className="text-3xl font-bold text-foreground">{weatherData[currentIndex].title}</h3>
                    <p className="text-muted-foreground">{weatherData[currentIndex].subtitle}</p>
                  </div>
                </div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="text-6xl font-bold text-foreground">{weatherData[currentIndex].value}</div>
                  <p className="text-muted-foreground leading-relaxed">{weatherData[currentIndex].description}</p>
                </motion.div>
              </motion.div>

              {/* Right side - Chart */}
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <Card
                  className={`p-8 bg-gradient-to-br ${weatherData[currentIndex].color} border-white/10 backdrop-blur-sm shadow-2xl`}
                >
                  <motion.div className="w-64 h-32" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                    {weatherData[currentIndex].chart}
                  </motion.div>
                </Card>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className="h-12 w-12 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/80"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            {/* Dots indicator */}
            <div className="flex space-x-2">
              {weatherData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary scale-125"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className="h-12 w-12 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/80"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

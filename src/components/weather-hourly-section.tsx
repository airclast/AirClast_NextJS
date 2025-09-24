"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  Eye,
  Thermometer,
  Gauge,
  BarChart3,
  List,
  TrendingUp,
  Zap,
} from "lucide-react"

// Mock hourly data for the next 24 hours
const generateHourlyData = () => {
  const hours = []
  const now = new Date()

  for (let i = 0; i < 24; i++) {
    const time = new Date(now.getTime() + i * 60 * 60 * 1000)
    const temp = Math.round(28 + Math.sin(i * 0.3) * 5 + Math.random() * 3)
    const conditions = ["sunny", "partly-cloudy", "cloudy", "rainy"][Math.floor(Math.random() * 4)]
    const precipitation = Math.round(Math.random() * 100)
    const wind = Math.round(5 + Math.random() * 15)
    const humidity = Math.round(60 + Math.random() * 30)
    const uvIndex = Math.round(Math.max(0, 8 + Math.sin((i - 6) * 0.5) * 4 + Math.random() * 2))

    hours.push({
      time: time.getHours(),
      temp,
      conditions,
      precipitation,
      wind,
      humidity,
      feelsLike: temp + Math.round(Math.random() * 4 - 2),
      visibility: Math.round(8 + Math.random() * 7),
      pressure: Math.round(1010 + Math.random() * 20),
      uvIndex, // Added UV index
    })
  }

  return hours
}

const getWeatherIcon = (condition: string) => {
  switch (condition) {
    case "sunny":
      return <Sun className="h-6 w-6 text-yellow-500" />
    case "partly-cloudy":
      return <Cloud className="h-6 w-6 text-gray-400" />
    case "cloudy":
      return <Cloud className="h-6 w-6 text-gray-600" />
    case "rainy":
      return <CloudRain className="h-6 w-6 text-blue-500" />
    default:
      return <Sun className="h-6 w-6 text-yellow-500" />
  }
}

const formatTime = (hour: number) => {
  if (hour === 0) return "12 AM"
  if (hour === 12) return "12 PM"
  if (hour < 12) return `${hour} AM`
  return `${hour - 12} PM`
}

export function WeatherHourlySection() {
  const [selectedMetric, setSelectedMetric] = useState("temperature")
  const [viewMode, setViewMode] = useState<"graph" | "list">("graph")
  const hourlyData = generateHourlyData()

  const metrics = [
    { id: "temperature", label: "Temperature", icon: Thermometer, unit: "°C" },
    { id: "precipitation", label: "Precipitation", icon: CloudRain, unit: "%" },
    { id: "wind", label: "Wind", icon: Wind, unit: "km/h" },
    { id: "humidity", label: "Humidity", icon: Droplets, unit: "%" },
    { id: "visibility", label: "Visibility", icon: Eye, unit: "km" },
    { id: "pressure", label: "Pressure", icon: Gauge, unit: "hPa" },
    { id: "uvIndex", label: "UV Index", icon: Zap, unit: "" }, // Added UV Index metric
  ]

  const getMetricValue = (hour: any, metric: string) => {
    switch (metric) {
      case "temperature":
        return hour.temp
      case "precipitation":
        return hour.precipitation
      case "wind":
        return hour.wind
      case "humidity":
        return hour.humidity
      case "visibility":
        return hour.visibility
      case "pressure":
        return hour.pressure
      case "uvIndex": // Added UV index case
        return hour.uvIndex
      default:
        return hour.temp
    }
  }

  const getMetricColor = (metric: string) => {
    switch (metric) {
      case "temperature":
        return "text-orange-500"
      case "precipitation":
        return "text-blue-500"
      case "wind":
        return "text-green-500"
      case "humidity":
        return "text-cyan-500"
      case "visibility":
        return "text-purple-500"
      case "pressure":
        return "text-red-500"
      case "uvIndex": // Added UV index color
        return "text-yellow-500"
      default:
        return "text-orange-500"
    }
  }

  const createSmoothPath = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return ""

    let path = `M ${points[0].x} ${points[0].y}`

    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1]
      const curr = points[i]
      const next = points[i + 1]

      if (i === 1) {
        // First curve
        const cp1x = prev.x + (curr.x - prev.x) * 0.3
        const cp1y = prev.y
        const cp2x = curr.x - (curr.x - prev.x) * 0.3
        const cp2y = curr.y
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`
      } else if (i === points.length - 1) {
        // Last curve
        const cp1x = prev.x + (curr.x - prev.x) * 0.3
        const cp1y = prev.y
        const cp2x = curr.x - (curr.x - prev.x) * 0.3
        const cp2y = curr.y
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`
      } else {
        // Middle curves with smooth transitions
        const prevDiff = { x: curr.x - prev.x, y: curr.y - prev.y }
        const nextDiff = { x: next.x - curr.x, y: next.y - curr.y }

        const cp1x = prev.x + prevDiff.x * 0.7
        const cp1y = prev.y + prevDiff.y * 0.3
        const cp2x = curr.x - nextDiff.x * 0.3
        const cp2y = curr.y - nextDiff.y * 0.3

        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`
      }
    }

    return path
  }

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent mb-3">
            Hourly Forecast
          </h2>
          <p className="text-blue-100/80 text-lg">Advanced weather analytics for the next 24 hours</p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {metrics.map((metric) => {
              const IconComponent = metric.icon
              return (
                <Button
                  key={metric.id}
                  onClick={() => setSelectedMetric(metric.id)}
                  className={`
                    flex items-center gap-2 transition-all duration-300 backdrop-blur-md border
                    ${
                      selectedMetric === metric.id
                        ? "bg-white/20 border-white/30 text-white shadow-2xl scale-105"
                        : "bg-white/10 border-white/20 text-blue-100 hover:bg-white/15 hover:scale-102"
                    }
                  `}
                >
                  <IconComponent className="h-4 w-4" />
                  {metric.label}
                </Button>
              )
            })}
          </div>
        </div>

        <div className="mb-6 flex justify-center">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-1 border border-white/20">
            <Button
              onClick={() => setViewMode("graph")}
              variant="ghost"
              className={`
                flex items-center gap-2 transition-all duration-200
                ${viewMode === "graph" ? "bg-white/20 text-white" : "text-blue-100 hover:bg-white/10"}
              `}
            >
              <BarChart3 className="h-4 w-4" />
              Graph View
            </Button>
            <Button
              onClick={() => setViewMode("list")}
              variant="ghost"
              className={`
                flex items-center gap-2 transition-all duration-200
                ${viewMode === "list" ? "bg-white/20 text-white" : "text-blue-100 hover:bg-white/10"}
              `}
            >
              <List className="h-4 w-4" />
              List View
            </Button>
          </div>
        </div>

        <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              {(() => {
                const currentMetric = metrics.find((m) => m.id === selectedMetric)
                if (currentMetric) {
                  const IconComponent = currentMetric.icon
                  return <IconComponent className="h-6 w-6 text-cyan-300" />
                }
                return null
              })()}
              <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                {metrics.find((m) => m.id === selectedMetric)?.label} Analytics
              </span>
              <TrendingUp className="h-5 w-5 text-green-400 ml-auto" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            {viewMode === "graph" ? (
              <>
                <div className="mb-8">
                  <div className="relative h-80 bg-gradient-to-t from-blue-900/30 to-transparent rounded-xl p-6 border border-white/10 overflow-hidden">
                    <svg
                      className="absolute inset-6 w-full h-full"
                      style={{ width: "calc(100% - 48px)", height: "calc(100% - 48px)" }}
                    >
                      <defs>
                        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="rgba(34, 211, 238, 0.4)" />
                          <stop offset="50%" stopColor="rgba(59, 130, 246, 0.2)" />
                          <stop offset="100%" stopColor="rgba(59, 130, 246, 0.05)" />
                        </linearGradient>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                          <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>

                      {/* Grid lines */}
                      {[...Array(6)].map((_, i) => (
                        <line
                          key={i}
                          x1="0"
                          y1={`${i * 20}%`}
                          x2="100%"
                          y2={`${i * 20}%`}
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="1"
                          strokeDasharray="2,2"
                        />
                      ))}

                      {(() => {
                        const chartData = hourlyData.slice(0, 12)
                        const values = chartData.map((hour) => getMetricValue(hour, selectedMetric))
                        const maxValue = Math.max(...values)
                        const minValue = Math.min(...values)
                        const range = maxValue - minValue || 1

                        const points = chartData.map((hour, index) => {
                          const value = getMetricValue(hour, selectedMetric)
                          const x = (index / (chartData.length - 1)) * 100
                          const y = 100 - ((value - minValue) / range) * 80 - 10
                          return { x, y, value, hour, index }
                        })

                        const pathPoints = points.map((p) => ({ x: p.x, y: p.y }))
                        const smoothPath = createSmoothPath(pathPoints)
                        const areaPath = smoothPath + ` L ${points[points.length - 1].x} 100 L ${points[0].x} 100 Z`

                        return (
                          <g>
                            {/* Area fill */}
                            <path d={areaPath} fill="url(#areaGradient)" opacity="0.6" />

                            {/* Main line */}
                            <path
                              d={smoothPath}
                              fill="none"
                              stroke="rgba(34, 211, 238, 1)"
                              strokeWidth="3"
                              filter="url(#glow)"
                              className="drop-shadow-lg"
                            />

                            {/* Data points */}
                            {points.map((point, index) => (
                              <g key={index}>
                                <circle
                                  cx={`${point.x}%`}
                                  cy={`${point.y}%`}
                                  r="6"
                                  fill="rgba(34, 211, 238, 1)"
                                  stroke="white"
                                  strokeWidth="2"
                                  filter="url(#glow)"
                                  className="hover:r-8 transition-all duration-200 cursor-pointer"
                                />

                                {/* Value labels */}
                                <text
                                  x={`${point.x}%`}
                                  y={`${point.y - 8}%`}
                                  textAnchor="middle"
                                  fill="white"
                                  fontSize="12"
                                  fontWeight="600"
                                  className="pointer-events-none"
                                >
                                  {point.value}
                                  {metrics.find((m) => m.id === selectedMetric)?.unit}
                                </text>

                                {/* Time labels */}
                                <text
                                  x={`${point.x}%`}
                                  y="95%"
                                  textAnchor="middle"
                                  fill="rgba(191, 219, 254, 0.8)"
                                  fontSize="11"
                                  fontWeight="500"
                                  className="pointer-events-none"
                                >
                                  {index === 0 ? "Now" : `${point.hour.time}h`}
                                </text>
                              </g>
                            ))}
                          </g>
                        )
                      })()}
                    </svg>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <div className="flex gap-4 pb-4" style={{ minWidth: "max-content" }}>
                    {hourlyData.map((hour, index) => {
                      const currentMetric = metrics.find((m) => m.id === selectedMetric)!
                      const value = getMetricValue(hour, selectedMetric)
                      const isCurrentHour = index === 0

                      return (
                        <div
                          key={index}
                          className={`
                            flex flex-col items-center p-5 rounded-xl min-w-[120px] transition-all duration-300
                            backdrop-blur-md border group hover:scale-105
                            ${
                              isCurrentHour
                                ? "bg-white/20 border-cyan-400/50 shadow-xl shadow-cyan-400/20"
                                : "bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/30"
                            }
                          `}
                        >
                          <div
                            className={`text-sm font-semibold mb-3 ${isCurrentHour ? "text-cyan-300" : "text-blue-200"}`}
                          >
                            {index === 0 ? "Now" : formatTime(hour.time)}
                          </div>

                          <div className="mb-3 transform group-hover:scale-110 transition-transform">
                            {getWeatherIcon(hour.conditions)}
                          </div>

                          <div className="text-2xl font-bold text-white mb-2">{hour.temp}°</div>

                          {selectedMetric !== "temperature" && (
                            <div
                              className={`text-sm font-medium ${getMetricColor(selectedMetric)} bg-white/10 px-2 py-1 rounded-full`}
                            >
                              {value}
                              {currentMetric.unit}
                            </div>
                          )}

                          {hour.precipitation > 0 && (
                            <div className="text-xs text-cyan-300 mt-2 bg-blue-500/20 px-2 py-1 rounded-full">
                              {hour.precipitation}% rain
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-3">
                {hourlyData.slice(0, 12).map((hour, index) => {
                  const currentMetric = metrics.find((m) => m.id === selectedMetric)!
                  const value = getMetricValue(hour, selectedMetric)
                  const isCurrentHour = index === 0

                  return (
                    <div
                      key={index}
                      className={`
                        flex items-center justify-between p-4 rounded-lg transition-all duration-200
                        backdrop-blur-md border group hover:bg-white/15
                        ${isCurrentHour ? "bg-white/20 border-cyan-400/50" : "bg-white/10 border-white/20"}
                      `}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`text-sm font-semibold min-w-[60px] ${isCurrentHour ? "text-cyan-300" : "text-blue-200"}`}
                        >
                          {index === 0 ? "Now" : formatTime(hour.time)}
                        </div>
                        <div className="transform group-hover:scale-110 transition-transform">
                          {getWeatherIcon(hour.conditions)}
                        </div>
                        <div className="text-xl font-bold text-white">{hour.temp}°</div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className={`text-lg font-semibold ${getMetricColor(selectedMetric)}`}>
                          {value}
                          {currentMetric.unit}
                        </div>
                        {hour.precipitation > 0 && (
                          <div className="text-sm text-cyan-300 bg-blue-500/20 px-2 py-1 rounded-full">
                            {hour.precipitation}%
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 ">
          {[
            {
              icon: Wind,
              label: "Wind Speed",
              value: `${hourlyData[0].wind} km/h`,
              color: "text-green-400",
              bg: "from-green-500/20 to-emerald-500/20",
            },
            {
              icon: Droplets,
              label: "Humidity",
              value: `${hourlyData[0].humidity}%`,
              color: "text-cyan-400",
              bg: "from-cyan-500/20 to-blue-500/20",
            },
            {
              icon: Eye,
              label: "Visibility",
              value: `${hourlyData[0].visibility} km`,
              color: "text-purple-400",
              bg: "from-purple-500/20 to-pink-500/20",
            },
            {
              icon: Zap,
              label: "UV Index",
              value: `${hourlyData[0].uvIndex}`,
              color: "text-yellow-400",
              bg: "from-yellow-500/20 to-orange-500/20",
            },
          ].map((item, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-xl border-white/20  shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <CardContent className="p-6">
                <div className={`flex items-center gap-4 p-4 rounded-lg bg-gradient-to-br ${item.bg}`}>
                  <item.icon className={`h-10 w-10 ${item.color}`} />
                  <div>
                    <div className="text-sm text-blue-200 font-medium">{item.label}</div>
                    <div className="text-2xl font-bold text-white">{item.value}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

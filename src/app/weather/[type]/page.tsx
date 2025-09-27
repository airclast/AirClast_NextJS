"use client"

import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Activity,
  Eye,
  Thermometer,
  Droplets,
  Cloud,
  CloudRain,
  Wind,
  Sun,
  Moon,
  Gauge,
  EyeIcon,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import { ResponsiveContainer, XAxis, YAxis, Tooltip, Area, AreaChart, Bar, BarChart } from "recharts"

const weatherData = {
  temperature: {
    title: "Temperature",
    value: "33°",
    status: "Rising",
    statusIcon: "🔴",
    description: "Rising with a peak of 34° at 3:00 PM. Overnight low of 27° at 3:00 AM.",
    color: "from-red-500 to-red-600",
    glowColor: "rgba(239, 68, 68, 0.4)",
    unit: "°C",
    icon: Thermometer,
    chartData: [
      { time: "12 AM", value: 27, forecast: 26 },
      { time: "3 AM", value: 26, forecast: 25 },
      { time: "6 AM", value: 28, forecast: 27 },
      { time: "9 AM", value: 31, forecast: 30 },
      { time: "12 PM", value: 33, forecast: 32 },
      { time: "3 PM", value: 34, forecast: 35 },
      { time: "6 PM", value: 32, forecast: 33 },
      { time: "9 PM", value: 29, forecast: 30 },
    ],
    details: [
      { label: "Current", value: "33°C", trend: "up" },
      { label: "Feels like", value: "41°C", trend: "up" },
      { label: "Today's high", value: "34°C", trend: "neutral" },
      { label: "Today's low", value: "27°C", trend: "down" },
      { label: "Average high", value: "32°C", trend: "neutral" },
      { label: "Average low", value: "26°C", trend: "neutral" },
    ],
  },
  "feels-like": {
    title: "Feels Like",
    value: "41°",
    status: "Hot",
    statusIcon: "🔥",
    description: "Feels considerably warmer than the actual temperature due to the humidity.",
    color: "from-orange-500 to-red-500",
    glowColor: "rgba(249, 115, 22, 0.4)",
    unit: "°C",
    icon: Activity,
    chartData: [
      { time: "12 AM", value: 32, actual: 27 },
      { time: "3 AM", value: 30, actual: 26 },
      { time: "6 AM", value: 33, actual: 28 },
      { time: "9 AM", value: 38, actual: 31 },
      { time: "12 PM", value: 41, actual: 33 },
      { time: "3 PM", value: 43, actual: 34 },
      { time: "6 PM", value: 39, actual: 32 },
      { time: "9 PM", value: 35, actual: 29 },
    ],
    details: [
      { label: "Feels like", value: "41°C", trend: "up" },
      { label: "Actual temp", value: "33°C", trend: "up" },
      { label: "Humidity factor", value: "+8°C", trend: "up" },
      { label: "Wind factor", value: "-1°C", trend: "down" },
      { label: "Heat index", value: "Very High", trend: "up" },
      { label: "Comfort level", value: "Uncomfortable", trend: "down" },
    ],
  },
  "cloud-cover": {
    title: "Cloud Cover",
    value: "45%",
    status: "Partly Sunny",
    statusIcon: "⛅",
    description: "Decreasing with mostly clear sky at 2:00 PM. Mostly clear sky expected in the evening.",
    color: "from-blue-400 to-blue-500",
    glowColor: "rgba(96, 165, 250, 0.4)",
    unit: "%",
    icon: Cloud,
    chartData: [
      { time: "12 AM", value: 65 },
      { time: "3 AM", value: 70 },
      { time: "6 AM", value: 55 },
      { time: "9 AM", value: 50 },
      { time: "12 PM", value: 45 },
      { time: "3 PM", value: 30 },
      { time: "6 PM", value: 35 },
      { time: "9 PM", value: 40 },
    ],
    details: [
      { label: "Current cover", value: "45%", trend: "down" },
      { label: "Sky condition", value: "Partly Sunny", trend: "neutral" },
      { label: "Visibility", value: "Good", trend: "up" },
      { label: "Cloud base", value: "2,500 ft", trend: "neutral" },
      { label: "Cloud type", value: "Cumulus", trend: "neutral" },
      { label: "UV exposure", value: "High", trend: "up" },
    ],
  },
  precipitation: {
    title: "Precipitation",
    value: "0 cm",
    status: "No Precipitation",
    statusIcon: "🌞",
    description: "Rain expected on Saturday. Today has seen similar precipitation as yesterday until now.",
    color: "from-blue-600 to-blue-700",
    glowColor: "rgba(37, 99, 235, 0.4)",
    unit: "cm",
    icon: CloudRain,
    chartData: [
      { time: "12 AM", value: 0 },
      { time: "3 AM", value: 0 },
      { time: "6 AM", value: 0 },
      { time: "9 AM", value: 0 },
      { time: "12 PM", value: 0 },
      { time: "3 PM", value: 0 },
      { time: "6 PM", value: 0.2 },
      { time: "9 PM", value: 0.1 },
    ],
    details: [
      { label: "Current", value: "0 cm", trend: "neutral" },
      { label: "Next 24h", value: "0.3 cm", trend: "up" },
      { label: "Probability", value: "15%", trend: "up" },
      { label: "Intensity", value: "Light", trend: "neutral" },
      { label: "Type", value: "Rain", trend: "neutral" },
      { label: "Duration", value: "2 hours", trend: "neutral" },
    ],
  },
  wind: {
    title: "Wind",
    value: "7 km/h",
    status: "Light Breeze",
    statusIcon: "🍃",
    description: "Steady with averages holding at 3 km/h (gusts to 3) expected from N through the evening.",
    color: "from-cyan-500 to-blue-500",
    glowColor: "rgba(6, 182, 212, 0.4)",
    unit: "km/h",
    icon: Wind,
    chartData: [
      { time: "12 AM", value: 5, direction: 140 },
      { time: "3 AM", value: 4, direction: 135 },
      { time: "6 AM", value: 6, direction: 145 },
      { time: "9 AM", value: 8, direction: 150 },
      { time: "12 PM", value: 7, direction: 140 },
      { time: "3 PM", value: 9, direction: 130 },
      { time: "6 PM", value: 6, direction: 135 },
      { time: "9 PM", value: 5, direction: 140 },
    ],
    details: [
      { label: "Speed", value: "7 km/h", trend: "neutral" },
      { label: "Direction", value: "SE (140°)", trend: "neutral" },
      { label: "Gusts", value: "22 km/h", trend: "up" },
      { label: "Force", value: "2 (Light Breeze)", trend: "neutral" },
      { label: "Beaufort scale", value: "Light Breeze", trend: "neutral" },
      { label: "Wind chill", value: "31°C", trend: "neutral" },
    ],
  },
  humidity: {
    title: "Humidity",
    value: "75%",
    status: "Very Humid",
    statusIcon: "💧",
    description: "Steady at 84%. Very humid conditions expected in the evening.",
    color: "from-blue-500 to-blue-600",
    glowColor: "rgba(59, 130, 246, 0.4)",
    unit: "%",
    icon: Droplets,
    chartData: [
      { time: "12 AM", value: 85 },
      { time: "3 AM", value: 88 },
      { time: "6 AM", value: 82 },
      { time: "9 AM", value: 78 },
      { time: "12 PM", value: 75 },
      { time: "3 PM", value: 72 },
      { time: "6 PM", value: 76 },
      { time: "9 PM", value: 80 },
    ],
    details: [
      { label: "Current humidity", value: "75%", trend: "down" },
      { label: "Dew point", value: "28°C", trend: "neutral" },
      { label: "Comfort level", value: "Uncomfortable", trend: "down" },
      { label: "Today's range", value: "72% - 88%", trend: "neutral" },
      { label: "Relative humidity", value: "High", trend: "up" },
      { label: "Moisture content", value: "23.2 g/m³", trend: "neutral" },
    ],
  },
  uv: {
    title: "UV Index",
    value: "8",
    status: "Very High",
    statusIcon: "🔆",
    description: "Maximum UV exposure for today will be very high, expected at 1:00 PM.",
    color: "from-yellow-400 to-orange-500",
    glowColor: "rgba(251, 191, 36, 0.4)",
    unit: "UVI",
    icon: Sun,
    chartData: [
      { time: "6 AM", value: 0 },
      { time: "9 AM", value: 3 },
      { time: "12 PM", value: 7 },
      { time: "1 PM", value: 8 },
      { time: "3 PM", value: 6 },
      { time: "6 PM", value: 2 },
      { time: "7 PM", value: 0 },
      { time: "9 PM", value: 0 },
    ],
    details: [
      { label: "Current UV", value: "8", trend: "up" },
      { label: "Risk level", value: "Very High", trend: "up" },
      { label: "Peak time", value: "1:00 PM", trend: "neutral" },
      { label: "Protection needed", value: "Essential", trend: "up" },
      { label: "Burn time", value: "15 minutes", trend: "down" },
      { label: "Vitamin D", value: "5 minutes", trend: "neutral" },
    ],
  },
  aqi: {
    title: "Air Quality Index",
    value: "62",
    status: "Moderate",
    statusIcon: "🟡",
    description: "Deteriorating air quality with primary pollutant: PM2.5 8.7 μg/m³.",
    color: "from-yellow-500 to-orange-500",
    glowColor: "rgba(245, 158, 11, 0.4)",
    unit: "AQI",
    icon: Gauge,
    chartData: [
      { time: "12 AM", value: 45 },
      { time: "3 AM", value: 42 },
      { time: "6 AM", value: 55 },
      { time: "9 AM", value: 68 },
      { time: "12 PM", value: 62 },
      { time: "3 PM", value: 58 },
      { time: "6 PM", value: 65 },
      { time: "9 PM", value: 52 },
    ],
    details: [
      { label: "Current AQI", value: "62", trend: "up" },
      { label: "Category", value: "Moderate", trend: "neutral" },
      { label: "Primary pollutant", value: "PM2.5", trend: "up" },
      { label: "PM2.5 level", value: "8.7 μg/m³", trend: "up" },
      { label: "Health impact", value: "Acceptable", trend: "neutral" },
      { label: "Sensitive groups", value: "May be affected", trend: "up" },
    ],
  },
  visibility: {
    title: "Visibility",
    value: "5 km",
    status: "Good",
    statusIcon: "👁️",
    description: "Improving with a peak visibility distance of 30 km expected at 2:00 PM. Excellent visibility.",
    color: "from-green-500 to-green-600",
    glowColor: "rgba(34, 197, 94, 0.4)",
    unit: "km",
    icon: EyeIcon,
    chartData: [
      { time: "12 AM", value: 8 },
      { time: "3 AM", value: 6 },
      { time: "6 AM", value: 4 },
      { time: "9 AM", value: 7 },
      { time: "12 PM", value: 12 },
      { time: "3 PM", value: 15 },
      { time: "6 PM", value: 10 },
      { time: "9 PM", value: 8 },
    ],
    details: [
      { label: "Current", value: "5 km", trend: "up" },
      { label: "Category", value: "Good", trend: "up" },
      { label: "Peak today", value: "15 km", trend: "up" },
      { label: "Minimum today", value: "4 km", trend: "neutral" },
      { label: "Limiting factor", value: "Haze", trend: "down" },
      { label: "Forecast", value: "Improving", trend: "up" },
    ],
  },
  pressure: {
    title: "Atmospheric Pressure",
    value: "1002 mb",
    status: "Falling slowly",
    statusIcon: "📉",
    description: "Falling slowly in the last 3 hours. Expected to fall in the next 3 hours.",
    color: "from-blue-500 to-indigo-500",
    glowColor: "rgba(99, 102, 241, 0.4)",
    unit: "mb",
    icon: BarChart3,
    chartData: [
      { time: "12 AM", value: 1008 },
      { time: "3 AM", value: 1006 },
      { time: "6 AM", value: 1005 },
      { time: "9 AM", value: 1004 },
      { time: "12 PM", value: 1002 },
      { time: "3 PM", value: 1001 },
      { time: "6 PM", value: 1000 },
      { time: "9 PM", value: 999 },
    ],
    details: [
      { label: "Current", value: "1002 mb", trend: "down" },
      { label: "Trend", value: "Falling", trend: "down" },
      { label: "3h change", value: "-2 mb", trend: "down" },
      { label: "24h change", value: "-6 mb", trend: "down" },
      { label: "Sea level", value: "1002 mb", trend: "down" },
      { label: "Weather impact", value: "Unsettled", trend: "down" },
    ],
  },
  sun: {
    title: "Sun",
    value: "12h 5m",
    status: "Daylight Duration",
    statusIcon: "☀️",
    description: "Sunrise at 5:47 AM, sunset at 5:53 PM. Day length is 12 hours and 5 minutes.",
    color: "from-orange-400 to-red-500",
    glowColor: "rgba(251, 146, 60, 0.4)",
    unit: "hours",
    icon: Sun,
    chartData: [
      { time: "5:47 AM", value: 0, event: "Sunrise" },
      { time: "8:00 AM", value: 20, event: "Morning" },
      { time: "12:00 PM", value: 100, event: "Solar Noon" },
      { time: "3:00 PM", value: 80, event: "Afternoon" },
      { time: "5:53 PM", value: 0, event: "Sunset" },
    ],
    details: [
      { label: "Sunrise", value: "5:47 AM", trend: "neutral" },
      { label: "Sunset", value: "5:53 PM", trend: "neutral" },
      { label: "Solar noon", value: "11:50 AM", trend: "neutral" },
      { label: "Day length", value: "12h 5m", trend: "neutral" },
      { label: "Tomorrow", value: "+1 minute", trend: "up" },
      { label: "Golden hour", value: "5:15 PM", trend: "neutral" },
    ],
  },
  moon: {
    title: "Moon",
    value: "11h 25m",
    status: "Waxing Crescent",
    statusIcon: "🌙",
    description: "Moonrise at 7:43 AM, moonset at 7:09 PM. Moon is visible for 11 hours and 25 minutes.",
    color: "from-yellow-400 to-orange-400",
    glowColor: "rgba(251, 191, 36, 0.4)",
    unit: "hours",
    icon: Moon,
    chartData: [
      { time: "7:43 AM", value: 0, phase: "Moonrise" },
      { time: "12:00 PM", value: 45, phase: "Midday" },
      { time: "3:00 PM", value: 75, phase: "Afternoon" },
      { time: "7:09 PM", value: 0, phase: "Moonset" },
    ],
    details: [
      { label: "Moonrise", value: "7:43 AM", trend: "neutral" },
      { label: "Moonset", value: "7:09 PM", trend: "neutral" },
      { label: "Phase", value: "Waxing Crescent", trend: "up" },
      { label: "Illumination", value: "23%", trend: "up" },
      { label: "Next full moon", value: "12 days", trend: "neutral" },
      { label: "Lunar age", value: "4.2 days", trend: "up" },
    ],
  },
}

interface WeatherDetailPageProps {
  params: { type: string }
}

export default function WeatherDetailPage({ params }: WeatherDetailPageProps) {
  const { type } = params

  const data = weatherData[type as keyof typeof weatherData]

  if (!data) {
    notFound()
  }

  const IconComponent = data.icon || Activity

  const renderChart = () => {
    const chartProps = {
      width: "100%",
      height: 400,
    }

    switch (type) {
      case "temperature":
      case "feels-like":
        return (
          <div className="interactive-chart">
            <ResponsiveContainer {...chartProps}>
              <AreaChart data={data.chartData}>
                <defs>
                  <linearGradient id={`${type}Gradient`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={data.glowColor} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={data.glowColor} stopOpacity={0.1} />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                  className=""
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                  className=""
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    color: "white",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={data.glowColor}
                  fill={`url(#${type}Gradient)`}
                  strokeWidth={3}
                  filter="url(#glow)"
                  dot={{ fill: data.glowColor, strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: data.glowColor, strokeWidth: 2 }}
                />
                {(type === "temperature" || type === "feels-like") && (
                  <Area
                    type="monotone"
                    dataKey={type === "temperature" ? "forecast" : "actual"}
                    stroke="rgba(59, 130, 246, 0.8)"
                    fill="none"
                    strokeWidth={2}
                    strokeDasharray="8 4"
                    dot={{ fill: "#3B82F6", r: 4 }}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )

      default:
        return (
          <div className="interactive-chart">
            <ResponsiveContainer {...chartProps}>
              <BarChart data={data.chartData}>
                <defs>
                  <linearGradient id={`${type}BarGradient`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={data.glowColor} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={data.glowColor} stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    color: "white",
                    backdropFilter: "blur(20px)",
                  }}
                />
                <Bar
                  dataKey="value"
                  fill={`url(#${type}BarGradient)`}
                  radius={[8, 8, 0, 0]}
                  className="hover:opacity-80 transition-opacity"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen weather-details-bg relative overflow-hidden">
      <div className="floating-orb floating-orb-1" />
      <div className="floating-orb floating-orb-2" />
      <div className="floating-orb floating-orb-3" />

      <div className="relative z-10 max-w-7xl mx-auto p-6 space-y-8">
        <div className="flex items-center gap-6 animate-slide-in-scale">
        
          <div className="h-8 w-px " />
          <div className="flex items-center gap-4">
            <div className="p-3 glass-card rounded-2xl">
              <IconComponent className="w-8 h-8 " />
            </div>
            <div>
              <h1 className="text-4xl font-bold gradient-text">{data.title}</h1>
              <p className=" text-lg">{data.status}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 ">
          {/* Current Value - Enhanced Hero Card */}
          <div className="lg:col-span-2">
            <div
              className="glass-card glass-card-hover p-8 rounded-3xl animate-slide-in-scale relative overflow-hidden 
              shadow-lg"
              style={{ animationDelay: "100ms" }}
            >
              <div className="relative z-10 space-y-6 ">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold ">Current Reading</h2>
                  <div className="status-badge px-4 py-2 rounded-full">
                    <div className="flex items-center gap-2">
                      {data.status.includes("Rising") || data.status.includes("Increasing") ? (
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      ) : data.status.includes("Falling") || data.status.includes("Decreasing") ? (
                        <TrendingDown className="w-4 h-4 text-red-400" />
                      ) : (
                        <Activity className="w-4 h-4 text-blue-400" />
                      )}
                      <span className="text-sm ">{data.status}</span>
                    </div>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <div className="hero-value text-8xl font-bold tracking-tight">{data.value}</div>
                  <div className=" text-lg font-medium">{data.unit}</div>
                </div>

                <div
                  className="h-3 rounded-full relative overflow-hidden"
                  style={{
                    background: `linear-gradient(90deg, ${data.glowColor}, transparent)`,
                    boxShadow: `0 0 20px ${data.glowColor}`,
                  }}
                >
                  <div className="absolute inset-0  animate-pulse" />
                </div>

                <p className=" leading-relaxed text-center">{data.description}</p>
              </div>

              {/* Background decoration */}
              <div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20"
                style={{ background: `radial-gradient(circle, ${data.glowColor}, transparent)` }}
              />
            </div>
          </div>

          {/* Chart - Enhanced with glassmorphism */}
          <div className="lg:col-span-3 
          shadow-lg">
            <div className="data-visualization p-8 animate-slide-in-scale" style={{ animationDelay: "200ms" }}>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold ">24-Hour Analytics</h2>
                  <div className="flex items-center gap-2 ">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">Live Data</span>
                  </div>
                </div>
                {renderChart()}
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {data.details.map((detail, index) => (
            <div
              key={index}
              className="metric-card glass-card-hover p-6 rounded-2xl animate-slide-in-scale 
              shadow-lg"
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <span className=" text-sm font-medium">{detail.label}</span>
                  <div className="flex items-center gap-2">
                    <span className=" font-bold text-lg">{detail.value}</span>
                    {detail.trend === "up" && <TrendingUp className="w-4 h-4 text-green-400" />}
                    {detail.trend === "down" && <TrendingDown className="w-4 h-4 text-red-400" />}
                    {detail.trend === "neutral" && <Activity className="w-4 h-4 text-blue-400" />}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card p-8 rounded-3xl animate-slide-in-scale" style={{ animationDelay: "800ms" }}>
          <h3 className="text-2xl font-bold gradient-text mb-6">Weather Insights</h3>
          <div className="grid md:grid-cols-2 gap-8  leading-relaxed">
            <div className="space-y-4">
              <p className="text-lg">{data.description}</p>
              <p>
                This measurement is continuously monitored and provides real-time information about current weather
                conditions in your area using advanced meteorological sensors.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                The interactive chart above displays comprehensive 24-hour analytics, helping you understand weather
                patterns and make informed decisions about your day.
              </p>
              <p>
                Data is collected from multiple weather stations, satellite imagery, and atmospheric sensors to ensure
                maximum accuracy and reliability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

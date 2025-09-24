"use client"

import { Line, LineChart, XAxis, YAxis, ResponsiveContainer, RadialBarChart, RadialBar } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, AlertTriangle, Shield, Wind } from "lucide-react"

const airQualityData = [
  { time: "12 AM", aqi: 59, pm25: 15, pm10: 25, o3: 45, no2: 12, so2: 8, co: 0.5 },
  { time: "1 AM", aqi: 62, pm25: 18, pm10: 28, o3: 48, no2: 14, so2: 9, co: 0.6 },
  { time: "2 AM", aqi: 58, pm25: 14, pm10: 24, o3: 42, no2: 11, so2: 7, co: 0.4 },
  { time: "3 AM", aqi: 55, pm25: 12, pm10: 22, o3: 38, no2: 10, so2: 6, co: 0.3 },
  { time: "4 AM", aqi: 61, pm25: 16, pm10: 26, o3: 44, no2: 13, so2: 8, co: 0.5 },
  { time: "5 AM", aqi: 68, pm25: 22, pm10: 32, o3: 52, no2: 18, so2: 11, co: 0.8 },
  { time: "6 AM", aqi: 72, pm25: 25, pm10: 35, o3: 55, no2: 20, so2: 12, co: 0.9 },
  { time: "7 AM", aqi: 75, pm25: 28, pm10: 38, o3: 58, no2: 22, so2: 14, co: 1.0 },
  { time: "8 AM", aqi: 78, pm25: 30, pm10: 42, o3: 62, no2: 25, so2: 15, co: 1.2 },
  { time: "9 AM", aqi: 82, pm25: 35, pm10: 48, o3: 68, no2: 28, so2: 18, co: 1.4 },
  { time: "10 AM", aqi: 85, pm25: 38, pm10: 52, o3: 72, no2: 30, so2: 20, co: 1.5 },
  { time: "11 AM", aqi: 88, pm25: 42, pm10: 58, o3: 78, no2: 35, so2: 22, co: 1.8 },
]

const pollutantData = [
  { name: "PM2.5", value: 25, color: "#ef4444", unit: "μg/m³" },
  { name: "PM10", value: 35, color: "#f97316", unit: "μg/m³" },
  { name: "O₃", value: 55, color: "#eab308", unit: "μg/m³" },
  { name: "NO₂", value: 20, color: "#22c55e", unit: "μg/m³" },
  { name: "SO₂", value: 12, color: "#3b82f6", unit: "μg/m³" },
  { name: "CO", value: 0.9, color: "#8b5cf6", unit: "mg/m³" },
]

const aqiGaugeData = [{ name: "AQI", value: 72, fill: "#f97316" }]

interface AirQualityTabProps {
  viewMode: "chart" | "list"
}

const getAQILevel = (aqi: number) => {
  if (aqi <= 50) return { level: "Good", color: "bg-green-500", textColor: "text-green-700" }
  if (aqi <= 100) return { level: "Moderate", color: "bg-yellow-500", textColor: "text-yellow-700" }
  if (aqi <= 150) return { level: "Unhealthy for Sensitive", color: "bg-orange-500", textColor: "text-orange-700" }
  if (aqi <= 200) return { level: "Unhealthy", color: "bg-red-500", textColor: "text-red-700" }
  if (aqi <= 300) return { level: "Very Unhealthy", color: "bg-purple-500", textColor: "text-purple-700" }
  return { level: "Hazardous", color: "bg-red-900", textColor: "text-red-900" }
}

export default function AirQualityTab({ viewMode }: AirQualityTabProps) {
  const currentAQI = airQualityData[0].aqi
  const aqiLevel = getAQILevel(currentAQI)

  if (viewMode === "list") {
    return (
      <div className="space-y-2">
        <div className="grid grid-cols-12 gap-4 text-xs font-medium text-muted-foreground mb-4 px-4">
          <div className="col-span-2">Time</div>
          <div className="col-span-2">AQI</div>
          <div className="col-span-2">PM2.5</div>
          <div className="col-span-2">PM10</div>
          <div className="col-span-2">O₃</div>
          <div className="col-span-2">Quality</div>
        </div>
        <div className="max-h-96 overflow-y-auto space-y-1">
          {airQualityData.map((hour, index) => {
            const level = getAQILevel(hour.aqi)
            return (
              <div
                key={index}
                className="grid grid-cols-12 gap-4 items-center py-3 px-4 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="col-span-2 text-sm font-medium">{hour.time}</div>
                <div className="col-span-2 text-sm font-bold">{hour.aqi}</div>
                <div className="col-span-2 text-sm">{hour.pm25} μg/m³</div>
                <div className="col-span-2 text-sm">{hour.pm10} μg/m³</div>
                <div className="col-span-2 text-sm">{hour.o3} μg/m³</div>
                <div className="col-span-2">
                  <Badge variant="secondary" className={`${level.color} text-white text-xs`}>
                    {level.level.split(" ")[0]}
                  </Badge>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* AQI Overview with Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/20">
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="w-5 h-5 text-orange-500" />
            <h3 className="text-lg font-semibold">Air Quality Index</h3>
          </div>

          <div className="flex items-center justify-center mb-4">
            <div className="relative w-32 h-32">
              <ChartContainer
                config={{
                  aqi: {
                    label: "AQI",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="w-full h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={aqiGaugeData}>
                    <RadialBar dataKey="value" cornerRadius={10} fill="#f97316" background={{ fill: "#f3f4f6" }} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-orange-500">{currentAQI}</div>
                <div className="text-xs text-muted-foreground">AQI</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Badge className={`${aqiLevel.color} text-white mb-2`}>{aqiLevel.level}</Badge>
            <p className="text-sm text-muted-foreground">Air quality is acceptable for most people</p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-chart-3/10 to-chart-3/5 border-chart-3/20">
          <div className="flex items-center gap-2 mb-4">
            <Wind className="w-5 h-5 text-chart-3" />
            <h3 className="text-lg font-semibold">Pollutant Breakdown</h3>
          </div>

          <div className="space-y-3">
            {pollutantData.map((pollutant, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pollutant.color }} />
                  <span className="text-sm font-medium">{pollutant.name}</span>
                </div>
                <div className="text-sm">
                  <span className="font-semibold">{pollutant.value}</span>
                  <span className="text-muted-foreground ml-1">{pollutant.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* AQI Trend Chart */}
      <Card className="p-4 bg-gradient-to-br from-chart-1/5 to-chart-1/10 border-chart-1/20">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-chart-1" />
          <h3 className="text-lg font-semibold">AQI Trend</h3>
        </div>
        <ChartContainer
          config={{
            aqi: {
              label: "Air Quality Index",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-64"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={airQualityData}>
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                domain={[40, 100]}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={{ stroke: "hsl(var(--chart-1))", strokeWidth: 1 }}
              />
              <Line
                type="monotone"
                dataKey="aqi"
                stroke="hsl(var(--chart-1))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--chart-1))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Card>

      {/* Health Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium">General Public</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Air quality is acceptable. Outdoor activities are safe for everyone.
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium">Sensitive Groups</span>
          </div>
          <div className="text-xs text-muted-foreground">
            People with respiratory conditions should consider limiting outdoor activities.
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">Forecast</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Air quality expected to worsen during morning hours due to traffic.
          </div>
        </Card>
      </div>
    </div>
  )
}

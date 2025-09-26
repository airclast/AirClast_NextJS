"use client"

import { useState } from "react"
import { XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card } from "@/components/ui/card"
import { Cloud, Sun, CloudRain } from "lucide-react"

const hourlyData = [
  { time: "12 AM", temp: 28, humidity: 89, wind: 2, icon: Sun, condition: "clear" },
  { time: "1 AM", temp: 27, humidity: 91, wind: 3, icon: Sun, condition: "clear" },
  { time: "2 AM", temp: 27, humidity: 92, wind: 2, icon: Cloud, condition: "cloudy" },
  { time: "3 AM", temp: 26, humidity: 94, wind: 1, icon: Cloud, condition: "cloudy" },
  { time: "4 AM", temp: 26, humidity: 95, wind: 2, icon: Cloud, condition: "cloudy" },
  { time: "5 AM", temp: 25, humidity: 96, wind: 4, icon: CloudRain, condition: "rain" },
  { time: "6 AM", temp: 26, humidity: 94, wind: 5, icon: CloudRain, condition: "rain" },
  { time: "7 AM", temp: 27, humidity: 92, wind: 3, icon: Cloud, condition: "cloudy" },
  { time: "8 AM", temp: 29, humidity: 88, wind: 2, icon: Sun, condition: "clear" },
  { time: "9 AM", temp: 31, humidity: 84, wind: 3, icon: Sun, condition: "clear" },
  { time: "10 AM", temp: 33, humidity: 78, wind: 4, icon: Sun, condition: "clear" },
  { time: "11 AM", temp: 34, humidity: 72, wind: 5, icon: Sun, condition: "clear" },
]

export default function HourlyOverview() {
  const [viewMode, setViewMode] = useState<"chart" | "list">("chart")

  return (
    <div className="space-y-6">

      {/* LIST VIEW */}
      {viewMode === "list" && (
        <div className="space-y-2 animate-fade-in">
          <div className="grid grid-cols-12 gap-4 text-xs font-medium text-muted-foreground mb-4 px-4">
            <div className="col-span-2">Time</div>
            <div className="col-span-2">Condition</div>
            <div className="col-span-2">Temp</div>
            <div className="col-span-2">Humidity</div>
            <div className="col-span-2">Wind</div>
            <div className="col-span-2">Feels Like</div>
          </div>
          <div className="max-h-96 overflow-y-auto space-y-1">
            {hourlyData.map((hour, index) => {
              const Icon = hour.icon
              return (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-4 items-center py-3 px-4 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <div className="col-span-2 text-sm font-medium">{hour.time}</div>
                  <div className="col-span-2 flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-sm capitalize">{hour.condition}</span>
                  </div>
                  <div className="col-span-2 text-sm font-semibold">{hour.temp}°</div>
                  <div className="col-span-2 text-sm">{hour.humidity}%</div>
                  <div className="col-span-2 text-sm">{hour.wind} km/h</div>
                  <div className="col-span-2 text-sm">{hour.temp + 3}°</div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* CHART VIEW */}
      {viewMode === "chart" && (
        <div className="space-y-6 animate-fade-in">
          {/* Temperature Chart */}
          <Card className="p-4 bg-gradient-to-br from-primary/5 to-chart-1/5">
            <ChartContainer
              config={{
                temp: { label: "Temperature", color: "#f97316" }, // orange
                humidity: { label: "Humidity", color: "#0ea5e9" }, // blue
                wind: { label: "Wind Speed", color: "#22c55e" }, // green
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyData}>
                  <defs>
                    <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>

                  <XAxis dataKey="time" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />

                  <ChartTooltip content={<ChartTooltipContent />} />

                  {/* Temperature Line */}
                  <Area
                    type="monotone"
                    dataKey="temp"
                    stroke="#f97316"
                    strokeWidth={3}
                    fill="url(#tempGradient)"
                    dot={{ r: 4, fill: "#f97316" }}
                  />

                  {/* Humidity Line */}
                  <Area
                    type="monotone"
                    dataKey="humidity"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    fill="url(#humidityGradient)"
                    dot={{ r: 3, fill: "#0ea5e9" }}
                  />

                  {/* Wind Speed Line */}
                  <Area
                    type="monotone"
                    dataKey="wind"
                    stroke="#22c55e"
                    strokeWidth={2}
                    fill="url(#windGradient)"
                    dot={{ r: 3, fill: "#22c55e" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Card>
        </div>
      )}
    </div>
  )
}

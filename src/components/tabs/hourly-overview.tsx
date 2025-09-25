"use client"

import { XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card } from "@/components/ui/card"
import { Cloud, Sun, CloudRain, Wind } from "lucide-react"

const hourlyData = [
  { time: "12 AM", temp: 28, condition: "clear", icon: Sun, humidity: 89, wind: 2 },
  { time: "1 AM", temp: 27, condition: "clear", icon: Sun, humidity: 91, wind: 3 },
  { time: "2 AM", temp: 27, condition: "cloudy", icon: Cloud, humidity: 92, wind: 2 },
  { time: "3 AM", temp: 26, condition: "cloudy", icon: Cloud, humidity: 94, wind: 1 },
  { time: "4 AM", temp: 26, condition: "cloudy", icon: Cloud, humidity: 95, wind: 2 },
  { time: "5 AM", temp: 25, condition: "rain", icon: CloudRain, humidity: 96, wind: 4 },
  { time: "6 AM", temp: 26, condition: "rain", icon: CloudRain, humidity: 94, wind: 5 },
  { time: "7 AM", temp: 27, condition: "cloudy", icon: Cloud, humidity: 92, wind: 3 },
  { time: "8 AM", temp: 29, condition: "clear", icon: Sun, humidity: 88, wind: 2 },
  { time: "9 AM", temp: 31, condition: "clear", icon: Sun, humidity: 84, wind: 3 },
  { time: "10 AM", temp: 33, condition: "clear", icon: Sun, humidity: 78, wind: 4 },
  { time: "11 AM", temp: 34, condition: "clear", icon: Sun, humidity: 72, wind: 5 },
]

interface HourlyOverviewProps {
  viewMode: "chart" | "list"
}

export default function HourlyOverview({ viewMode }: HourlyOverviewProps) {
  if (viewMode === "list") {
    return (
      <div className="space-y-2">
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
            const IconComponent = hour.icon
            return (
              <div
                key={index}
                className="grid grid-cols-12 gap-4 items-center py-3 px-4 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="col-span-2 text-sm font-medium">{hour.time}</div>
                <div className="col-span-2 flex items-center gap-2">
                  <IconComponent className="w-4 h-4 text-primary" />
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
    )
  }

  return (
    <div className="space-y-6">
      {/* Hourly Icons Row */}
      <div className="flex justify-between items-center px-4">
        {hourlyData.slice(0, 12).map((hour, index) => {
          const IconComponent = hour.icon
          return (
            <div key={index} className="flex flex-col items-center space-y-2 min-w-0 border p-4 rounded-lg">
              <span className="text-xs text-muted-foreground">{hour.time}</span>
              <IconComponent className="w-6 h-6 text-primary" />
              <span className="text-sm font-semibold">{hour.temp}°</span>
            </div>
          )
        })}
      </div>

      {/* Temperature Chart */}
      <Card className="p-4 bg-gradient-to-br from-primary/5 to-chart-1/5 border-primary/20">
        <ChartContainer
          config={{
            temp: {
              label: "Temperature",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-64"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hourlyData}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1} />
                </linearGradient>
              </defs>
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
                domain={["dataMin - 2", "dataMax + 2"]}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1 }}
              />
              <Area
                type="monotone"
                dataKey="temp"
                stroke="hsl(var(--chart-1))"
                strokeWidth={3}
                fill="url(#tempGradient)"
                dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--chart-1))", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Card>

      {/* Additional Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-chart-2/10 to-chart-2/5 border-chart-2/20">
          <div className="flex items-center gap-2 mb-2">
            <Wind className="w-4 h-4 text-chart-2" />
            <span className="text-sm font-medium">Wind</span>
          </div>
          <div className="text-2xl font-bold text-chart-2">2 km/h</div>
          <div className="text-xs text-muted-foreground">Light air</div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-chart-3/10 to-chart-3/5 border-chart-3/20">
          <div className="flex items-center gap-2 mb-2">
            <Cloud className="w-4 h-4 text-chart-3" />
            <span className="text-sm font-medium">Humidity</span>
          </div>
          <div className="text-2xl font-bold text-chart-3">89%</div>
          <div className="text-xs text-muted-foreground">High</div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-chart-4/10 to-chart-4/5 border-chart-4/20">
          <div className="flex items-center gap-2 mb-2">
            <Sun className="w-4 h-4 text-chart-4" />
            <span className="text-sm font-medium">UV Index</span>
          </div>
          <div className="text-2xl font-bold text-chart-4">0</div>
          <div className="text-xs text-muted-foreground">Low</div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-chart-5/10 to-chart-5/5 border-chart-5/20">
          <div className="flex items-center gap-2 mb-2">
            <CloudRain className="w-4 h-4 text-chart-5" />
            <span className="text-sm font-medium">Precipitation</span>
          </div>
          <div className="text-2xl font-bold text-chart-5">0%</div>
          <div className="text-xs text-muted-foreground">No rain</div>
        </Card>
      </div>
    </div>
  )
}

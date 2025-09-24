"use client"

import { XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card } from "@/components/ui/card"
import { Wind, Navigation, Gauge } from "lucide-react"

const windData = [
  { time: "12 AM", speed: 2, direction: 45, gust: 4, directionText: "NE" },
  { time: "1 AM", speed: 3, direction: 60, gust: 5, directionText: "ENE" },
  { time: "2 AM", speed: 2, direction: 30, gust: 3, directionText: "NNE" },
  { time: "3 AM", speed: 1, direction: 15, gust: 2, directionText: "NNE" },
  { time: "4 AM", speed: 2, direction: 90, gust: 4, directionText: "E" },
  { time: "5 AM", speed: 4, direction: 120, gust: 7, directionText: "ESE" },
  { time: "6 AM", speed: 5, direction: 135, gust: 8, directionText: "SE" },
  { time: "7 AM", speed: 3, direction: 105, gust: 6, directionText: "ESE" },
  { time: "8 AM", speed: 2, direction: 75, gust: 4, directionText: "ENE" },
  { time: "9 AM", speed: 3, direction: 90, gust: 5, directionText: "E" },
  { time: "10 AM", speed: 4, direction: 110, gust: 7, directionText: "ESE" },
  { time: "11 AM", speed: 5, direction: 125, gust: 9, directionText: "SE" },
]

interface WindTabProps {
  viewMode: "chart" | "list"
}

const WindDirectionIndicator = ({ direction, size = 24 }: { direction: number; size?: number }) => (
  <div className="relative flex items-center justify-center">
    <Navigation
      className={`text-chart-1 transition-transform duration-300`}
      size={size}
      style={{ transform: `rotate(${direction}deg)` }}
    />
  </div>
)

export default function WindTab({ viewMode }: WindTabProps) {
  if (viewMode === "list") {
    return (
      <div className="space-y-2">
        <div className="grid grid-cols-12 gap-4 text-xs font-medium text-muted-foreground mb-4 px-4">
          <div className="col-span-2">Time</div>
          <div className="col-span-2">Speed</div>
          <div className="col-span-2">Direction</div>
          <div className="col-span-2">Compass</div>
          <div className="col-span-2">Gusts</div>
          <div className="col-span-2">Intensity</div>
        </div>
        <div className="max-h-96 overflow-y-auto space-y-1">
          {windData.map((hour, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 items-center py-3 px-4 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className="col-span-2 text-sm font-medium">{hour.time}</div>
              <div className="col-span-2 flex items-center gap-2">
                <Wind className="w-4 h-4 text-chart-1" />
                <span className="text-sm">{hour.speed} km/h</span>
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <WindDirectionIndicator direction={hour.direction} size={16} />
                <span className="text-sm">{hour.direction}°</span>
              </div>
              <div className="col-span-2 text-sm font-medium">{hour.directionText}</div>
              <div className="col-span-2 text-sm">{hour.gust} km/h</div>
              <div className="col-span-2">
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-chart-1 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(hour.speed * 10, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Wind Speed Chart */}
      <Card className="p-4 bg-gradient-to-br from-chart-1/5 to-chart-1/10 border-chart-1/20">
        <div className="flex items-center gap-2 mb-4">
          <Wind className="w-5 h-5 text-chart-1" />
          <h3 className="text-lg font-semibold">Wind Speed & Gusts</h3>
        </div>
        <ChartContainer
          config={{
            speed: {
              label: "Wind Speed (km/h)",
              color: "hsl(var(--chart-1))",
            },
            gust: {
              label: "Wind Gusts (km/h)",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-64"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={windData}>
              <defs>
                <linearGradient id="speedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="gustGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.1} />
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
                label={{ value: "km/h", angle: -90, position: "insideLeft" }}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1 }}
              />
              <Area
                type="monotone"
                dataKey="gust"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                fill="url(#gustGradient)"
                strokeDasharray="5,5"
              />
              <Area
                type="monotone"
                dataKey="speed"
                stroke="hsl(var(--chart-1))"
                strokeWidth={3}
                fill="url(#speedGradient)"
                dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--chart-1))", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Card>

      {/* Wind Direction Compass */}
      <Card className="p-6 bg-gradient-to-br from-chart-3/5 to-chart-3/10 border-chart-3/20">
        <div className="flex items-center gap-2 mb-6">
          <Navigation className="w-5 h-5 text-chart-3" />
          <h3 className="text-lg font-semibold">Wind Direction</h3>
        </div>

        <div className="flex justify-center mb-6">
          <div className="relative w-48 h-48 rounded-full border-4 border-chart-3/20 bg-gradient-to-br from-chart-3/10 to-transparent">
            {/* Compass directions */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute top-2 text-xs font-bold text-chart-3">N</div>
              <div className="absolute right-2 text-xs font-bold text-chart-3">E</div>
              <div className="absolute bottom-2 text-xs font-bold text-chart-3">S</div>
              <div className="absolute left-2 text-xs font-bold text-chart-3">W</div>
            </div>

            {/* Current wind direction */}
            <div className="absolute inset-0 flex items-center justify-center">
              <WindDirectionIndicator direction={windData[0].direction} size={32} />
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-chart-3 mb-1">{windData[0].directionText}</div>
          <div className="text-sm text-muted-foreground">
            {windData[0].direction}° at {windData[0].speed} km/h
          </div>
        </div>
      </Card>

      {/* Wind Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-chart-1/10 to-chart-1/5 border-chart-1/20">
          <div className="flex items-center gap-2 mb-2">
            <Wind className="w-4 h-4 text-chart-1" />
            <span className="text-sm font-medium">Average Speed</span>
          </div>
          <div className="text-2xl font-bold text-chart-1">3.2 km/h</div>
          <div className="text-xs text-muted-foreground">Light breeze</div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-chart-2/10 to-chart-2/5 border-chart-2/20">
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="w-4 h-4 text-chart-2" />
            <span className="text-sm font-medium">Max Gust</span>
          </div>
          <div className="text-2xl font-bold text-chart-2">9 km/h</div>
          <div className="text-xs text-muted-foreground">At 11 AM</div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-chart-3/10 to-chart-3/5 border-chart-3/20">
          <div className="flex items-center gap-2 mb-2">
            <Navigation className="w-4 h-4 text-chart-3" />
            <span className="text-sm font-medium">Dominant Direction</span>
          </div>
          <div className="text-2xl font-bold text-chart-3">ESE</div>
          <div className="text-xs text-muted-foreground">East-Southeast</div>
        </Card>
      </div>
    </div>
  )
}

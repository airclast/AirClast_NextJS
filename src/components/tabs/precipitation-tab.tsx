"use client"

import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Line, LineChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card } from "@/components/ui/card"
import { CloudRain, Droplets, Cloud } from "lucide-react"

const precipitationData = [
  { time: "12 AM", precipitation: 0, probability: 5, type: "none" },
  { time: "1 AM", precipitation: 0, probability: 8, type: "none" },
  { time: "2 AM", precipitation: 0.2, probability: 15, type: "light" },
  { time: "3 AM", precipitation: 0.5, probability: 25, type: "light" },
  { time: "4 AM", precipitation: 1.2, probability: 45, type: "moderate" },
  { time: "5 AM", precipitation: 2.1, probability: 65, type: "moderate" },
  { time: "6 AM", precipitation: 1.8, probability: 55, type: "moderate" },
  { time: "7 AM", precipitation: 0.8, probability: 35, type: "light" },
  { time: "8 AM", precipitation: 0.3, probability: 20, type: "light" },
  { time: "9 AM", precipitation: 0, probability: 10, type: "none" },
  { time: "10 AM", precipitation: 0, probability: 5, type: "none" },
  { time: "11 AM", precipitation: 0, probability: 3, type: "none" },
]

interface PrecipitationTabProps {
  viewMode: "chart" | "list"
}

export default function PrecipitationTab({ viewMode }: PrecipitationTabProps) {
  if (viewMode === "list") {
    return (
      <div className="space-y-2">
        <div className="grid grid-cols-12 gap-4 text-xs font-medium text-muted-foreground mb-4 px-4">
          <div className="col-span-2">Time</div>
          <div className="col-span-3">Precipitation</div>
          <div className="col-span-3">Probability</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Intensity</div>
        </div>
        <div className="max-h-96 overflow-y-auto space-y-1">
          {precipitationData.map((hour, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 items-center py-3 px-4 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className="col-span-2 text-sm font-medium">{hour.time}</div>
              <div className="col-span-3 flex items-center gap-2">
                <Droplets className="w-4 h-4 text-chart-2" />
                <span className="text-sm">{hour.precipitation} mm</span>
              </div>
              <div className="col-span-3 text-sm">{hour.probability}%</div>
              <div className="col-span-2 text-sm capitalize">{hour.type}</div>
              <div className="col-span-2">
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-chart-2 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(hour.precipitation * 20, 100)}%` }}
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
      {/* Precipitation Bar Chart */}
      <Card className="p-4 bg-gradient-to-br from-chart-2/5 to-chart-2/10 border-chart-2/20">
        <div className="flex items-center gap-2 mb-4">
          <CloudRain className="w-5 h-5 text-chart-2" />
          <h3 className="text-lg font-semibold">Precipitation Amount</h3>
        </div>
        <ChartContainer
          config={{
            precipitation: {
              label: "Precipitation (mm)",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-64"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={precipitationData}>
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
                label={{ value: "mm", angle: -90, position: "insideLeft" }}
              />
              <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: "hsl(var(--chart-2))", opacity: 0.1 }} />
              <Bar dataKey="precipitation" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Card>

      {/* Probability Line Chart */}
      <Card className="p-4 bg-gradient-to-br from-chart-3/5 to-chart-3/10 border-chart-3/20">
        <div className="flex items-center gap-2 mb-4">
          <Cloud className="w-5 h-5 text-chart-3" />
          <h3 className="text-lg font-semibold">Precipitation Probability</h3>
        </div>
        <ChartContainer
          config={{
            probability: {
              label: "Probability (%)",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-64"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={precipitationData}>
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
                domain={[0, 100]}
                label={{ value: "%", angle: -90, position: "insideLeft" }}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={{ stroke: "hsl(var(--chart-3))", strokeWidth: 1 }}
              />
              <Line
                type="monotone"
                dataKey="probability"
                stroke="hsl(var(--chart-3))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-3))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--chart-3))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-chart-2/10 to-chart-2/5 border-chart-2/20">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="w-4 h-4 text-chart-2" />
            <span className="text-sm font-medium">Total Expected</span>
          </div>
          <div className="text-2xl font-bold text-chart-2">6.9 mm</div>
          <div className="text-xs text-muted-foreground">Next 12 hours</div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-chart-3/10 to-chart-3/5 border-chart-3/20">
          <div className="flex items-center gap-2 mb-2">
            <Cloud className="w-4 h-4 text-chart-3" />
            <span className="text-sm font-medium">Peak Probability</span>
          </div>
          <div className="text-2xl font-bold text-chart-3">65%</div>
          <div className="text-xs text-muted-foreground">At 5 AM</div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-chart-4/10 to-chart-4/5 border-chart-4/20">
          <div className="flex items-center gap-2 mb-2">
            <CloudRain className="w-4 h-4 text-chart-4" />
            <span className="text-sm font-medium">Rain Duration</span>
          </div>
          <div className="text-2xl font-bold text-chart-4">6 hrs</div>
          <div className="text-xs text-muted-foreground">2 AM - 8 AM</div>
        </Card>
      </div>
    </div>
  )
}

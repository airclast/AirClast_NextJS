"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

interface FeelsLikeTabProps {
  viewMode: "chart" | "list"
}

const feelsLikeData = [
  { time: "12 AM", actual: 28, feelsLike: 32, difference: 4 },
  { time: "1 AM", actual: 27, feelsLike: 31, difference: 4 },
  { time: "2 AM", actual: 26, feelsLike: 29, difference: 3 },
  { time: "3 AM", actual: 25, feelsLike: 28, difference: 3 },
  { time: "4 AM", actual: 24, feelsLike: 27, difference: 3 },
  { time: "5 AM", actual: 24, feelsLike: 26, difference: 2 },
  { time: "6 AM", actual: 25, feelsLike: 28, difference: 3 },
  { time: "7 AM", actual: 27, feelsLike: 31, difference: 4 },
  { time: "8 AM", actual: 29, feelsLike: 34, difference: 5 },
  { time: "9 AM", actual: 31, feelsLike: 37, difference: 6 },
  { time: "10 AM", actual: 33, feelsLike: 39, difference: 6 },
  { time: "11 AM", actual: 35, feelsLike: 42, difference: 7 },
]

export default function FeelsLikeTab({ viewMode }: FeelsLikeTabProps) {
  if (viewMode === "list") {
    return (
      <div className="space-y-2">
        {feelsLikeData.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <span className="text-sm text-muted-foreground">{item.time}</span>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-medium">{item.feelsLike}°C</div>
                <div className="text-xs text-muted-foreground">Feels like</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">{item.actual}°C</div>
                <div className="text-xs text-muted-foreground">Actual</div>
              </div>
              <div
                className={`text-xs px-2 py-1 rounded-full ${
                  item.difference > 5
                    ? "bg-red-500/20 text-red-400"
                    : item.difference > 3
                      ? "bg-orange-500/20 text-orange-400"
                      : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                +{item.difference}°
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <Card className="bg-secondary/20 border-border/50 p-4">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={feelsLikeData}>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value: any, name: string) => [
                `${value}°C`,
                name === "feelsLike" ? "Feels Like" : "Actual Temp",
              ]}
            />
            <Line
              type="monotone"
              dataKey="feelsLike"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              name="feelsLike"
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: "hsl(var(--muted-foreground))", strokeWidth: 2, r: 4 }}
              name="actual"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

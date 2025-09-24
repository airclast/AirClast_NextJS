"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

interface PressureTabProps {
  viewMode: "chart" | "list"
}

const pressureData = [
  { time: "12 AM", pressure: 1013, trend: "stable" },
  { time: "1 AM", pressure: 1012, trend: "falling" },
  { time: "2 AM", pressure: 1011, trend: "falling" },
  { time: "3 AM", pressure: 1010, trend: "falling" },
  { time: "4 AM", pressure: 1009, trend: "falling" },
  { time: "5 AM", pressure: 1008, trend: "falling" },
  { time: "6 AM", pressure: 1007, trend: "stable" },
  { time: "7 AM", pressure: 1008, trend: "rising" },
  { time: "8 AM", pressure: 1009, trend: "rising" },
  { time: "9 AM", pressure: 1011, trend: "rising" },
  { time: "10 AM", pressure: 1013, trend: "rising" },
  { time: "11 AM", pressure: 1015, trend: "rising" },
]

export default function PressureTab({ viewMode }: PressureTabProps) {
  if (viewMode === "list") {
    return (
      <div className="space-y-2">
        {pressureData.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <span className="text-sm text-muted-foreground">{item.time}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{item.pressure} mb</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  item.trend === "rising"
                    ? "bg-green-500/20 text-green-400"
                    : item.trend === "falling"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-gray-500/20 text-gray-400"
                }`}
              >
                {item.trend}
              </span>
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
          <LineChart data={pressureData}>
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
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value: any) => [`${value} mb`, "Pressure"]}
            />
            <Line
              type="monotone"
              dataKey="pressure"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

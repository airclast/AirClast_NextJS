"use client"

import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

interface VisibilityTabProps {
  viewMode: "chart" | "list"
}

const visibilityData = [
  { time: "12 AM", visibility: 8.5, condition: "Good" },
  { time: "1 AM", visibility: 7.2, condition: "Good" },
  { time: "2 AM", visibility: 6.8, condition: "Moderate" },
  { time: "3 AM", visibility: 5.5, condition: "Moderate" },
  { time: "4 AM", visibility: 4.2, condition: "Poor" },
  { time: "5 AM", visibility: 3.8, condition: "Poor" },
  { time: "6 AM", visibility: 4.5, condition: "Poor" },
  { time: "7 AM", visibility: 6.2, condition: "Moderate" },
  { time: "8 AM", visibility: 8.1, condition: "Good" },
  { time: "9 AM", visibility: 9.5, condition: "Excellent" },
  { time: "10 AM", visibility: 10.0, condition: "Excellent" },
  { time: "11 AM", visibility: 9.8, condition: "Excellent" },
]

const getVisibilityColor = (visibility: number) => {
  if (visibility >= 9) return "text-green-400"
  if (visibility >= 6) return "text-yellow-400"
  if (visibility >= 3) return "text-orange-400"
  return "text-red-400"
}

const getVisibilityBgColor = (visibility: number) => {
  if (visibility >= 9) return "bg-green-500/20"
  if (visibility >= 6) return "bg-yellow-500/20"
  if (visibility >= 3) return "bg-orange-500/20"
  return "bg-red-500/20"
}

export default function VisibilityTab({ viewMode }: VisibilityTabProps) {
  if (viewMode === "list") {
    return (
      <div className="space-y-2">
        {visibilityData.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <span className="text-sm text-muted-foreground">{item.time}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{item.visibility} km</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${getVisibilityBgColor(item.visibility)} ${getVisibilityColor(item.visibility)}`}
              >
                {item.condition}
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
          <BarChart data={visibilityData}>
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
              formatter={(value: any, name: any, props: any) => [
                `${value} km`,
                `${props.payload.condition} Visibility`,
              ]}
            />
            <Bar dataKey="visibility" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

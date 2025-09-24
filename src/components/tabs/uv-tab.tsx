"use client"

import { Card } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

interface UVTabProps {
  viewMode: "chart" | "list"
}

const uvData = [
  { time: "12 AM", uv: 0, level: "Low" },
  { time: "1 AM", uv: 0, level: "Low" },
  { time: "2 AM", uv: 0, level: "Low" },
  { time: "3 AM", uv: 0, level: "Low" },
  { time: "4 AM", uv: 0, level: "Low" },
  { time: "5 AM", uv: 0, level: "Low" },
  { time: "6 AM", uv: 1, level: "Low" },
  { time: "7 AM", uv: 2, level: "Low" },
  { time: "8 AM", uv: 4, level: "Moderate" },
  { time: "9 AM", uv: 6, level: "High" },
  { time: "10 AM", uv: 8, level: "High" },
  { time: "11 AM", uv: 9, level: "Very High" },
]

const getUVColor = (uv: number) => {
  if (uv <= 2) return "text-green-400"
  if (uv <= 5) return "text-yellow-400"
  if (uv <= 7) return "text-orange-400"
  if (uv <= 10) return "text-red-400"
  return "text-purple-400"
}

const getUVBgColor = (uv: number) => {
  if (uv <= 2) return "bg-green-500/20"
  if (uv <= 5) return "bg-yellow-500/20"
  if (uv <= 7) return "bg-orange-500/20"
  if (uv <= 10) return "bg-red-500/20"
  return "bg-purple-500/20"
}

export default function UVTab({ viewMode }: UVTabProps) {
  if (viewMode === "list") {
    return (
      <div className="space-y-2">
        {uvData.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <span className="text-sm text-muted-foreground">{item.time}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{item.uv}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${getUVBgColor(item.uv)} ${getUVColor(item.uv)}`}>
                {item.level}
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
          <AreaChart data={uvData}>
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
              formatter={(value: any, name: any, props: any) => [`${value} UV Index`, `${props.payload.level} Risk`]}
            />
            <Area type="monotone" dataKey="uv" stroke="hsl(var(--primary))" fill="url(#uvGradient)" strokeWidth={2} />
            <defs>
              <linearGradient id="uvGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

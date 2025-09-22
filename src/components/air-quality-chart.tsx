"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { AirQualityMeasurement } from "@/lib/types"
import { formatTimestamp } from "@/lib/utils"

interface AirQualityChartProps {
  data: AirQualityMeasurement[]
}

export function AirQualityChart({ data }: AirQualityChartProps) {
  const chartData = data
    .slice()
    .reverse()
    .map((measurement) => ({
      time: formatTimestamp(measurement.timestamp),
      aqi: measurement.aqi,
      pm25: measurement.pm25,
      pm10: measurement.pm10,
      o3: measurement.o3,
    }))

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="time" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              color: "hsl(var(--card-foreground))",
            }}
          />
          <Line type="monotone" dataKey="aqi" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} name="AQI" />
          <Line type="monotone" dataKey="pm25" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} name="PM2.5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

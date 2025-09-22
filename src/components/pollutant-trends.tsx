"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import type { AirQualityMeasurement } from "@/lib/types"
import { formatTimestamp } from "@/lib/utils"
import { BarChart3 } from "lucide-react"

interface PollutantTrendsProps {
  data: AirQualityMeasurement[]
}

export function PollutantTrends({ data }: PollutantTrendsProps) {
  const chartData = data
    .slice()
    .reverse()
    .map((measurement) => ({
      time: formatTimestamp(measurement.timestamp),
      PM25: measurement.pm25,
      PM10: measurement.pm10,
      O3: measurement.o3,
      NO2: measurement.no2,
    }))

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-card-foreground">
          <BarChart3 className="w-5 h-5" />
          <span>Pollutant Trends</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">24-hour pollutant concentration trends</p>
      </CardHeader>
      <CardContent>
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
              <Legend />
              <Line
                type="monotone"
                dataKey="PM25"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={false}
                name="PM2.5 (μg/m³)"
              />
              <Line
                type="monotone"
                dataKey="PM10"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                dot={false}
                name="PM10 (μg/m³)"
              />
              <Line
                type="monotone"
                dataKey="O3"
                stroke="hsl(var(--chart-3))"
                strokeWidth={2}
                dot={false}
                name="O₃ (μg/m³)"
              />
              <Line
                type="monotone"
                dataKey="NO2"
                stroke="hsl(var(--chart-4))"
                strokeWidth={2}
                dot={false}
                name="NO₂ (μg/m³)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

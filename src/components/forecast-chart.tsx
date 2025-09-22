"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import type { AirQualityForecast, AirQualityMeasurement } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { TrendingUp } from "lucide-react"

interface ForecastChartProps {
  forecasts: AirQualityForecast[]
  historicalData: AirQualityMeasurement[]
}

export function ForecastChart({ forecasts, historicalData }: ForecastChartProps) {
  // Combine historical and forecast data
  const chartData = [
    ...historicalData.slice(-7).map((item) => ({
      date: formatDate(item.timestamp),
      aqi: item.aqi,
      type: "historical",
      confidence: 1,
    })),
    ...forecasts.map((forecast) => ({
      date: formatDate(forecast.forecastDate),
      aqi: forecast.predictedAqi,
      type: "forecast",
      confidence: forecast.confidenceScore,
    })),
  ]

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-card-foreground">
          <TrendingUp className="w-5 h-5" />
          <span>Air Quality Forecast</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">72-hour prediction with confidence intervals</p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--card-foreground))",
                }}
                formatter={(value: any, name: string, props: any) => [
                  `${value} AQI`,
                  props.payload.type === "forecast"
                    ? `Forecast (${(props.payload.confidence * 100).toFixed(0)}% confidence)`
                    : "Historical",
                ]}
              />
              <ReferenceLine x={formatDate(new Date())} stroke="hsl(var(--muted-foreground))" strokeDasharray="2 2" />
              <Line
                type="monotone"
                dataKey="aqi"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={(props: any) => {
                  const { cx, cy, payload } = props
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={4}
                      fill={payload.type === "forecast" ? "hsl(var(--chart-2))" : "hsl(var(--chart-1))"}
                      stroke={payload.type === "forecast" ? "hsl(var(--chart-2))" : "hsl(var(--chart-1))"}
                      strokeWidth={2}
                    />
                  )
                }}
                name="AQI"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Forecast Summary */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          {forecasts.map((forecast, index) => (
            <div key={forecast.id} className="text-center p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">{formatDate(forecast.forecastDate)}</div>
              <div className="text-lg font-semibold text-card-foreground">{forecast.predictedAqi}</div>
              <div className="text-xs text-muted-foreground">
                {(forecast.confidenceScore * 100).toFixed(0)}% confidence
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

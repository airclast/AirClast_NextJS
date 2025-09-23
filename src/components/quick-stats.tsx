import { Card, CardContent } from "@/components/ui/card"
import type { AirQualityMeasurement } from "@/lib/types"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface QuickStatsProps {
  measurement: AirQualityMeasurement
}

export function QuickStats({ measurement }: QuickStatsProps) {
  const stats = [
    {
      label: "PM2.5",
      value: measurement.pm25.toFixed(1),
      unit: "μg/m³",
      trend: "stable",
      change: "+2.1%",
    },
    {
      label: "PM10",
      value: measurement.pm10.toFixed(1),
      unit: "μg/m³",
      trend: "down",
      change: "-5.3%",
    },
    {
      label: "Ozone",
      value: measurement.o3.toFixed(1),
      unit: "μg/m³",
      trend: "up",
      change: "+8.7%",
    },
    {
      label: "NO₂",
      value: measurement.no2.toFixed(1),
      unit: "μg/m³",
      trend: "stable",
      change: "-0.5%",
    },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-red-500" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-green-500" />
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />
    }
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              {getTrendIcon(stat.trend)}
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{stat.unit}</span>
                <span
                  className={`text-xs ${
                    stat.trend === "up"
                      ? "text-red-500"
                      : stat.trend === "down"
                        ? "text-green-500"
                        : "text-muted-foreground"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

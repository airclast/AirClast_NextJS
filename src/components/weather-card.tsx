import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { WeatherData } from "@/lib/types"
import { Droplets, Wind, Eye, Gauge, Sun } from "lucide-react"

interface WeatherCardProps {
  weather: WeatherData
}

export function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <Card className="bg-card h-full">
      <CardHeader>
        <CardTitle className="text-card-foreground">Current Weather</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Temperature */}
        <div className="text-center">
          <div className="text-4xl font-bold text-card-foreground mb-1">{Math.round(weather.temperature)}°C</div>
          <p className="text-sm text-muted-foreground">Feels like {Math.round(weather.temperature + 2)}°C</p>
        </div>

        {/* Weather Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Droplets className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Humidity</span>
            </div>
            <span className="text-sm font-medium">{Math.round(weather.humidity)}%</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wind className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Wind</span>
            </div>
            <span className="text-sm font-medium">{weather.windSpeed.toFixed(1)} m/s</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Gauge className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Pressure</span>
            </div>
            <span className="text-sm font-medium">{Math.round(weather.pressure)} hPa</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Visibility</span>
            </div>
            <span className="text-sm font-medium">{weather.visibility.toFixed(1)} km</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sun className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">UV Index</span>
            </div>
            <span className="text-sm font-medium">{weather.uvIndex}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

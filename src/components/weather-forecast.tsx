import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { WeatherData } from "@/lib/types"
import { Cloud, Sun, CloudRain, Wind } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface WeatherForecastProps {
  weatherData: WeatherData[]
}

export function WeatherForecast({ weatherData }: WeatherForecastProps) {
  const getWeatherIcon = (temp: number, humidity: number) => {
    if (humidity > 80) return <CloudRain className="w-6 h-6 text-blue-500" />
    if (humidity > 60) return <Cloud className="w-6 h-6 text-gray-500" />
    return <Sun className="w-6 h-6 text-yellow-500" />
  }

  return (
    <Card className="bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-card-foreground">
          <Wind className="w-5 h-5" />
          <span>Weather Forecast</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {weatherData.slice(0, 3).map((weather, index) => (
          <div key={weather.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              {getWeatherIcon(weather.temperature, weather.humidity)}
              <div>
                <div className="font-medium text-card-foreground">
                  {index === 0 ? "Today" : formatDate(weather.timestamp)}
                </div>
                <div className="text-sm text-muted-foreground">{Math.round(weather.humidity)}% humidity</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-card-foreground">{Math.round(weather.temperature)}°C</div>
              <div className="text-sm text-muted-foreground">{weather.windSpeed.toFixed(1)} m/s</div>
            </div>
          </div>
        ))}

        {/* Weather Impact on Air Quality */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-medium text-card-foreground mb-2">Weather Impact</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Wind Dispersion</span>
              <span className="text-card-foreground font-medium">Good</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Atmospheric Stability</span>
              <span className="text-card-foreground font-medium">Moderate</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Precipitation Effect</span>
              <span className="text-card-foreground font-medium">Low</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

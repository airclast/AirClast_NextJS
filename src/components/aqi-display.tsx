import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAQIInfo } from "@/lib/utils"
import type { AirQualityMeasurement, UserLocation } from "@/lib/types"
import { MapPin, Clock } from "lucide-react"

interface AQIDisplayProps {
  measurement: AirQualityMeasurement
  location?: UserLocation
}

export function AQIDisplay({ measurement, location }: AQIDisplayProps) {
  const aqiInfo = getAQIInfo(measurement.aqi)

  return (
    <Card className="">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-card-foreground">Current Air Quality</CardTitle>
          <Badge variant="outline" className="text-xs">
            <Clock className="w-3 h-3 mr-1" />
            Live
          </Badge>
        </div>
        {location && (
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1" />
            {location.name}
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main AQI Display */}
        <div className="text-center">
          <div className="text-6xl font-bold text-card-foreground mb-2">{aqiInfo?.value}</div>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${aqiInfo.color}`}>
            {aqiInfo?.category}
          </div>
          <p className="text-muted-foreground mt-2 text-sm">{aqiInfo?.description}</p>
        </div>

        {/* Pollutant Breakdown */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">PM2.5</span>
              <span className="text-sm font-medium">{measurement.pm25.toFixed(1)} μg/m³</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">PM10</span>
              <span className="text-sm font-medium">{measurement.pm10.toFixed(1)} μg/m³</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">O₃</span>
              <span className="text-sm font-medium">{measurement.o3.toFixed(1)} μg/m³</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">NO₂</span>
              <span className="text-sm font-medium">{measurement.no2.toFixed(1)} μg/m³</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">CO</span>
              <span className="text-sm font-medium">{measurement.co.toFixed(1)} mg/m³</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">SO₂</span>
              <span className="text-sm font-medium">{measurement.so2.toFixed(1)} μg/m³</span>
            </div>
          </div>
        </div>

        {/* Health Advice */}
        <div className="bg-muted rounded-lg p-4">
          <h4 className="font-medium text-card-foreground mb-2">Health Advice</h4>
          <p className="text-sm text-muted-foreground">{aqiInfo.healthAdvice}</p>
        </div>
      </CardContent>
    </Card>
  )
}

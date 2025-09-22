import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { GroundStation, AirQualityMeasurement } from "@/lib/types"
import { Radio, MapPin, Activity } from "lucide-react"
import { getAQIInfo } from "@/lib/utils"

interface GroundStationsCardProps {
  stations: GroundStation[]
  measurements: AirQualityMeasurement[]
}

export function GroundStationsCard({ stations, measurements }: GroundStationsCardProps) {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-card-foreground">
          <Radio className="w-5 h-5" />
          <span>Ground Stations</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stations.map((station, index) => {
          const measurement = measurements[index]
          const aqiInfo = measurement ? getAQIInfo(measurement.aqi) : null

          return (
            <div key={station.id} className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${station.isActive ? "bg-green-500" : "bg-red-500"}`} />
                  <span className="font-medium text-card-foreground">{station.name}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {station.stationType}
                </Badge>
              </div>

              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-1" />
                {station.latitude.toFixed(4)}°N, {Math.abs(station.longitude).toFixed(4)}°W
              </div>

              {measurement && aqiInfo && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Current AQI</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-card-foreground">{aqiInfo?.value}</span>
                    <Badge className={`text-xs ${aqiInfo.color}`}>{aqiInfo?.category}</Badge>
                  </div>
                </div>
              )}

              {measurement && (
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <div className="font-medium text-card-foreground">{measurement.pm25.toFixed(1)}</div>
                    <div className="text-muted-foreground">PM2.5</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-card-foreground">{measurement.pm10.toFixed(1)}</div>
                    <div className="text-muted-foreground">PM10</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-card-foreground">{measurement.o3.toFixed(1)}</div>
                    <div className="text-muted-foreground">O₃</div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

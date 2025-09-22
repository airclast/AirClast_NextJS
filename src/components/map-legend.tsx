import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info, MapPin, Satellite, Home } from "lucide-react"

export function MapLegend() {
  const aqiLevels = [
    { range: "0-50", label: "Good", color: "bg-green-500" },
    { range: "51-100", label: "Moderate", color: "bg-yellow-500" },
    { range: "101-150", label: "Unhealthy for Sensitive", color: "bg-orange-500" },
    { range: "151-200", label: "Unhealthy", color: "bg-red-500" },
    { range: "201-300", label: "Very Unhealthy", color: "bg-purple-500" },
    { range: "301+", label: "Hazardous", color: "bg-red-800" },
  ]

  const tempoQuality = [
    { label: "Good", color: "bg-green-400" },
    { label: "Moderate", color: "bg-yellow-400" },
    { label: "Poor", color: "bg-orange-400" },
    { label: "Invalid", color: "bg-red-400" },
  ]

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-card-foreground">
          <Info className="w-5 h-5" />
          <span>Legend</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* AQI Scale */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-card-foreground">Air Quality Index</h4>
          <div className="space-y-2">
            {aqiLevels.map((level) => (
              <div key={level.range} className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded-full ${level.color}`} />
                <div className="flex-1 text-xs">
                  <span className="font-medium text-card-foreground">{level.range}</span>
                  <span className="text-muted-foreground ml-2">{level.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TEMPO Data Quality */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-card-foreground">TEMPO Data Quality</h4>
          <div className="space-y-2">
            {tempoQuality.map((quality) => (
              <div key={quality.label} className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded-full ${quality.color}`} />
                <span className="text-xs text-card-foreground">{quality.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Map Markers */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-card-foreground">Map Markers</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Home className="w-3 h-3 text-primary-foreground" />
              </div>
              <span className="text-xs text-card-foreground">Your Locations</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <MapPin className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs text-card-foreground">Ground Stations</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <Satellite className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs text-card-foreground">TEMPO Satellite Data</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

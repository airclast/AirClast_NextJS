import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { TempoData } from "@/lib/types"
import { Satellite, Clock, MapPin } from "lucide-react"
import { formatTimestamp } from "@/lib/utils"

interface TempoDataCardProps {
  data: TempoData[]
}

export function TempoDataCard({ data }: TempoDataCardProps) {
  const latestData = data[0]

  const getQualityColor = (flag: string) => {
    switch (flag) {
      case "good":
        return "bg-green-100 text-green-800"
      case "moderate":
        return "bg-yellow-100 text-yellow-800"
      case "poor":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-red-100 text-red-800"
    }
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-card-foreground">
            <Satellite className="w-5 h-5" />
            <span>NASA TEMPO Data</span>
          </CardTitle>
          <Badge className={getQualityColor(latestData.qualityFlag)}>{latestData.qualityFlag}</Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="w-4 h-4 mr-1" />
          {formatTimestamp(latestData.timestamp)}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Location Info */}
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mr-1" />
          {latestData.latitude.toFixed(4)}°N, {Math.abs(latestData.longitude).toFixed(4)}°W
        </div>

        {/* Satellite Measurements */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">NO₂</span>
              <div className="text-right">
                <div className="font-semibold text-card-foreground">{latestData.no2.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">×10¹⁵ molec/cm²</div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">O₃</span>
              <div className="text-right">
                <div className="font-semibold text-card-foreground">{latestData.o3.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">DU</div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">HCHO</span>
              <div className="text-right">
                <div className="font-semibold text-card-foreground">{latestData.formaldehyde.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">×10¹⁶ molec/cm²</div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Cloud Fraction</span>
              <div className="text-right">
                <div className="font-semibold text-card-foreground">{(latestData.cloudFraction * 100).toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">coverage</div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Quality Indicator */}
        <div className="bg-muted rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-card-foreground">Data Quality</span>
            <Badge variant="outline" className="text-xs">
              {data.length} measurements
            </Badge>
          </div>
          <div className="flex space-x-1">
            {data.slice(0, 12).map((item, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-sm ${
                  item.qualityFlag === "good"
                    ? "bg-green-500"
                    : item.qualityFlag === "moderate"
                      ? "bg-yellow-500"
                      : item.qualityFlag === "poor"
                        ? "bg-orange-500"
                        : "bg-red-500"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">Last 12 hours quality indicators</p>
        </div>
      </CardContent>
    </Card>
  )
}

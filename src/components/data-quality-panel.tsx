import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { TempoData } from "@/lib/types"
import { Shield, Database, Satellite, CheckCircle } from "lucide-react"

interface DataQualityPanelProps {
  tempoData: TempoData[]
}

export function DataQualityPanel({ tempoData }: DataQualityPanelProps) {
  const qualityStats = {
    good: tempoData.filter((d) => d.qualityFlag === "good").length,
    moderate: tempoData.filter((d) => d.qualityFlag === "moderate").length,
    poor: tempoData.filter((d) => d.qualityFlag === "poor").length,
    invalid: tempoData.filter((d) => d.qualityFlag === "invalid").length,
  }

  const totalMeasurements = tempoData.length
  const goodPercentage = (qualityStats.good / totalMeasurements) * 100

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-card-foreground">
          <Shield className="w-5 h-5" />
          <span>Data Quality</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">Real-time data validation and quality metrics</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Quality Score */}
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="text-3xl font-bold text-card-foreground mb-1">{goodPercentage.toFixed(0)}%</div>
          <div className="text-sm text-muted-foreground">Data Quality Score</div>
        </div>

        {/* Quality Breakdown */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-muted-foreground">Good Quality</span>
            </div>
            <Badge className="bg-green-100 text-green-800">{qualityStats.good}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-muted-foreground">Moderate Quality</span>
            </div>
            <Badge className="bg-yellow-100 text-yellow-800">{qualityStats.moderate}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-orange-500" />
              <span className="text-sm text-muted-foreground">Poor Quality</span>
            </div>
            <Badge className="bg-orange-100 text-orange-800">{qualityStats.poor}</Badge>
          </div>
        </div>

        {/* Data Sources */}
        <div className="space-y-3">
          <h4 className="font-medium text-card-foreground">Data Sources</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Satellite className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">NASA TEMPO</span>
              </div>
              <Badge variant="outline" className="text-xs">
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Ground Stations</span>
              </div>
              <Badge variant="outline" className="text-xs">
                2 Active
              </Badge>
            </div>
          </div>
        </div>

        {/* Last Validation */}
        <div className="text-xs text-muted-foreground">Last validation: {new Date().toLocaleTimeString()}</div>
      </CardContent>
    </Card>
  )
}

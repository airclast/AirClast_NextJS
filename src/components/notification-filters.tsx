"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Filter, RotateCcw } from "lucide-react"

export function NotificationFilters() {
  const [filters, setFilters] = useState({
    types: {
      "air-quality-alert": true,
      "forecast-update": true,
      "system-maintenance": true,
    },
    severity: {
      low: true,
      moderate: true,
      high: true,
      "very-high": true,
    },
    status: {
      read: true,
      unread: true,
    },
  })

  const resetFilters = () => {
    setFilters({
      types: {
        "air-quality-alert": true,
        "forecast-update": true,
        "system-maintenance": true,
      },
      severity: {
        low: true,
        moderate: true,
        high: true,
        "very-high": true,
      },
      status: {
        read: true,
        unread: true,
      },
    })
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-card-foreground">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Notification Types */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-card-foreground">Type</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="air-quality-alert"
                checked={filters.types["air-quality-alert"]}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    types: { ...filters.types, "air-quality-alert": checked as boolean },
                  })
                }
              />
              <Label htmlFor="air-quality-alert" className="text-sm text-card-foreground">
                Air Quality Alerts
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="forecast-update"
                checked={filters.types["forecast-update"]}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    types: { ...filters.types, "forecast-update": checked as boolean },
                  })
                }
              />
              <Label htmlFor="forecast-update" className="text-sm text-card-foreground">
                Forecast Updates
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="system-maintenance"
                checked={filters.types["system-maintenance"]}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    types: { ...filters.types, "system-maintenance": checked as boolean },
                  })
                }
              />
              <Label htmlFor="system-maintenance" className="text-sm text-card-foreground">
                System Updates
              </Label>
            </div>
          </div>
        </div>

        {/* Severity Levels */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-card-foreground">Severity</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="very-high"
                checked={filters.severity["very-high"]}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    severity: { ...filters.severity, "very-high": checked as boolean },
                  })
                }
              />
              <Label htmlFor="very-high" className="text-sm text-red-600">
                Very High
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="high"
                checked={filters.severity.high}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    severity: { ...filters.severity, high: checked as boolean },
                  })
                }
              />
              <Label htmlFor="high" className="text-sm text-orange-600">
                High
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="moderate"
                checked={filters.severity.moderate}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    severity: { ...filters.severity, moderate: checked as boolean },
                  })
                }
              />
              <Label htmlFor="moderate" className="text-sm text-yellow-600">
                Moderate
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="low"
                checked={filters.severity.low}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    severity: { ...filters.severity, low: checked as boolean },
                  })
                }
              />
              <Label htmlFor="low" className="text-sm text-blue-600">
                Low
              </Label>
            </div>
          </div>
        </div>

        {/* Read Status */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-card-foreground">Status</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="unread"
                checked={filters.status.unread}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    status: { ...filters.status, unread: checked as boolean },
                  })
                }
              />
              <Label htmlFor="unread" className="text-sm text-card-foreground">
                Unread
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="read"
                checked={filters.status.read}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    status: { ...filters.status, read: checked as boolean },
                  })
                }
              />
              <Label htmlFor="read" className="text-sm text-card-foreground">
                Read
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Star, Navigation } from "lucide-react"

export function LocationInfo() {
  const [selectedLocation] = useState({
    name: "Los Angeles Central Station",
    type: "Ground Station",
    coordinates: "34.0522°N, 118.2437°W",
    aqi: 87,
    category: "Moderate",
    lastUpdated: "2 minutes ago",
    measurements: {
      pm25: 23.5,
      pm10: 45.2,
      o3: 78.1,
      no2: 34.7,
    },
    isActive: true,
  })

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-card-foreground">
          <MapPin className="w-5 h-5" />
          <span>Location Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedLocation ? (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-card-foreground">{selectedLocation.name}</h3>
                <Badge variant="outline" className="text-xs">
                  {selectedLocation.type}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{selectedLocation.coordinates}</p>
              <div className="flex items-center space-x-2">
                <Badge
                  className={`${
                    selectedLocation.aqi <= 50
                      ? "bg-green-100 text-green-800"
                      : selectedLocation.aqi <= 100
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-orange-100 text-orange-800"
                  }`}
                >
                  AQI {selectedLocation.aqi} - {selectedLocation.category}
                </Badge>
                {selectedLocation.isActive && (
                  <Badge variant="outline" className="text-xs">
                    Active
                  </Badge>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-card-foreground">Current Measurements</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">PM2.5</span>
                  <span className="font-medium text-card-foreground">{selectedLocation.measurements.pm25} μg/m³</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">PM10</span>
                  <span className="font-medium text-card-foreground">{selectedLocation.measurements.pm10} μg/m³</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">O₃</span>
                  <span className="font-medium text-card-foreground">{selectedLocation.measurements.o3} μg/m³</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">NO₂</span>
                  <span className="font-medium text-card-foreground">{selectedLocation.measurements.no2} μg/m³</span>
                </div>
              </div>
            </div>

            <div className="text-xs text-muted-foreground">Last updated: {selectedLocation.lastUpdated}</div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex items-center space-x-1 bg-transparent">
                <Star className="w-3 h-3" />
                <span>Save</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-1 bg-transparent">
                <Navigation className="w-3 h-3" />
                <span>Navigate</span>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-sm">Click on a location to view details</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

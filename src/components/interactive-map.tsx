"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { GroundStation, AirQualityMeasurement, TempoData, UserLocation } from "@/lib/types"
import { MapPin, Satellite, Home, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import { getAQIInfo } from "@/lib/utils"
import { Header } from "@/components/header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

interface InteractiveMapProps {
  stations: GroundStation[]
  airQualityData: AirQualityMeasurement[]
  tempoData: TempoData[]
  userLocations: UserLocation[]
}

export function InteractiveMap({ stations, airQualityData, tempoData, userLocations }: InteractiveMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [mapLayers, setMapLayers] = useState({
    stations: true,
    tempo: true,
    userLocations: true,
    aqiOverlay: true,
  })
  const [zoomLevel, setZoomLevel] = useState(10)

  const headerHeight = 72 // px
  const sidebarWidth = 256 // px

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return "bg-green-500"
    if (aqi <= 100) return "bg-yellow-500"
    if (aqi <= 150) return "bg-orange-500"
    if (aqi <= 200) return "bg-red-500"
    if (aqi <= 300) return "bg-purple-500"
    return "bg-red-800"
  }

  const getTempoQualityColor = (quality: string) => {
    switch (quality) {
      case "good":
        return "bg-green-400"
      case "moderate":
        return "bg-yellow-400"
      case "poor":
        return "bg-orange-400"
      default:
        return "bg-red-400"
    }
  }

  return (
    <div className="bg-background">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <div className="flex">
        {/* Fixed Sidebar */}
        <div
          className="fixed top-[72px] left-0 h-[calc(100vh-72px)] bg-background border-r border-border z-40"
          style={{ width: sidebarWidth }}
        >
          <DashboardSidebar />
        </div>

        {/* Main Content */}
        <main
          className=" py-8 px-4"
          style={{
            marginLeft: sidebarWidth,
            marginTop: headerHeight,
            width: `calc(100vw - ${sidebarWidth}px)`,
            height: `calc(100vh - ${headerHeight}px)`,
          }}
        >
          <Card className="bg-card h-[600px] relative overflow-hidden">
            <CardContent className="p-0 h-full relative">
              {/* Simulated Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-800 dark:to-slate-900">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: "50px 50px",
                  }}
                />

                {/* Geographic features */}
                <div className="absolute top-20 left-20 w-32 h-24 bg-blue-200 dark:bg-blue-800 rounded-full opacity-30" />
                <div className="absolute bottom-32 right-24 w-40 h-20 bg-green-200 dark:bg-green-800 rounded-lg opacity-20" />
                <div className="absolute top-40 right-40 w-24 h-36 bg-brown-200 dark:bg-brown-800 rounded-full opacity-25" />
              </div>

              {/* Map Controls */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setZoomLevel(Math.min(zoomLevel + 1, 15))}
                  className="bg-card"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setZoomLevel(Math.max(zoomLevel - 1, 5))}
                  className="bg-card"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setZoomLevel(10)} className="bg-card">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>

              {/* User Locations */}
              {mapLayers.userLocations &&
                userLocations.map((location, index) => (
                  <div
                    key={location.id}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-20"
                    style={{
                      left: `${30 + index * 15}%`,
                      top: `${40 + index * 10}%`,
                    }}
                    onClick={() => setSelectedLocation(location.id)}
                  >
                    <div className="relative">
                      <div className="w-6 h-6 bg-primary rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                        <Home className="w-3 h-3 text-primary-foreground" />
                      </div>
                      {location.isPrimary && (
                        <Badge className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap">
                          Primary
                        </Badge>
                      )}
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-card border rounded px-2 py-1 text-xs whitespace-nowrap shadow-lg">
                        {location.name}
                      </div>
                    </div>
                  </div>
                ))}

              {/* Ground Stations */}
              {mapLayers.stations &&
                stations.map((station, index) => {
                  const measurement = airQualityData[index]
                  const aqiInfo = measurement ? getAQIInfo(measurement.aqi) : null

                  return (
                    <div
                      key={station.id}
                      className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-20"
                      style={{
                        left: `${25 + index * 30}%`,
                        top: `${60 + index * 15}%`,
                      }}
                      onClick={() => setSelectedLocation(station.id)}
                    >
                      <div className="relative">
                        <div
                          className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                            measurement ? getAQIColor(measurement.aqi) : "bg-gray-400"
                          }`}
                        >
                          <MapPin className="w-4 h-4 text-white" />
                        </div>
                        {!station.isActive && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white" />
                        )}
                        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-card border rounded px-2 py-1 text-xs whitespace-nowrap shadow-lg">
                          <div className="font-medium">{station.name}</div>
                          {aqiInfo && (
                            <div className="flex items-center space-x-1 mt-1">
                              <span>AQI: {aqiInfo.value}</span>
                              <Badge className={`text-xs ${aqiInfo.color}`}>{aqiInfo.category}</Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}

              {/* TEMPO Satellite Data Points */}
              {mapLayers.tempo &&
                tempoData.slice(0, 8).map((data, index) => (
                  <div
                    key={data.id}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{
                      left: `${20 + (index % 4) * 20}%`,
                      top: `${30 + Math.floor(index / 4) * 25}%`,
                    }}
                    onClick={() => setSelectedLocation(data.id)}
                  >
                    <div className="relative">
                      <div
                        className={`w-6 h-6 rounded-full border border-white shadow-md flex items-center justify-center ${getTempoQualityColor(
                          data.qualityFlag,
                        )} opacity-75`}
                      >
                        <Satellite className="w-3 h-3 text-white" />
                      </div>
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-card border rounded px-2 py-1 text-xs whitespace-nowrap shadow-lg">
                        <div className="font-medium">TEMPO Data</div>
                        <div className="text-muted-foreground">NO₂: {data.no2.toFixed(1)}</div>
                        <div className="text-muted-foreground">O₃: {data.o3.toFixed(1)}</div>
                      </div>
                    </div>
                  </div>
                ))}

              {/* AQI Overlay Regions */}
              {mapLayers.aqiOverlay && (
                <>
                  <div className="absolute top-16 left-16 w-32 h-24 bg-green-500 opacity-20 rounded-lg" />
                  <div className="absolute top-32 right-32 w-28 h-32 bg-yellow-500 opacity-20 rounded-lg" />
                  <div className="absolute bottom-24 left-24 w-36 h-20 bg-orange-500 opacity-20 rounded-lg" />
                  <div className="absolute bottom-32 right-16 w-24 h-28 bg-red-500 opacity-20 rounded-lg" />
                </>
              )}

              {/* Scale and Attribution */}
              <div className="absolute bottom-4 left-4 bg-card border rounded px-3 py-2 text-xs">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-8 h-0.5 bg-foreground" />
                    <span>5 km</span>
                  </div>
                  <span className="text-muted-foreground">Zoom: {zoomLevel}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

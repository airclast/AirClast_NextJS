"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Layers, RefreshCw } from "lucide-react"

export function MapControls() {
  const [layers, setLayers] = useState({
    stations: true,
    tempo: true,
    userLocations: true,
    aqiOverlay: true,
    weatherOverlay: false,
  })

  const [timeRange, setTimeRange] = useState("current")

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-card-foreground">
          <Layers className="w-5 h-5" />
          <span>Map Controls</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Layer Controls */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-card-foreground">Data Layers</Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="stations" className="text-sm text-card-foreground">
                Ground Stations
              </Label>
              <Switch
                id="stations"
                checked={layers.stations}
                onCheckedChange={(checked) => setLayers({ ...layers, stations: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="tempo" className="text-sm text-card-foreground">
                TEMPO Satellite
              </Label>
              <Switch
                id="tempo"
                checked={layers.tempo}
                onCheckedChange={(checked) => setLayers({ ...layers, tempo: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="user-locations" className="text-sm text-card-foreground">
                My Locations
              </Label>
              <Switch
                id="user-locations"
                checked={layers.userLocations}
                onCheckedChange={(checked) => setLayers({ ...layers, userLocations: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="aqi-overlay" className="text-sm text-card-foreground">
                AQI Overlay
              </Label>
              <Switch
                id="aqi-overlay"
                checked={layers.aqiOverlay}
                onCheckedChange={(checked) => setLayers({ ...layers, aqiOverlay: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="weather-overlay" className="text-sm text-card-foreground">
                Weather Overlay
              </Label>
              <Switch
                id="weather-overlay"
                checked={layers.weatherOverlay}
                onCheckedChange={(checked) => setLayers({ ...layers, weatherOverlay: checked })}
              />
            </div>
          </div>
        </div>

        {/* Time Range */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-card-foreground">Time Range</Label>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current</SelectItem>
              <SelectItem value="1hour">Last Hour</SelectItem>
              <SelectItem value="6hours">Last 6 Hours</SelectItem>
              <SelectItem value="24hours">Last 24 Hours</SelectItem>
              <SelectItem value="7days">Last 7 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Refresh Data */}
        <Button className="w-full flex items-center space-x-2">
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Data</span>
        </Button>

        {/* Map Style */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-card-foreground">Map Style</Label>
          <Select defaultValue="standard">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="satellite">Satellite</SelectItem>
              <SelectItem value="terrain">Terrain</SelectItem>
              <SelectItem value="dark">Dark Mode</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}

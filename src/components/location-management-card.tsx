"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { UserLocation } from "@/lib/types"
import { MapPin, Plus, Star, Trash2, Edit } from "lucide-react"

interface LocationManagementCardProps {
  locations: UserLocation[]
}

export function LocationManagementCard({ locations: initialLocations }: LocationManagementCardProps) {
  const [locations, setLocations] = useState(initialLocations)
  const [isAdding, setIsAdding] = useState(false)
  const [newLocation, setNewLocation] = useState({
    name: "",
    latitude: "",
    longitude: "",
  })

  const addLocation = () => {
    if (newLocation.name && newLocation.latitude && newLocation.longitude) {
      const location: UserLocation = {
        id: `loc-${Date.now()}`,
        userId: "user-1",
        name: newLocation.name,
        latitude: Number.parseFloat(newLocation.latitude),
        longitude: Number.parseFloat(newLocation.longitude),
        isPrimary: locations.length === 0,
        createdAt: new Date(),
      }
      setLocations([...locations, location])
      setNewLocation({ name: "", latitude: "", longitude: "" })
      setIsAdding(false)
    }
  }

  const removeLocation = (locationId: string) => {
    setLocations(locations.filter((loc) => loc.id !== locationId))
  }

  const setPrimary = (locationId: string) => {
    setLocations(
      locations.map((loc) => ({
        ...loc,
        isPrimary: loc.id === locationId,
      })),
    )
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-card-foreground">
            <MapPin className="w-5 h-5" />
            <span>Saved Locations</span>
          </CardTitle>
          <Button variant="outline" size="sm" onClick={() => setIsAdding(true)} className="flex items-center space-x-1">
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">Manage your saved locations for air quality monitoring.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Existing Locations */}
        <div className="space-y-3">
          {locations.map((location) => (
            <div key={location.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-card-foreground">{location.name}</span>
                      {location.isPrimary && (
                        <Badge variant="secondary" className="text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          Primary
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {location.latitude.toFixed(4)}°N, {Math.abs(location.longitude).toFixed(4)}°W
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {!location.isPrimary && (
                  <Button variant="ghost" size="sm" onClick={() => setPrimary(location.id)}>
                    <Star className="w-4 h-4" />
                  </Button>
                )}
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => removeLocation(location.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Location Form */}
        {isAdding && (
          <div className="space-y-3 p-4 bg-muted rounded-lg">
            <div className="space-y-2">
              <Label htmlFor="location-name">Location Name</Label>
              <Input
                id="location-name"
                placeholder="e.g., Home, Office, School"
                value={newLocation.name}
                onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  placeholder="34.0522"
                  value={newLocation.latitude}
                  onChange={(e) => setNewLocation({ ...newLocation, latitude: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  placeholder="-118.2437"
                  value={newLocation.longitude}
                  onChange={(e) => setNewLocation({ ...newLocation, longitude: e.target.value })}
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={addLocation} size="sm">
                Add Location
              </Button>
              <Button variant="outline" onClick={() => setIsAdding(false)} size="sm">
                Cancel
              </Button>
            </div>
          </div>
        )}

        {locations.length === 0 && <p className="text-center text-muted-foreground py-4">No saved locations yet</p>}
      </CardContent>
    </Card>
  )
}

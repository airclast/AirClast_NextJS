import { Button } from "@/components/ui/button"
import { MapPin, ChevronDown } from "lucide-react"
import type { UserLocation } from "@/lib/types"

interface LocationSelectorProps {
  currentLocation?: UserLocation
}

export function LocationSelector({ currentLocation }: LocationSelectorProps) {
  return (
    <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
      <MapPin className="w-4 h-4" />
      <span>{currentLocation?.name || "Select Location"}</span>
      <ChevronDown className="w-4 h-4" />
    </Button>
  )
}

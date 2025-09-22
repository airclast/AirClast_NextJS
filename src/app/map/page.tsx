import { Header } from "@/components/header"
import { InteractiveMap } from "@/components/interactive-map"
import { MapControls } from "@/components/map-controls"
import { MapLegend } from "@/components/map-legend"
import { LocationInfo } from "@/components/location-info"
import {
  mockGroundStations,
  generateMockAirQualityData,
  generateMockTempoData,
  mockUserLocations,
} from "@/lib/mock-data"

export default function MapPage() {
  const airQualityData = generateMockAirQualityData(2)
  const tempoData = generateMockTempoData(12)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Air Quality Map</h1>
            <p className="text-muted-foreground">
              Interactive map showing real-time air quality data and NASA TEMPO satellite overlays
            </p>
          </div>
        </div>

        {/* Map Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map Controls */}
          <div className="lg:col-span-1 space-y-4">
            <MapControls />
            <MapLegend />
            <LocationInfo />
          </div>

          {/* Interactive Map */}
          <div className="lg:col-span-3">
            <InteractiveMap
              stations={mockGroundStations}
              airQualityData={airQualityData}
              tempoData={tempoData}
              userLocations={mockUserLocations}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

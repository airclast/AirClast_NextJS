import { AQIDisplay } from "@/components/aqi-display"
import { WeatherCarousel } from "@/components/weather-carousel"
import { AirQualityChart } from "@/components/air-quality-chart"
import { Header } from "@/components/header"
import { LocationSelector } from "@/components/location-selector"
import { QuickStats } from "@/components/quick-stats"
import { mockUserLocations, generateMockAirQualityData } from "@/lib/mock-data"

export default function HomePage() {
  // Get current data for primary location
  const primaryLocation = mockUserLocations.find((loc) => loc.isPrimary)
  const currentAirQuality = generateMockAirQualityData(1)[0]
  const chartData = generateMockAirQualityData(24)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Location and Quick Overview */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Air Quality Dashboard</h1>
            <p className="text-muted-foreground">Real-time air quality monitoring with NASA TEMPO satellite data</p>
          </div>
          <LocationSelector currentLocation={primaryLocation} />
        </div>

        {/* Main AQI Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3">
            <AQIDisplay measurement={currentAirQuality} location={primaryLocation} />
          </div>
        </div>

        <WeatherCarousel />

        {/* Quick Stats */}
        <QuickStats measurement={currentAirQuality} />

        {/* Air Quality Trend Chart */}
        <div className="bg-card rounded-lg border p-6">
          <h2 className="text-xl font-semibold text-card-foreground mb-4">24-Hour Air Quality Trend</h2>
          <AirQualityChart data={chartData} />
        </div>

        {/* Health Advisory */}
        <div className="bg-card rounded-lg border p-6">
          <h2 className="text-xl font-semibold text-card-foreground mb-4">Health Advisory</h2>
          <div className="prose prose-sm max-w-none text-card-foreground">
            <p>Based on current air quality conditions in your area, here are our recommendations:</p>
            <ul className="mt-3 space-y-2">
              <li>• Outdoor activities are generally safe for most people</li>
              <li>• Sensitive individuals should consider limiting prolonged outdoor exertion</li>
              <li>• Consider using air purifiers indoors</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}

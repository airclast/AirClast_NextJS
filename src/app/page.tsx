import { AQIDisplay } from "@/components/aqi-display"
// import { WeatherDashboardBanner } from "@/components/weather-dashboard-banner"
import { AirQualityChart } from "@/components/air-quality-chart"
import { LocationSelector } from "@/components/location-selector"
import { QuickStats } from "@/components/quick-stats"
import { mockUserLocations, generateMockAirQualityData } from "@/lib/mock-data"
import { Header } from "@/components/header"
import { WeatherCarousel } from "@/components/weather-carousel"
// import Footer from "./footer/page"
import WeatherDashboard from "@/components/weather-dashboard"
import WeatherDetails from "@/components/sections/weather-details"
import MonthlyCalendar from "@/components/sections/monthly-calendar"
import WeatherTrends from "@/components/sections/weather-trends"
// import { WeatherHourlySection } from "@/components/weather-hourly-section"


export default function HomePage() {
  // Get current data for primary location
  const primaryLocation = mockUserLocations.find((loc) => loc.isPrimary)
  const currentAirQuality = generateMockAirQualityData(1)[0]
  const chartData = generateMockAirQualityData(24)

  return (
    <div className="min-h-screen bg-background w-[95%] mx-auto">
      <Header />
      {/* <WeatherDashboardBanner /> */}
      {/* <WeatherHourlySection /> */}
      <WeatherDashboard />
      <WeatherDetails />
      <MonthlyCalendar />
      <WeatherTrends />

      <div className="bg-background">
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
          <div className="">
            <div className="grid grid-cols-2 gap-3">
              <AQIDisplay measurement={currentAirQuality} location={primaryLocation} />
          {/* Quick Stats */}
          <QuickStats measurement={currentAirQuality} />
            </div>
          </div>

          <WeatherCarousel />

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

      {/* <Footer />   */}
    </div>
  )
}

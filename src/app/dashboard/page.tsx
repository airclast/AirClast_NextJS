import { Header } from "@/components/header"
import { TempoDataCard } from "@/components/tempo-data-card"
import { GroundStationsCard } from "@/components/ground-stations-card"
import { ForecastChart } from "@/components/forecast-chart"
import { WeatherForecast } from "@/components/weather-forecast"
import { PollutantTrends } from "@/components/pollutant-trends"
import { ConfidenceIndicator } from "@/components/confidence-indicator"
import { DataQualityPanel } from "@/components/data-quality-panel"
import {
  generateMockTempoData,
  mockGroundStations,
  generateMockAirQualityData,
  generateMockForecasts,
  generateMockWeatherData,
} from "@/lib/mock-data"

export default function DashboardPage() {
  const tempoData = generateMockTempoData(12)
  const airQualityData = generateMockAirQualityData(48)
  const forecasts = generateMockForecasts(3)
  const weatherData = generateMockWeatherData(3)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Dashboard Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Air Quality Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive air quality monitoring with NASA TEMPO satellite integration
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <ConfidenceIndicator score={0.87} />
            <span className="text-sm text-muted-foreground">Last updated: 2 min ago</span>
          </div>
        </div>

        {/* Real-time Data Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TempoDataCard data={tempoData} />
          <GroundStationsCard stations={mockGroundStations} measurements={airQualityData.slice(0, 2)} />
        </div>

        {/* Forecast Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <ForecastChart forecasts={forecasts} historicalData={airQualityData.slice(0, 24)} />
          </div>
          <div>
            <WeatherForecast weatherData={weatherData} />
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PollutantTrends data={airQualityData.slice(0, 24)} />
          <DataQualityPanel tempoData={tempoData} />
        </div>
      </main>
    </div>
  )
}

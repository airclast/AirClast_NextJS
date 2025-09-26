import { Header } from "@/components/header";
import { TempoDataCard } from "@/components/tempo-data-card";
import { GroundStationsCard } from "@/components/ground-stations-card";
import { ForecastChart } from "@/components/forecast-chart";
import { WeatherForecast } from "@/components/weather-forecast";
import { PollutantTrends } from "@/components/pollutant-trends";
import { ConfidenceIndicator } from "@/components/confidence-indicator";
import { DataQualityPanel } from "@/components/data-quality-panel";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import {
  generateMockTempoData,
  mockGroundStations,
  generateMockAirQualityData,
  generateMockForecasts,
  generateMockWeatherData,
} from "@/lib/mock-data";

export default function DashboardPage() {
  const tempoData = generateMockTempoData(12);
  const airQualityData = generateMockAirQualityData(48);
  const forecasts = generateMockForecasts(3);
  const weatherData = generateMockWeatherData(3);

  const headerHeight = 72; // px
  const sidebarWidth = 256; // px

  return (
    <div className=" bg-background">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <div className="flex h-screen bg-background">
        {/* Fixed Sidebar */}
        <div
          style={{ width: sidebarWidth }}
          className="fixed left-0 top-[72px] h-[calc(100%-72px)]  w-64 bg-background border-r border-border z-40"
        >
          <DashboardSidebar />
        </div>

        <main
          className="overflow-y-auto py-8 px-4"
          style={{
            marginLeft: 256, // sidebar width in px
            marginTop: 72, // header height in px
            width: `calc(100vw - 256px)`,
            height: `calc(100vh - 72px)`,
          }}
        >
          {/* Dashboard Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Air Quality Dashboard
              </h1>
              <p className="text-muted-foreground">
                Comprehensive air quality monitoring with NASA TEMPO satellite
                integration
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <ConfidenceIndicator score={0.87} />
              <span className="text-sm text-muted-foreground">
                Last updated: 2 min ago
              </span>
            </div>
          </div>

          {/* Real-time Data Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-4">
            <TempoDataCard data={tempoData} />
            <GroundStationsCard
              stations={mockGroundStations}
              measurements={airQualityData.slice(0, 2)}
            />
          </div>

          {/* Forecast Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 my-4">
            <div className="xl:col-span-2">
              <ForecastChart
                forecasts={forecasts}
                historicalData={airQualityData.slice(0, 24)}
              />
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
      
    </div>
  );
}

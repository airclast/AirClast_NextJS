"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import PrecipitationTab from "./tabs/precipitation-tab"
import HourlyOverview from "./tabs/hourly-overview"
import WindTab from "./tabs/wind-tab"
import AirQualityTab from "./tabs/air-quality-tab"
import PressureTab from "./tabs/pressure-tab"
import UVTab from "./tabs/uv-tab"
import VisibilityTab from "./tabs/visibility-tab"
import FeelsLikeTab from "./tabs/feels-like-tab"

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "precipitation", label: "Precipitation" },
  { id: "wind", label: "Wind" },
  { id: "air-quality", label: "Air Quality" },
  { id: "pressure", label: "Pressure" },
  { id: "uv", label: "UV" },
  { id: "visibility", label: "Visibility" },
  { id: "feels-like", label: "Feels Like" },
]

export default function WeatherDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [viewMode, setViewMode] = useState<"chart" | "list">("chart")
  const [isLoading, setIsLoading] = useState(false)

  const handleTabChange = (tabId: string) => {
    if (tabId === activeTab) return

    setIsLoading(true)
    setTimeout(() => {
      setActiveTab(tabId)
      setIsLoading(false)
    }, 150)
  }

  const renderTabContent = () => {
    const content = (() => {
      switch (activeTab) {
        case "overview":
          return <HourlyOverview  />
        case "precipitation":
          return <PrecipitationTab viewMode={viewMode} />
        case "wind":
          return <WindTab viewMode={viewMode} />
        case "air-quality":
          return <AirQualityTab viewMode={viewMode} />
        case "pressure":
          return <PressureTab viewMode={viewMode} />
        case "uv":
          return <UVTab viewMode={viewMode} />
        case "visibility":
          return <VisibilityTab viewMode={viewMode} />
        case "feels-like":
          return <FeelsLikeTab viewMode={viewMode} />
        default:
          return <HourlyOverview  />
      }
    })()

    return (
      <div className={cn("transition-all duration-300 ease-out animate-fade-in-up", isLoading && "opacity-50")}>
        {content}
      </div>
    )
  }

  return (
    <Card className="weather-card-hover bg-card/80 backdrop-blur-md border-border/50 p-6 shadow-lg my-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-foreground animate-slide-in">Hourly</h2>
          <div className="flex bg-secondary/50 backdrop-blur-sm rounded-lg p-1 border border-border/30">
            <Button
              variant={viewMode === "chart" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("chart")}
              className={cn(
                "text-xs px-4 py-2 rounded-md transition-all duration-200 weather-button",
                viewMode === "chart"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/70",
              )}
            >
              Chart
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={cn(
                "text-xs px-4 py-2 rounded-md transition-all duration-200 weather-button",
                viewMode === "list"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/70",
              )}
            >
              List
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {tabs.map((tab, index) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                "text-xs px-3 py-2 rounded-md transition-all duration-200 weather-button animate-slide-in",
                activeTab === tab.id
                  ? "bg-yellow-500 text-black shadow-sm scale-105 hover:bg-yellow-400"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50 hover:scale-105",
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {renderTabContent()}
    </Card>
  )
}

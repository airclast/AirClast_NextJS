"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { ChevronDown, Thermometer, CloudRain, Droplets, Wind } from "lucide-react"

const chartData = [
  { month: "Nov", high: 32, low: 27, forecast30High: 30, forecast30Low: 25 },
  { month: "Dec", high: 36, low: 27, forecast30High: 34, forecast30Low: 26 },
  { month: "Jan", high: 38, low: 27, forecast30High: 36, forecast30Low: 25 },
  { month: "Feb", high: 20, low: 18, forecast30High: 22, forecast30Low: 16 },
  { month: "Mar", high: 33, low: 27, forecast30High: 31, forecast30Low: 25 },
  { month: "Apr", high: 54, low: 32, forecast30High: 52, forecast30Low: 30 },
  { month: "May", high: 62, low: 28, forecast30High: 60, forecast30Low: 26 },
  { month: "Jun", high: 33, low: 27, forecast30High: 31, forecast30Low: 25 },
  { month: "Jul", high: 32, low: 26, forecast30High: 30, forecast30Low: 24 },
  { month: "Aug", high: 34, low: 27, forecast30High: 32, forecast30Low: 25 },
  { month: "Sep", high: 32, low: 26, forecast30High: 30, forecast30Low: 24 },
  { month: "Oct", high: 30, low: 24, forecast30High: 28, forecast30Low: 22 },
]

const tabs = [
  { id: "temperature", label: "Temperature", icon: Thermometer, active: true },
  { id: "precipitation", label: "Precipitation", icon: CloudRain, active: false },
  { id: "humidity", label: "Humidity", icon: Droplets, active: false },
  { id: "wind", label: "Wind", icon: Wind, active: false },
]

const checkboxOptions = [
  { id: "daily-low", label: "Daily low", checked: true, color: "#3B82F6" },
  { id: "daily-high", label: "Daily high", checked: true, color: "#EF4444" },
  { id: "30-day-forecast", label: "30 day forecast", checked: true, color: "#8B5CF6" },
  { id: "30-day-forecast-2", label: "30 day forecast", checked: true, color: "#06B6D4" },
  { id: "historical-daily", label: "Historical daily temperature", checked: true, color: "#10B981" },
  { id: "confidence", label: "Confidence", checked: false, color: "#6B7280" },
]

const climateData = [
  { label: "Hottest month", last12: "April", allYears: "April", icon: "🌡️" },
  { label: "Coldest month", last12: "January", allYears: "January", icon: "🥶" },
  { label: "Wettest month", last12: "July", allYears: "July", icon: "💧" },
  { label: "Windiest month", last12: "July", allYears: "July", icon: "💨" },
]

const summaryData = [
  { label: "High temperature (°C)", max: 40, average: 31, min: 20 },
  { label: "Low temperature (°C)", max: 30, average: 23, min: 12 },
  { label: "Precipitation (cm)", max: 4.9, average: 0.28, min: 0 },
  { label: "Wind (km/h)", max: 13.1, average: 4.33, min: 0.7 },
]

export default function WeatherTrends() {
  const [activeTab, setActiveTab] = useState("temperature")
  const [selectedPeriod, setSelectedPeriod] = useState("last-12-months")
  const [selectedRange, setSelectedRange] = useState("all-months")

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Weather trends</h2>
        <div className="flex gap-4">
          <Button
            variant="outline"
            className=" flex items-center gap-2"
          >
            📅 Last 12 months <ChevronDown className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2"
          >
            📅 All months <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <Button
              key={tab.id}
              variant={tab.active ? "default" : "ghost"}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200",
                tab.active
                  ? "bg-yellow-500 text-black hover:bg-yellow-400"
                  : "bg-slate-800/10 text-slate-800 hover:bg-slate-700 ",
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </Button>
          )
        })}
      </div>

      {/* Temperature Display */}
      <div className="mb-4">
        <span className="text-2xl font-light">40°</span>
      </div>

      {/* Chart */}
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="highTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="lowTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 12 }}
              domain={[0, 70]}
              tickFormatter={(value) => `${value}°`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "",
                border: "1px solid #475569",
                borderRadius: "8px",
                color: "",
              }}
            />
            <Area type="monotone" dataKey="high" stackId="1" stroke="#EF4444" fill="url(#highTemp)" strokeWidth={2} />
            <Area type="monotone" dataKey="low" stackId="2" stroke="#3B82F6" fill="url(#lowTemp)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend Checkboxes */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {checkboxOptions.map((option) => (
          <label key={option.id} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={option.checked}
              className="w-4 h-4 rounded "
              style={{ accentColor: option.color }}
            />
            <span className="text-sm ">{option.label}</span>
          </label>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">


      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 border rounded-lg p-4">
        {/* Climate Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Climate information</h3>
          <div className="space-y-3">
            {climateData.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <span className=" flex-1">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Last 12 months */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Last 12 months</h3>
          <div className="space-y-3">
            {climateData.map((item, index) => (
              <div key={index} className="">
                {item.last12}
              </div>
            ))}
          </div>
        </div>

        {/* All Years */}
        <div>
          <h3 className="text-lg font-semibold mb-4">All Years</h3>
          <div className="space-y-3">
            {climateData.map((item, index) => (
              <div key={index} className="">
                {item.allYears}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Summary Table */}
      <div className="mt-8 border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Daily Summary (Last 12 months)</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className=" font-medium">Metric</div>
          <div className=" font-medium">Max</div>
          <div className=" font-medium">Average</div>
          <div className=" font-medium">Min</div>

          {summaryData.map((item, index) => (
            <div key={index} className="contents">
              <div>{item.label}</div>
              <div>{item.max}</div>
              <div>{item.average}</div>
              <div>{item.min}</div>
            </div>
          ))}
        </div>
      </div>
      </div>

    </Card>
  )
}

"use client"

import { Card } from "@/components/ui/card"

const weatherCards = [
  {
    title: "Temperature",
    value: "33°",
    status: "Rising",
    statusIcon: "🔴",
    description: "Rising with a peak of 34° at 3:00 PM. Overnight low of 27° at 3:00 AM.",
    chart: "temperature",
    color: "from-red-500 to-red-600",
  },
  {
    title: "Feels like",
    value: "41°",
    status: "Hot",
    statusIcon: "🔥",
    description: "Feels considerably warmer than the actual temperature due to the humidity.",
    actualTemp: "33°",
    chart: "feels-like",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Cloud cover",
    value: "Partly Sunny",
    status: "Partly Sunny (45%)",
    statusIcon: "⛅",
    description: "Decreasing with mostly clear sky at 2:00 PM. Mostly clear sky expected in the evening.",
    chart: "cloud",
    color: "from-blue-400 to-blue-500",
  },
  {
    title: "Precipitation",
    value: "0 cm",
    status: "No Precipitation",
    statusIcon: "🌞",
    description: "Rain expected on Saturday. Today has seen similar precipitation as yesterday until now.",
    timeframe: "In next 24h",
    chart: "precipitation",
    color: "from-blue-600 to-blue-700",
  },
  {
    title: "Wind",
    value: "7 km/h",
    direction: "From SE (140°)",
    gust: "22 km/h",
    status: "Force: 2 (Light Breeze)",
    statusIcon: "🍃",
    description: "Steady with averages holding at 3 km/h (gusts to 3) expected from N through the evening...",
    chart: "wind-compass",
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Humidity",
    value: "75%",
    dewPoint: "28°",
    status: "Very humid",
    statusIcon: "💧",
    description: "Steady at 84%. Very humid conditions expected in the evening.",
    chart: "humidity-bars",
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "UV",
    value: "8",
    status: "Very High",
    statusIcon: "🔆",
    description: "Maximum UV exposure for today will be very high, expected at 1:00 PM.",
    chart: "uv-gauge",
    color: "from-yellow-400 to-orange-500",
  },
  {
    title: "AQI",
    value: "62",
    status: "Moderate",
    statusIcon: "🟡",
    description: "Deteriorating air quality with primary pollutant: PM2.5 8.7 μg/m³.",
    chart: "aqi-gauge",
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Visibility",
    value: "5 km",
    status: "Good",
    statusIcon: "👁️",
    description: "Improving with a peak visibility distance of 30 km expected at 2:00 PM. Excellent visibility...",
    chart: "visibility-bars",
    color: "from-green-500 to-green-600",
  },
  {
    title: "Pressure",
    value: "1002 mb",
    time: "1:00 PM (Now)",
    status: "Falling slowly",
    statusIcon: "📉",
    description: "Falling slowly in the last 3 hours. Expected to fall in the next 3 hours.",
    chart: "pressure-line",
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Sun",
    sunrise: "5:47 AM",
    sunset: "5:53 PM",
    duration: "12 hrs 5 mins",
    chart: "sun-arc",
    color: "from-orange-400 to-red-500",
  },
  {
    title: "Moon",
    moonrise: "7:43 AM",
    moonset: "7:09 PM",
    duration: "11 hrs 25 mins",
    chart: "moon-arc",
    color: "from-yellow-400 to-orange-400",
  },
]

export default function WeatherDetails() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold text-white">Weather details</h2>
          <span className="text-slate-400">1:00 PM</span>
        </div>
        <div className="text-blue-400 hover:text-blue-300 cursor-pointer">SUGGESTIONS FOR YOUR DAY →</div>
      </div>

      {/* Weather Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {weatherCards.map((card, index) => (
          <Card
            key={index}
            className=" transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="space-y-3">
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-slate-300 text-sm font-medium">{card.title}</h3>
                {card.statusIcon && <span className="text-lg">{card.statusIcon}</span>}
              </div>

              {/* Main Value */}
              <div className="space-y-2">
                {card.value && <div className="text-2xl font-bold text-white">{card.value}</div>}

                {/* Additional Info */}
                {card.direction && <div className="text-sm text-slate-400">{card.direction}</div>}
                {card.gust && <div className="text-sm text-slate-400">Wind Gust: {card.gust}</div>}
                {card.dewPoint && <div className="text-sm text-slate-400">Dew point: {card.dewPoint}</div>}
                {card.actualTemp && <div className="text-sm text-slate-400">Temperature: {card.actualTemp}</div>}
                {card.timeframe && <div className="text-xs text-slate-500">{card.timeframe}</div>}
                {card.time && <div className="text-xs text-slate-500">{card.time}</div>}
              </div>

              {/* Status */}
              {card.status && <div className="text-sm text-slate-300">{card.status}</div>}

              {/* Sun/Moon specific layout */}
              {(card.title === "Sun" || card.title === "Moon") && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">{card.title === "Sun" ? "Sunrise" : "Moonrise"}</span>
                    <span className="text-white">{card.title === "Sun" ? card.sunrise : card.moonrise}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">{card.title === "Sun" ? "Sunset" : "Moonset"}</span>
                    <span className="text-white">{card.title === "Sun" ? card.sunset : card.moonset}</span>
                  </div>
                  <div className="text-center text-xs text-slate-500 mt-2">{card.duration}</div>
                </div>
              )}

              {/* Visual Elements */}
              {card.chart === "temperature" && (
                <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-full w-3/4"></div>
                  <div className="absolute right-0 top-0 w-3 h-3 bg-white rounded-full transform -translate-y-0.5"></div>
                </div>
              )}

              {card.chart === "feels-like" && (
                <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full w-4/5"></div>
                  <div className="absolute right-4 top-0 w-3 h-3 bg-white rounded-full transform -translate-y-0.5"></div>
                </div>
              )}

              {card.chart === "wind-compass" && (
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute inset-0 border-2 border-slate-600 rounded-full"></div>
                  <div className="absolute inset-2 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-white transform rotate-45"></div>
                  </div>
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-xs text-slate-400">N</div>
                  <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 text-xs text-slate-400">E</div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-slate-400">S</div>
                  <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 text-xs text-slate-400">W</div>
                </div>
              )}

              {card.chart === "humidity-bars" && (
                <div className="flex items-end gap-1 h-8">
                  {[60, 70, 75, 80, 75, 70, 65].map((height, i) => (
                    <div
                      key={i}
                      className="bg-blue-500 rounded-sm flex-1"
                      style={{ height: `${(height / 80) * 100}%` }}
                    ></div>
                  ))}
                </div>
              )}

              {card.chart === "uv-gauge" && (
                <div className="relative w-16 h-8 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-yellow-400 via-orange-400 to-red-500 rounded-t-full"></div>
                  <div className="absolute bottom-0 left-1/2 w-1 h-6 bg-white rounded-full transform -translate-x-0.5 rotate-45 origin-bottom"></div>
                </div>
              )}

              {card.chart === "aqi-gauge" && (
                <div className="relative w-16 h-8 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-t-full"></div>
                  <div className="absolute bottom-0 left-1/2 w-1 h-6 bg-white rounded-full transform -translate-x-0.5 rotate-12 origin-bottom"></div>
                </div>
              )}

              {card.chart === "visibility-bars" && (
                <div className="space-y-1">
                  <div className="h-1 bg-green-500 rounded-full w-full"></div>
                  <div className="h-1 bg-green-500 rounded-full w-4/5"></div>
                  <div className="h-1 bg-green-500 rounded-full w-3/5"></div>
                </div>
              )}

              {card.chart === "pressure-line" && (
                <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full w-3/5"></div>
                  <div className="absolute right-8 top-0 w-3 h-3 bg-white rounded-full transform -translate-y-0.5"></div>
                </div>
              )}

              {(card.chart === "sun-arc" || card.chart === "moon-arc") && (
                <div className="relative w-full h-8 mx-auto">
                  <svg viewBox="0 0 100 50" className="w-full h-full">
                    <path
                      d="M 10 40 Q 50 10 90 40"
                      stroke={card.chart === "sun-arc" ? "#F59E0B" : "#FCD34D"}
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle cx={card.chart === "sun-arc" ? "25" : "75"} cy="32" r="3" fill="white" />
                    <circle cx="10" cy="40" r="2" fill="#64748B" />
                    <circle cx="90" cy="40" r="2" fill="#64748B" />
                  </svg>
                </div>
              )}

              {/* Description */}
              {card.description && <p className="text-xs text-slate-400 leading-relaxed">{card.description}</p>}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

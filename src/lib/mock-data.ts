import type {
  User,
  UserLocation,
  TempoData,
  GroundStation,
  AirQualityMeasurement,
  WeatherData,
  AirQualityForecast,
  Notification,
} from "./types"

// Mock user data
export const mockUser: User = {
  id: "user-1",
  email: "john.doe@example.com",
  name: "John Doe",
  healthConditions: ["asthma", "allergies"],
  notificationPreferences: {
    email: true,
    sms: false,
    push: true,
    severityThreshold: "moderate",
  },
  createdAt: new Date("2024-01-15"),
  updatedAt: new Date("2024-12-01"),
}

// Mock user locations
export const mockUserLocations: UserLocation[] = [
  {
    id: "loc-1",
    userId: "user-1",
    name: "Home - Los Angeles",
    latitude: 34.0522,
    longitude: -118.2437,
    isPrimary: true,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "loc-2",
    userId: "user-1",
    name: "Work - Downtown LA",
    latitude: 34.0522,
    longitude: -118.2437,
    isPrimary: false,
    createdAt: new Date("2024-02-01"),
  },
]

// Mock ground stations
export const mockGroundStations: GroundStation[] = [
  {
    id: "station-1",
    name: "Los Angeles Central",
    latitude: 34.0522,
    longitude: -118.2437,
    elevation: 87,
    isActive: true,
    stationType: "urban",
    lastMaintenance: new Date("2024-11-15"),
  },
  {
    id: "station-2",
    name: "Pasadena Monitor",
    latitude: 34.1478,
    longitude: -118.1445,
    elevation: 265,
    isActive: true,
    stationType: "suburban",
    lastMaintenance: new Date("2024-11-20"),
  },
]

// Generate mock TEMPO data
export const generateMockTempoData = (hours = 24): TempoData[] => {
  const data: TempoData[] = []
  const now = new Date()

  for (let i = 0; i < hours; i++) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000)
    data.push({
      id: `tempo-${i}`,
      timestamp,
      latitude: 34.0522 + (Math.random() - 0.5) * 0.1,
      longitude: -118.2437 + (Math.random() - 0.5) * 0.1,
      no2: Math.random() * 50 + 10,
      o3: Math.random() * 80 + 20,
      formaldehyde: Math.random() * 5 + 1,
      cloudFraction: Math.random(),
      qualityFlag: ["good", "moderate", "poor"][Math.floor(Math.random() * 3)] as any,
    })
  }

  return data
}

// Generate mock air quality measurements
export const generateMockAirQualityData = (hours = 24): AirQualityMeasurement[] => {
  const data: AirQualityMeasurement[] = []
  const now = new Date()
  const categories = ["good", "moderate", "unhealthy-sensitive", "unhealthy", "very-unhealthy", "hazardous"] as const

  for (let i = 0; i < hours; i++) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000)
    const aqi = Math.floor(Math.random() * 200 + 20)

    let category: (typeof categories)[number] = "good"
    if (aqi > 300) category = "hazardous"
    else if (aqi > 200) category = "very-unhealthy"
    else if (aqi > 150) category = "unhealthy"
    else if (aqi > 100) category = "unhealthy-sensitive"
    else if (aqi > 50) category = "moderate"

    data.push({
      id: `measurement-${i}`,
      stationId: "station-1",
      timestamp,
      pm25: Math.random() * 50 + 5,
      pm10: Math.random() * 80 + 10,
      o3: Math.random() * 100 + 20,
      no2: Math.random() * 60 + 10,
      co: Math.random() * 10 + 1,
      so2: Math.random() * 20 + 2,
      aqi,
      aqiCategory: category,
    })
  }

  return data
}

// Generate mock weather data
export const generateMockWeatherData = (days = 7): WeatherData[] => {
  const data: WeatherData[] = []
  const now = new Date()

  for (let i = 0; i < days * 24; i++) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000)
    data.push({
      id: `weather-${i}`,
      locationId: "loc-1",
      timestamp,
      temperature: Math.random() * 15 + 15, // 15-30°C
      humidity: Math.random() * 40 + 40, // 40-80%
      windSpeed: Math.random() * 10 + 2, // 2-12 m/s
      windDirection: Math.random() * 360,
      pressure: Math.random() * 50 + 1000, // 1000-1050 hPa
      precipitation: Math.random() * 5,
      uvIndex: Math.floor(Math.random() * 11),
      visibility: Math.random() * 20 + 5, // 5-25 km
    })
  }

  return data
}

// Generate mock forecasts
export const generateMockForecasts = (days = 3): AirQualityForecast[] => {
  const data: AirQualityForecast[] = []
  const now = new Date()
  const categories = ["good", "moderate", "unhealthy-sensitive", "unhealthy", "very-unhealthy", "hazardous"] as const

  for (let i = 1; i <= days; i++) {
    const forecastDate = new Date(now.getTime() + i * 24 * 60 * 60 * 1000)
    const aqi = Math.floor(Math.random() * 150 + 25)

    let category: (typeof categories)[number] = "good"
    if (aqi > 300) category = "hazardous"
    else if (aqi > 200) category = "very-unhealthy"
    else if (aqi > 150) category = "unhealthy"
    else if (aqi > 100) category = "unhealthy-sensitive"
    else if (aqi > 50) category = "moderate"

    data.push({
      id: `forecast-${i}`,
      locationId: "loc-1",
      forecastDate,
      createdAt: now,
      predictedAqi: aqi,
      aqiCategory: category,
      confidenceScore: Math.random() * 0.3 + 0.7, // 0.7-1.0
      modelVersion: "v2.1.0",
      forecastHours: i * 24,
    })
  }

  return data
}

// Mock notifications
export const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    userId: "user-1",
    title: "Air Quality Alert",
    message:
      "Air quality in your area has reached unhealthy levels for sensitive groups. Consider limiting outdoor activities.",
    severity: "high",
    type: "air-quality-alert",
    deliveryMethod: "push",
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: "notif-2",
    userId: "user-1",
    title: "Forecast Update",
    message: "Tomorrow's air quality forecast has been updated. Expected AQI: 85 (Moderate)",
    severity: "moderate",
    type: "forecast-update",
    deliveryMethod: "email",
    isRead: true,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
  },
  {
    id: "notif-3",
    userId: "user-1",
    title: "System Maintenance",
    message: "Scheduled maintenance will occur tonight from 2-4 AM. Some features may be temporarily unavailable.",
    severity: "low",
    type: "system-maintenance",
    deliveryMethod: "email",
    isRead: false,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
  },
  {
    id: "notif-4",
    userId: "user-1",
    title: "Health Advisory",
    message: "Based on your health conditions, we recommend avoiding outdoor exercise today due to high ozone levels.",
    severity: "high",
    type: "air-quality-alert",
    deliveryMethod: "push",
    isRead: false,
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
  },
  {
    id: "notif-5",
    userId: "user-1",
    title: "Weekly Air Quality Summary",
    message: "Your weekly air quality report is ready. This week's average AQI was 72 (Moderate).",
    severity: "low",
    type: "forecast-update",
    deliveryMethod: "email",
    isRead: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: "notif-6",
    userId: "user-1",
    title: "Very Unhealthy Air Quality",
    message: "URGENT: Air quality has reached very unhealthy levels. Stay indoors and avoid all outdoor activities.",
    severity: "very-high",
    type: "air-quality-alert",
    deliveryMethod: "sms",
    isRead: false,
    createdAt: new Date(Date.now() - 30 * 60 * 60 * 1000), // 30 hours ago
  },
]

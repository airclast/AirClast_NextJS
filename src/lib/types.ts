// Database entity types for Air Quality Forecasting System

export interface User {
  id: string
  email: string
  name: string
  healthConditions: string[]
  notificationPreferences: {
    email: boolean
    sms: boolean
    push: boolean
    severityThreshold: "low" | "moderate" | "high" | "very-high"
  }
  createdAt: Date
  updatedAt: Date
}

export interface UserLocation {
  id: string
  userId: string
  name: string
  latitude: number
  longitude: number
  isPrimary: boolean
  createdAt: Date
}

export interface TempoData {
  id: string
  timestamp: Date
  latitude: number
  longitude: number
  no2: number // Nitrogen Dioxide
  o3: number // Ozone
  formaldehyde: number
  cloudFraction: number
  qualityFlag: "good" | "moderate" | "poor" | "invalid"
}

export interface GroundStation {
  id: string
  name: string
  latitude: number
  longitude: number
  elevation: number
  isActive: boolean
  stationType: "urban" | "suburban" | "rural" | "industrial"
  lastMaintenance: Date
}

export interface AirQualityMeasurement {
  id: string
  stationId: string
  timestamp: Date
  pm25: number // PM2.5
  pm10: number // PM10
  o3: number // Ozone
  no2: number // Nitrogen Dioxide
  co: number // Carbon Monoxide
  so2: number // Sulfur Dioxide
  aqi: number
  aqiCategory: "good" | "moderate" | "unhealthy-sensitive" | "unhealthy" | "very-unhealthy" | "hazardous"
}

export interface WeatherData {
  id: string
  locationId: string
  timestamp: Date
  temperature: number // Celsius
  humidity: number // Percentage
  windSpeed: number // m/s
  windDirection: number // Degrees
  pressure: number // hPa
  precipitation: number // mm
  uvIndex: number
  visibility: number // km
}

export interface AirQualityForecast {
  id: string
  locationId: string
  forecastDate: Date
  createdAt: Date
  predictedAqi: number
  aqiCategory: "good" | "moderate" | "unhealthy-sensitive" | "unhealthy" | "very-unhealthy" | "hazardous"
  confidenceScore: number // 0-1
  modelVersion: string
  forecastHours: number // 24, 48, or 72
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  severity: "low" | "moderate" | "high" | "very-high"
  type: "air-quality-alert" | "forecast-update" | "system-maintenance"
  deliveryMethod: "email" | "sms" | "push"
  isRead: boolean
  createdAt: Date
  scheduledFor?: Date
}

// Utility types
export interface AQIInfo {
  value: number
  category: string
  color: string
  description: string
  healthAdvice: string
}

export interface ChartDataPoint {
  timestamp: string
  value: number
  category?: string
}

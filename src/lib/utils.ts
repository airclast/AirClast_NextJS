import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// ✅ Shadcn default utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ✅ Format timestamp → e.g. "Sep 22, 2025, 02:30 PM"
export function formatTimestamp(timestamp: string | number | Date) {
  const date = new Date(timestamp)
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

// ✅ Format only date → e.g. "Sep 22, 2025"
export function formatDate(dateInput: string | number | Date) {
  const date = new Date(dateInput)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// ✅ AQI Info Helper
export function getAQIInfo(aqi: number) {
  if (aqi <= 50) {
    return { level: "Good", color: "green", message: "Air quality is satisfactory." }
  } else if (aqi <= 100) {
    return { level: "Moderate", color: "yellow", message: "Acceptable air quality." }
  } else if (aqi <= 150) {
    return { level: "Unhealthy (Sensitive Groups)", color: "orange", message: "May affect sensitive groups." }
  } else if (aqi <= 200) {
    return { level: "Unhealthy", color: "red", message: "Everyone may experience health effects." }
  } else if (aqi <= 300) {
    return { level: "Very Unhealthy", color: "purple", message: "Health warnings of emergency conditions." }
  } else {
    return { level: "Hazardous", color: "maroon", message: "Health alert: everyone may be affected." }
  }
}

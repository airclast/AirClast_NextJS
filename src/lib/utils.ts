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
    return {
      value: aqi,
      category: "Good",
      color: "bg-green-500",
      description: "Air quality is satisfactory.",
      healthAdvice: "Air quality is good. Enjoy your usual outdoor activities.",
    }
  } else if (aqi <= 100) {
    return {
      value: aqi,
      category: "Moderate",
      color: "bg-yellow-500",
      description: "Acceptable air quality.",
      healthAdvice: "Air quality is acceptable. Sensitive groups should take precautions.",
    }
  } else if (aqi <= 150) {
    return {
      value: aqi,
      category: "Unhealthy (Sensitive Groups)",
      color: "bg-orange-500",
      description: "May affect sensitive groups.",
      healthAdvice: "Sensitive groups should reduce outdoor activities.",
    }
  } else if (aqi <= 200) {
    return {
      value: aqi,
      category: "Unhealthy",
      color: "bg-red-500",
      description: "Everyone may experience health effects.",
      healthAdvice: "Limit outdoor activities for everyone.",
    }
  } else if (aqi <= 300) {
    return {
      value: aqi,
      category: "Very Unhealthy",
      color: "bg-purple-500",
      description: "Health warnings of emergency conditions.",
      healthAdvice: "Avoid outdoor activities. Take protective measures.",
    }
  } else {
    return {
      value: aqi,
      category: "Hazardous",
      color: "bg-maroon-500",
      description: "Health alert: everyone may be affected.",
      healthAdvice: "Stay indoors. Follow health advisories.",
    }
  }
}



"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const months = [
  "September",
  "October",
  "November",
  "December",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
]

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const weatherIcons = {
  sunny: "☀️",
  partlyCloudy: "⛅",
  cloudy: "☁️",
  rainy: "🌧️",
  stormy: "⛈️",
}

const calendarData = [
  { date: 31, high: 32, low: 27, icon: "cloudy", prevMonth: true },
  { date: 1, high: 36, low: 27, icon: "partlyCloudy" },
  { date: 2, high: 33, low: 27, icon: "partlyCloudy" },
  { date: 3, high: 33, low: 28, icon: "cloudy" },
  { date: 4, high: 33, low: 27, icon: "rainy" },
  { date: 5, high: 34, low: 27, icon: "partlyCloudy" },
  { date: 6, high: 34, low: 28, icon: "cloudy" },
  { date: 7, high: 33, low: 28, icon: "cloudy" },
  { date: 8, high: 33, low: 28, icon: "partlyCloudy" },
  { date: 9, high: 34, low: 28, icon: "partlyCloudy" },
  { date: 10, high: 34, low: 28, icon: "cloudy" },
  { date: 11, high: 32, low: 27, icon: "rainy" },
  { date: 12, high: 31, low: 27, icon: "partlyCloudy" },
  { date: 13, high: 31, low: 27, icon: "cloudy" },
  { date: 14, high: 28, low: 26, icon: "rainy" },
  { date: 15, high: 30, low: 26, icon: "rainy" },
  { date: 16, high: 28, low: 26, icon: "partlyCloudy" },
  { date: 17, high: 32, low: 26, icon: "partlyCloudy" },
  { date: 18, high: 36, low: 30, icon: "partlyCloudy" },
  { date: 19, high: 34, low: 28, icon: "partlyCloudy" },
  { date: 20, high: 33, low: 28, icon: "rainy" },
  { date: 21, high: 34, low: 27, icon: "cloudy" },
  { date: 22, high: 30, low: 26, icon: "rainy" },
  { date: 23, high: 33, low: 26, icon: "partlyCloudy" },
  { date: 24, high: 33, low: 27, icon: "partlyCloudy", isToday: true },
  { date: 25, high: 34, low: 27, icon: "partlyCloudy" },
  { date: 26, high: 34, low: 27, icon: "partlyCloudy" },
  { date: 27, high: 32, low: 27, icon: "rainy" },
  { date: 28, high: 32, low: 27, icon: "partlyCloudy" },
  { date: 29, high: 33, low: 27, icon: "partlyCloudy" },
  { date: 30, high: 34, low: 26, icon: "partlyCloudy" },
  { date: 1, high: 30, low: 26, icon: "cloudy", nextMonth: true },
  { date: 2, high: 29, low: 26, icon: "cloudy", nextMonth: true },
  { date: 3, high: 29, low: 26, icon: "cloudy", nextMonth: true },
  { date: 4, high: 30, low: 26, icon: "cloudy", nextMonth: true },
]

export default function MonthlyCalendar() {
  const [selectedMonth, setSelectedMonth] = useState("September")
  const [selectedYear] = useState("2025")

  return (
    <Card className="my-8 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Monthly</h2>
      </div>

      {/* Month Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {months.map((month, index) => (
          <Button
            key={month}
            variant={selectedMonth === month ? "default" : "ghost"}
            className={cn(
              "px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200",
              selectedMonth === month
                ? "bg-yellow-500 text-black hover:bg-yellow-400"
                : "bg-slate-800/20 text-[#000000] hover:bg-slate-700 hover:text-white",
              month === "January" && "text-xs",
            )}
            onClick={() => setSelectedMonth(month)}
          >
            {month === "January" ? (
              <span>
                <span className="text-xs  block">2026</span>
                January
              </span>
            ) : (
              month
            )}
          </Button>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="space-y-4">
        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {weekDays.map((day) => (
            <div key={day} className="text-center border rounded-lg bg-slate-800/5 shadow-sm text-sm font-medium py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {calendarData.map((day, index) => (
            <div
              key={index}
              className={cn(
                "relative p-3 rounded-lg transition-all duration-200 bg-slate-800/5 shadow-sm border",
                day.isToday && "ring-2 ring-yellow-500 shadow-sm shadow-yellow-500",
                (day.prevMonth || day.nextMonth) && "opacity-50",
              )}
            >
              {/* Date */}
              <div className="text-sm font-medium mb-1">{day.date}</div>

              {/* Weather Icon */}
              <div className="text-lg mb-1 flex justify-center">
                {weatherIcons[day.icon as keyof typeof weatherIcons]}
              </div>

              {/* Temperature */}
              <div className="text-center">
                <div className="text-sm font-semibold">{day.high}°</div>
                <div className="text-xs">{day.low}°</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

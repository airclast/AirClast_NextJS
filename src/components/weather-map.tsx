"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

// Weather layers for your buttons
const weatherLayers = [
  { id: "temperature", icon: "🌡️", label: "Temperature", active: false },
  { id: "precipitation", icon: "🌧️", label: "Precipitation", active: true },
  { id: "wind", icon: "💨", label: "Wind", active: false },
  { id: "uv", icon: "☀️", label: "UV", active: false },
]

const timeSlots = [
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
]

export default function WeatherMap() {
  const [activeLayers, setActiveLayers] = useState(["precipitation"])
  const [currentTimeIndex, setCurrentTimeIndex] = useState(3) // 9:30 AM
  const [isPlaying, setIsPlaying] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(7)
  const [latLon, setLatLon] = useState<{ lat: number; lon: number }>({
    lat: 23.8103,
    lon: 90.4125,
  }) // default Dhaka
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Detect user location dynamically
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatLon({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          })
        },
        (err) => {
          console.warn("Geolocation denied or unavailable, using default location.")
        }
      )
    }
  }, [])

  const toggleLayer = (layerId: string) => {
    setActiveLayers((prev) =>
      prev.includes(layerId) ? prev.filter((id) => id !== layerId) : [...prev, layerId]
    )
  }

  const handlePlay = () => {
    if (isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setIsPlaying(false)
    } else {
      setIsPlaying(true)
      intervalRef.current = setInterval(() => {
        setCurrentTimeIndex((prev) => (prev + 1) % timeSlots.length)
      }, 1000)
    }
  }

  const handleTimeSliderChange = (index: number) => {
    setCurrentTimeIndex(index)
  }

  // const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 1, 15))
  // const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 1, 3))

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div className="backdrop-blur-sm rounded-xl shadow-sm  my-6">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <h2 className="text-xl font-semibold">Weather maps</h2>
      </div>

      {/* Map Container */}
      <div className="relative p-4 ">
        {/* Ventusky iframe */}
        <iframe
          id="ventuskyFrame"
          className="w-full h-[600px] rounded-xl"
          src={`https://www.ventusky.com/?p=${latLon.lat};${latLon.lon};${zoomLevel}`}
          frameBorder={0}
          allowFullScreen
        />

       
        {/* Weather Layer Toolbar */}
        <div className="absolute top-4 left-4 z-10 flex bg-gradient-to-r from-[#b36982] via-[#b36982] to-[#c49061]  w-[98%]  rounded-lg py-4 gap-1 ">
          {weatherLayers.map((layer) => (
            <Button
              key={layer.id}
              variant="ghost"
              size="sm"
              onClick={() => toggleLayer(layer.id)}
              className={cn(
                "w-10 h-10 p-0 text-lg hover:bg-white/20 transition-colors",
                activeLayers.includes(layer.id)
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-transparent text-white/70 hover:text-white"
              )}
              title={layer.label}
            >
              {layer.icon}
            </Button>
          ))}
        </div>
      </div>

      {/* Timeline Controls */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={handlePlay} className="w-10 h-10 p-0 rounded-full">
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>

          <div className="flex-1 relative">
            <div className="h-2 bg-slate-600 rounded-full relative overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentTimeIndex + 1) / timeSlots.length) * 100}%` }}
              />
              <div className="absolute inset-0 flex justify-between items-center px-1">
                {timeSlots.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleTimeSliderChange(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-200",
                      index <= currentTimeIndex ? "bg-white" : "bg-slate-400"
                    )}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-400">
              <span>{timeSlots[0]}</span>
              <span className="font-medium text-orange-400">
                {currentTimeIndex === 3 ? "NOW" : timeSlots[currentTimeIndex]}
              </span>
              <span>{timeSlots[timeSlots.length - 1]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

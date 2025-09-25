"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function WeatherBanner() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 p-10 my-10 animate-fade-in-up">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-4 right-8 w-24 h-24 bg-white/20 rounded-full blur-xl animate-pulse-subtle"></div>
        <div
          className="absolute bottom-6 left-12 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse-subtle"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/15 rounded-full blur-lg animate-pulse-subtle"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Weather particles animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse-subtle"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.3}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Left side - Location and main weather */}
        <div className="flex-1 space-y-4">
          <div className="animate-slide-in">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2 text-balance">
              Dhaka, Bangladesh
            </h1>
            <p className="text-white/80 text-lg">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-white/70">
              {currentTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </p>
          </div>

          <div
            className="flex items-center gap-8 animate-slide-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="text-center">
              <div className="text-6xl lg:text-7xl font-light text-white mb-2 animate-pulse-subtle">
                28°
              </div>
              <p className="text-white/90 text-xl font-medium">Haze</p>
            </div>

            <div className="space-y-2 text-white/80">
              <p className="text-lg">
                Feels like <span className="font-semibold text-white">31°</span>
              </p>
              <p className="text-sm">
                High: <span className="text-orange-200">35°</span> • Low:{" "}
                <span className="text-blue-200">24°</span>
              </p>
              <p className="text-sm">
                Humidity: <span className="text-cyan-200">75%</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Weather visualization */}
        <div
          className="flex-shrink-0 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="relative">
            {/* Weather icon container */}
            <div className="w-80 h-80 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
              <div className="animate-pulse-subtle w-full h-full flex items-center justify-center text-[12rem]">
                🌫️
              </div>
            </div>

            {/* Floating weather stats */}
            <div className="absolute -top-2 -right-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 border border-white/30">
              <p className="text-white text-sm font-medium">UV: 8</p>
            </div>
            <div className="absolute -bottom-2 -left-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 border border-white/30">
              <p className="text-white text-sm font-medium">AQI: 62</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-white/20">
        <div className="flex items-center gap-4 text-white/70 text-sm">
          <span>🌡️ Temperature trending up</span>
          <span>💨 Light breeze from SE</span>
          <span>☀️ UV index very high</span>
        </div>

        <Button
          variant="outline"
          className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm weather-button"
        >
          View 7-day forecast →
        </Button>
      </div>
    </div>
  );
}

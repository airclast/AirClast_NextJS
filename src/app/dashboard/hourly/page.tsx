"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  Eye,
  Thermometer,
  Gauge,
  Zap,
  BarChart3,
  List,
  TrendingUp,
  MapPin,
  Clock,
  Umbrella,
} from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Header } from "@/components/header";
import { DashboardSidebar } from "@/components/dashboard-sidebar";

const generateEnhancedHourlyData = () => {
  const hours = [];
  const now = new Date();

  for (let i = 0; i < 48; i++) {
    // Extended to 48 hours
    const time = new Date(now.getTime() + i * 60 * 60 * 1000);
    const temp = Math.round(22 + Math.sin(i * 0.3) * 8 + Math.random() * 4);
    const conditions = ["sunny", "partly-cloudy", "cloudy", "rainy", "stormy"][
      Math.floor(Math.random() * 5)
    ];
    const precipitation = Math.round(Math.random() * 100);
    const wind = Math.round(3 + Math.random() * 20);
    const humidity = Math.round(45 + Math.random() * 40);
    const uvIndex = Math.round(
      Math.max(0, 9 + Math.sin((i - 6) * 0.5) * 5 + Math.random() * 2)
    );
    const cloudCover = Math.round(Math.random() * 100);
    const dewPoint = temp - Math.round(Math.random() * 15);

    hours.push({
      time: time.getHours(),
      date: time.toLocaleDateString(),
      fullTime: time,
      temp,
      conditions,
      precipitation,
      wind,
      humidity,
      feelsLike: temp + Math.round(Math.random() * 6 - 3),
      visibility: Math.round(5 + Math.random() * 15),
      pressure: Math.round(1005 + Math.random() * 30),
      uvIndex,
      cloudCover,
      dewPoint,
      windDirection: Math.round(Math.random() * 360),
      windGust: wind + Math.round(Math.random() * 10),
    });
  }

  return hours;
};

const getWeatherIcon = (condition: string, size = "h-6 w-6") => {
  switch (condition) {
    case "sunny":
      return <Sun className={`${size} text-yellow-400`} />;
    case "partly-cloudy":
      return <Cloud className={`${size} text-gray-300`} />;
    case "cloudy":
      return <Cloud className={`${size} text-gray-500`} />;
    case "rainy":
      return <CloudRain className={`${size} text-blue-400`} />;
    case "stormy":
      return <Zap className={`${size} text-purple-400`} />;
    default:
      return <Sun className={`${size} text-yellow-400`} />;
  }
};

const formatTime = (hour: number) => {
  if (hour === 0) return "12 AM";
  if (hour === 12) return "12 PM";
  if (hour < 12) return `${hour} AM`;
  return `${hour - 12} PM`;
};

const getWindDirection = (degrees: number) => {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return directions[Math.round(degrees / 22.5) % 16];
};

export default function HourlyForecastPage() {
  const [selectedMetric, setSelectedMetric] = useState("temperature");
  const [viewMode, setViewMode] = useState<"graph" | "list">("graph");
  const [timeRange, setTimeRange] = useState<24 | 48>(24);
  const hourlyData = generateEnhancedHourlyData();

  const metrics = [
    {
      id: "temperature",
      label: "Temperature",
      icon: Thermometer,
      unit: "°C",
      color: "#8b7355",
    },
    {
      id: "precipitation",
      label: "Precipitation",
      icon: CloudRain,
      unit: "%",
      color: "#6b5b73",
    },
    {
      id: "wind",
      label: "Wind Speed",
      icon: Wind,
      unit: "km/h",
      color: "#a68b5b",
    },
    {
      id: "humidity",
      label: "Humidity",
      icon: Droplets,
      unit: "%",
      color: "#c4a373",
    },
    {
      id: "visibility",
      label: "Visibility",
      icon: Eye,
      unit: "km",
      color: "#7d6b5d",
    },
    {
      id: "pressure",
      label: "Pressure",
      icon: Gauge,
      unit: "hPa",
      color: "#8b7355",
    },
    { id: "uvIndex", label: "UV Index", icon: Zap, unit: "", color: "#a68b5b" },
    {
      id: "cloudCover",
      label: "Cloud Cover",
      icon: Cloud,
      unit: "%",
      color: "#6b5b73",
    },
  ];

  const getMetricValue = (hour: any, metric: string) => {
    switch (metric) {
      case "temperature":
        return hour.temp;
      case "precipitation":
        return hour.precipitation;
      case "wind":
        return hour.wind;
      case "humidity":
        return hour.humidity;
      case "visibility":
        return hour.visibility;
      case "pressure":
        return hour.pressure;
      case "uvIndex":
        return hour.uvIndex;
      case "cloudCover":
        return hour.cloudCover;
      default:
        return hour.temp;
    }
  };

  const currentMetric = metrics.find((m) => m.id === selectedMetric)!;
  const chartData = hourlyData.slice(0, timeRange);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar fixed left */}
        <Header />
      <div className="w-64 border-r border-border bg-card sticky top-0 h-screen">
        <DashboardSidebar />
      </div>

      {/* Main content */}
      <div className="w-[100%] mx-auto mt-14 ">

        <div className="py-2 max-w-6xl mx-auto space-y-12 ">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl md:text-7xl font-serif text-foreground mb-6 tracking-tight">
              Hourly Forecast
            </h1>
            <p className="text-muted-foreground text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Detailed weather analytics and predictions with sophisticated data
              visualization
            </p>
            <div className="flex items-center justify-center gap-6 text-muted-foreground mb-8">
              <Badge
                variant="outline"
                className="bg-card border-border text-foreground px-4 py-2"
              >
                <Clock className="w-4 h-4 mr-2" />
                Live Updates
              </Badge>
              <Badge
                variant="outline"
                className="bg-card border-border text-foreground px-4 py-2"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Los Angeles, CA
              </Badge>
            </div>

            <div className="flex justify-center">
              <div className="bg-card rounded-xl p-2 border border-border shadow-sm">
                <Button
                  onClick={() => setTimeRange(24)}
                  variant="ghost"
                  className={`transition-all duration-300 rounded-lg px-6 py-2 ${
                    timeRange === 24
                      ? "bg-yellow-500 text-black hover:bg-yellow-400"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  24 Hours
                </Button>
                <Button
                  onClick={() => setTimeRange(48)}
                  variant="ghost"
                  className={`transition-all duration-300 rounded-lg px-6 py-2 ${
                    timeRange === 48
                      ? "bg-yellow-500 text-black hover:bg-yellow-400"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  48 Hours
                </Button>
              </div>
            </div>
          </motion.div>


          <div className="mb-8 flex justify-center ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex flex-wrap gap-4 justify-center">
              {metrics.map((metric, index) => {
                const IconComponent = metric.icon;
                return (
                  <motion.div
                    key={metric.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => setSelectedMetric(metric.id)}
                      className={`flex items-center gap-3 transition-all duration-300 rounded-xl px-6 py-3 border ${
                        selectedMetric === metric.id
                          ? "bg-yellow-500 text-black hover:bg-yellow-400 shadow-md"
                          : "bg-card text-foreground hover:text-white border-border hover:border-primary/30 hover:shadow-sm"
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      {metric.label}
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
            <div className="bg-card rounded-xl p-2 border border-border shadow-sm flex">
              <Button
                onClick={() => setViewMode("graph")}
                variant="ghost"
                className={`flex items-center gap-2 transition-all duration-300 rounded-lg px-6 py-2 ${
                  viewMode === "graph"
                    ? "bg-yellow-500 text-black hover:bg-yellow-400"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                Graph View
              </Button>
              <Button
                onClick={() => setViewMode("list")}
                variant="ghost"
                className={`flex items-center gap-2 transition-all duration-300 rounded-lg px-6 py-2 ${
                  viewMode === "list"
                    ? "bg-yellow-500 text-black hover:bg-yellow-400"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <List className="h-4 w-4" />
                List View
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-card border-border shadow-lg rounded-2xl overflow-hidden">
              <CardHeader className="pb-6">
                <CardTitle className="text-3xl font-serif text-foreground flex items-center gap-4">
                  <currentMetric.icon
                    className="h-8 w-8"
                    style={{ color: currentMetric.color }}
                  />
                  <span>{currentMetric.label} Forecast</span>
                  <TrendingUp className="h-6 w-6 text-secondary ml-auto" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <AnimatePresence mode="wait">
                  {viewMode === "graph" ? (
                    <motion.div
                      key="graph"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="h-96 mb-12">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={chartData}>
                            <defs>
                              <linearGradient
                                id="metricGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="5%"
                                  stopColor={currentMetric.color}
                                  stopOpacity={0.2}
                                />
                                <stop
                                  offset="95%"
                                  stopColor={currentMetric.color}
                                  stopOpacity={0.05}
                                />
                              </linearGradient>
                            </defs>
                            <CartesianGrid
                              strokeDasharray="2 2"
                              stroke="#e8e6e3"
                              strokeOpacity={0.5}
                            />
                            <XAxis
                              dataKey="time"
                              tick={{ fontSize: 12, fill: "#6b6b6b" }}
                              tickLine={false}
                              axisLine={false}
                            />
                            <YAxis
                              tick={{ fontSize: 12, fill: "#6b6b6b" }}
                              tickLine={false}
                              axisLine={false}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#ffffff",
                                border: `1px solid ${currentMetric.color}`,
                                borderRadius: "12px",
                                color: "#2c2c2c",
                                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                              }}
                            />
                            <Area
                              type="monotone"
                              dataKey={selectedMetric}
                              stroke={currentMetric.color}
                              strokeWidth={2}
                              fill="url(#metricGradient)"
                              name={`${currentMetric.label} (${currentMetric.unit})`}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="overflow-x-auto">
                        <div
                          className="flex gap-6 pb-4"
                          style={{ minWidth: "max-content" }}
                        >
                          {chartData.slice(0, 12).map((hour, index) => {
                            const value = getMetricValue(hour, selectedMetric);
                            const isCurrentHour = index === 0;

                            return (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.3,
                                  delay: 0.03 * index,
                                }}
                                whileHover={{ scale: 1.02, y: -2 }}
                                className={`flex flex-col items-center p-8 rounded-2xl min-w-[160px] transition-all duration-300 border group ${
                                  isCurrentHour
                                    ? "bg-primary/5 border-primary shadow-md"
                                    : "bg-card border-border hover:border-primary/30 hover:shadow-sm"
                                }`}
                              >
                                <div
                                  className={`text-sm font-medium mb-4 ${
                                    isCurrentHour
                                      ? "text-primary"
                                      : "text-muted-foreground"
                                  }`}
                                >
                                  {index === 0 ? "Now" : formatTime(hour.time)}
                                </div>

                                <div className="mb-4 transform group-hover:scale-110 transition-transform">
                                  {getWeatherIcon(hour.conditions, "h-10 w-10")}
                                </div>

                                <div className="text-3xl font-bold text-foreground mb-2">
                                  {hour.temp}°
                                </div>
                                <div className="text-sm text-muted-foreground mb-3">
                                  Feels {hour.feelsLike}°
                                </div>

                                <div
                                  className="text-lg font-semibold mb-3"
                                  style={{ color: currentMetric.color }}
                                >
                                  {value}
                                  {currentMetric.unit}
                                </div>

                                {hour.precipitation > 0 && (
                                  <div className="text-xs text-primary bg-primary/10 px-3 py-1 rounded-full mb-2">
                                    <Umbrella className="h-3 w-3 inline mr-1" />
                                    {hour.precipitation}%
                                  </div>
                                )}

                                <div className="text-xs text-muted-foreground text-center space-y-1">
                                  <div>
                                    {getWindDirection(hour.windDirection)}{" "}
                                    {hour.wind} km/h
                                  </div>
                                  <div>{hour.humidity}% humidity</div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="list"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {chartData.slice(0, 24).map((hour, index) => {
                        const value = getMetricValue(hour, selectedMetric);
                        const isCurrentHour = index === 0;

                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: 0.02 * index }}
                            className={`flex items-center justify-between p-6 rounded-xl transition-all duration-200 border group hover:shadow-sm ${
                              isCurrentHour
                                ? "bg-primary/5 border-primary"
                                : "bg-card border-border hover:border-primary/30"
                            }`}
                          >
                            <div className="flex items-center gap-8">
                              <div
                                className={`text-sm font-medium min-w-[80px] ${
                                  isCurrentHour
                                    ? "text-primary"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {index === 0 ? "Now" : formatTime(hour.time)}
                              </div>
                              <div className="transform group-hover:scale-110 transition-transform">
                                {getWeatherIcon(hour.conditions, "h-6 w-6")}
                              </div>
                              <div className="text-2xl font-bold text-foreground">
                                {hour.temp}°
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Feels {hour.feelsLike}°
                              </div>
                            </div>

                            <div className="flex items-center gap-10">
                              <div
                                className="text-xl font-semibold"
                                style={{ color: currentMetric.color }}
                              >
                                {value}
                                {currentMetric.unit}
                              </div>
                              <div className="text-sm text-muted-foreground text-right space-y-1">
                                <div>
                                  {getWindDirection(hour.windDirection)}{" "}
                                  {hour.wind} km/h
                                </div>
                                <div>{hour.humidity}% humidity</div>
                              </div>
                              {hour.precipitation > 0 && (
                                <div className="text-sm text-primary bg-primary/10 px-4 py-2 rounded-full">
                                  {hour.precipitation}%
                                </div>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: Wind,
                label: "Wind",
                value: `${hourlyData[0].wind} km/h`,
                detail: `Gusts ${hourlyData[0].windGust} km/h`,
                color: "text-secondary",
              },
              {
                icon: Droplets,
                label: "Humidity",
                value: `${hourlyData[0].humidity}%`,
                detail: `Dew point ${hourlyData[0].dewPoint}°`,
                color: "text-chart-2",
              },
              {
                icon: Eye,
                label: "Visibility",
                value: `${hourlyData[0].visibility} km`,
                detail: `Cloud cover ${hourlyData[0].cloudCover}%`,
                color: "text-chart-3",
              },
              {
                icon: Gauge,
                label: "Pressure",
                value: `${hourlyData[0].pressure} hPa`,
                detail: `UV Index ${hourlyData[0].uvIndex}`,
                color: "text-chart-4",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <Card className="bg-card border-border shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-6">
                      <item.icon className={`h-12 w-12 ${item.color}`} />
                      <div>
                        <div className="text-sm text-muted-foreground font-medium mb-1">
                          {item.label}
                        </div>
                        <div className="text-3xl font-bold text-foreground mb-1">
                          {item.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {item.detail}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

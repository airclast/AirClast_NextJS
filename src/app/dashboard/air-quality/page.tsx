"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AQIDisplay } from "@/components/aqi-display";
import {
  generateMockAirQualityData,
  generateMockTempoData,
  mockGroundStations,
  generateMockForecasts,
} from "@/lib/mock-data";
import {
  Wind,
  Activity,
  TrendingUp,
  Shield,
  Heart,
  Leaf,
  MapPin,
  Clock,
  Zap,
  Eye,
  Droplets,
} from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";
import { Header } from "@/components/header";
import { DashboardSidebar } from "@/components/dashboard-sidebar";

export default function AirQualityPage() {
  const airQualityData = generateMockAirQualityData(48);
  const tempoData = generateMockTempoData(24);
  const forecasts = generateMockForecasts(7);
  const currentMeasurement = airQualityData[0];

  const pollutantData = airQualityData.slice(0, 24).map((measurement) => ({
    time: new Date(measurement.timestamp).getHours(),
    pm25: measurement.pm25,
    pm10: measurement.pm10,
    o3: measurement.o3,
    no2: measurement.no2,
    co: measurement.co,
    so2: measurement.so2,
    aqi: measurement.aqi,
  }));

  const healthRecommendations = [
    {
      icon: Heart,
      title: "Sensitive Groups",
      description:
        "People with heart or lung disease, older adults, and children should reduce prolonged outdoor exertion.",
      color: "text-chart-4",
    },
    {
      icon: Activity,
      title: "General Public",
      description:
        "Moderate outdoor activities are acceptable for most people.",
      color: "text-secondary",
    },
    {
      icon: Shield,
      title: "Protection",
      description:
        "Consider wearing a mask when outdoors if you're sensitive to air pollution.",
      color: "text-chart-2",
    },
  ];

  const aqiLevels = [
    {
      range: "0-50",
      level: "Good",
      color: "bg-green-500",
      description: "Air quality is satisfactory",
    },
    {
      range: "51-100",
      level: "Moderate",
      color: "bg-yellow-500",
      description: "Acceptable for most people",
    },
    {
      range: "101-150",
      level: "Unhealthy for Sensitive",
      color: "bg-orange-500",
      description: "Sensitive groups may experience symptoms",
    },
    {
      range: "151-200",
      level: "Unhealthy",
      color: "bg-red-500",
      description: "Everyone may experience health effects",
    },
    {
      range: "201-300",
      level: "Very Unhealthy",
      color: "bg-purple-500",
      description: "Health alert for everyone",
    },
    {
      range: "301+",
      level: "Hazardous",
      color: "bg-red-800",
      description: "Emergency conditions",
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
       {/* Header */}
              <Header />
            {/* Sidebar */}
            <div className="w-64 border-r border-border bg-card sticky top-0 h-screen">
      
            <DashboardSidebar />
            </div>

      {/* Main Section */}
      <div className="flex-1  flex flex-col">

        <div className="flex-1 mt-16 p-8 space-y-12 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl md:text-7xl font-serif text-foreground mb-6 tracking-tight">
              Air Quality Monitor
            </h1>
            <p className="text-muted-foreground text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Comprehensive air quality analysis with sophisticated health
              recommendations and real-time monitoring
            </p>
            <div className="flex items-center justify-center gap-6 text-muted-foreground">
              <Badge
                variant="outline"
                className="bg-card border-border text-foreground px-4 py-2"
              >
                <Activity className="w-4 h-4 mr-2" />
                Live Data
              </Badge>
              <Badge
                variant="outline"
                className="bg-card border-border text-foreground px-4 py-2"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Dhaka, Bangladesh
              </Badge>
              <Badge
                variant="outline"
                className="bg-card border-border text-foreground px-4 py-2"
              >
                <Clock className="w-4 h-4 mr-2" />
                Updated 2 min ago
              </Badge>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AQIDisplay
              measurement={currentMeasurement}
              location={mockGroundStations[0]}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-card border-border shadow-lg rounded-2xl overflow-hidden">
              <CardHeader className="pb-6">
                <CardTitle className="text-3xl font-serif text-foreground flex items-center gap-4">
                  <TrendingUp className="h-8 w-8 text-secondary" />
                  24-Hour AQI Trend
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={pollutantData}>
                      <defs>
                        <linearGradient
                          id="aqiTrendGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#8b7355"
                            stopOpacity={0.2}
                          />
                          <stop
                            offset="95%"
                            stopColor="#8b7355"
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
                          border: "1px solid #8b7355",
                          borderRadius: "12px",
                          color: "#2c2c2c",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="aqi"
                        stroke="#8b7355"
                        strokeWidth={2}
                        fill="url(#aqiTrendGradient)"
                        name="AQI"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {[
              {
                key: "pm25",
                name: "PM2.5",
                color: "#8b7355",
                icon: Droplets,
                unit: "μg/m³",
              },
              {
                key: "pm10",
                name: "PM10",
                color: "#a68b5b",
                icon: Eye,
                unit: "μg/m³",
              },
              {
                key: "o3",
                name: "Ozone",
                color: "#c4a373",
                icon: Zap,
                unit: "μg/m³",
              },
              {
                key: "no2",
                name: "NO₂",
                color: "#6b5b73",
                icon: Wind,
                unit: "μg/m³",
              },
            ].map((pollutant, index) => (
              <motion.div
                key={pollutant.key}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="bg-card border-border shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-serif text-foreground flex items-center gap-3">
                      <pollutant.icon
                        className="h-6 w-6"
                        style={{ color: pollutant.color }}
                      />
                      {pollutant.name} Levels
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={pollutantData.slice(0, 12)}>
                          <CartesianGrid
                            strokeDasharray="2 2"
                            stroke="#e8e6e3"
                            strokeOpacity={0.3}
                          />
                          <XAxis
                            dataKey="time"
                            tick={{ fontSize: 10, fill: "#6b6b6b" }}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis
                            tick={{ fontSize: 10, fill: "#6b6b6b" }}
                            tickLine={false}
                            axisLine={false}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#ffffff",
                              border: `1px solid ${pollutant.color}`,
                              borderRadius: "8px",
                              color: "#2c2c2c",
                              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey={pollutant.key}
                            stroke={pollutant.color}
                            strokeWidth={2}
                            dot={{
                              fill: pollutant.color,
                              strokeWidth: 2,
                              r: 3,
                            }}
                            name={`${pollutant.name} (${pollutant.unit})`}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="bg-card border-border shadow-lg rounded-2xl overflow-hidden">
              <CardHeader className="pb-6">
                <CardTitle className="text-3xl font-serif text-foreground flex items-center gap-4">
                  <Heart className="h-8 w-8 text-chart-4" />
                  Health Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {healthRecommendations.map((rec, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="group"
                    >
                      <div className="p-8 rounded-xl bg-muted/30 border border-border transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-sm">
                        <rec.icon className={`h-10 w-10 ${rec.color} mb-6`} />
                        <h3 className="text-xl font-serif text-foreground mb-3">
                          {rec.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {rec.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Card className="bg-card border-border shadow-lg rounded-2xl overflow-hidden">
              <CardHeader className="pb-6">
                <CardTitle className="text-3xl font-serif text-foreground flex items-center gap-4">
                  <Leaf className="h-8 w-8 text-secondary" />
                  AQI Scale Reference
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {aqiLevels.map((level, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.05 * index }}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-6 p-6 rounded-xl bg-muted/20 border border-border hover:border-primary/30 transition-all duration-300"
                    >
                      <div
                        className={`w-5 h-5 rounded-full ${level.color}`}
                      ></div>
                      <div>
                        <div className="text-foreground font-semibold text-lg">
                          {level.range}
                        </div>
                        <div className="text-sm text-muted-foreground font-medium">
                          {level.level}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {level.description}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

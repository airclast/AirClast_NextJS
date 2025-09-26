// "use client";

// import Link from "next/link";
// // import { AQIDisplay } from "@/components/aqi-display";
// // import { AirQualityChart } from "@/components/air-quality-chart";
// // import { LocationSelector } from "@/components/location-selector";
// // import { QuickStats } from "@/components/quick-stats";
// import { mockUserLocations, generateMockAirQualityData } from "@/lib/mock-data";
// import { Header } from "@/components/header";
// import WeatherDashboard from "@/components/weather-dashboard";
// import MonthlyCalendar from "@/components/sections/monthly-calendar";
// import WeatherTrends from "@/components/sections/weather-trends";
// import WeatherDetailsCarousel from "@/components/sections/weather-details-carousel";
// import WeatherBanner from "@/components/weather-banner";
// import { Bot } from "lucide-react";
// import Footer from "@/components/footer";
// import WeatherMap from "@/components/weather-map";

// export default function HomePage() {
//   // Get current data for primary location
//   // const primaryLocation = mockUserLocations.find((loc) => loc.isPrimary);
//   // const currentAirQuality = generateMockAirQualityData(1)[0];
//   // const chartData = generateMockAirQualityData(24);

//   return (
//     <div className="min-h-screen bg-background relative">
//       <Header />

//       <div className="bg-background w-[95%] mx-auto py-10">
//         <WeatherBanner />
//         <WeatherDashboard />
//         <WeatherDetailsCarousel />
//         <MonthlyCalendar />
//         <WeatherTrends />
//         <WeatherMap />
//       </div>
//         <Footer />

//       {/* Floating Chatbot Button */}
//       <Link href="/dashboard/chat" passHref>
//         <div className="fixed bottom-6 right-6 z-50">
//           <div className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
//             <Bot className="h-7 w-7 text-white" />
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { Header } from "@/components/header";
import WeatherDashboard from "@/components/weather-dashboard";
import MonthlyCalendar from "@/components/sections/monthly-calendar";
import WeatherTrends from "@/components/sections/weather-trends";
import WeatherDetailsCarousel from "@/components/sections/weather-details-carousel";
import WeatherBanner from "@/components/weather-banner";
import { Bot } from "lucide-react";
import Footer from "@/components/footer";
import WeatherMap from "@/components/weather-map";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HomePage() {
  const messages = ["Ask me about weather!", "I'm here to assist you.", "Let's chat 💬"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000); // 3 sec por por message change
    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <div className="min-h-screen bg-background relative">
      <Header />

      <div className="bg-background w-[95%] mx-auto py-10">
        <WeatherBanner />
        <WeatherDashboard />
        <WeatherDetailsCarousel />
        <MonthlyCalendar />
        <WeatherTrends />
        <WeatherMap />
      </div>

      <Footer />

      {/* Floating Chatbot Button with message */}
      <Link href="/dashboard/chat" passHref>
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2">
          {/* Animated Message */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
              className="bg-white px-3 py-1 rounded-xl shadow-md text-sm font-medium text-gray-700"
            >
              {messages[index]}
            </motion.div>
          </AnimatePresence>

          {/* Chat Icon */}
          <div className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
            <Bot className="h-7 w-7 text-white" />
          </div>
        </div>
      </Link>
    </div>
  );
}

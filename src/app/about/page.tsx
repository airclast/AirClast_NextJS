import Link from "next/link"
import { ArrowLeft, Github, Linkedin, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <div>
     <Header />
       <div className=" weather-gradient">

      <div className="max-w-6xl mx-auto px-4 pt-12">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3">
            <div className="sticky top-8 space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">SKY Guard Weather</h1>
                <p className="text-lg  mb-6">Advanced Weather Intelligence Platform</p>
                <p className=" leading-relaxed">
                  Delivering comprehensive weather insights through cutting-edge technology and intuitive design.
                </p>
              </div>

              <nav className="space-y-1">
                <div className="flex items-center gap-3 py-2 px-3 rounded-lg border-l-2 border-blue-400">
                  <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                  <span className="text-blue-400  font-medium">ABOUT</span>
                </div>
                <Link
                  href="#mission"
                  className="flex items-center gap-3 py-2 px-3 rounded-lg transition-colors"
                >
                  <div className="w-1 h-1  rounded-full"></div>
                  <span>MISSION</span>
                </Link>
                <Link
                  href="#features"
                  className="flex items-center gap-3 py-2 px-3 rounded-lg transition-colors"
                >
                  <div className="w-1 h-1  rounded-full"></div>
                  <span>FEATURES</span>
                </Link>
                <Link
                  href="#team"
                  className="flex items-center gap-3 py-2 px-3 rounded-lg transition-colors"
                >
                  <div className="w-1 h-1  rounded-full"></div>
                  <span>TEAM</span>
                </Link>
              </nav>

              <div className="flex gap-4">
                <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
                  <Github className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-12 mt-12">
            <section className="animate-fade-in-up">
              <p className="text-xl  leading-relaxed mb-8">
                SKY Guard Weather is a comprehensive weather intelligence platform that combines real-time meteorological data
                with advanced visualization techniques to deliver accurate, actionable weather insights. Our platform
                serves millions of users worldwide with precise forecasts, interactive maps, and intelligent weather
                analysis.
              </p>

              <p className=" leading-relaxed mb-8">
                Built with modern web technologies including <span className="text-blue-400 font-medium">Next.js</span>,
                <span className="text-blue-400 font-medium"> React</span>, and{" "}
                <span className="text-blue-400 font-medium">TypeScript</span>, our platform ensures optimal performance
                and accessibility across all devices. We integrate with multiple weather data sources to provide the
                most comprehensive and accurate forecasting available.
              </p>
            </section>

            <section id="mission" className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-2xl font-bold  mb-6">Our Mission</h2>
              <div className=" backdrop-blur-sm rounded-xl p-8 border ">
                <p className=" leading-relaxed mb-6">
                  To democratize access to professional-grade weather intelligence through innovative technology and
                  user-centered design. We believe everyone deserves accurate, timely weather information to make
                  informed decisions about their daily lives.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">99.9%</div>
                    <div className="text-sm ">Uptime Reliability</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">50M+</div>
                    <div className="text-sm ">Monthly Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
                    <div className="text-sm ">Data Updates</div>
                  </div>
                </div>
              </div>
            </section>

            <section id="features" className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <h2 className="text-2xl font-bold mb-6">Platform Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="backdrop-blur-sm rounded-xl p-6  weather-card-hover">
                  <h3 className="text-lg font-semibold mb-3">Interactive Weather Maps</h3>
                  <p className=" leading-relaxed">
                    Advanced radar and satellite imagery with multiple weather layers including precipitation,
                    temperature, wind patterns, and severe weather alerts.
                  </p>
                </div>
                <div className="backdrop-blur-sm rounded-xl p-6  weather-card-hover">
                  <h3 className="text-lg font-semibold mb-3">AI-Powered Forecasting</h3>
                  <p className=" leading-relaxed">
                    Machine learning algorithms analyze historical patterns and current conditions to provide highly
                    accurate short and long-term weather predictions.
                  </p>
                </div>
                <div className="backdrop-blur-sm rounded-xl p-6  weather-card-hover">
                  <h3 className="text-lg font-semibold mb-3">Real-time Alerts</h3>
                  <p className=" leading-relaxed">
                    Instant notifications for severe weather conditions, helping users stay safe and prepared for
                    changing weather patterns.
                  </p>
                </div>
                <div className="backdrop-blur-sm rounded-xl p-6  weather-card-hover">
                  <h3 className="text-lg font-semibold mb-3">Detailed Analytics</h3>
                  <p className=" leading-relaxed">
                    Comprehensive weather trends, historical data analysis, and climate insights to help users
                    understand long-term weather patterns.
                  </p>
                </div>
              </div>
            </section>

            <section id="team" className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              <h2 className="text-2xl font-bold mb-6">Our Team</h2>
              <div className="backdrop-blur-sm rounded-xl p-8 ">
                <p className=" leading-relaxed mb-8">
                  Our diverse team of meteorologists, engineers, and designers work together to create the most
                  comprehensive weather platform available. We're passionate about leveraging technology to make weather
                  information more accessible and actionable.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-semibold">
                      MS
                    </div>
                    <div>
                      <h4 className="font-semibold">Meteorology Team</h4>
                      <p className="text-sm  mb-2">Weather Science & Analysis</p>
                      <p className=" text-sm leading-relaxed">
                        Expert meteorologists ensuring data accuracy and developing advanced forecasting models.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center font-semibold">
                      ET
                    </div>
                    <div>
                      <h4 className="font-semibold">Engineering Team</h4>
                      <p className="text-sm  mb-2">Platform Development</p>
                      <p className=" text-sm leading-relaxed">
                        Full-stack engineers building scalable, performant weather intelligence systems.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-700/50">
                  <div className="flex items-center gap-2 ">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Headquartered in Seattle, WA with team members worldwide</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
       </div>

      <Footer />
    </div>
  )
}

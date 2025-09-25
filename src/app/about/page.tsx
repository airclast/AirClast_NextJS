import Link from "next/link"
import { ArrowLeft, Github, Linkedin, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen weather-gradient">
      {/* Navigation Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Weather
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/about" className="text-blue-400 font-medium">
              About
            </Link>
            <Link href="/contact" className="text-slate-300 hover:text-white transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3">
            <div className="sticky top-8 space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">MSN Weather</h1>
                <p className="text-lg text-slate-400 mb-6">Advanced Weather Intelligence Platform</p>
                <p className="text-slate-300 leading-relaxed">
                  Delivering comprehensive weather insights through cutting-edge technology and intuitive design.
                </p>
              </div>

              <nav className="space-y-1">
                <div className="flex items-center gap-3 py-2 px-3 bg-blue-600/20 rounded-lg border-l-2 border-blue-400">
                  <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                  <span className="text-blue-400 font-medium">ABOUT</span>
                </div>
                <Link
                  href="#mission"
                  className="flex items-center gap-3 py-2 px-3 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
                >
                  <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                  <span>MISSION</span>
                </Link>
                <Link
                  href="#features"
                  className="flex items-center gap-3 py-2 px-3 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
                >
                  <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                  <span>FEATURES</span>
                </Link>
                <Link
                  href="#team"
                  className="flex items-center gap-3 py-2 px-3 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
                >
                  <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                  <span>TEAM</span>
                </Link>
              </nav>

              <div className="flex gap-4">
                <Button variant="ghost" size="sm" className="w-10 h-10 p-0 text-slate-400 hover:text-white">
                  <Github className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="w-10 h-10 p-0 text-slate-400 hover:text-white">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="w-10 h-10 p-0 text-slate-400 hover:text-white">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-12">
            <section className="animate-fade-in-up">
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                MSN Weather is a comprehensive weather intelligence platform that combines real-time meteorological data
                with advanced visualization techniques to deliver accurate, actionable weather insights. Our platform
                serves millions of users worldwide with precise forecasts, interactive maps, and intelligent weather
                analysis.
              </p>

              <p className="text-slate-400 leading-relaxed mb-8">
                Built with modern web technologies including <span className="text-blue-400 font-medium">Next.js</span>,
                <span className="text-blue-400 font-medium"> React</span>, and{" "}
                <span className="text-blue-400 font-medium">TypeScript</span>, our platform ensures optimal performance
                and accessibility across all devices. We integrate with multiple weather data sources to provide the
                most comprehensive and accurate forecasting available.
              </p>
            </section>

            <section id="mission" className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-2xl font-bold text-white mb-6">Our Mission</h2>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
                <p className="text-slate-300 leading-relaxed mb-6">
                  To democratize access to professional-grade weather intelligence through innovative technology and
                  user-centered design. We believe everyone deserves accurate, timely weather information to make
                  informed decisions about their daily lives.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">99.9%</div>
                    <div className="text-sm text-slate-400">Uptime Reliability</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">50M+</div>
                    <div className="text-sm text-slate-400">Monthly Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
                    <div className="text-sm text-slate-400">Data Updates</div>
                  </div>
                </div>
              </div>
            </section>

            <section id="features" className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <h2 className="text-2xl font-bold text-white mb-6">Platform Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 weather-card-hover">
                  <h3 className="text-lg font-semibold text-white mb-3">Interactive Weather Maps</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Advanced radar and satellite imagery with multiple weather layers including precipitation,
                    temperature, wind patterns, and severe weather alerts.
                  </p>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 weather-card-hover">
                  <h3 className="text-lg font-semibold text-white mb-3">AI-Powered Forecasting</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Machine learning algorithms analyze historical patterns and current conditions to provide highly
                    accurate short and long-term weather predictions.
                  </p>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 weather-card-hover">
                  <h3 className="text-lg font-semibold text-white mb-3">Real-time Alerts</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Instant notifications for severe weather conditions, helping users stay safe and prepared for
                    changing weather patterns.
                  </p>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 weather-card-hover">
                  <h3 className="text-lg font-semibold text-white mb-3">Detailed Analytics</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Comprehensive weather trends, historical data analysis, and climate insights to help users
                    understand long-term weather patterns.
                  </p>
                </div>
              </div>
            </section>

            <section id="team" className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              <h2 className="text-2xl font-bold text-white mb-6">Our Team</h2>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
                <p className="text-slate-300 leading-relaxed mb-8">
                  Our diverse team of meteorologists, engineers, and designers work together to create the most
                  comprehensive weather platform available. We're passionate about leveraging technology to make weather
                  information more accessible and actionable.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      MS
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Meteorology Team</h4>
                      <p className="text-sm text-slate-400 mb-2">Weather Science & Analysis</p>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        Expert meteorologists ensuring data accuracy and developing advanced forecasting models.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      ET
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Engineering Team</h4>
                      <p className="text-sm text-slate-400 mb-2">Platform Development</p>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        Full-stack engineers building scalable, performant weather intelligence systems.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-700/50">
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Headquartered in Seattle, WA with team members worldwide</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

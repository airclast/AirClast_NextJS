import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Satellite, Cloud, BarChart3, Smartphone, Globe, Users, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { AnimatedText } from "@/components/animated-text"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 overflow-hidden relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge
              variant="secondary"
              className="mb-4 transition-all duration-300 hover:scale-105 bg-white/10 backdrop-blur-sm border-white/20"
            >
              <Satellite className="w-4 h-4 mr-2 animate-pulse" />
              Powered by NASA TEMPO & Sentinel-5P
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              <AnimatedText text="From Earth Data to Action: Forecasting Cleaner, Safer Skies" delay={30} />
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Advanced air quality forecasting using satellite data, ground sensors, and machine learning to predict AQI
              24-72 hours ahead.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button
                  size="lg"
                  className="w-full sm:w-auto transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
                >
                  Get Started{" "}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/workflow">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-slate-900/80 backdrop-blur-sm border-slate-700 text-white hover:bg-slate-800/90 hover:text-white transition-all duration-300 hover:scale-105 dark:bg-white/90 dark:text-slate-900 dark:border-slate-300 dark:hover:bg-white dark:hover:text-slate-900"
                >
                  View Workflow
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Data Sources Section */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Comprehensive Data Sources</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Integrating multiple satellite missions, ground sensors, and weather data for accurate predictions
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="backdrop-blur-xl bg-white/10 border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/15 group">
              <CardHeader>
                <Satellite className="h-8 w-8 text-primary mb-2 transition-all duration-300 group-hover:rotate-12" />
                <CardTitle>NASA TEMPO</CardTitle>
                <CardDescription>Hourly geostationary pollution monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Real-time NO₂, O₃, SO₂, and aerosol measurements across North America with unprecedented temporal
                  resolution.
                </p>
              </CardContent>
            </Card>
            <Card className="backdrop-blur-xl bg-white/10 border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/15 group">
              <CardHeader>
                <Globe className="h-8 w-8 text-primary mb-2 transition-all duration-300 group-hover:rotate-12" />
                <CardTitle>Sentinel-5P TROPOMI</CardTitle>
                <CardDescription>Global atmospheric composition data</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Daily global measurements of trace gases including methane, CO, and formaldehyde from ESA's satellite
                  mission.
                </p>
              </CardContent>
            </Card>
            <Card className="backdrop-blur-xl bg-white/10 border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/15 group">
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-primary mb-2 transition-all duration-300 group-hover:rotate-12" />
                <CardTitle>Ground Sensors</CardTitle>
                <CardDescription>EPA AirNow & PurpleAir networks</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Official government monitoring stations combined with crowdsourced sensor data for local validation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* System Architecture Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Advanced Analytics Engine</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Machine learning models combined with physics-based forecasting for reliable predictions
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4 group transition-all duration-300 hover:translate-x-2">
                <div className="bg-primary/10 p-2 rounded-lg transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <Cloud className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Data Ingestion & Preprocessing</h3>
                  <p className="text-sm text-muted-foreground">
                    Automated pipelines process satellite NetCDF/HDF5 data, normalize ground measurements, and
                    interpolate weather conditions.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 group transition-all duration-300 hover:translate-x-2">
                <div className="bg-primary/10 p-2 rounded-lg transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">ML Forecasting Models</h3>
                  <p className="text-sm text-muted-foreground">
                    LSTM/GRU networks and Transformer models trained on multi-variate pollution and meteorological data.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 group transition-all duration-300 hover:translate-x-2">
                <div className="bg-primary/10 p-2 rounded-lg transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Validation & Quality Control</h3>
                  <p className="text-sm text-muted-foreground">
                    Hybrid approach combining physics-based models (GEOS-Chem, CAMS) with machine learning for accuracy.
                  </p>
                </div>
              </div>
            </div>
            <Card className="p-6 backdrop-blur-xl bg-white/10 border-white/20 transition-all duration-300 hover:scale-105">
              <div className="text-center space-y-4">
                <div className="text-4xl font-bold text-primary">24-72h</div>
                <p className="text-muted-foreground">Forecast Range</p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-semibold text-foreground">5+</div>
                    <p className="text-xs text-muted-foreground">Pollutants Tracked</p>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-foreground">1hr</div>
                    <p className="text-xs text-muted-foreground">Update Frequency</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Layer Section */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Multi-Platform Applications</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Accessible through web dashboards, mobile apps, and specialized tools for different user needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center backdrop-blur-xl bg-white/10 border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/15 group">
              <CardHeader>
                <Globe className="h-12 w-12 text-primary mx-auto mb-2 transition-all duration-300 group-hover:rotate-12" />
                <CardTitle className="text-lg">Web Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Interactive maps with real-time AQI visualization and forecast timelines
                </p>
              </CardContent>
            </Card>
            <Card className="text-center backdrop-blur-xl bg-white/10 border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/15 group">
              <CardHeader>
                <Smartphone className="h-12 w-12 text-primary mx-auto mb-2 transition-all duration-300 group-hover:rotate-12" />
                <CardTitle className="text-lg">Mobile App</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Push notifications and personalized health recommendations on-the-go
                </p>
              </CardContent>
            </Card>
            <Card className="text-center backdrop-blur-xl bg-white/10 border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/15 group">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-primary mx-auto mb-2 transition-all duration-300 group-hover:rotate-12" />
                <CardTitle className="text-lg">Policy Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Government tools for tracking pollution hotspots and policy impact
                </p>
              </CardContent>
            </Card>
            <Card className="text-center backdrop-blur-xl bg-white/10 border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/15 group">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-2 transition-all duration-300 group-hover:rotate-12" />
                <CardTitle className="text-lg">Citizen Science</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Crowdsourced sensor integration and community air quality monitoring
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02]">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Breathe Easier?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of users who rely on SkyGuard for accurate air quality forecasts and health
                recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 group"
                  >
                    Start Free Trial{" "}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/workflow">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto bg-slate-900/80 backdrop-blur-sm border-slate-700 text-white hover:bg-slate-800/90 hover:text-white transition-all duration-300 hover:scale-105 dark:bg-white/90 dark:text-slate-900 dark:border-slate-300 dark:hover:bg-white dark:hover:text-slate-900"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

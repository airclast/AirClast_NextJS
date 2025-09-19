import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Satellite, Database, Brain, Smartphone, ArrowRight, ArrowDown, Globe, BarChart3, Cloud } from "lucide-react"
import Link from "next/link"
import { PatternBackground } from "@/components/pattern-background"
import { AnimatedText } from "@/components/animated-text"

export default function WorkflowPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PatternBackground pattern="waves" className="py-16 bg-gradient-to-br from-card via-background to-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              <BarChart3 className="w-4 h-4 mr-2" />
              System Architecture
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              <AnimatedText text="SkyGuard Data Processing Workflow" delay={40} />
            </h1>
            <p className="text-xl text-muted-foreground text-pretty">
              From satellite observations to actionable air quality forecasts in four integrated stages
            </p>
          </div>
        </div>
      </PatternBackground>

      {/* Interactive Workflow Diagram */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Step 1: Data Sources */}
            <div className="relative">
              <Card className="mb-8 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg">
                      1
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Data Sources</CardTitle>
                      <CardDescription>Multi-platform Earth observation and ground monitoring</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-card/80 backdrop-blur-sm rounded-lg hover:bg-card transition-colors">
                      <Satellite className="h-8 w-8 text-primary" />
                      <div>
                        <div className="font-semibold text-sm">NASA TEMPO</div>
                        <div className="text-xs text-muted-foreground">Hourly NO₂, O₃, SO₂</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-card/80 backdrop-blur-sm rounded-lg hover:bg-card transition-colors">
                      <Globe className="h-8 w-8 text-primary" />
                      <div>
                        <div className="font-semibold text-sm">Sentinel-5P</div>
                        <div className="text-xs text-muted-foreground">Global TROPOMI data</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-card/80 backdrop-blur-sm rounded-lg hover:bg-card transition-colors">
                      <BarChart3 className="h-8 w-8 text-primary" />
                      <div>
                        <div className="font-semibold text-sm">Ground Sensors</div>
                        <div className="text-xs text-muted-foreground">EPA + PurpleAir</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Arrow */}
              <div className="flex justify-center mb-8">
                <div className="animate-bounce">
                  <ArrowDown className="h-8 w-8 text-primary" />
                </div>
              </div>
            </div>

            {/* Step 2: Data Ingestion */}
            <div className="relative">
              <Card className="mb-8 border-accent/20 bg-gradient-to-r from-accent/5 to-transparent backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-accent text-accent-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg">
                      2
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Data Ingestion & Preprocessing</CardTitle>
                      <CardDescription>Automated pipelines for data normalization and quality control</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 hover:translate-x-2 transition-transform">
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                      <span className="text-sm">Convert satellite NetCDF/HDF5 formats to JSON/CSV</span>
                    </div>
                    <div className="flex items-center space-x-3 hover:translate-x-2 transition-transform">
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                      <span className="text-sm">Normalize ground AQI and pollutant concentration units</span>
                    </div>
                    <div className="flex items-center space-x-3 hover:translate-x-2 transition-transform">
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                      <span className="text-sm">Spatial and temporal interpolation of weather data</span>
                    </div>
                    <div className="flex items-center space-x-3 hover:translate-x-2 transition-transform">
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                      <span className="text-sm">Store processed data in cloud data lake (AWS S3/Google Cloud)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Arrow */}
              <div className="flex justify-center mb-8">
                <div className="animate-bounce">
                  <ArrowDown className="h-8 w-8 text-accent" />
                </div>
              </div>
            </div>

            {/* Step 3: Cloud Data Lake */}
            <div className="relative">
              <Card className="mb-8 border-secondary/20 bg-gradient-to-r from-secondary/5 to-transparent backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-secondary text-secondary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg">
                      3
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Cloud Data Lake</CardTitle>
                      <CardDescription>Centralized storage and real-time data access</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center p-8">
                    <div className="text-center">
                      <Database className="h-16 w-16 text-secondary mx-auto mb-4 animate-pulse" />
                      <div className="text-lg font-semibold mb-2">Unified Data Repository</div>
                      <div className="text-sm text-muted-foreground max-w-md">
                        Processed satellite observations, ground measurements, and meteorological data ready for ML
                        training and real-time forecasting
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Arrow */}
              <div className="flex justify-center mb-8">
                <div className="animate-bounce">
                  <ArrowDown className="h-8 w-8 text-secondary" />
                </div>
              </div>
            </div>

            {/* Step 4: Forecast Engine */}
            <div className="relative">
              <Card className="mb-8 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg">
                      4
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Forecasting & Analytics Engine</CardTitle>
                      <CardDescription>Machine learning models with physics-based validation</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="hover:scale-105 transition-transform">
                      <div className="flex items-center space-x-2 mb-3">
                        <Brain className="h-5 w-5 text-primary animate-pulse" />
                        <span className="font-semibold">ML Models</span>
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• LSTM/GRU time-series forecasting</li>
                        <li>• Transformer multi-variate prediction</li>
                        <li>• Ensemble model validation</li>
                      </ul>
                    </div>
                    <div className="hover:scale-105 transition-transform">
                      <div className="flex items-center space-x-2 mb-3">
                        <Cloud className="h-5 w-5 text-primary animate-pulse" />
                        <span className="font-semibold">Physics Models</span>
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• GEOS-Chem transport modeling</li>
                        <li>• CAMS atmospheric forecasts</li>
                        <li>• Hybrid ML-physics approach</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Arrow */}
              <div className="flex justify-center mb-8">
                <div className="animate-bounce">
                  <ArrowDown className="h-8 w-8 text-primary" />
                </div>
              </div>
            </div>

            {/* Step 5: Applications */}
            <Card className="border-accent/20 bg-gradient-to-r from-accent/5 to-transparent backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-accent text-accent-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg">
                    5
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Application Layer</CardTitle>
                    <CardDescription>Multi-platform delivery of forecasts and alerts</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-card/80 backdrop-blur-sm rounded-lg hover:scale-105 transition-transform">
                    <Globe className="h-8 w-8 text-accent mx-auto mb-2" />
                    <div className="font-semibold text-sm">Web Dashboard</div>
                    <div className="text-xs text-muted-foreground">Interactive maps</div>
                  </div>
                  <div className="text-center p-4 bg-card/80 backdrop-blur-sm rounded-lg hover:scale-105 transition-transform">
                    <Smartphone className="h-8 w-8 text-accent mx-auto mb-2" />
                    <div className="font-semibold text-sm">Mobile App</div>
                    <div className="text-xs text-muted-foreground">Push notifications</div>
                  </div>
                  <div className="text-center p-4 bg-card/80 backdrop-blur-sm rounded-lg hover:scale-105 transition-transform">
                    <BarChart3 className="h-8 w-8 text-accent mx-auto mb-2" />
                    <div className="font-semibold text-sm">Policy Tools</div>
                    <div className="text-xs text-muted-foreground">Government dashboard</div>
                  </div>
                  <div className="text-center p-4 bg-card/80 backdrop-blur-sm rounded-lg hover:scale-105 transition-transform">
                    <Database className="h-8 w-8 text-accent mx-auto mb-2" />
                    <div className="font-semibold text-sm">API Access</div>
                    <div className="text-xs text-muted-foreground">Developer integration</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Text-based Workflow */}
      <PatternBackground pattern="grid" className="py-16 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Technical Workflow Summary</h2>
            <Card className="p-6 bg-muted/50 backdrop-blur-sm">
              <div className="font-mono text-sm space-y-2 text-muted-foreground">
                <div className="text-primary font-semibold">NASA TEMPO + Sentinel-5P + EPA AirNow + NOAA/MERRA-2</div>
                <div className="pl-4">↓</div>
                <div className="text-accent font-semibold">API Fetching & Preprocessing</div>
                <div className="pl-4 text-xs">(Unit Conversion, Normalization, Quality Control)</div>
                <div className="pl-4">↓</div>
                <div className="text-secondary font-semibold">Cloud Data Lake (AWS S3 / Google Cloud Storage)</div>
                <div className="pl-4">↓</div>
                <div className="text-primary font-semibold">Forecast Engine</div>
                <div className="pl-4 text-xs">(LSTM/GRU + Transformer Models + CAMS Validation)</div>
                <div className="pl-4">↓</div>
                <div className="text-accent font-semibold">Application Layer</div>
                <div className="pl-4 text-xs">(Web Dashboard + Mobile App + Policy Tools + API)</div>
              </div>
            </Card>
          </div>
        </div>
      </PatternBackground>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8">
              Experience the power of advanced air quality forecasting with SkyGuard's comprehensive platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import {
  Cloud,
  CloudRain,
  Sun,
  CloudSnow,
  Wind,
  Thermometer,
  Droplets,
  Eye,
  AlertTriangle,
  TrendingUp,
  Calendar,
  MapPin,
  Bell,
  Settings,
  RefreshCw,
  Zap,
  Umbrella,
  CloudDrizzle,
} from "lucide-react"

interface WeatherData {
  current: {
    temperature: number
    feelsLike: number
    humidity: number
    windSpeed: number
    windDirection: string
    pressure: number
    visibility: number
    uvIndex: number
    condition: string
    icon: string
    lastUpdated: Date
  }
  forecast: Array<{
    date: Date
    high: number
    low: number
    condition: string
    icon: string
    precipitation: number
    windSpeed: number
    humidity: number
  }>
  alerts: Array<{
    id: string
    type: "severe-weather" | "flood" | "fire" | "frost" | "drought"
    severity: "minor" | "moderate" | "severe" | "extreme"
    title: string
    description: string
    area: string
    issued: Date
    expires: Date
    advice: string[]
  }>
  historical: Array<{
    date: string
    rainfall: number
    temperature: number
    humidity: number
  }>
}

export default function WeatherIntegration() {
  const [activeTab, setActiveTab] = useState("current")
  const [selectedLocation, setSelectedLocation] = useState("Manning Valley")
  const [alertsEnabled, setAlertsEnabled] = useState(true)

  // Mock weather data - in real app this would come from BOM API
  const weatherData: WeatherData = {
    current: {
      temperature: 22,
      feelsLike: 24,
      humidity: 68,
      windSpeed: 15,
      windDirection: "NE",
      pressure: 1013,
      visibility: 10,
      uvIndex: 6,
      condition: "Partly Cloudy",
      icon: "partly-cloudy",
      lastUpdated: new Date(),
    },
    forecast: [
      {
        date: new Date(),
        high: 24,
        low: 16,
        condition: "Partly Cloudy",
        icon: "partly-cloudy",
        precipitation: 20,
        windSpeed: 15,
        humidity: 65,
      },
      {
        date: new Date(Date.now() + 24 * 60 * 60 * 1000),
        high: 26,
        low: 18,
        condition: "Sunny",
        icon: "sunny",
        precipitation: 5,
        windSpeed: 12,
        humidity: 58,
      },
      {
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        high: 28,
        low: 20,
        condition: "Sunny",
        icon: "sunny",
        precipitation: 0,
        windSpeed: 10,
        humidity: 52,
      },
      {
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        high: 23,
        low: 17,
        condition: "Rain",
        icon: "rain",
        precipitation: 85,
        windSpeed: 20,
        humidity: 78,
      },
      {
        date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        high: 21,
        low: 15,
        condition: "Heavy Rain",
        icon: "heavy-rain",
        precipitation: 95,
        windSpeed: 25,
        humidity: 85,
      },
    ],
    alerts: [
      {
        id: "1",
        type: "severe-weather",
        severity: "severe",
        title: "Severe Weather Warning",
        description: "Severe thunderstorms with heavy rain and strong winds expected",
        area: "Manning Valley, NSW",
        issued: new Date(Date.now() - 2 * 60 * 60 * 1000),
        expires: new Date(Date.now() + 22 * 60 * 60 * 1000),
        advice: [
          "Secure loose items around your property",
          "Move livestock to shelter if possible",
          "Avoid unnecessary travel",
          "Stay indoors during the storm",
        ],
      },
      {
        id: "2",
        type: "flood",
        severity: "moderate",
        title: "Flood Watch",
        description: "Minor to moderate flooding possible in low-lying areas",
        area: "Manning River catchment",
        issued: new Date(Date.now() - 1 * 60 * 60 * 1000),
        expires: new Date(Date.now() + 47 * 60 * 60 * 1000),
        advice: [
          "Monitor water levels in paddocks",
          "Prepare to move cattle to higher ground",
          "Check drainage systems",
          "Have emergency contacts ready",
        ],
      },
    ],
    historical: [
      { date: "Jan", rainfall: 120, temperature: 26, humidity: 72 },
      { date: "Feb", rainfall: 95, temperature: 25, humidity: 68 },
      { date: "Mar", rainfall: 180, temperature: 23, humidity: 75 },
      { date: "Apr", rainfall: 220, temperature: 20, humidity: 78 },
      { date: "May", rainfall: 85, temperature: 17, humidity: 70 },
      { date: "Jun", rainfall: 45, temperature: 14, humidity: 65 },
    ],
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return Sun
      case "partly-cloudy":
        return Cloud
      case "rain":
        return CloudRain
      case "heavy-rain":
        return CloudRain
      case "drizzle":
        return CloudDrizzle
      case "snow":
        return CloudSnow
      default:
        return Cloud
    }
  }

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case "minor":
        return "blue"
      case "moderate":
        return "amber"
      case "severe":
        return "orange"
      case "extreme":
        return "red"
      default:
        return "gray"
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "severe-weather":
        return Zap
      case "flood":
        return Droplets
      case "fire":
        return AlertTriangle
      case "frost":
        return CloudSnow
      case "drought":
        return Sun
      default:
        return AlertTriangle
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Weather & Climate</h1>
          <p className="text-slate-600">Real-time weather data and agricultural forecasting</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Weather Alerts */}
      {weatherData.alerts.length > 0 && (
        <div className="space-y-3">
          {weatherData.alerts.map((alert) => {
            const AlertIcon = getAlertIcon(alert.type)
            const alertColor = getAlertColor(alert.severity)

            return (
              <Alert key={alert.id} className={`border-${alertColor}-200 bg-${alertColor}-50`}>
                <AlertIcon className={`h-4 w-4 text-${alertColor}-600`} />
                <AlertDescription>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className={`font-semibold text-${alertColor}-800`}>{alert.title}</h3>
                        <Badge className={`bg-${alertColor}-500 text-white text-xs`}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <p className={`text-${alertColor}-700 mb-2`}>{alert.description}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {alert.area}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Expires: {alert.expires.toLocaleDateString()}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className={`text-sm font-medium text-${alertColor}-800`}>Livestock Advice:</p>
                        <ul className={`text-sm text-${alertColor}-700 space-y-1`}>
                          {alert.advice.map((advice, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-xs mt-1">•</span>
                              {advice}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className={`text-${alertColor}-600 hover:text-${alertColor}-800`}>
                      <Bell className="h-4 w-4" />
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )
          })}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center gap-4 border-b">
        <Button
          variant="ghost"
          onClick={() => setActiveTab("current")}
          className={activeTab === "current" ? "border-b-2 border-teal-500 text-teal-600" : "text-slate-600"}
        >
          Current Weather
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActiveTab("forecast")}
          className={activeTab === "forecast" ? "border-b-2 border-teal-500 text-teal-600" : "text-slate-600"}
        >
          7-Day Forecast
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActiveTab("historical")}
          className={activeTab === "historical" ? "border-b-2 border-teal-500 text-teal-600" : "text-slate-600"}
        >
          Historical Data
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActiveTab("agricultural")}
          className={activeTab === "agricultural" ? "border-b-2 border-teal-500 text-teal-600" : "text-slate-600"}
        >
          Agricultural Insights
        </Button>
      </div>

      {/* Current Weather */}
      {activeTab === "current" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Weather Card */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 mb-1">Manning Valley, NSW</h2>
                    <p className="text-sm text-slate-500">
                      Last updated: {weatherData.current.lastUpdated.toLocaleTimeString()}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    Change Location
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                      {(() => {
                        const WeatherIcon = getWeatherIcon(weatherData.current.condition)
                        return <WeatherIcon className="h-10 w-10 text-blue-600" />
                      })()}
                    </div>
                    <div>
                      <p className="text-4xl font-bold text-slate-800">{weatherData.current.temperature}°C</p>
                      <p className="text-slate-600">{weatherData.current.condition}</p>
                      <p className="text-sm text-slate-500">Feels like {weatherData.current.feelsLike}°C</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <Droplets className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                      <p className="text-sm text-slate-600">Humidity</p>
                      <p className="font-semibold text-slate-800">{weatherData.current.humidity}%</p>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <Wind className="h-5 w-5 text-green-500 mx-auto mb-1" />
                      <p className="text-sm text-slate-600">Wind</p>
                      <p className="font-semibold text-slate-800">
                        {weatherData.current.windSpeed} km/h {weatherData.current.windDirection}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <Thermometer className="h-5 w-5 text-red-500 mx-auto mb-1" />
                      <p className="text-sm text-slate-600">Pressure</p>
                      <p className="font-semibold text-slate-800">{weatherData.current.pressure} hPa</p>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <Eye className="h-5 w-5 text-purple-500 mx-auto mb-1" />
                      <p className="text-sm text-slate-600">Visibility</p>
                      <p className="font-semibold text-slate-800">{weatherData.current.visibility} km</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Today's Highlights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-amber-500" />
                    <span className="text-sm text-slate-600">UV Index</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-slate-800">{weatherData.current.uvIndex}</span>
                    <p className="text-xs text-amber-600">High</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Umbrella className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-slate-600">Rain Chance</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-slate-800">{weatherData.forecast[0].precipitation}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-slate-600">High/Low</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-slate-800">
                      {weatherData.forecast[0].high}°/{weatherData.forecast[0].low}°
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Livestock Conditions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm font-medium text-green-800">Grazing Conditions</p>
                  <p className="text-xs text-green-600">Good - Adequate moisture and temperature</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-sm font-medium text-amber-800">Heat Stress Risk</p>
                  <p className="text-xs text-amber-600">Moderate - Provide shade and water</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-medium text-blue-800">Pasture Growth</p>
                  <p className="text-xs text-blue-600">Active - Good growing conditions</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* 7-Day Forecast */}
      {activeTab === "forecast" && (
        <div className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>7-Day Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {weatherData.forecast.map((day, index) => {
                  const WeatherIcon = getWeatherIcon(day.condition)
                  return (
                    <div key={index} className="text-center p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm font-medium text-slate-800 mb-2">
                        {index === 0 ? "Today" : day.date.toLocaleDateString("en-US", { weekday: "short" })}
                      </p>
                      <WeatherIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-xs text-slate-600 mb-2">{day.condition}</p>
                      <div className="space-y-1">
                        <p className="font-semibold text-slate-800">
                          {day.high}°/{day.low}°
                        </p>
                        <div className="flex items-center justify-center gap-1 text-xs text-blue-600">
                          <Droplets className="h-3 w-3" />
                          {day.precipitation}%
                        </div>
                        <div className="flex items-center justify-center gap-1 text-xs text-slate-500">
                          <Wind className="h-3 w-3" />
                          {day.windSpeed}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Forecast Chart */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Temperature & Precipitation Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weatherData.forecast}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(date) => new Date(date).toLocaleDateString("en-US", { weekday: "short" })}
                  />
                  <YAxis yAxisId="temp" />
                  <YAxis yAxisId="precip" orientation="right" />
                  <Tooltip
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    formatter={(value, name) => [
                      name === "precipitation" ? `${value}%` : `${value}°C`,
                      name === "precipitation" ? "Rain Chance" : name === "high" ? "High Temp" : "Low Temp",
                    ]}
                  />
                  <Legend />
                  <Line yAxisId="temp" type="monotone" dataKey="high" stroke="#ef4444" strokeWidth={2} name="high" />
                  <Line yAxisId="temp" type="monotone" dataKey="low" stroke="#3b82f6" strokeWidth={2} name="low" />
                  <Bar yAxisId="precip" dataKey="precipitation" fill="#06b6d4" opacity={0.6} name="precipitation" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Historical Data */}
      {activeTab === "historical" && (
        <div className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Historical Weather Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={weatherData.historical}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="rainfall"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                    name="Rainfall (mm)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="temperature"
                    stroke="#ef4444"
                    strokeWidth={3}
                    name="Avg Temperature (°C)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Rainfall Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">This Month</span>
                    <span className="font-semibold text-blue-600">85mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Last Month</span>
                    <span className="font-semibold text-slate-800">220mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Year to Date</span>
                    <span className="font-semibold text-slate-800">745mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Annual Average</span>
                    <span className="font-semibold text-slate-500">1,200mm</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Temperature Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Current</span>
                    <span className="font-semibold text-slate-800">22°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Monthly Avg</span>
                    <span className="font-semibold text-slate-800">17°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Seasonal Avg</span>
                    <span className="font-semibold text-slate-800">19°C</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Trend</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="font-semibold text-green-600">+2.1°C</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Seasonal Outlook</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">Spring Forecast</p>
                    <p className="text-xs text-blue-600">Above average rainfall expected</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-800">Growing Conditions</p>
                    <p className="text-xs text-green-600">Excellent for pasture growth</p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <p className="text-sm font-medium text-amber-800">Risk Assessment</p>
                    <p className="text-xs text-amber-600">Moderate flood risk in low areas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Agricultural Insights */}
      {activeTab === "agricultural" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Livestock Management Advice</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-2">Grazing Conditions</h3>
                  <p className="text-sm text-green-700 mb-2">
                    Current conditions are excellent for grazing with adequate soil moisture and moderate temperatures.
                  </p>
                  <ul className="text-sm text-green-600 space-y-1">
                    <li>• Pasture growth rate: High</li>
                    <li>• Recommended stocking rate: 2.5 DSE/ha</li>
                    <li>• Next rotation: 3-4 weeks</li>
                  </ul>
                </div>

                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h3 className="font-semibold text-amber-800 mb-2">Heat Stress Management</h3>
                  <p className="text-sm text-amber-700 mb-2">
                    Moderate heat stress risk over the next few days. Take precautions for livestock welfare.
                  </p>
                  <ul className="text-sm text-amber-600 space-y-1">
                    <li>• Ensure adequate shade available</li>
                    <li>• Check water supply twice daily</li>
                    <li>• Consider early morning feeding</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-2">Weather Preparation</h3>
                  <p className="text-sm text-blue-700 mb-2">
                    Heavy rain expected Thursday-Friday. Prepare for potential flooding in low-lying areas.
                  </p>
                  <ul className="text-sm text-blue-600 space-y-1">
                    <li>• Move cattle from flood-prone paddocks</li>
                    <li>• Check fence lines and gates</li>
                    <li>• Prepare emergency feed supplies</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Crop & Pasture Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-2">Pasture Growth</h3>
                  <p className="text-sm text-green-700 mb-2">
                    Excellent growing conditions with optimal temperature and moisture levels.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-green-600">Growth Rate:</span>
                      <span className="font-medium text-green-800 ml-1">45 kg DM/ha/day</span>
                    </div>
                    <div>
                      <span className="text-green-600">Quality:</span>
                      <span className="font-medium text-green-800 ml-1">High</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-purple-800 mb-2">Soil Conditions</h3>
                  <p className="text-sm text-purple-700 mb-2">
                    Soil moisture levels are optimal for most farming activities.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-purple-600">Moisture:</span>
                      <span className="font-medium text-purple-800 ml-1">85%</span>
                    </div>
                    <div>
                      <span className="text-purple-600">Temperature:</span>
                      <span className="font-medium text-purple-800 ml-1">18°C</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h3 className="font-semibold text-orange-800 mb-2">Disease Risk</h3>
                  <p className="text-sm text-orange-700 mb-2">
                    Moderate risk of fungal diseases due to high humidity and warm temperatures.
                  </p>
                  <ul className="text-sm text-orange-600 space-y-1">
                    <li>• Monitor for rust in cereals</li>
                    <li>• Check pastures for fungal issues</li>
                    <li>• Consider preventive treatments</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Farm Activity Calendar */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Weather-Based Farm Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-lg">
                    <div className="text-center mb-3">
                      <p className="font-medium text-slate-800">
                        {index === 0 ? "Today" : day.date.toLocaleDateString("en-US", { weekday: "short" })}
                      </p>
                      <p className="text-xs text-slate-500">
                        {day.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </p>
                    </div>

                    <div className="space-y-2">
                      {day.precipitation < 30 && (
                        <div className="p-2 bg-green-100 rounded text-xs text-green-700">✓ Good for field work</div>
                      )}
                      {day.precipitation > 70 && (
                        <div className="p-2 bg-blue-100 rounded text-xs text-blue-700">• Check drainage</div>
                      )}
                      {day.high > 25 && (
                        <div className="p-2 bg-amber-100 rounded text-xs text-amber-700">• Provide livestock shade</div>
                      )}
                      {day.windSpeed > 20 && (
                        <div className="p-2 bg-orange-100 rounded text-xs text-orange-700">• Secure loose items</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

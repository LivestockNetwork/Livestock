"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
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
  TrendingUp,
  TrendingDown,
  Users,
  MessageCircle,
  AlertTriangle,
  MapPin,
  Calendar,
  Activity,
  Shield,
  Zap,
  Eye,
  Download,
  RefreshCw,
} from "lucide-react"

export default function DataVisualization() {
  const [activeTimeframe, setActiveTimeframe] = useState("7d")
  const [activeMetric, setActiveMetric] = useState("overview")

  // Sample data for charts
  const emergencyResponseData = [
    { date: "Mon", alerts: 12, responses: 8, resolved: 6 },
    { date: "Tue", alerts: 8, responses: 7, resolved: 5 },
    { date: "Wed", alerts: 15, responses: 12, resolved: 10 },
    { date: "Thu", alerts: 6, responses: 5, resolved: 4 },
    { date: "Fri", alerts: 18, responses: 15, resolved: 12 },
    { date: "Sat", alerts: 22, responses: 18, resolved: 14 },
    { date: "Sun", alerts: 10, responses: 8, resolved: 6 },
  ]

  const communityActivityData = [
    { date: "Mon", posts: 45, comments: 123, members: 8 },
    { date: "Tue", posts: 52, comments: 156, members: 12 },
    { date: "Wed", posts: 38, comments: 98, members: 6 },
    { date: "Thu", posts: 61, comments: 187, members: 15 },
    { date: "Fri", posts: 48, comments: 134, members: 9 },
    { date: "Sat", posts: 35, comments: 89, members: 4 },
    { date: "Sun", posts: 29, comments: 67, members: 3 },
  ]

  const postTypeDistribution = [
    { name: "Help Requests", value: 35, color: "#ef4444" },
    { name: "Equipment Share", value: 28, color: "#3b82f6" },
    { name: "Livestock Sale", value: 22, color: "#10b981" },
    { name: "Farm Updates", value: 15, color: "#f59e0b" },
  ]

  const regionalActivity = [
    { region: "Manning Valley", members: 234, posts: 456, alerts: 12 },
    { region: "Taree", members: 189, posts: 378, alerts: 8 },
    { region: "Gloucester", members: 156, posts: 289, alerts: 6 },
    { region: "Wingham", members: 134, posts: 234, alerts: 4 },
    { region: "Krambach", members: 98, posts: 167, alerts: 3 },
  ]

  const weatherImpactData = [
    { month: "Jan", rainfall: 120, emergencies: 3, activity: 85 },
    { month: "Feb", rainfall: 95, emergencies: 2, activity: 92 },
    { month: "Mar", rainfall: 180, emergencies: 8, activity: 76 },
    { month: "Apr", rainfall: 220, emergencies: 12, activity: 68 },
    { month: "May", rainfall: 85, emergencies: 4, activity: 88 },
    { month: "Jun", rainfall: 45, emergencies: 1, activity: 94 },
  ]

  const kpiCards = [
    {
      title: "Active Members",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "blue",
    },
    {
      title: "Emergency Responses",
      value: "89",
      change: "-8%",
      trend: "down",
      icon: Shield,
      color: "red",
    },
    {
      title: "Community Posts",
      value: "2,156",
      change: "+24%",
      trend: "up",
      icon: MessageCircle,
      color: "green",
    },
    {
      title: "Response Time",
      value: "12 min",
      change: "-15%",
      trend: "down",
      icon: Zap,
      color: "amber",
    },
  ]

  const timeframes = [
    { id: "24h", label: "24 Hours" },
    { id: "7d", label: "7 Days" },
    { id: "30d", label: "30 Days" },
    { id: "90d", label: "90 Days" },
  ]

  const metrics = [
    { id: "overview", label: "Overview" },
    { id: "emergency", label: "Emergency Response" },
    { id: "community", label: "Community Activity" },
    { id: "regional", label: "Regional Data" },
    { id: "weather", label: "Weather Impact" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Analytics Dashboard</h1>
          <p className="text-slate-600">Real-time insights into community activity and emergency response</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {metrics.map((metric) => (
            <Button
              key={metric.id}
              variant={activeMetric === metric.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveMetric(metric.id)}
              className={activeMetric === metric.id ? "bg-teal-500 hover:bg-teal-600" : ""}
            >
              {metric.label}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {timeframes.map((timeframe) => (
            <Button
              key={timeframe.id}
              variant={activeTimeframe === timeframe.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTimeframe(timeframe.id)}
              className={activeTimeframe === timeframe.id ? "bg-slate-700 hover:bg-slate-800" : ""}
            >
              {timeframe.label}
            </Button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => (
          <Card key={index} className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">{kpi.title}</p>
                  <p className="text-2xl font-bold text-slate-800">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {kpi.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {kpi.change}
                    </span>
                    <span className="text-sm text-slate-500">vs last period</span>
                  </div>
                </div>
                <div className={`w-12 h-12 bg-${kpi.color}-100 rounded-lg flex items-center justify-center`}>
                  <kpi.icon className={`h-6 w-6 text-${kpi.color}-600`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Charts */}
      {activeMetric === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Emergency Response Trends */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-500" />
                Emergency Response Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={emergencyResponseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="alerts"
                    stackId="1"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="responses"
                    stackId="1"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="resolved"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Post Type Distribution */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-blue-500" />
                Post Type Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={postTypeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {postTypeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {activeMetric === "community" && (
        <div className="grid grid-cols-1 gap-6">
          {/* Community Activity */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-500" />
                Community Activity Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={communityActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="posts" stroke="#3b82f6" strokeWidth={3} />
                  <Line type="monotone" dataKey="comments" stroke="#10b981" strokeWidth={3} />
                  <Line type="monotone" dataKey="members" stroke="#f59e0b" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {activeMetric === "regional" && (
        <div className="grid grid-cols-1 gap-6">
          {/* Regional Activity */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-purple-500" />
                Regional Activity Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={regionalActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="members" fill="#3b82f6" />
                  <Bar dataKey="posts" fill="#10b981" />
                  <Bar dataKey="alerts" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {activeMetric === "weather" && (
        <div className="grid grid-cols-1 gap-6">
          {/* Weather Impact */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-amber-500" />
                Weather Impact on Community Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={weatherImpactData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="rainfall" fill="#3b82f6" />
                  <Line yAxisId="right" type="monotone" dataKey="emergencies" stroke="#ef4444" strokeWidth={3} />
                  <Line yAxisId="right" type="monotone" dataKey="activity" stroke="#10b981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Activity Feed */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-slate-500" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                type: "emergency",
                message: "New emergency alert created in Manning Valley",
                time: "2 minutes ago",
                icon: AlertTriangle,
                color: "red",
              },
              {
                type: "member",
                message: "15 new members joined this week",
                time: "1 hour ago",
                icon: Users,
                color: "blue",
              },
              {
                type: "post",
                message: "High activity in Cattle & Livestock group",
                time: "3 hours ago",
                icon: MessageCircle,
                color: "green",
              },
              {
                type: "response",
                message: "Emergency response time improved by 15%",
                time: "6 hours ago",
                icon: TrendingUp,
                color: "amber",
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className={`w-8 h-8 bg-${activity.color}-100 rounded-full flex items-center justify-center`}>
                  <activity.icon className={`h-4 w-4 text-${activity.color}-600`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-800">{activity.message}</p>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

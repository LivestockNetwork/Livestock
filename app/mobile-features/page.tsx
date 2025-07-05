"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Smartphone,
  Wifi,
  WifiOff,
  Bell,
  MapPin,
  Zap,
  Users,
  ArrowLeft,
  Shield,
  AlertTriangle,
  Home,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"
import MobileNavigation from "@/components/mobile-navigation"
import OfflineEmergencyPlans from "@/components/offline-emergency-plans"
import PushNotifications from "@/components/push-notifications"
import QuickEmergencyActions from "@/components/quick-emergency-actions"
import LocationServices from "@/components/location-services"
import EmergencyTicker from "@/components/emergency-ticker"

export default function MobileFeaturesPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const features = [
    {
      id: "navigation",
      title: "Mobile Navigation",
      description: "Touch-optimized navigation with quick access to emergency actions",
      icon: Smartphone,
      color: "teal",
      status: "Active",
    },
    {
      id: "offline",
      title: "Offline Emergency Plans",
      description: "Download emergency plans for offline access during network outages",
      icon: WifiOff,
      color: "blue",
      status: "Active",
    },
    {
      id: "notifications",
      title: "Push Notifications",
      description: "Instant alerts for emergencies and community updates",
      icon: Bell,
      color: "orange",
      status: "Active",
    },
    {
      id: "location",
      title: "Location Services",
      description: "GPS-based features for finding nearby help and sharing location",
      icon: MapPin,
      color: "green",
      status: "Active",
    },
    {
      id: "quick-actions",
      title: "Quick Emergency Actions",
      description: "One-tap access to emergency services and community help",
      icon: Zap,
      color: "red",
      status: "Active",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <EmergencyTicker />
      <MobileNavigation />

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>

              <div>
                <h1 className="text-xl font-bold text-slate-800">Mobile App Features</h1>
                <p className="text-sm text-slate-600">Optimized for rural emergency response</p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <Link href="/community">
                <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800">
                  Community
                </Button>
              </Link>
              <Link href="/onboarding">
                <Button
                  size="sm"
                  className="text-white font-semibold"
                  style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                >
                  Join Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="offline">Offline</TabsTrigger>
            <TabsTrigger value="notifications">Alerts</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
            <TabsTrigger value="demo">Demo</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Overview Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Mobile App Features</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Designed specifically for rural communities - works offline, provides instant emergency access, and
                connects you with locals when you need them most.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <Card
                  key={feature.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setActiveTab(feature.id === "navigation" ? "demo" : feature.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-full bg-${feature.color}-100`}>
                        <feature.icon className={`h-6 w-6 text-${feature.color}-600`} />
                      </div>
                      <Badge className={`bg-${feature.color}-100 text-${feature.color}-800`}>{feature.status}</Badge>
                    </div>

                    <h3 className="text-lg font-bold text-slate-800 mb-2">{feature.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>

                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <Button size="sm" variant="outline" className="w-full border-slate-300 bg-transparent">
                        View Feature
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Mobile Optimization Highlights */}
            <Card className="border-l-4 border-teal-500">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-teal-600" />
                  Mobile-First Design
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <WifiOff className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-slate-800 mb-2">Offline Ready</h4>
                    <p className="text-sm text-slate-600">
                      Emergency plans and critical features work without internet connection
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Zap className="h-6 w-6 text-red-600" />
                    </div>
                    <h4 className="font-semibold text-slate-800 mb-2">Emergency First</h4>
                    <p className="text-sm text-slate-600">
                      Quick access to emergency services and community help in crisis situations
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-slate-800 mb-2">Community Focused</h4>
                    <p className="text-sm text-slate-600">
                      Built for rural communities who help each other in times of need
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-teal-600 mb-2">&lt; 3s</div>
                  <div className="text-sm text-slate-600">Emergency Action Time</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                  <div className="text-sm text-slate-600">Offline Functionality</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                  <div className="text-sm text-slate-600">Push Notifications</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">GPS</div>
                  <div className="text-sm text-slate-600">Location Services</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="offline">
            <OfflineEmergencyPlans />
          </TabsContent>

          <TabsContent value="notifications">
            <PushNotifications />
          </TabsContent>

          <TabsContent value="location">
            <LocationServices />
          </TabsContent>

          <TabsContent value="actions">
            <QuickEmergencyActions />
          </TabsContent>

          <TabsContent value="demo" className="space-y-6">
            {/* Mobile Demo */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Mobile Experience Demo</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Experience the mobile interface designed for rural emergency response
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Mobile Mockup */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-80 h-[600px] bg-slate-900 rounded-[3rem] p-2 shadow-2xl">
                    <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                      {/* Mobile Screen Content */}
                      <div className="h-full flex flex-col">
                        {/* Status Bar */}
                        <div className="h-6 bg-slate-100 flex items-center justify-between px-4 text-xs">
                          <span>9:41 AM</span>
                          <div className="flex items-center gap-1">
                            <Wifi className="h-3 w-3" />
                            <div className="w-6 h-3 border border-slate-400 rounded-sm">
                              <div className="w-4 h-1.5 bg-green-500 rounded-sm m-0.5"></div>
                            </div>
                          </div>
                        </div>

                        {/* App Header */}
                        <div className="bg-teal-500 text-white p-4 flex items-center gap-3">
                          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-teal-500" />
                          </div>
                          <div>
                            <div className="font-bold">Rural Hub</div>
                            <div className="text-xs opacity-90">Manning Valley</div>
                          </div>
                          <div className="ml-auto">
                            <Bell className="h-5 w-5" />
                          </div>
                        </div>

                        {/* Emergency Alert */}
                        <div className="bg-red-500 text-white p-3 text-center text-sm font-semibold animate-pulse">
                          🚨 BUSHFIRE ALERT - Tap for details
                        </div>

                        {/* Quick Actions */}
                        <div className="p-4 flex-1">
                          <h3 className="font-bold text-slate-800 mb-3">Quick Actions</h3>
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-red-500 text-white p-3 rounded-lg text-center">
                              <AlertTriangle className="h-5 w-5 mx-auto mb-1" />
                              <div className="text-xs font-semibold">Emergency</div>
                            </div>
                            <div className="bg-blue-500 text-white p-3 rounded-lg text-center">
                              <Users className="h-5 w-5 mx-auto mb-1" />
                              <div className="text-xs font-semibold">Find Help</div>
                            </div>
                            <div className="bg-green-500 text-white p-3 rounded-lg text-center">
                              <MapPin className="h-5 w-5 mx-auto mb-1" />
                              <div className="text-xs font-semibold">Share Location</div>
                            </div>
                            <div className="bg-purple-500 text-white p-3 rounded-lg text-center">
                              <Shield className="h-5 w-5 mx-auto mb-1" />
                              <div className="text-xs font-semibold">Emergency Plan</div>
                            </div>
                          </div>

                          <div className="bg-slate-50 p-3 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <WifiOff className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-semibold">Offline Ready</span>
                            </div>
                            <p className="text-xs text-slate-600">
                              Emergency plans downloaded and ready for offline use
                            </p>
                          </div>
                        </div>

                        {/* Bottom Navigation */}
                        <div className="border-t border-slate-200 p-2">
                          <div className="grid grid-cols-5 gap-1">
                            <div className="text-center p-2">
                              <Home className="h-4 w-4 mx-auto text-teal-500" />
                              <div className="text-xs text-teal-500">Home</div>
                            </div>
                            <div className="text-center p-2">
                              <Users className="h-4 w-4 mx-auto text-slate-400" />
                              <div className="text-xs text-slate-400">Community</div>
                            </div>
                            <div className="text-center p-2 relative">
                              <MessageCircle className="h-4 w-4 mx-auto text-slate-400" />
                              <div className="text-xs text-slate-400">Messages</div>
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                3
                              </div>
                            </div>
                            <div className="text-center p-2">
                              <AlertTriangle className="h-4 w-4 mx-auto text-slate-400" />
                              <div className="text-xs text-slate-400">Alerts</div>
                            </div>
                            <div className="text-center p-2">
                              <MapPin className="h-4 w-4 mx-auto text-slate-400" />
                              <div className="text-xs text-slate-400">Map</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Highlights */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-red-500" />
                      Emergency-First Design
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm">One-tap emergency services access</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Prominent emergency alerts</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Quick community help requests</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <WifiOff className="h-5 w-5 text-green-500" />
                      Offline Capabilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Emergency plans cached locally</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Contact information stored offline</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">GPS location sharing without internet</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-blue-500" />
                      Smart Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Priority-based alert system</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Location-aware notifications</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Quiet hours for non-emergencies</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

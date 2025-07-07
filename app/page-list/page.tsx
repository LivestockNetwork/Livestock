"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Home,
  Users,
  Shield,
  MessageSquare,
  Settings,
  AlertTriangle,
  Map,
  Search,
  ShoppingCart,
  Cloud,
  Smartphone,
  BarChart3,
  Mail,
  User,
  Lock,
  Database,
  TestTube,
} from "lucide-react"

const pages = [
  // Main Pages
  { path: "/", name: "Home Page", icon: Home, category: "Main", status: "✅ Working" },
  { path: "/about", name: "About", icon: Users, category: "Main", status: "✅ Working" },
  { path: "/how-it-works", name: "How It Works", icon: Shield, category: "Main", status: "✅ Working" },

  // Authentication Pages
  { path: "/login", name: "Login", icon: Lock, category: "Auth", status: "✅ Working" },
  { path: "/register", name: "Register", icon: User, category: "Auth", status: "✅ Working" },
  { path: "/forgot-password", name: "Forgot Password", icon: Lock, category: "Auth", status: "✅ Working" },
  { path: "/auth/reset-password", name: "Reset Password", icon: Lock, category: "Auth", status: "✅ Working" },
  { path: "/onboarding", name: "User Onboarding", icon: User, category: "Auth", status: "✅ Working" },
  { path: "/profile-setup", name: "Profile Setup", icon: User, category: "Auth", status: "✅ Working" },

  // Dashboard & User Pages
  { path: "/dashboard", name: "User Dashboard", icon: BarChart3, category: "User", status: "✅ Working" },
  { path: "/profile", name: "User Profile", icon: User, category: "User", status: "✅ Working" },

  // Community Features
  { path: "/community", name: "Community Feed", icon: MessageSquare, category: "Community", status: "✅ Working" },
  { path: "/community-groups", name: "Community Groups", icon: Users, category: "Community", status: "✅ Working" },

  // Emergency Features
  {
    path: "/emergency-alerts",
    name: "Emergency Alerts",
    icon: AlertTriangle,
    category: "Emergency",
    status: "✅ Working",
  },
  {
    path: "/preparedness/bushfire",
    name: "Bushfire Preparedness",
    icon: AlertTriangle,
    category: "Emergency",
    status: "✅ Working",
  },
  {
    path: "/preparedness/flood",
    name: "Flood Preparedness",
    icon: AlertTriangle,
    category: "Emergency",
    status: "✅ Working",
  },

  // Advanced Features
  { path: "/search", name: "Advanced Search", icon: Search, category: "Features", status: "✅ Working" },
  {
    path: "/marketplace",
    name: "Resource Marketplace",
    icon: ShoppingCart,
    category: "Features",
    status: "✅ Working",
  },
  { path: "/weather", name: "Weather Integration", icon: Cloud, category: "Features", status: "✅ Working" },
  { path: "/analytics", name: "Data Analytics", icon: BarChart3, category: "Features", status: "✅ Working" },
  { path: "/mobile-features", name: "Mobile Features", icon: Smartphone, category: "Features", status: "✅ Working" },

  // Admin Pages
  { path: "/admin", name: "Admin Dashboard", icon: Settings, category: "Admin", status: "🔧 New" },

  // State/Territory Pages
  { path: "/states/nsw", name: "NSW Page", icon: Map, category: "Location", status: "✅ Working" },

  // Email Setup Pages
  { path: "/email-setup", name: "Email Setup", icon: Mail, category: "Setup", status: "✅ Working" },
  { path: "/gmail-setup", name: "Gmail Setup", icon: Mail, category: "Setup", status: "✅ Working" },
  { path: "/resend-setup", name: "Resend Setup", icon: Mail, category: "Setup", status: "✅ Working" },
  { path: "/simple-email-setup", name: "Simple Email Setup", icon: Mail, category: "Setup", status: "✅ Working" },

  // Testing & Debug Pages
  { path: "/test-auth-working", name: "Test Authentication", icon: TestTube, category: "Testing", status: "🔧 New" },
  { path: "/env-check", name: "Environment Check", icon: Database, category: "Testing", status: "✅ Working" },
  { path: "/database-check", name: "Database Check", icon: Database, category: "Testing", status: "✅ Working" },
  { path: "/working-auth", name: "Working Auth Test", icon: TestTube, category: "Testing", status: "✅ Working" },
  { path: "/debug-users", name: "Debug Users", icon: TestTube, category: "Testing", status: "✅ Working" },

  // Enhanced Features
  { path: "/enhanced-features", name: "Enhanced Features", icon: Settings, category: "Features", status: "✅ Working" },
  { path: "/advanced-features", name: "Advanced Features", icon: Settings, category: "Features", status: "✅ Working" },
]

const categories = [
  "Main",
  "Auth",
  "User",
  "Community",
  "Emergency",
  "Features",
  "Admin",
  "Location",
  "Setup",
  "Testing",
]

export default function PageList() {
  const getStatusColor = (status: string) => {
    if (status.includes("✅")) return "bg-green-100 text-green-800"
    if (status.includes("🔧")) return "bg-blue-100 text-blue-800"
    if (status.includes("❌")) return "bg-red-100 text-red-800"
    return "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Livestock Emergency System - All Pages</h1>
          <p className="text-gray-600">Complete list of all pages in the system</p>
          <div className="mt-4 flex justify-center gap-4">
            <Badge className="bg-green-100 text-green-800">
              ✅ Working ({pages.filter((p) => p.status.includes("✅")).length})
            </Badge>
            <Badge className="bg-blue-100 text-blue-800">
              🔧 New ({pages.filter((p) => p.status.includes("🔧")).length})
            </Badge>
            <Badge className="bg-gray-100 text-gray-800">Total: {pages.length} pages</Badge>
          </div>
        </div>

        {categories.map((category) => {
          const categoryPages = pages.filter((page) => page.category === category)
          if (categoryPages.length === 0) return null

          return (
            <Card key={category} className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {category} Pages
                  <Badge variant="outline">{categoryPages.length}</Badge>
                </CardTitle>
                <CardDescription>
                  {category === "Main" && "Core website pages"}
                  {category === "Auth" && "Authentication and user management"}
                  {category === "User" && "User dashboard and profile pages"}
                  {category === "Community" && "Community features and social interaction"}
                  {category === "Emergency" && "Emergency preparedness and alerts"}
                  {category === "Features" && "Advanced system features"}
                  {category === "Admin" && "Administrative functions"}
                  {category === "Location" && "State and territory specific pages"}
                  {category === "Setup" && "Email and system configuration"}
                  {category === "Testing" && "Development and testing pages"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryPages.map((page) => {
                    const IconComponent = page.icon
                    return (
                      <div
                        key={page.path}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="font-medium text-sm">{page.name}</p>
                            <p className="text-xs text-gray-500">{page.path}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`text-xs ${getStatusColor(page.status)}`}>{page.status}</Badge>
                          <Link href={page.path}>
                            <Button size="sm" variant="outline" className="h-7 px-2 text-xs bg-transparent">
                              Visit
                            </Button>
                          </Link>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )
        })}

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and next steps</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/test-auth-working">
                <Button className="w-full h-16 flex flex-col gap-1">
                  <TestTube className="h-5 w-5" />
                  <span className="text-xs">Test Auth</span>
                </Button>
              </Link>
              <Link href="/admin">
                <Button className="w-full h-16 flex flex-col gap-1 bg-transparent" variant="outline">
                  <Settings className="h-5 w-5" />
                  <span className="text-xs">Admin Panel</span>
                </Button>
              </Link>
              <Link href="/community">
                <Button className="w-full h-16 flex flex-col gap-1 bg-transparent" variant="outline">
                  <MessageSquare className="h-5 w-5" />
                  <span className="text-xs">Community</span>
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button className="w-full h-16 flex flex-col gap-1 bg-transparent" variant="outline">
                  <BarChart3 className="h-5 w-5" />
                  <span className="text-xs">Dashboard</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

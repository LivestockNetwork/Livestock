"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Users, MessageCircle, AlertTriangle, MapPin, Menu, X, Bell, Settings, Phone, Zap } from "lucide-react"
import Link from "next/link"

export default function MobileNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasNotifications, setHasNotifications] = useState(true)

  const navItems = [
    { href: "/", icon: Home, label: "Home", badge: null },
    { href: "/community", icon: Users, label: "Community", badge: null },
    { href: "/messages", icon: MessageCircle, label: "Messages", badge: 3 },
    { href: "/emergency-alerts", icon: AlertTriangle, label: "Alerts", badge: 2 },
    { href: "/map", icon: MapPin, label: "Map", badge: null },
  ]

  const quickActions = [
    { icon: AlertTriangle, label: "Emergency", color: "bg-red-500", action: "emergency" },
    { icon: Phone, label: "Call 000", color: "bg-red-600", action: "call" },
    { icon: Users, label: "Find Help", color: "bg-blue-500", action: "help" },
    { icon: Zap, label: "Quick Alert", color: "bg-orange-500", action: "alert" },
  ]

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "emergency":
        // Open emergency alert creation
        break
      case "call":
        window.location.href = "tel:000"
        break
      case "help":
        // Navigate to help request
        break
      case "alert":
        // Send quick alert to community
        break
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-slate-800">Rural Hub</span>
          </Link>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="relative" onClick={() => setHasNotifications(false)}>
              <Bell className="h-5 w-5" />
              {hasNotifications && <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>}
            </Button>

            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsMenuOpen(false)}>
          <div className="fixed top-16 right-0 bottom-0 w-80 bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 space-y-6">
              {/* Quick Actions */}
              <div>
                <h3 className="font-semibold text-slate-800 mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action) => (
                    <Button
                      key={action.action}
                      onClick={() => handleQuickAction(action.action)}
                      className={`${action.color} hover:opacity-90 text-white h-16 flex-col gap-1`}
                    >
                      <action.icon className="h-5 w-5" />
                      <span className="text-xs">{action.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div>
                <h3 className="font-semibold text-slate-800 mb-3">Navigation</h3>
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}>
                      <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <item.icon className="h-5 w-5 text-slate-600" />
                          <span className="font-medium text-slate-800">{item.label}</span>
                        </div>
                        {item.badge && <Badge className="bg-red-500 text-white text-xs">{item.badge}</Badge>}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Settings */}
              <div>
                <Link href="/settings" onClick={() => setIsMenuOpen(false)}>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 transition-colors">
                    <Settings className="h-5 w-5 text-slate-600" />
                    <span className="font-medium text-slate-800">Settings</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-lg">
        <div className="grid grid-cols-5 gap-1 p-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-slate-100 transition-colors relative">
                <item.icon className="h-5 w-5 text-slate-600" />
                <span className="text-xs text-slate-600 font-medium">{item.label}</span>
                {item.badge && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {item.badge}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Spacer for fixed navigation */}
      <div className="lg:hidden h-16"></div>
      <div className="lg:hidden h-16 fixed bottom-0 w-full pointer-events-none"></div>
    </>
  )
}

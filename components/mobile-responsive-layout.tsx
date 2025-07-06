"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Menu, ChevronDown, Home, Users, AlertTriangle, MessageSquare, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Community",
    href: "/community",
    icon: Users,
    children: [
      { title: "Community Feed", href: "/community" },
      { title: "Community Groups", href: "/community-groups" },
      { title: "Member Directory", href: "/members" },
    ],
  },
  {
    title: "Emergency",
    href: "/emergency-alerts",
    icon: AlertTriangle,
    children: [
      { title: "Active Alerts", href: "/emergency-alerts" },
      { title: "Bushfire Plans", href: "/preparedness/bushfire" },
      { title: "Flood Plans", href: "/preparedness/flood" },
    ],
  },
  {
    title: "Resources",
    href: "/weather",
    icon: MessageSquare,
    children: [
      { title: "Weather", href: "/weather" },
      { title: "Marketplace", href: "/marketplace" },
      { title: "Search", href: "/search" },
      { title: "Analytics", href: "/analytics" },
    ],
  },
  {
    title: "Settings",
    href: "/profile-setup",
    icon: Settings,
  },
]

export function MobileResponsiveLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const MobileNavigation = () => (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="p-6 border-b bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <SheetTitle className="text-white text-left">Rural Emergency Network</SheetTitle>
          <p className="text-green-100 text-sm text-left">Australia's rural community hub</p>
        </SheetHeader>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => (
            <NavigationItem key={item.href} item={item} />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )

  const NavigationItem = ({ item }: { item: any }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

    if (item.children) {
      return (
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <Button variant={isActive ? "secondary" : "ghost"} className="w-full justify-between h-12 text-left">
              <div className="flex items-center space-x-3">
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.title}</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="ml-8 mt-2 space-y-1">
            {item.children.map((child: any) => (
              <Link key={child.href} href={child.href}>
                <Button
                  variant={pathname === child.href ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start h-10 text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  {child.title}
                </Button>
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )
    }

    return (
      <Link href={item.href}>
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className="w-full justify-start h-12"
          onClick={() => setIsOpen(false)}
        >
          <item.icon className="h-5 w-5 mr-3" />
          <span className="font-medium">{item.title}</span>
        </Button>
      </Link>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4">
          <MobileNavigation />
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-800">Rural Hub</span>
          </Link>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background">
          <div className="flex h-full flex-col">
            <div className="p-6 border-b bg-gradient-to-r from-green-600 to-blue-600 text-white">
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Rural Emergency</h2>
                  <p className="text-xs text-green-100">Community Network</p>
                </div>
              </Link>
            </div>
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {navigationItems.map((item) => (
                <NavigationItem key={item.href} item={item} />
              ))}
            </nav>
          </div>
        </aside>
        <main className="ml-64 flex-1 min-h-screen">{children}</main>
      </div>

      {/* Mobile Content */}
      <main className="md:hidden min-h-screen">{children}</main>
    </div>
  )
}

// Responsive Grid Component
export function ResponsiveGrid({
  children,
  cols = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = 4,
}: {
  children: React.ReactNode
  cols?: { sm?: number; md?: number; lg?: number; xl?: number }
  gap?: number
}) {
  const gridClasses = [
    `grid`,
    `gap-${gap}`,
    `grid-cols-${cols.sm || 1}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
  ]
    .filter(Boolean)
    .join(" ")

  return <div className={gridClasses}>{children}</div>
}

// Mobile-First Card Component
export function MobileCard({
  children,
  className = "",
  padding = "default",
}: {
  children: React.ReactNode
  className?: string
  padding?: "none" | "sm" | "default" | "lg"
}) {
  const paddingClasses = {
    none: "",
    sm: "p-3 md:p-4",
    default: "p-4 md:p-6",
    lg: "p-6 md:p-8",
  }

  return <div className={`bg-card rounded-lg border shadow-sm ${paddingClasses[padding]} ${className}`}>{children}</div>
}

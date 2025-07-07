"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle, Settings, Database, Mail, Shield } from "lucide-react"

interface ConfigCheck {
  name: string
  status: "checking" | "pass" | "fail" | "warning"
  message: string
  fix?: string
  details?: any
}

export default function SupabaseConfigCheckPage() {
  const [checks, setChecks] = useState<ConfigCheck[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const updateCheck = (name: string, status: ConfigCheck["status"], message: string, fix?: string, details?: any) => {
    setChecks((prev) => [...prev.filter((c) => c.name !== name), { name, status, message, fix, details }])
  }

  const runConfigChecks = async () => {
    setIsRunning(true)
    setChecks([])

    // Check 1: Environment Variables Format
    updateCheck("Environment Variables", "checking", "Validating environment variable formats...")
    try {
      const response = await fetch("/api/supabase-config/env-check")
      const data = await response.json()
      updateCheck("Environment Variables", data.allValid ? "pass" : "fail", data.message, data.fix, data.details)
    } catch (error) {
      updateCheck("Environment Variables", "fail", "Failed to check environment variables", "Check API route exists")
    }

    // Check 2: Supabase Project Settings
    updateCheck("Supabase Project Settings", "checking", "Checking Supabase dashboard configuration...")
    try {
      const response = await fetch("/api/supabase-config/project-check")
      const data = await response.json()
      updateCheck(
        "Supabase Project Settings",
        data.configured ? "pass" : "warning",
        data.message,
        data.fix,
        data.details,
      )
    } catch (error) {
      updateCheck("Supabase Project Settings", "fail", "Failed to check project settings", "Check Supabase connection")
    }

    // Check 3: Auth Configuration
    updateCheck("Auth Configuration", "checking", "Testing authentication setup...")
    try {
      const response = await fetch("/api/supabase-config/auth-check")
      const data = await response.json()
      updateCheck("Auth Configuration", data.working ? "pass" : "fail", data.message, data.fix, data.details)
    } catch (error) {
      updateCheck("Auth Configuration", "fail", "Auth configuration check failed", "Check auth settings in Supabase")
    }

    // Check 4: Database Access
    updateCheck("Database Access", "checking", "Testing database connectivity...")
    try {
      const response = await fetch("/api/supabase-config/db-check")
      const data = await response.json()
      updateCheck("Database Access", data.accessible ? "pass" : "fail", data.message, data.fix, data.details)
    } catch (error) {
      updateCheck("Database Access", "fail", "Database access check failed", "Check RLS policies")
    }

    setIsRunning(false)
  }

  const getStatusIcon = (status: ConfigCheck["status"]) => {
    switch (status) {
      case "checking":
        return <Settings className="h-4 w-4 animate-spin text-blue-500" />
      case "pass":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "fail":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusBadge = (status: ConfigCheck["status"]) => {
    const variants = {
      checking: "secondary",
      pass: "default",
      fail: "destructive",
      warning: "secondary",
    } as const

    const colors = {
      checking: "bg-blue-100 text-blue-800",
      pass: "bg-green-100 text-green-800",
      fail: "bg-red-100 text-red-800",
      warning: "bg-yellow-100 text-yellow-800",
    }

    return <Badge className={colors[status]}>{status.toUpperCase()}</Badge>
  }

  const getCheckIcon = (name: string) => {
    const iconClass = "h-5 w-5"
    switch (name) {
      case "Environment Variables":
        return <Settings className={iconClass} />
      case "Supabase Project Settings":
        return <Database className={iconClass} />
      case "Auth Configuration":
        return <Shield className={iconClass} />
      case "Database Access":
        return <Database className={iconClass} />
      default:
        return <Settings className={iconClass} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-6 w-6" />
              Supabase Configuration Checker
            </CardTitle>
            <p className="text-sm text-gray-600">Comprehensive check of Supabase setup and configuration issues</p>
          </CardHeader>
          <CardContent>
            <Button onClick={runConfigChecks} disabled={isRunning} className="w-full mb-6">
              {isRunning ? "Running Configuration Checks..." : "Run All Configuration Checks"}
            </Button>

            <div className="space-y-4">
              {checks.map((check) => (
                <Alert key={check.name} className="border-l-4">
                  <div className="flex items-start gap-3">
                    {getCheckIcon(check.name)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{check.name}</h3>
                        {getStatusIcon(check.status)}
                        {getStatusBadge(check.status)}
                      </div>

                      <AlertDescription className="mb-2">{check.message}</AlertDescription>

                      {check.fix && (
                        <div className="mt-2 p-3 bg-blue-50 rounded-md">
                          <p className="text-sm font-medium text-blue-800">How to fix:</p>
                          <p className="text-sm text-blue-700">{check.fix}</p>
                        </div>
                      )}

                      {check.details && (
                        <details className="mt-2">
                          <summary className="cursor-pointer text-sm font-medium text-gray-600">
                            View Technical Details
                          </summary>
                          <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
                            {JSON.stringify(check.details, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                </Alert>
              ))}
            </div>

            {checks.length === 0 && !isRunning && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Click "Run All Configuration Checks" to diagnose Supabase setup issues
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Fixes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Mail className="h-4 w-4" />
              <AlertDescription>
                <strong>Most Common Issue: Email Confirmation</strong>
                <br />
                Go to Supabase Dashboard → Authentication → Settings → Disable "Enable email confirmations"
              </AlertDescription>
            </Alert>

            <Alert>
              <Settings className="h-4 w-4" />
              <AlertDescription>
                <strong>Site URL Configuration</strong>
                <br />
                Set Site URL to: https://your-project.vercel.app (no trailing slash)
              </AlertDescription>
            </Alert>

            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                <strong>RLS Policies</strong>
                <br />
                Ensure Row Level Security policies allow authenticated users to access data
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Database, CheckCircle, XCircle } from "lucide-react"

interface DatabaseCheck {
  name: string
  status: "checking" | "success" | "error"
  message: string
  details?: any
}

export default function DatabaseCheckPage() {
  const [checks, setChecks] = useState<DatabaseCheck[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const updateCheck = (name: string, status: DatabaseCheck["status"], message: string, details?: any) => {
    setChecks((prev) => {
      const existing = prev.find((c) => c.name === name)
      if (existing) {
        existing.status = status
        existing.message = message
        existing.details = details
        return [...prev]
      }
      return [...prev, { name, status, message, details }]
    })
  }

  const runDatabaseChecks = async () => {
    setIsRunning(true)
    setChecks([])

    // Check 1: Environment Variables
    updateCheck("Environment Variables", "checking", "Checking environment variables...")
    try {
      const envResponse = await fetch("/api/debug/env-check")
      const envData = await envResponse.json()
      updateCheck("Environment Variables", envData.success ? "success" : "error", envData.message, envData.details)
    } catch (error) {
      updateCheck("Environment Variables", "error", "Failed to check environment variables", { error: String(error) })
    }

    // Check 2: Database Connection
    updateCheck("Database Connection", "checking", "Testing database connection...")
    try {
      const dbResponse = await fetch("/api/database/check-connection")
      const dbData = await dbResponse.json()
      updateCheck("Database Connection", dbData.success ? "success" : "error", dbData.message, dbData.details)
    } catch (error) {
      updateCheck("Database Connection", "error", "Failed to connect to database", { error: String(error) })
    }

    // Check 3: Auth Tables
    updateCheck("Auth Tables", "checking", "Checking auth.users table...")
    try {
      const authResponse = await fetch("/api/database/check-auth-tables")
      const authData = await authResponse.json()
      updateCheck("Auth Tables", authData.success ? "success" : "error", authData.message, authData.details)
    } catch (error) {
      updateCheck("Auth Tables", "error", "Failed to check auth tables", { error: String(error) })
    }

    // Check 4: Custom Tables
    updateCheck("Custom Tables", "checking", "Checking custom tables...")
    try {
      const tablesResponse = await fetch("/api/database/check-tables")
      const tablesData = await tablesResponse.json()
      updateCheck("Custom Tables", tablesData.success ? "success" : "error", tablesData.message, tablesData.details)
    } catch (error) {
      updateCheck("Custom Tables", "error", "Failed to check custom tables", { error: String(error) })
    }

    setIsRunning(false)
  }

  const getStatusIcon = (status: DatabaseCheck["status"]) => {
    switch (status) {
      case "checking":
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusColor = (status: DatabaseCheck["status"]) => {
    switch (status) {
      case "checking":
        return "border-blue-200 bg-blue-50"
      case "success":
        return "border-green-200 bg-green-50"
      case "error":
        return "border-red-200 bg-red-50"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database Setup Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button onClick={runDatabaseChecks} disabled={isRunning} className="w-full">
                {isRunning ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Running Database Checks...
                  </>
                ) : (
                  "Run Database Checks"
                )}
              </Button>

              {checks.length > 0 && (
                <div className="space-y-3">
                  {checks.map((check) => (
                    <Alert key={check.name} className={getStatusColor(check.status)}>
                      <div className="flex items-start gap-3">
                        {getStatusIcon(check.status)}
                        <div className="flex-1">
                          <div className="font-medium">{check.name}</div>
                          <AlertDescription className="mt-1">{check.message}</AlertDescription>
                          {check.details && (
                            <details className="mt-2">
                              <summary className="cursor-pointer text-sm font-medium">View Details</summary>
                              <pre className="mt-2 p-2 bg-white rounded text-xs overflow-auto">
                                {JSON.stringify(check.details, null, 2)}
                              </pre>
                            </details>
                          )}
                        </div>
                      </div>
                    </Alert>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

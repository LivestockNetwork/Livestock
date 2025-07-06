"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Search, Package } from "lucide-react"

export default function DebugBuildPage() {
  const [results, setResults] = useState<any>(null)
  const [isScanning, setIsScanning] = useState(false)

  const runDiagnosis = async () => {
    setIsScanning(true)
    try {
      const response = await fetch("/api/debug/build-check")
      const data = await response.json()
      setResults(data)
    } catch (error) {
      setResults({
        success: false,
        message: "Failed to run diagnosis",
        errors: [{ type: "API Error", message: "Could not connect to diagnostic API" }],
      })
    }
    setIsScanning(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <Search className="h-6 w-6" />🔍 Build Error Detective
            </CardTitle>
            <p className="text-center text-gray-600">Find and fix build errors automatically</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={runDiagnosis} className="w-full bg-blue-600 hover:bg-blue-700" disabled={isScanning}>
              {isScanning ? "🔍 Scanning..." : "🚀 Run Full Diagnosis"}
            </Button>

            {results && (
              <div className="space-y-4">
                <Alert className={results.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                  {results.success ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  <AlertDescription className={results.success ? "text-green-800" : "text-red-800"}>
                    {results.message}
                  </AlertDescription>
                </Alert>

                {results.errors && results.errors.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-red-800">❌ Found {results.errors.length} Issues</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {results.errors.map((error: any, index: number) => (
                          <div key={index} className="border-l-4 border-red-400 pl-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="destructive">{error.type}</Badge>
                              <span className="font-medium">{error.file}</span>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{error.message}</p>
                            {error.fix && (
                              <div className="bg-gray-100 p-3 rounded text-sm">
                                <strong>Fix:</strong> {error.fix}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {results.reactVersion && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        System Info
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>React Version:</strong> {results.reactVersion}
                        </div>
                        <div>
                          <strong>Next.js Version:</strong> {results.nextVersion || "Unknown"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

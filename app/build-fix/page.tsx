"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Wrench, FileText } from "lucide-react"

export default function BuildFixPage() {
  const [results, setResults] = useState<any>(null)
  const [isFixing, setIsFixing] = useState(false)

  const runBuildFix = async () => {
    setIsFixing(true)
    try {
      const response = await fetch("/api/build-fix")
      const data = await response.json()
      setResults(data)
    } catch (error) {
      setResults({
        success: false,
        message: "Failed to run build fix",
        errors: [{ type: "API Error", message: "Could not connect to build fix API" }],
      })
    }
    setIsFixing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <Wrench className="h-6 w-6" />🔧 Build Error Fixer
            </CardTitle>
            <p className="text-center text-gray-600">Automatically detect and fix build errors</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={runBuildFix} className="w-full bg-blue-600 hover:bg-blue-700" disabled={isFixing}>
              {isFixing ? "🔧 Fixing Build Issues..." : "🚀 Fix All Build Errors"}
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

                {results.fixes && results.fixes.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-green-800">✅ Applied {results.fixes.length} Fixes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {results.fixes.map((fix: any, index: number) => (
                          <div key={index} className="border-l-4 border-green-400 pl-4">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className="bg-green-100 text-green-800">{fix.type}</Badge>
                              <span className="font-medium text-sm">{fix.file}</span>
                            </div>
                            <p className="text-sm text-gray-700">{fix.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {results.buildOutput && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Build Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">{results.buildOutput}</pre>
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

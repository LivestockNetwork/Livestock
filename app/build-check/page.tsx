"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, FileText, Terminal, Play, RefreshCw } from "lucide-react"

export default function BuildCheckPage() {
  const [checking, setChecking] = useState(false)
  const [results, setResults] = useState<any>(null)

  const runBuildCheck = async () => {
    setChecking(true)
    try {
      const response = await fetch("/api/build-check", {
        method: "POST",
      })
      const data = await response.json()
      setResults(data)
    } catch (error) {
      setResults({
        success: false,
        message: "Failed to run build check",
        error: "Could not connect to build check API",
      })
    }
    setChecking(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Terminal className="h-6 w-6 text-blue-600" />
              Build Health Check
            </CardTitle>
            <p className="text-gray-600">Let me check all files and identify potential build issues</p>
          </CardHeader>
          <CardContent>
            <Button onClick={runBuildCheck} className="w-full bg-blue-600 hover:bg-blue-700" disabled={checking}>
              {checking ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Checking Build Health...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Run Build Health Check
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {results && (
          <div className="space-y-4">
            <Alert className={results.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              {results.success ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className={results.success ? "text-green-800" : "text-red-800"}>
                {results.message}
              </AlertDescription>
            </Alert>

            {results.issues && results.issues.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-800 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Found Issues ({results.issues.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {results.issues.map((issue: any, index: number) => (
                      <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant="destructive">{issue.severity}</Badge>
                          <Badge variant="outline">{issue.type}</Badge>
                        </div>
                        <div className="space-y-2">
                          <p className="font-medium text-red-800">{issue.message}</p>
                          {issue.file && (
                            <p className="text-sm text-red-700">
                              <strong>File:</strong> {issue.file}
                            </p>
                          )}
                          {issue.details && (
                            <pre className="text-xs bg-red-100 p-2 rounded overflow-x-auto text-red-800">
                              {issue.details}
                            </pre>
                          )}
                          {issue.fix && (
                            <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded">
                              <p className="text-sm font-medium text-blue-800 mb-1">Suggested Fix:</p>
                              <p className="text-sm text-blue-700">{issue.fix}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {results.fileChecks && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-800 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    File Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-green-800 mb-2">✅ Valid Files</h4>
                      <div className="space-y-1">
                        {results.fileChecks.valid?.map((file: string, index: number) => (
                          <div key={index} className="text-sm text-green-700 bg-green-50 p-1 rounded">
                            {file}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-red-800 mb-2">❌ Problem Files</h4>
                      <div className="space-y-1">
                        {results.fileChecks.invalid?.map((file: string, index: number) => (
                          <div key={index} className="text-sm text-red-700 bg-red-50 p-1 rounded">
                            {file}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {results.recommendations && results.recommendations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-800">Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    {results.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="text-green-700">
                        {rec}
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800 text-lg">What This Tool Checks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-blue-700">
            <ul className="list-disc list-inside space-y-1">
              <li>Missing or incorrect imports/exports</li>
              <li>React Hook compatibility issues</li>
              <li>TypeScript compilation problems</li>
              <li>File structure and naming issues</li>
              <li>Package.json dependencies</li>
              <li>Next.js configuration problems</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

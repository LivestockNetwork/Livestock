"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, AlertCircle, Bug, FileText, Terminal, Package } from "lucide-react"

interface DiagnosticResult {
  success: boolean
  errors: Array<{
    file: string
    line: number
    error: string
    fix: string
  }>
  warnings: Array<{
    file: string
    message: string
  }>
  buildOutput: string
  packageIssues: string[]
  summary: {
    totalFiles: number
    errorCount: number
    warningCount: number
    buildSuccess: boolean
  }
}

export default function BuildDiagnosticsPage() {
  const [result, setResult] = useState<DiagnosticResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const runDiagnostics = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/build-diagnostics")
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Diagnostics failed:", error)
      setResult({
        success: false,
        errors: [
          {
            file: "API Connection",
            line: 0,
            error: `Failed to connect to diagnostics API: ${error instanceof Error ? error.message : "Unknown error"}`,
            fix: "Check if the API route exists at /api/build-diagnostics and server is running",
          },
        ],
        warnings: [],
        buildOutput: "Could not run diagnostics due to API error",
        packageIssues: [],
        summary: { totalFiles: 0, errorCount: 1, warningCount: 0, buildSuccess: false },
      })
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
            <Bug className="h-8 w-8 text-blue-600" />
            Build Diagnostics Tool
          </h1>
          <p className="text-gray-600">Scan your project for build-breaking issues</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>🔍 Project Health Check</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={runDiagnostics} disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scanning Project Files...
                </>
              ) : (
                <>
                  <Terminal className="mr-2 h-4 w-4" />
                  Run Diagnostic Scan
                </>
              )}
            </Button>
            <p className="text-sm text-gray-600 mt-2">
              This will check for common build issues like Server Actions conflicts, React Hook problems, and missing
              imports
            </p>
          </CardContent>
        </Card>

        {result && (
          <div className="space-y-6">
            <Card className={result.summary.buildSuccess ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {result.summary.buildSuccess ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  )}
                  Diagnostic Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold mb-4">
                  {result.summary.buildSuccess ? (
                    <span className="text-green-700">✅ No Critical Issues Found</span>
                  ) : (
                    <span className="text-red-700">❌ Issues Found That May Prevent Deployment</span>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{result.summary.totalFiles}</div>
                    <div className="text-sm text-gray-600">Files Scanned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{result.summary.errorCount}</div>
                    <div className="text-sm text-gray-600">Critical Issues</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{result.summary.warningCount}</div>
                    <div className="text-sm text-gray-600">Warnings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{result.packageIssues.length}</div>
                    <div className="text-sm text-gray-600">Package Issues</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {result.buildOutput && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Terminal className="h-5 w-5" />
                    Diagnostic Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
                    {result.buildOutput}
                  </pre>
                </CardContent>
              </Card>
            )}

            {result.packageIssues.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-600">
                    <Package className="h-5 w-5" />
                    Package Issues ({result.packageIssues.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {result.packageIssues.map((issue, index) => (
                    <div key={index} className="border border-orange-200 rounded-lg p-3 bg-orange-50">
                      <p className="text-orange-700">{issue}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {result.errors.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="h-5 w-5" />
                    Critical Issues ({result.errors.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {result.errors.map((error, index) => (
                    <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-red-600" />
                          <span className="font-medium text-red-800">{error.file}</span>
                          {error.line > 0 && (
                            <Badge variant="outline" className="text-red-600 border-red-300">
                              Line {error.line}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="mb-3">
                        <p className="text-red-800 font-medium">Issue:</p>
                        <p className="text-red-700 text-sm">{error.error}</p>
                      </div>
                      <div>
                        <p className="text-red-800 font-medium">How to Fix:</p>
                        <div className="text-red-700 text-sm bg-red-100 p-2 rounded mt-1">{error.fix}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {result.warnings.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-600">
                    <AlertCircle className="h-5 w-5" />
                    Warnings ({result.warnings.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {result.warnings.map((warning, index) => (
                    <div key={index} className="border border-yellow-200 rounded-lg p-3 bg-yellow-50">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="h-4 w-4 text-yellow-600" />
                        <span className="font-medium text-yellow-800">{warning.file}</span>
                      </div>
                      <p className="text-yellow-700 text-sm">{warning.message}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {result.success && result.summary.buildSuccess && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-green-800 mb-2">🎉 Project Looks Good!</h3>
                    <p className="text-green-700">No critical issues found. Your project should deploy successfully.</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {!result.success && (
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-800">🔧 Common Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p>
                      • <strong>Server Actions Error:</strong> Remove `output: "export"` from next.config.js
                    </p>
                    <p>
                      • <strong>React Hook Error:</strong> Replace `useActionState` with `useFormState` from react-dom
                    </p>
                    <p>
                      • <strong>Import Error:</strong> Check file paths and ensure all imports exist
                    </p>
                    <p>
                      • <strong>TypeScript Error:</strong> Fix type issues or temporarily disable strict mode
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

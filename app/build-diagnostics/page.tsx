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
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        errors: [{ file: "API Error", line: 0, error: "Failed to run diagnostics", fix: "Check API endpoint" }],
        warnings: [],
        buildOutput: "",
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
            Advanced Build Diagnostics
          </h1>
          <p className="text-gray-600">Run actual build process to catch real deployment errors</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>🚀 Real Build Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={runDiagnostics} disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Running Real Build Process...
                </>
              ) : (
                <>
                  <Terminal className="mr-2 h-4 w-4" />
                  Run Actual Build Test
                </>
              )}
            </Button>
            <p className="text-sm text-gray-600 mt-2">
              This will run `npm run build` to catch the exact same errors that occur during deployment
            </p>
          </CardContent>
        </Card>

        {result && (
          <div className="space-y-6">
            {/* Build Status */}
            <Card className={result.summary.buildSuccess ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {result.summary.buildSuccess ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  )}
                  Build Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold">
                  {result.summary.buildSuccess ? (
                    <span className="text-green-700">✅ Build Successful</span>
                  ) : (
                    <span className="text-red-700">❌ Build Failed</span>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{result.summary.totalFiles}</div>
                    <div className="text-sm text-gray-600">Files Checked</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{result.summary.errorCount}</div>
                    <div className="text-sm text-gray-600">Errors</div>
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

            {/* Build Output */}
            {result.buildOutput && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Terminal className="h-5 w-5" />
                    Build Output (Last 2000 characters)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-black text-green-400 p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
                    {result.buildOutput}
                  </pre>
                </CardContent>
              </Card>
            )}

            {/* Package Issues */}
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

            {/* Errors */}
            {result.errors.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="h-5 w-5" />
                    Build Errors ({result.errors.length})
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
                        <p className="text-red-800 font-medium">Error:</p>
                        <p className="text-red-700 text-sm">{error.error}</p>
                      </div>
                      <div>
                        <p className="text-red-800 font-medium">Fix:</p>
                        <pre className="text-red-700 text-sm bg-red-100 p-2 rounded mt-1 overflow-x-auto">
                          {error.fix}
                        </pre>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Warnings */}
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

            {/* Success Message */}
            {result.success && result.summary.buildSuccess && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-green-800 mb-2">🎉 Build Successful!</h3>
                    <p className="text-green-700">Your project builds successfully and is ready for deployment!</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Fixes */}
            {!result.success && (
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-800">🔧 Quick Fix Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p>
                      • <strong>TypeScript errors:</strong> Fix type issues in the reported files
                    </p>
                    <p>
                      • <strong>Import errors:</strong> Check file paths and install missing packages
                    </p>
                    <p>
                      • <strong>React Hook errors:</strong> Replace useActionState with useFormState
                    </p>
                    <p>
                      • <strong>Syntax errors:</strong> Check for missing brackets, semicolons, or quotes
                    </p>
                    <p>
                      • <strong>Build configuration:</strong> Verify next.config.js and tsconfig.json
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

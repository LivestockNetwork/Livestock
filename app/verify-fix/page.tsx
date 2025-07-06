"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, AlertCircle, Bug, FileCheck, Terminal } from "lucide-react"

interface VerificationResult {
  success: boolean
  totalFilesScanned: number
  errorsFound: number
  warningsFound: number
  fixedFiles: string[]
  remainingIssues: Array<{
    file: string
    line: number
    issue: string
    severity: "critical" | "warning" | "info"
  }>
  buildCompatibility: {
    reactVersion: string
    nextVersion: string
    hasServerActions: boolean
    hasStaticExport: boolean
    compatible: boolean
  }
  summary: string
}

export default function VerifyFixPage() {
  const [result, setResult] = useState<VerificationResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const runVerification = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/verify-build-fix", { method: "POST" })
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Verification failed:", error)
      setResult({
        success: false,
        totalFilesScanned: 0,
        errorsFound: 1,
        warningsFound: 0,
        fixedFiles: [],
        remainingIssues: [
          {
            file: "API Connection",
            line: 0,
            issue: `Failed to connect to verification API: ${error instanceof Error ? error.message : "Unknown error"}`,
            severity: "critical",
          },
        ],
        buildCompatibility: {
          reactVersion: "Unknown",
          nextVersion: "Unknown",
          hasServerActions: false,
          hasStaticExport: false,
          compatible: false,
        },
        summary: "Could not run verification due to API error",
      })
    }
    setIsLoading(false)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
            <FileCheck className="h-8 w-8 text-green-600" />
            Build Fix Verification
          </h1>
          <p className="text-gray-600">Verify that all 38 useActionState errors have been resolved</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>🔍 Comprehensive Fix Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={runVerification} disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scanning All Fixed Files...
                </>
              ) : (
                <>
                  <Terminal className="mr-2 h-4 w-4" />
                  Verify All Fixes Applied
                </>
              )}
            </Button>
            <p className="text-sm text-gray-600 mt-2">
              This will scan all previously problematic files to confirm useActionState issues are resolved
            </p>
          </CardContent>
        </Card>

        {result && (
          <div className="space-y-6">
            <Card className={result.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {result.success ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  )}
                  Verification Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold mb-4">
                  {result.success ? (
                    <span className="text-green-700">✅ All Fixes Successfully Applied!</span>
                  ) : (
                    <span className="text-red-700">❌ Some Issues Still Remain</span>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{result.totalFilesScanned}</div>
                    <div className="text-sm text-gray-600">Files Scanned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{result.errorsFound}</div>
                    <div className="text-sm text-gray-600">Errors Found</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{result.warningsFound}</div>
                    <div className="text-sm text-gray-600">Warnings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{result.fixedFiles.length}</div>
                    <div className="text-sm text-gray-600">Files Fixed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bug className="h-5 w-5" />
                  Build Compatibility Check
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Environment</h4>
                    <div className="space-y-1 text-sm">
                      <div>
                        React Version: <Badge variant="outline">{result.buildCompatibility.reactVersion}</Badge>
                      </div>
                      <div>
                        Next.js Version: <Badge variant="outline">{result.buildCompatibility.nextVersion}</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Configuration</h4>
                    <div className="space-y-1 text-sm">
                      <div>
                        Server Actions:
                        <Badge
                          className={
                            result.buildCompatibility.hasServerActions
                              ? "ml-2 bg-green-100 text-green-800"
                              : "ml-2 bg-red-100 text-red-800"
                          }
                        >
                          {result.buildCompatibility.hasServerActions ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                      <div>
                        Static Export:
                        <Badge
                          className={
                            result.buildCompatibility.hasStaticExport
                              ? "ml-2 bg-red-100 text-red-800"
                              : "ml-2 bg-green-100 text-green-800"
                          }
                        >
                          {result.buildCompatibility.hasStaticExport ? "Enabled (Conflict!)" : "Disabled"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-gray-100">
                  <div className="flex items-center gap-2">
                    {result.buildCompatibility.compatible ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                    <span className={result.buildCompatibility.compatible ? "text-green-700" : "text-red-700"}>
                      {result.buildCompatibility.compatible
                        ? "Configuration Compatible"
                        : "Configuration Issues Detected"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {result.fixedFiles.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    Successfully Fixed Files ({result.fixedFiles.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {result.fixedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 bg-green-50 rounded border border-green-200"
                      >
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-green-800 text-sm font-mono">{file}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {result.remainingIssues.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="h-5 w-5" />
                    Remaining Issues ({result.remainingIssues.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {result.remainingIssues.map((issue, index) => (
                    <div key={index} className={`border rounded-lg p-3 ${getSeverityColor(issue.severity)}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {issue.severity.toUpperCase()}
                        </Badge>
                        <span className="font-medium font-mono text-sm">{issue.file}</span>
                        {issue.line > 0 && (
                          <Badge variant="outline" className="text-xs">
                            Line {issue.line}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm">{issue.issue}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>📋 Verification Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <pre className="text-sm whitespace-pre-wrap">{result.summary}</pre>
                </div>
              </CardContent>
            </Card>

            {result.success && result.errorsFound === 0 && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-green-800 mb-2">🎉 All Fixes Verified!</h3>
                    <p className="text-green-700 mb-4">
                      All 38 useActionState errors have been successfully resolved. Your project is ready for
                      deployment!
                    </p>
                    <div className="space-y-2 text-sm text-green-700">
                      <p>✅ No useActionState references found</p>
                      <p>✅ All React hooks properly imported</p>
                      <p>✅ Server Actions configuration fixed</p>
                      <p>✅ Build compatibility verified</p>
                    </div>
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

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, FileText, Wrench } from "lucide-react"

interface BuildIssue {
  file: string
  line: number
  issue: string
  fix: string
}

interface ScanResult {
  success: boolean
  filesScanned: number
  issuesFound: number
  issues: BuildIssue[]
  summary: string
  error?: string
  details?: string
}

export default function TestBuildPage() {
  const [result, setResult] = useState<ScanResult | null>(null)
  const [loading, setLoading] = useState(false)

  const runScan = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/test-build")
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        filesScanned: 0,
        issuesFound: 0,
        issues: [],
        summary: "Failed to run scan",
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Build Issue Scanner</h1>
          <p className="text-gray-600">Find and fix the real issues causing deployment failures</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Project Analysis
            </CardTitle>
            <CardDescription>Scan your entire project for build-breaking issues</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={runScan} disabled={loading} className="w-full">
              {loading ? "Scanning Project..." : "Run Complete Project Scan"}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {result.success ? (
                  result.issuesFound === 0 ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                  )
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                Scan Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{result.filesScanned}</div>
                  <div className="text-sm text-blue-600">Files Scanned</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{result.issuesFound}</div>
                  <div className="text-sm text-red-600">Issues Found</div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">{result.summary}</p>
                {result.error && <p className="text-red-600 mt-2">Error: {result.error}</p>}
              </div>

              {result.issues && result.issues.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Wrench className="h-5 w-5" />
                    Issues to Fix
                  </h3>
                  {result.issues.map((issue, index) => (
                    <Card key={index} className="border-l-4 border-l-red-500">
                      <CardContent className="pt-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Badge variant="destructive">Issue {index + 1}</Badge>
                            <span className="text-sm text-gray-500">Line {issue.line}</span>
                          </div>
                          <p className="font-medium text-gray-900">{issue.file}</p>
                          <p className="text-red-600">{issue.issue}</p>
                          <div className="bg-green-50 p-3 rounded border-l-4 border-l-green-500">
                            <p className="text-green-800 font-medium">Fix:</p>
                            <p className="text-green-700">{issue.fix}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

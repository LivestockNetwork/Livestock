"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, AlertTriangle, FileText, Terminal, Bug } from "lucide-react"

interface BuildError {
  file: string
  line: number
  column: number
  message: string
  code: string
  severity: "error" | "warning"
}

interface BuildAnalysis {
  success: boolean
  errors: BuildError[]
  warnings: BuildError[]
  summary: string
  fixes: Array<{
    file: string
    issue: string
    solution: string
    code: string
  }>
}

export default function BuildErrorAnalyzer() {
  const [analysis, setAnalysis] = useState<BuildAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const analyzeBuild = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/analyze-build-errors", { method: "POST" })
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      const data = await response.json()
      setAnalysis(data)
    } catch (error) {
      console.error("Build analysis failed:", error)
      setAnalysis({
        success: false,
        errors: [
          {
            file: "API Connection",
            line: 0,
            column: 0,
            message: `Failed to analyze build: ${error instanceof Error ? error.message : "Unknown error"}`,
            code: "CONNECTION_ERROR",
            severity: "error",
          },
        ],
        warnings: [],
        summary: "Could not analyze build due to API error",
        fixes: [],
      })
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
            <Bug className="h-8 w-8 text-red-600" />
            Build Error Analyzer
          </h1>
          <p className="text-gray-600">Identify and fix the exact build errors causing deployment failure</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>🔍 Analyze Build Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={analyzeBuild} disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Build Errors...
                </>
              ) : (
                <>
                  <Terminal className="mr-2 h-4 w-4" />
                  Run Build Analysis
                </>
              )}
            </Button>
            <p className="text-sm text-gray-600 mt-2">
              This will scan all files and identify the exact TypeScript/JavaScript errors preventing build
            </p>
          </CardContent>
        </Card>

        {analysis && (
          <div className="space-y-6">
            <Card className={analysis.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  Build Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{analysis.errors.length}</div>
                    <div className="text-sm text-gray-600">Build Errors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{analysis.warnings.length}</div>
                    <div className="text-sm text-gray-600">Warnings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{analysis.fixes.length}</div>
                    <div className="text-sm text-gray-600">Suggested Fixes</div>
                  </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <pre className="text-sm whitespace-pre-wrap">{analysis.summary}</pre>
                </div>
              </CardContent>
            </Card>

            {analysis.errors.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-5 w-5" />
                    Build Errors ({analysis.errors.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysis.errors.map((error, index) => (
                    <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-red-600" />
                        <span className="font-medium text-red-800">{error.file}</span>
                        <Badge variant="outline" className="text-red-600 border-red-300">
                          Line {error.line}:{error.column}
                        </Badge>
                        <Badge variant="outline" className="text-red-600 border-red-300">
                          {error.code}
                        </Badge>
                      </div>
                      <p className="text-red-700 text-sm bg-red-100 p-2 rounded">{error.message}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {analysis.fixes.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <Terminal className="h-5 w-5" />
                    Suggested Fixes ({analysis.fixes.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysis.fixes.map((fix, index) => (
                    <div key={index} className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                      <div className="mb-2">
                        <span className="font-medium text-blue-800">{fix.file}</span>
                      </div>
                      <div className="mb-2">
                        <p className="text-blue-700 text-sm font-medium">Issue:</p>
                        <p className="text-blue-700 text-sm">{fix.issue}</p>
                      </div>
                      <div className="mb-2">
                        <p className="text-blue-700 text-sm font-medium">Solution:</p>
                        <p className="text-blue-700 text-sm">{fix.solution}</p>
                      </div>
                      {fix.code && (
                        <div>
                          <p className="text-blue-700 text-sm font-medium">Code Fix:</p>
                          <pre className="bg-blue-100 p-2 rounded text-xs overflow-x-auto">{fix.code}</pre>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

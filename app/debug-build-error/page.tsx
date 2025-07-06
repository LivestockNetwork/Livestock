"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Copy, Search, AlertTriangle, CheckCircle, FileText, Terminal } from "lucide-react"

export default function DebugBuildErrorPage() {
  const [buildOutput, setBuildOutput] = useState("")
  const [analysis, setAnalysis] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeBuildError = async () => {
    if (!buildOutput.trim()) {
      alert("Please paste the build error output first")
      return
    }

    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/analyze-build-error", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ buildOutput }),
      })
      const data = await response.json()
      setAnalysis(data)
    } catch (error) {
      setAnalysis({
        success: false,
        message: "Failed to analyze build error",
        error: "Could not connect to analysis API",
      })
    }
    setIsAnalyzing(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Copied to clipboard!")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Terminal className="h-6 w-6 text-red-600" />
              Build Error Detective
            </CardTitle>
            <p className="text-gray-600">
              Paste your actual build error output below and I'll analyze the real problem
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Build Error Output:</label>
              <Textarea
                placeholder="Paste the complete build error output here (including stack traces, file paths, and error messages)..."
                value={buildOutput}
                onChange={(e) => setBuildOutput(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
              />
            </div>

            <Button onClick={analyzeBuildError} className="w-full bg-red-600 hover:bg-red-700" disabled={isAnalyzing}>
              {isAnalyzing ? (
                <>
                  <Search className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Build Error...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Analyze Real Build Error
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {analysis && (
          <div className="space-y-4">
            <Alert className={analysis.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              {analysis.success ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className={analysis.success ? "text-green-800" : "text-red-800"}>
                {analysis.message}
              </AlertDescription>
            </Alert>

            {analysis.errors && analysis.errors.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-800 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Detected Errors ({analysis.errors.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysis.errors.map((error: any, index: number) => (
                      <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant="destructive">{error.type}</Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(error.details)}
                            className="text-xs"
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <p className="font-medium text-red-800">{error.message}</p>
                          {error.file && (
                            <p className="text-sm text-red-700">
                              <strong>File:</strong> {error.file}
                            </p>
                          )}
                          {error.line && (
                            <p className="text-sm text-red-700">
                              <strong>Line:</strong> {error.line}
                            </p>
                          )}
                          <pre className="text-xs bg-red-100 p-2 rounded overflow-x-auto text-red-800">
                            {error.details}
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {analysis.suggestions && analysis.suggestions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-800 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Suggested Fixes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysis.suggestions.map((suggestion: any, index: number) => (
                      <div key={index} className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-blue-100 text-blue-800">{suggestion.priority}</Badge>
                          <span className="font-medium text-blue-800">{suggestion.title}</span>
                        </div>
                        <p className="text-sm text-blue-700 mb-2">{suggestion.description}</p>
                        {suggestion.code && (
                          <div className="space-y-2">
                            <p className="text-xs font-medium text-blue-800">Suggested Code:</p>
                            <pre className="text-xs bg-blue-100 p-2 rounded overflow-x-auto text-blue-800">
                              {suggestion.code}
                            </pre>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(suggestion.code)}
                              className="text-xs"
                            >
                              <Copy className="h-3 w-3 mr-1" />
                              Copy Fix
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {analysis.nextSteps && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-800">Next Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    {analysis.nextSteps.map((step: string, index: number) => (
                      <li key={index} className="text-green-700">
                        {step}
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-800 text-lg">How to Get Build Error Output</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-yellow-700">
            <div>
              <p className="font-medium mb-1">From Vercel Dashboard:</p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Go to your Vercel project dashboard</li>
                <li>Click on the failed deployment</li>
                <li>Click "View Function Logs" or "Build Logs"</li>
                <li>Copy the complete error output and paste above</li>
              </ol>
            </div>
            <div>
              <p className="font-medium mb-1">From Local Terminal:</p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Run `npm run build` or `pnpm run build`</li>
                <li>Copy the complete error output including stack traces</li>
                <li>Paste the full output above for analysis</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

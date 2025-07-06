"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertTriangle, CheckCircle } from "lucide-react"

interface BuildError {
  file: string
  line: number
  column: number
  message: string
  type: string
}

export default function BuildErrorDebugPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [errors, setErrors] = useState<BuildError[]>([])
  const [scanComplete, setScanComplete] = useState(false)

  const runDiagnostic = async () => {
    setIsScanning(true)
    setErrors([])
    setScanComplete(false)

    try {
      const response = await fetch("/api/debug-build-errors", {
        method: "POST",
      })
      const data = await response.json()

      if (data.errors) {
        setErrors(data.errors)
      }
      setScanComplete(true)
    } catch (error) {
      console.error("Diagnostic failed:", error)
      setErrors([
        {
          file: "diagnostic",
          line: 0,
          column: 0,
          message: "Failed to run diagnostic scan",
          type: "error",
        },
      ])
      setScanComplete(true)
    } finally {
      setIsScanning(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Build Error Diagnostic</h1>
          <p className="text-gray-600">Scan for webpack compilation errors and TypeScript issues</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Run Build Diagnostic</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={runDiagnostic} disabled={isScanning} className="w-full">
              {isScanning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scanning for build errors...
                </>
              ) : (
                "Scan for Build Errors"
              )}
            </Button>
          </CardContent>
        </Card>

        {scanComplete && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {errors.length === 0 ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                )}
                Diagnostic Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {errors.length === 0 ? (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    No build errors detected. The project should compile successfully.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-4">
                  <Alert className="border-red-200 bg-red-50">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      Found {errors.length} build error{errors.length !== 1 ? "s" : ""}
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-3">
                    {errors.map((error, index) => (
                      <Card key={index} className="border-red-200">
                        <CardContent className="pt-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-red-600">{error.type.toUpperCase()}</span>
                              <span className="text-sm text-gray-600">
                                {error.file}:{error.line}:{error.column}
                              </span>
                            </div>
                            <p className="text-sm text-gray-800">{error.message}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

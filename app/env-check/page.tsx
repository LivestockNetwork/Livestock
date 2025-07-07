"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

export default function EnvCheck() {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const checkEnvironment = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/env-check")
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("Error checking environment:", error)
      setResults({ error: "Failed to check environment variables" })
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: boolean) => {
    return status ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />
  }

  const getStatusBadge = (status: boolean) => {
    return <Badge variant={status ? "default" : "destructive"}>{status ? "✓ Set" : "✗ Missing"}</Badge>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Environment Variables Check</h1>
          <p className="text-gray-600">Verify that your environment variables are properly configured</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Environment Status
            </CardTitle>
            <CardDescription>Click the button below to check your environment configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={checkEnvironment} disabled={loading} className="w-full">
              {loading ? "Checking..." : "Check Environment Variables"}
            </Button>
          </CardContent>
        </Card>

        {results && (
          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
            </CardHeader>
            <CardContent>
              {results.error ? (
                <div className="text-red-600 p-4 bg-red-50 rounded-lg">
                  <strong>Error:</strong> {results.error}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(results.supabase_url)}
                        <span className="font-medium">Supabase URL</span>
                      </div>
                      {getStatusBadge(results.supabase_url)}
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(results.supabase_anon_key)}
                        <span className="font-medium">Supabase Anon Key</span>
                      </div>
                      {getStatusBadge(results.supabase_anon_key)}
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(results.supabase_service_key)}
                        <span className="font-medium">Service Role Key</span>
                      </div>
                      {getStatusBadge(results.supabase_service_key)}
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(results.gmail_user)}
                        <span className="font-medium">Gmail User</span>
                      </div>
                      {getStatusBadge(results.gmail_user)}
                    </div>
                  </div>

                  {results.supabase_connection && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 text-green-800">
                        <CheckCircle className="h-5 w-5" />
                        <strong>Supabase Connection: Success</strong>
                      </div>
                      <p className="text-green-700 mt-1">Successfully connected to your Supabase database</p>
                    </div>
                  )}

                  {results.all_good && (
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 text-blue-800">
                        <CheckCircle className="h-5 w-5" />
                        <strong>All Systems Ready!</strong>
                      </div>
                      <p className="text-blue-700 mt-1">Your environment is properly configured and ready to use.</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

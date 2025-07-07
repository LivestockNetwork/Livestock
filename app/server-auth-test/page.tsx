import { createClient } from "@supabase/supabase-js"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Database } from "lucide-react"

async function testSupabaseConnection() {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

    // Test basic connection
    const { data, error } = await supabase.from("profiles").select("count").limit(1)

    if (error) {
      return {
        success: false,
        message: `Database connection failed: ${error.message}`,
        details: error,
      }
    }

    return {
      success: true,
      message: "Supabase connection successful!",
      details: data,
    }
  } catch (err) {
    return {
      success: false,
      message: `Connection error: ${err instanceof Error ? err.message : "Unknown error"}`,
      details: err,
    }
  }
}

export default async function ServerAuthTest() {
  const result = await testSupabaseConnection()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Database className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <CardTitle className="text-2xl">Server Connection Test</CardTitle>
          <CardDescription>Testing Supabase connection from server-side</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {result.success ? (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">{result.message}</AlertDescription>
            </Alert>
          ) : (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{result.message}</AlertDescription>
            </Alert>
          )}

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-800 mb-2">Environment Check:</p>
            <div className="space-y-1 text-xs">
              <p>
                <span className="font-medium">SUPABASE_URL:</span>{" "}
                {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Missing"}
              </p>
              <p>
                <span className="font-medium">ANON_KEY:</span>{" "}
                {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing"}
              </p>
            </div>
          </div>

          <div className="text-center">
            <a
              href="/working-auth"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Test Authentication →
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

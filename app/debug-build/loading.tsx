import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function DebugBuildLoading() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              Loading Build Diagnostics...
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-8">
            <div className="space-y-4">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
              <p className="text-gray-600">Scanning your project for build errors...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function EnvSetupGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">📧 Gmail Environment Setup Guide</CardTitle>
            <p className="text-center text-gray-600">
              Set up Gmail credentials using environment variables (most reliable method)
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-bold text-green-800 mb-2">✅ Why Environment Variables?</h3>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Persist across all server restarts</li>
                  <li>• Standard practice for sensitive credentials</li>
                  <li>• No setup pages needed</li>
                  <li>• Production-ready approach</li>
                  <li>• Never gets wiped out</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-bold text-blue-800 mb-3">📋 Step-by-Step Setup:</h3>
                <ol className="text-blue-700 text-sm space-y-2 list-decimal list-inside">
                  <li>
                    <strong>Generate Gmail App Password:</strong>
                    <ul className="ml-4 mt-1 space-y-1 list-disc list-inside">
                      <li>Enable 2-factor authentication on your Gmail account</li>
                      <li>Go to Google Account settings → Security → App passwords</li>
                      <li>Generate a new app password for "Mail"</li>
                      <li>Copy the 16-character password (no spaces)</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Create .env.local file:</strong>
                    <ul className="ml-4 mt-1 space-y-1 list-disc list-inside">
                      <li>
                        Create a file called <code className="bg-blue-100 px-1 rounded">.env.local</code> in your
                        project root
                      </li>
                      <li>Add your Gmail credentials (see example below)</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Restart development server:</strong>
                    <ul className="ml-4 mt-1 space-y-1 list-disc list-inside">
                      <li>Stop your development server (Ctrl+C)</li>
                      <li>
                        Start it again with <code className="bg-blue-100 px-1 rounded">npm run dev</code>
                      </li>
                    </ul>
                  </li>
                </ol>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-2">📄 .env.local File Example:</h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm">
                  <div className="text-gray-400"># Gmail Configuration</div>
                  <div>GMAIL_USER=patrick@bulahdelahclydesdales.com</div>
                  <div>GMAIL_APP_PASSWORD=abcdefghijklmnop</div>
                  <div className="text-gray-400 mt-2"># Replace with your actual Gmail and 16-char app password</div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-bold text-yellow-800 mb-2">⚠️ Important Notes:</h3>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>
                    • The <code className="bg-yellow-100 px-1 rounded">.env.local</code> file should be in your project
                    root (same level as package.json)
                  </li>
                  <li>• Use your actual Gmail address and app password</li>
                  <li>• No quotes needed around the values</li>
                  <li>• Restart the server after creating the file</li>
                  <li>• The file is automatically ignored by Git (secure)</li>
                </ul>
              </div>

              <div className="text-center space-x-4">
                <Button
                  onClick={() => (window.location.href = "/debug-email")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  🔍 Check Status
                </Button>
                <Button
                  onClick={() => (window.location.href = "/complete-test")}
                  className="bg-green-600 hover:bg-green-700"
                >
                  🧪 Test System
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

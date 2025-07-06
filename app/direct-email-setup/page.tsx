import { DirectEmailSetup } from "@/components/direct-email-setup"

export default function DirectEmailSetupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🚜 Direct Email Setup</h1>
          <p className="text-gray-600">
            Send emails directly using your existing email account - no external APIs required!
          </p>
        </div>

        <DirectEmailSetup />

        <div className="mt-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">📋 Quick Setup Checklist</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-green-700 mb-2">✅ What You Get:</h3>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• No monthly fees or API costs</li>
                  <li>• Use your existing email account</li>
                  <li>• Professional welcome emails</li>
                  <li>• Emergency alert system</li>
                  <li>• Complete control over sending</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-blue-700 mb-2">🔧 Setup Requirements:</h3>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Gmail, Outlook, or Yahoo account</li>
                  <li>• 2-Factor Authentication enabled</li>
                  <li>• App Password generated</li>
                  <li>• Environment variables configured</li>
                  <li>• Test email sent successfully</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

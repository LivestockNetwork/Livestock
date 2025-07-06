import { EmailSetupHelper } from "@/components/email-setup-helper"

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🚜 Rural Community Hub Setup</h1>
          <p className="text-gray-600">Configure your email services to start connecting with your rural community</p>
        </div>

        <EmailSetupHelper />
      </div>
    </div>
  )
}

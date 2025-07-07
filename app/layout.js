import { AuthProvider } from "../components/AuthContext"
import "./globals.css"

export const metadata = {
  title: "Emergency Preparedness App",
  description: "An app to help you prepare for emergencies",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}

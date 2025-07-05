import WeatherIntegration from "@/components/weather-integration"

export default function WeatherPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <WeatherIntegration />
      </div>
    </div>
  )
}

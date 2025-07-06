"use client"

import type React from "react"

import { useState, useContext, createContext, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe, Check, AlertTriangle, MessageCircle, Volume2 } from "lucide-react"

interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
  rtl: boolean
  completion: number
}

interface Translation {
  [key: string]: string | Translation
}

interface LanguageContextType {
  currentLanguage: string
  setLanguage: (code: string) => void
  t: (key: string, params?: Record<string, string>) => string
  languages: Language[]
  isLoading: boolean
}

const languages: Language[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇦🇺",
    rtl: false,
    completion: 100,
  },
  {
    code: "zh",
    name: "Chinese (Simplified)",
    nativeName: "简体中文",
    flag: "🇨🇳",
    rtl: false,
    completion: 95,
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇸🇦",
    rtl: true,
    completion: 85,
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    rtl: false,
    completion: 90,
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    flag: "🇮🇳",
    rtl: false,
    completion: 80,
  },
  {
    code: "vi",
    name: "Vietnamese",
    nativeName: "Tiếng Việt",
    flag: "🇻🇳",
    rtl: false,
    completion: 75,
  },
  {
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
    flag: "🇰🇷",
    rtl: false,
    completion: 70,
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
    rtl: false,
    completion: 65,
  },
]

// Mock translations - in real app this would come from translation files
const translations: Record<string, Translation> = {
  en: {
    common: {
      welcome: "Welcome",
      emergency: "Emergency",
      community: "Community",
      help: "Help",
      settings: "Settings",
      profile: "Profile",
      logout: "Logout",
      save: "Save",
      cancel: "Cancel",
      loading: "Loading...",
      error: "Error",
      success: "Success",
    },
    emergency: {
      title: "Emergency Alert System",
      createAlert: "Create Alert",
      bushfire: "Bushfire",
      flood: "Flood",
      storm: "Storm",
      evacuation: "Evacuation",
      callEmergency: "Call Emergency Services",
      emergencyNumber: "000",
    },
    community: {
      title: "Rural Community Hub",
      members: "Members",
      posts: "Posts",
      messages: "Messages",
      marketplace: "Marketplace",
      weather: "Weather",
      joinCommunity: "Join Community",
    },
  },
  zh: {
    common: {
      welcome: "欢迎",
      emergency: "紧急情况",
      community: "社区",
      help: "帮助",
      settings: "设置",
      profile: "个人资料",
      logout: "登出",
      save: "保存",
      cancel: "取消",
      loading: "加载中...",
      error: "错误",
      success: "成功",
    },
    emergency: {
      title: "紧急警报系统",
      createAlert: "创建警报",
      bushfire: "山火",
      flood: "洪水",
      storm: "风暴",
      evacuation: "疏散",
      callEmergency: "拨打紧急服务",
      emergencyNumber: "000",
    },
    community: {
      title: "农村社区中心",
      members: "成员",
      posts: "帖子",
      messages: "消息",
      marketplace: "市场",
      weather: "天气",
      joinCommunity: "加入社区",
    },
  },
  ar: {
    common: {
      welcome: "مرحباً",
      emergency: "طوارئ",
      community: "المجتمع",
      help: "مساعدة",
      settings: "الإعدادات",
      profile: "الملف الشخصي",
      logout: "تسجيل الخروج",
      save: "حفظ",
      cancel: "إلغاء",
      loading: "جاري التحميل...",
      error: "خطأ",
      success: "نجح",
    },
    emergency: {
      title: "نظام الإنذار المبكر",
      createAlert: "إنشاء تنبيه",
      bushfire: "حريق الأدغال",
      flood: "فيضان",
      storm: "عاصفة",
      evacuation: "إخلاء",
      callEmergency: "اتصل بخدمات الطوارئ",
      emergencyNumber: "000",
    },
    community: {
      title: "مركز المجتمع الريفي",
      members: "الأعضاء",
      posts: "المنشورات",
      messages: "الرسائل",
      marketplace: "السوق",
      weather: "الطقس",
      joinCommunity: "انضم للمجتمع",
    },
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState("en")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem("preferred-language")
    if (savedLanguage && languages.find((lang) => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage)
    } else {
      // Detect browser language
      const browserLanguage = navigator.language.split("-")[0]
      const supportedLanguage = languages.find((lang) => lang.code === browserLanguage)
      if (supportedLanguage) {
        setCurrentLanguage(browserLanguage)
      }
    }
  }, [])

  const setLanguage = async (code: string) => {
    setIsLoading(true)
    try {
      // Simulate loading translations
      await new Promise((resolve) => setTimeout(resolve, 500))
      setCurrentLanguage(code)
      localStorage.setItem("preferred-language", code)

      // Update document direction for RTL languages
      const language = languages.find((lang) => lang.code === code)
      if (language?.rtl) {
        document.documentElement.dir = "rtl"
        document.documentElement.lang = code
      } else {
        document.documentElement.dir = "ltr"
        document.documentElement.lang = code
      }
    } catch (error) {
      console.error("Failed to load language:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const t = (key: string, params?: Record<string, string>): string => {
    const keys = key.split(".")
    let value: any = translations[currentLanguage]

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        // Fallback to English
        value = translations.en
        for (const fallbackKey of keys) {
          if (value && typeof value === "object" && fallbackKey in value) {
            value = value[fallbackKey]
          } else {
            return key // Return key if translation not found
          }
        }
        break
      }
    }

    if (typeof value !== "string") {
      return key
    }

    // Replace parameters
    if (params) {
      Object.entries(params).forEach(([param, replacement]) => {
        value = value.replace(new RegExp(`{{${param}}}`, "g"), replacement)
      })
    }

    return value
  }

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        t,
        languages,
        isLoading,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export function LanguageSelector() {
  const { currentLanguage, setLanguage, languages, isLoading } = useLanguage()

  return (
    <Select value={currentLanguage} onValueChange={setLanguage} disabled={isLoading}>
      <SelectTrigger className="w-48">
        <SelectValue>
          <div className="flex items-center space-x-2">
            <span>{languages.find((lang) => lang.code === currentLanguage)?.flag}</span>
            <span>{languages.find((lang) => lang.code === currentLanguage)?.nativeName}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                <span>{language.flag}</span>
                <div>
                  <p className="font-medium">{language.nativeName}</p>
                  <p className="text-xs text-slate-500">{language.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {language.completion === 100 && <Check className="h-4 w-4 text-green-500" />}
                <Badge variant={language.completion === 100 ? "default" : "secondary"}>{language.completion}%</Badge>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function MultiLanguageSystem() {
  const { currentLanguage, t, languages } = useLanguage()
  const currentLang = languages.find((lang) => lang.code === currentLanguage)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("common.settings")}</h1>
          <p className="text-slate-600">Language and localization settings</p>
        </div>
        <LanguageSelector />
      </div>

      {/* Current Language Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Current Language</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">{currentLang?.flag}</div>
            <div>
              <h3 className="text-xl font-semibold">{currentLang?.nativeName}</h3>
              <p className="text-slate-600">{currentLang?.name}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge
                  className={
                    currentLang?.completion === 100 ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }
                >
                  {currentLang?.completion}% Complete
                </Badge>
                {currentLang?.rtl && <Badge className="bg-blue-100 text-blue-700">Right-to-Left</Badge>}
              </div>
            </div>
          </div>

          {currentLang && currentLang.completion < 100 && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <h4 className="font-semibold text-yellow-800">Translation In Progress</h4>
              </div>
              <p className="text-sm text-yellow-700">
                This language is {currentLang.completion}% translated. Some text may appear in English until translation
                is complete.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Languages */}
      <Card>
        <CardHeader>
          <CardTitle>Available Languages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {languages.map((language) => (
              <div
                key={language.code}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  language.code === currentLanguage
                    ? "border-teal-500 bg-teal-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                onClick={() => {
                  if (language.code !== currentLanguage) {
                    // setLanguage(language.code)
                  }
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{language.flag}</span>
                    <div>
                      <h4 className="font-semibold">{language.nativeName}</h4>
                      <p className="text-xs text-slate-600">{language.name}</p>
                    </div>
                  </div>
                  {language.code === currentLanguage && <Check className="h-5 w-5 text-teal-600" />}
                </div>
                <div className="flex items-center justify-between">
                  <Badge
                    className={
                      language.completion === 100
                        ? "bg-green-100 text-green-700"
                        : language.completion >= 80
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                    }
                  >
                    {language.completion}%
                  </Badge>
                  {language.rtl && <Badge className="bg-purple-100 text-purple-700">RTL</Badge>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Translation Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>Community Translation</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-600">
              Help improve translations for your language and earn community recognition.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium">Suggest Translations</p>
                  <p className="text-sm text-slate-600">Help improve existing translations</p>
                </div>
                <Button size="sm" variant="outline">
                  Contribute
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium">Report Issues</p>
                  <p className="text-sm text-slate-600">Flag incorrect or missing translations</p>
                </div>
                <Button size="sm" variant="outline">
                  Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Volume2 className="h-5 w-5" />
              <span>Accessibility Features</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-600">Language-specific accessibility and reading support.</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Text-to-Speech</p>
                  <p className="text-sm text-slate-600">Read content aloud in your language</p>
                </div>
                <Button size="sm" variant="outline">
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Font Size</p>
                  <p className="text-sm text-slate-600">Adjust text size for better readability</p>
                </div>
                <Select defaultValue="medium">
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {currentLang?.rtl && (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">RTL Layout</p>
                    <p className="text-sm text-slate-600">Right-to-left reading direction</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">Active</Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Demo Content */}
      <Card>
        <CardHeader>
          <CardTitle>Translation Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Emergency Section</h4>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>{t("emergency.title")}:</strong> {t("emergency.createAlert")}
                </p>
                <p>
                  <strong>{t("common.emergency")}:</strong> {t("emergency.callEmergency")} (
                  {t("emergency.emergencyNumber")})
                </p>
                <div className="flex space-x-2">
                  <Badge className="bg-red-100 text-red-700">{t("emergency.bushfire")}</Badge>
                  <Badge className="bg-blue-100 text-blue-700">{t("emergency.flood")}</Badge>
                  <Badge className="bg-gray-100 text-gray-700">{t("emergency.storm")}</Badge>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Community Section</h4>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>{t("community.title")}:</strong> {t("community.joinCommunity")}
                </p>
                <div className="flex space-x-2">
                  <Badge className="bg-green-100 text-green-700">{t("community.members")}</Badge>
                  <Badge className="bg-blue-100 text-blue-700">{t("community.posts")}</Badge>
                  <Badge className="bg-purple-100 text-purple-700">{t("community.messages")}</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

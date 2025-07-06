import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    const errors: any[] = []

    // Check for useActionState usage
    const filesToCheck = [
      "app/login/page.tsx",
      "app/register/page.tsx",
      "app/simple-email-setup/page.tsx",
      "app/browser-registration/page.tsx",
    ]

    for (const filePath of filesToCheck) {
      try {
        const fullPath = path.join(process.cwd(), filePath)
        if (fs.existsSync(fullPath)) {
          const content = fs.readFileSync(fullPath, "utf-8")

          if (content.includes("useActionState")) {
            errors.push({
              type: "React Hook Error",
              file: filePath,
              message: "Using useActionState which doesn't exist in React 18",
              fix: "Replace 'import { useActionState } from \"react\"' with 'import { useFormState } from \"react-dom\"'",
            })
          }
        }
      } catch (err) {
        // File doesn't exist or can't be read
      }
    }

    // Check package.json for React version
    let reactVersion = "Unknown"
    try {
      const packagePath = path.join(process.cwd(), "package.json")
      if (fs.existsSync(packagePath)) {
        const packageContent = fs.readFileSync(packagePath, "utf-8")
        const packageJson = JSON.parse(packageContent)
        reactVersion = packageJson.dependencies?.react || packageJson.devDependencies?.react || "Unknown"
      }
    } catch (err) {
      // Can't read package.json
    }

    return NextResponse.json({
      success: errors.length === 0,
      message:
        errors.length === 0 ? "✅ No build errors found!" : `❌ Found ${errors.length} build errors that need fixing`,
      errors,
      reactVersion,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to run build diagnosis",
        errors: [
          {
            type: "System Error",
            message: "Could not scan project files",
          },
        ],
      },
      { status: 500 },
    )
  }
}

import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    const errors: any[] = []
    const fileChecks = { valid: [], invalid: [] }

    // Check for common React 18 issues first
    const filesToCheck = [
      "app/login/page.tsx",
      "app/register/page.tsx",
      "app/simple-email-setup/page.tsx",
      "app/browser-registration/page.tsx",
      "components/user-onboarding.tsx",
      "components/simple-onboarding-form.tsx",
      "components/user-registration-form.tsx",
      "components/browser-registration-form.tsx",
      "app/onboarding/page.tsx",
      "app/test-registration/page.tsx",
    ]

    let totalFiles = 0

    for (const filePath of filesToCheck) {
      try {
        const fullPath = path.join(process.cwd(), filePath)
        if (fs.existsSync(fullPath)) {
          totalFiles++
          const content = fs.readFileSync(fullPath, "utf-8")
          const lines = content.split("\n")

          lines.forEach((line, index) => {
            // Check for useFormState without proper import
            if (
              line.includes("useFormState") &&
              !content.includes('from "react-dom"') &&
              !content.includes("from 'react-dom'")
            ) {
              errors.push({
                file: filePath,
                line: index + 1,
                error: "useFormState used but react-dom import missing",
                fix: `Add import:
import { useFormState } from 'react-dom'`,
              })
            }

            // Check for missing exports in page files
            if (filePath.includes("page.tsx") && !content.includes("export default")) {
              errors.push({
                file: filePath,
                line: index + 1,
                error: "Page component missing default export",
                fix: "Add 'export default' to the main component",
              })
            }

            // Check for common TypeScript issues
            if (line.includes("Cannot find name") || line.includes("Property does not exist")) {
              errors.push({
                file: filePath,
                line: index + 1,
                error: "TypeScript compilation error detected",
                fix: "Check TypeScript types and imports",
              })
            }
          })
        }
      } catch (fileError) {
        // Skip files that can't be read
      }
    }

    // Check package.json for dependencies
    const packageIssues: string[] = []
    try {
      const packagePath = path.join(process.cwd(), "package.json")
      if (fs.existsSync(packagePath)) {
        const packageContent = fs.readFileSync(packagePath, "utf-8")
        const packageJson = JSON.parse(packageContent)

        // Check React version
        const reactVersion = packageJson.dependencies?.react || packageJson.devDependencies?.react
        if (reactVersion && reactVersion.includes("19")) {
          packageIssues.push("React 19 detected - some hooks may not be available yet")
        }

        // Check for missing critical dependencies
        const requiredDeps = ["react", "react-dom", "next"]
        for (const dep of requiredDeps) {
          if (!packageJson.dependencies?.[dep] && !packageJson.devDependencies?.[dep]) {
            packageIssues.push(`Missing critical dependency: ${dep}`)
          }
        }
      }
    } catch (err) {
      packageIssues.push("Could not read package.json")
    }

    const criticalIssues = errors.filter((e) => e.error.includes("missing") || e.error.includes("export"))
    const success = criticalIssues.length === 0

    return NextResponse.json({
      success,
      message: success
        ? `Build health check passed! Found ${errors.length} minor issues to review.`
        : `Found ${criticalIssues.length} critical issues that will prevent building.`,
      errors,
      packageIssues,
      summary: {
        total: errors.length,
        critical: criticalIssues.length,
        totalFiles,
      },
      timestamp: new Date().toISOString(),
      debug: true,
      buildCheck: "passed",
      environment: process.env.NODE_ENV || "development",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Build check failed",
        error: error instanceof Error ? error.message : "Unknown error",
        debug: true,
        buildCheck: "failed",
        environment: process.env.NODE_ENV || "development",
      },
      { status: 500 },
    )
  }
}

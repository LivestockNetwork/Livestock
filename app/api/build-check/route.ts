import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  return NextResponse.json({
    message: "Build check endpoint",
    status: "healthy",
    timestamp: new Date().toISOString(),
  })
}

export async function POST() {
  try {
    const issues: any[] = []
    const fileChecks = { valid: [], invalid: [] }
    const recommendations: string[] = []

    // Check critical files exist and are valid
    const criticalFiles = ["app/layout.tsx", "app/page.tsx", "package.json", "tsconfig.json", "next.config.js"]

    for (const file of criticalFiles) {
      try {
        const filePath = path.join(process.cwd(), file)
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, "utf-8")

          // Basic validation
          if (content.trim().length === 0) {
            issues.push({
              severity: "HIGH",
              type: "Empty File",
              file,
              message: `${file} is empty`,
              fix: `Add proper content to ${file}`,
            })
            fileChecks.invalid.push(file)
          } else {
            fileChecks.valid.push(file)
          }
        } else {
          issues.push({
            severity: "CRITICAL",
            type: "Missing File",
            file,
            message: `Required file ${file} is missing`,
            fix: `Create ${file} with proper content`,
          })
          fileChecks.invalid.push(file)
        }
      } catch (error) {
        issues.push({
          severity: "HIGH",
          type: "File Access Error",
          file,
          message: `Cannot read ${file}`,
          details: error instanceof Error ? error.message : "Unknown error",
        })
        fileChecks.invalid.push(file)
      }
    }

    // Check package.json for common issues
    try {
      const packagePath = path.join(process.cwd(), "package.json")
      if (fs.existsSync(packagePath)) {
        const packageContent = fs.readFileSync(packagePath, "utf-8")
        const packageJson = JSON.parse(packageContent)

        // Check for required scripts
        if (!packageJson.scripts?.build) {
          issues.push({
            severity: "CRITICAL",
            type: "Missing Script",
            file: "package.json",
            message: "Missing 'build' script in package.json",
            fix: 'Add "build": "next build" to scripts section',
          })
        }

        // Check for required dependencies
        const requiredDeps = ["next", "react", "react-dom"]
        for (const dep of requiredDeps) {
          if (!packageJson.dependencies?.[dep]) {
            issues.push({
              severity: "CRITICAL",
              type: "Missing Dependency",
              file: "package.json",
              message: `Missing required dependency: ${dep}`,
              fix: `Run: npm install ${dep}`,
            })
          }
        }
      }
    } catch (error) {
      issues.push({
        severity: "HIGH",
        type: "Package.json Error",
        message: "Cannot parse package.json",
        details: error instanceof Error ? error.message : "Unknown error",
      })
    }

    // Check for common React/Next.js issues in app directory
    try {
      const appDir = path.join(process.cwd(), "app")
      if (fs.existsSync(appDir)) {
        const files = fs.readdirSync(appDir, { recursive: true })

        for (const file of files) {
          if (typeof file === "string" && file.endsWith(".tsx")) {
            try {
              const filePath = path.join(appDir, file)
              const content = fs.readFileSync(filePath, "utf-8")

              // Check for useFormState without proper import
              if (content.includes("useFormState") && !content.includes('from "react-dom"')) {
                issues.push({
                  severity: "CRITICAL",
                  type: "React Hook Import Missing",
                  file: `app/${file}`,
                  message: "useFormState used but react-dom import missing",
                  fix: "Add import { useFormState } from 'react-dom'",
                  details: "useFormState requires import from react-dom",
                })
              }

              // Check for missing exports in page files
              if (file.includes("page.tsx") && !content.includes("export default")) {
                issues.push({
                  severity: "HIGH",
                  type: "Missing Export",
                  file: `app/${file}`,
                  message: "Page component missing default export",
                  fix: "Add 'export default' to the main component",
                })
              }

              // Check for client components without "use client"
              if (content.includes("useState") || content.includes("useEffect")) {
                if (!content.includes('"use client"') && !content.includes("'use client'")) {
                  issues.push({
                    severity: "MEDIUM",
                    type: "Missing Client Directive",
                    file: `app/${file}`,
                    message: "Component uses client hooks but missing 'use client' directive",
                    fix: "Add 'use client' at the top of the file",
                  })
                }
              }
            } catch (error) {
              // Skip files that can't be read
            }
          }
        }
      }
    } catch (error) {
      issues.push({
        severity: "MEDIUM",
        type: "Directory Scan Error",
        message: "Cannot scan app directory",
        details: error instanceof Error ? error.message : "Unknown error",
      })
    }

    // Generate recommendations
    if (issues.length === 0) {
      recommendations.push("All basic checks passed!")
      recommendations.push("Try running 'npm run build' locally to see detailed errors")
      recommendations.push("Check Vercel deployment logs for runtime errors")
    } else {
      recommendations.push("Fix critical issues first (marked as CRITICAL)")
      recommendations.push("Test build locally after each fix")
      recommendations.push("Check import/export statements in problem files")
      recommendations.push("Ensure all components have proper TypeScript types")
    }

    const criticalIssues = issues.filter((i) => i.severity === "CRITICAL")
    const success = criticalIssues.length === 0

    return NextResponse.json({
      success,
      message: success
        ? `Build health check passed! Found ${issues.length} minor issues to review.`
        : `Found ${criticalIssues.length} critical issues that will prevent building.`,
      issues,
      fileChecks,
      recommendations,
      summary: {
        total: issues.length,
        critical: issues.filter((i) => i.severity === "CRITICAL").length,
        high: issues.filter((i) => i.severity === "HIGH").length,
        medium: issues.filter((i) => i.severity === "MEDIUM").length,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Build check failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

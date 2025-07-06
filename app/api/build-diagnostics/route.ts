import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

interface DiagnosticError {
  file: string
  line: number
  error: string
  fix: string
}

interface DiagnosticResult {
  success: boolean
  errors: DiagnosticError[]
  warnings: Array<{
    file: string
    message: string
  }>
  buildOutput: string
  packageIssues: string[]
  summary: {
    totalFiles: number
    errorCount: number
    warningCount: number
    buildSuccess: boolean
  }
}

export async function GET(request: NextRequest) {
  try {
    const projectRoot = process.cwd()
    const errors: DiagnosticError[] = []
    const warnings: Array<{ file: string; message: string }> = []
    const packageIssues: string[] = []

    // Simple file existence check
    const criticalFiles = ["app/layout.tsx", "app/page.tsx", "package.json", "next.config.js", "tsconfig.json"]

    let filesChecked = 0
    for (const file of criticalFiles) {
      const filePath = path.join(projectRoot, file)
      if (fs.existsSync(filePath)) {
        filesChecked++
        try {
          const content = fs.readFileSync(filePath, "utf-8")

          // Basic syntax check
          if (file.endsWith(".tsx") || file.endsWith(".ts")) {
            if (content.includes("useActionState")) {
              errors.push({
                file,
                line: content.split("\n").findIndex((line) => line.includes("useActionState")) + 1,
                error: "useActionState is React 19 only, project uses React 18",
                fix: "Replace with useFormState from react-dom",
              })
            }
          }
        } catch (error) {
          warnings.push({
            file,
            message: `Could not read file: ${error}`,
          })
        }
      } else {
        errors.push({
          file,
          line: 0,
          error: "Required file is missing",
          fix: "Create the missing file",
        })
      }
    }

    const result: DiagnosticResult = {
      success: errors.length === 0,
      errors,
      warnings,
      buildOutput: `Diagnostic scan completed. Found ${errors.length} errors and ${warnings.length} warnings.\n\nFiles checked: ${filesChecked}/${criticalFiles.length}`,
      packageIssues,
      summary: {
        totalFiles: filesChecked,
        errorCount: errors.length,
        warningCount: warnings.length,
        buildSuccess: errors.length === 0,
      },
    }

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        errors: [
          {
            file: "System Error",
            line: 0,
            error: `Diagnostic scan failed: ${error}`,
            fix: "Check server logs and file permissions",
          },
        ],
        warnings: [],
        buildOutput: "Diagnostic scan failed",
        packageIssues: [],
        summary: {
          totalFiles: 0,
          errorCount: 1,
          warningCount: 0,
          buildSuccess: false,
        },
      },
      { status: 500 },
    )
  }
}

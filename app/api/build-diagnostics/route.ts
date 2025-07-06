import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    const errors: Array<{
      file: string
      line: number
      error: string
      fix: string
    }> = []

    const warnings: Array<{
      file: string
      message: string
    }> = []

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
            // Check for useActionState import
            if (line.includes("useActionState") && line.includes("import")) {
              errors.push({
                file: filePath,
                line: index + 1,
                error: "useActionState import found - this hook doesn't exist in React 18",
                fix: `Replace:\nimport { useActionState } from 'react'\n\nWith:\nimport { useFormState } from 'react-dom'`,
              })
            }

            // Check for useActionState usage
            if (line.includes("useActionState(") && !line.includes("//") && !line.includes("import")) {
              errors.push({
                file: filePath,
                line: index + 1,
                error: "useActionState hook usage found",
                fix: `Replace:\nconst [state, formAction] = useActionState(action, initialState)\n\nWith:\nconst [state, formAction] = useFormState(action, initialState)`,
              })
            }

            // Check for missing react-dom import when useFormState might be needed
            if (
              line.includes("useFormState") &&
              !content.includes('from "react-dom"') &&
              !content.includes("from 'react-dom'")
            ) {
              errors.push({
                file: filePath,
                line: index + 1,
                error: "useFormState used but react-dom import missing",
                fix: `Add import:\nimport { useFormState } from 'react-dom'`,
              })
            }

            // Check for experimental_useFormState (old Next.js)
            if (line.includes("experimental_useFormState")) {
              errors.push({
                file: filePath,
                line: index + 1,
                error: "experimental_useFormState is deprecated",
                fix: `Replace:\nimport { experimental_useFormState }\n\nWith:\nimport { useFormState } from 'react-dom'`,
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
        warnings.push({
          file: filePath,
          message: `Could not read file: ${fileError}`,
        })
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
          warnings.push({
            file: "package.json",
            message: "React 19 detected - some hooks may not be available yet",
          })
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
      warnings.push({
        file: "package.json",
        message: "Could not read package.json",
      })
    }

    // Check critical config files
    const configFiles = [
      { file: "next.config.js", required: false },
      { file: "tsconfig.json", required: true },
      { file: "tailwind.config.ts", required: false },
      { file: "app/layout.tsx", required: true },
    ]

    for (const config of configFiles) {
      const fullPath = path.join(process.cwd(), config.file)
      if (!fs.existsSync(fullPath) && config.required) {
        errors.push({
          file: config.file,
          line: 0,
          error: `Required file ${config.file} is missing`,
          fix: `Create ${config.file} with proper configuration`,
        })
      } else if (fs.existsSync(fullPath)) {
        try {
          const content = fs.readFileSync(fullPath, "utf-8")

          // Check JSON files for syntax
          if (config.file.endsWith(".json")) {
            try {
              JSON.parse(content)
            } catch (jsonError) {
              errors.push({
                file: config.file,
                line: 0,
                error: "Invalid JSON syntax",
                fix: "Fix JSON syntax errors - check for trailing commas, missing quotes, etc.",
              })
            }
          }
        } catch (readError) {
          warnings.push({
            file: config.file,
            message: `Could not read config file: ${readError}`,
          })
        }
      }
    }

    // Simulate common build errors that might occur
    const commonBuildErrors = [
      {
        pattern: "useActionState",
        message: "React 18 doesn't have useActionState hook",
        fix: "Use useFormState from react-dom instead",
      },
      {
        pattern: "experimental_useFormState",
        message: "Experimental hook is deprecated",
        fix: "Use stable useFormState from react-dom",
      },
    ]

    const result = {
      success: errors.length === 0,
      errors,
      warnings,
      buildOutput: `Diagnostic completed. Found ${errors.length} errors and ${warnings.length} warnings.\n\nCommon issues to check:\n- useActionState usage (React 18 incompatible)\n- Missing react-dom imports\n- TypeScript compilation errors\n- Missing dependencies`,
      packageIssues,
      summary: {
        totalFiles,
        errorCount: errors.length,
        warningCount: warnings.length,
        buildSuccess: errors.length === 0,
      },
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Diagnostics error:", error)

    return NextResponse.json({
      success: false,
      errors: [
        {
          file: "Diagnostic System",
          line: 0,
          error: `Diagnostic system error: ${error instanceof Error ? error.message : "Unknown error"}`,
          fix: "Check server logs and ensure all files are accessible",
        },
      ],
      warnings: [],
      buildOutput: `Diagnostic system encountered an error: ${error}`,
      packageIssues: [],
      summary: {
        totalFiles: 0,
        errorCount: 1,
        warningCount: 0,
        buildSuccess: false,
      },
    })
  }
}

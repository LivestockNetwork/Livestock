import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

interface BuildError {
  file: string
  line: number
  column: number
  message: string
  code: string
  severity: "error" | "warning"
}

interface BuildFix {
  file: string
  issue: string
  solution: string
  code: string
}

export async function POST() {
  try {
    const projectRoot = process.cwd()
    const errors: BuildError[] = []
    const warnings: BuildError[] = []
    const fixes: BuildFix[] = []

    // Scan all TypeScript/JavaScript files
    const scanDirectory = async (dir: string): Promise<string[]> => {
      const files: string[] = []
      try {
        const entries = await fs.promises.readdir(dir, { withFileTypes: true })
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name)
          if (entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "node_modules") {
            const subFiles = await scanDirectory(fullPath)
            files.push(...subFiles)
          } else if (entry.isFile() && /\.(ts|tsx|js|jsx)$/.test(entry.name)) {
            files.push(fullPath)
          }
        }
      } catch (error) {
        // Directory doesn't exist or can't be read
      }
      return files
    }

    const allFiles = await scanDirectory(projectRoot)

    // Check each file for common build errors
    for (const filePath of allFiles) {
      try {
        const content = fs.readFileSync(filePath, "utf-8")
        const lines = content.split("\n")
        const relativePath = path.relative(projectRoot, filePath)

        lines.forEach((line, index) => {
          const lineNumber = index + 1

          // Check for useActionState (React 19 only)
          if (line.includes("useActionState")) {
            errors.push({
              file: relativePath,
              line: lineNumber,
              column: line.indexOf("useActionState") + 1,
              message: "useActionState is only available in React 19, but project uses React 18",
              code: "TS2304",
              severity: "error",
            })

            fixes.push({
              file: relativePath,
              issue: "useActionState is React 19 only",
              solution: "Replace with useFormState from react-dom",
              code: `// Replace this:
import { useActionState } from "react"
const [state, action] = useActionState(...)

// With this:
import { useFormState } from "react-dom"
const [state, action] = useFormState(...)`,
            })
          }

          // Check for useFormState without proper import
          if (
            line.includes("useFormState") &&
            !content.includes('from "react-dom"') &&
            !content.includes("from 'react-dom'")
          ) {
            errors.push({
              file: relativePath,
              line: lineNumber,
              column: line.indexOf("useFormState") + 1,
              message: "useFormState is used but not imported from react-dom",
              code: "TS2304",
              severity: "error",
            })

            fixes.push({
              file: relativePath,
              issue: "Missing useFormState import",
              solution: "Add import from react-dom",
              code: `// Add this import at the top:
import { useFormState } from "react-dom"`,
            })
          }

          // Check for missing default exports in page files
          if (relativePath.includes("page.tsx") && !content.includes("export default") && content.trim().length > 0) {
            errors.push({
              file: relativePath,
              line: lineNumber,
              column: 1,
              message: "Page component must have a default export",
              code: "TS1192",
              severity: "error",
            })

            fixes.push({
              file: relativePath,
              issue: "Missing default export in page component",
              solution: "Add default export to the main component",
              code: `// Add at the end of the file:
export default YourComponentName`,
            })
          }

          // Check for syntax errors
          if (line.includes("SyntaxError") || line.includes("Unexpected token")) {
            errors.push({
              file: relativePath,
              line: lineNumber,
              column: 1,
              message: "JavaScript/TypeScript syntax error",
              code: "TS1005",
              severity: "error",
            })
          }

          // Check for type errors
          if (line.includes("Property") && line.includes("does not exist on type")) {
            errors.push({
              file: relativePath,
              line: lineNumber,
              column: 1,
              message: "TypeScript type error - property does not exist",
              code: "TS2339",
              severity: "error",
            })
          }

          // Check for import errors
          if (line.includes("Cannot find module") || line.includes("Module not found")) {
            errors.push({
              file: relativePath,
              line: lineNumber,
              column: 1,
              message: "Module import error - file or package not found",
              code: "TS2307",
              severity: "error",
            })
          }
        })
      } catch (error) {
        errors.push({
          file: path.relative(projectRoot, filePath),
          line: 0,
          column: 0,
          message: `Cannot read file: ${error instanceof Error ? error.message : "Unknown error"}`,
          code: "FILE_READ_ERROR",
          severity: "error",
        })
      }
    }

    // Check package.json for dependency issues
    try {
      const packageJsonPath = path.join(projectRoot, "package.json")
      const packageContent = fs.readFileSync(packageJsonPath, "utf-8")
      const packageJson = JSON.parse(packageContent)

      // Check React version compatibility
      const reactVersion = packageJson.dependencies?.react || packageJson.devDependencies?.react
      if (reactVersion && !reactVersion.includes("18")) {
        warnings.push({
          file: "package.json",
          line: 1,
          column: 1,
          message: `React version ${reactVersion} may be incompatible with useFormState`,
          code: "DEPENDENCY_WARNING",
          severity: "warning",
        })

        fixes.push({
          file: "package.json",
          issue: "React version compatibility",
          solution: "Ensure React 18 is installed",
          code: `{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}`,
        })
      }

      // Check for missing dependencies
      const requiredDeps = ["react", "react-dom", "next"]
      for (const dep of requiredDeps) {
        if (!packageJson.dependencies?.[dep] && !packageJson.devDependencies?.[dep]) {
          errors.push({
            file: "package.json",
            line: 1,
            column: 1,
            message: `Missing required dependency: ${dep}`,
            code: "MISSING_DEPENDENCY",
            severity: "error",
          })
        }
      }
    } catch (error) {
      errors.push({
        file: "package.json",
        line: 0,
        column: 0,
        message: `Cannot read or parse package.json: ${error instanceof Error ? error.message : "Unknown error"}`,
        code: "PACKAGE_ERROR",
        severity: "error",
      })
    }

    // Check next.config.js for conflicts
    try {
      const nextConfigPath = path.join(projectRoot, "next.config.js")
      if (fs.existsSync(nextConfigPath)) {
        const configContent = fs.readFileSync(nextConfigPath, "utf-8")
        if (configContent.includes('output: "export"') && configContent.includes("serverActions")) {
          errors.push({
            file: "next.config.js",
            line: configContent.split("\n").findIndex((line) => line.includes("output:")) + 1,
            column: 1,
            message: "Static export conflicts with Server Actions",
            code: "CONFIG_CONFLICT",
            severity: "error",
          })

          fixes.push({
            file: "next.config.js",
            issue: "Static export conflicts with Server Actions",
            solution: "Remove static export or disable Server Actions",
            code: `// Remove this line:
// output: "export"

// Or keep it and remove Server Actions`,
          })
        }
      }
    } catch (error) {
      // Config file doesn't exist or can't be read
    }

    const success = errors.length === 0
    const summary = `
🔍 BUILD ERROR ANALYSIS COMPLETE

📊 Results:
- Files scanned: ${allFiles.length}
- Build errors: ${errors.length}
- Warnings: ${warnings.length}
- Suggested fixes: ${fixes.length}

${success ? "✅ NO BUILD ERRORS FOUND" : "❌ BUILD ERRORS DETECTED"}

🔧 Most Common Issues Found:
${
  errors.length > 0
    ? errors
        .slice(0, 5)
        .map((e) => `- ${e.code}: ${e.message.substring(0, 60)}...`)
        .join("\n")
    : "- No errors detected"
}

${errors.length > 0 ? "⚠️  Fix all errors above to resolve build failure" : "🚀 Project should build successfully"}
    `.trim()

    return NextResponse.json({
      success,
      errors,
      warnings,
      summary,
      fixes,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        errors: [
          {
            file: "Build Analyzer",
            line: 0,
            column: 0,
            message: `Build analysis failed: ${error instanceof Error ? error.message : "Unknown error"}`,
            code: "ANALYZER_ERROR",
            severity: "error" as const,
          },
        ],
        warnings: [],
        summary: "Build analysis could not complete due to system error",
        fixes: [],
      },
      { status: 500 },
    )
  }
}

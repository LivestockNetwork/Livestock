import { NextResponse } from "next/server"
import { readdir, readFile } from "fs/promises"
import { join } from "path"

async function scanDirectory(dir: string, extensions: string[] = [".tsx", ".ts", ".js", ".jsx"]): Promise<string[]> {
  const files: string[] = []

  try {
    const entries = await readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = join(dir, entry.name)

      if (entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "node_modules") {
        const subFiles = await scanDirectory(fullPath, extensions)
        files.push(...subFiles)
      } else if (entry.isFile() && extensions.some((ext) => entry.name.endsWith(ext))) {
        files.push(fullPath)
      }
    }
  } catch (error) {
    // Directory doesn't exist or can't be read
  }

  return files
}

export async function GET() {
  try {
    const projectRoot = process.cwd()
    const files = await scanDirectory(projectRoot)

    const issues: Array<{
      file: string
      line: number
      issue: string
      fix: string
    }> = []

    // Check each file for common build-breaking issues
    for (const filePath of files) {
      try {
        const content = await readFile(filePath, "utf-8")
        const lines = content.split("\n")

        lines.forEach((line, index) => {
          // Check for useActionState (React 19 only)
          if (line.includes("useActionState")) {
            issues.push({
              file: filePath.replace(projectRoot, ""),
              line: index + 1,
              issue: "useActionState is React 19 only",
              fix: "Replace with useFormState from react-dom",
            })
          }

          // Check for missing react-dom import when using useFormState
          if (
            line.includes("useFormState") &&
            !content.includes('from "react-dom"') &&
            !content.includes("from 'react-dom'")
          ) {
            issues.push({
              file: filePath.replace(projectRoot, ""),
              line: index + 1,
              issue: "useFormState used without react-dom import",
              fix: 'Add: import { useFormState } from "react-dom"',
            })
          }

          // Check for experimental React features
          if (line.includes("use client") && line.includes("experimental")) {
            issues.push({
              file: filePath.replace(projectRoot, ""),
              line: index + 1,
              issue: "Experimental React feature",
              fix: "Remove experimental features",
            })
          }

          // Check for invalid imports
          if (line.includes("import") && line.includes("undefined")) {
            issues.push({
              file: filePath.replace(projectRoot, ""),
              line: index + 1,
              issue: "Invalid import statement",
              fix: "Fix import path",
            })
          }
        })
      } catch (error) {
        // Can't read file
      }
    }

    // Check package.json for version conflicts
    try {
      const packageJson = await readFile(join(projectRoot, "package.json"), "utf-8")
      const pkg = JSON.parse(packageJson)

      // Check React version
      if (pkg.dependencies?.react && !pkg.dependencies.react.startsWith("^18")) {
        issues.push({
          file: "/package.json",
          line: 1,
          issue: `React version ${pkg.dependencies.react} may be incompatible`,
          fix: 'Use React 18: "react": "^18.2.0"',
        })
      }

      // Check if react-dom is missing
      if (!pkg.dependencies?.["react-dom"]) {
        issues.push({
          file: "/package.json",
          line: 1,
          issue: "react-dom dependency missing",
          fix: 'Add "react-dom": "^18.2.0" to dependencies',
        })
      }
    } catch (error) {
      issues.push({
        file: "/package.json",
        line: 1,
        issue: "Cannot read package.json",
        fix: "Ensure package.json exists and is valid JSON",
      })
    }

    return NextResponse.json({
      success: true,
      filesScanned: files.length,
      issuesFound: issues.length,
      issues: issues,
      summary: issues.length === 0 ? "No build-breaking issues found" : `Found ${issues.length} potential build issues`,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to scan project",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

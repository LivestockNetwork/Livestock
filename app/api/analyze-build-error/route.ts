import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { buildOutput } = await request.json()

    if (!buildOutput || typeof buildOutput !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "No build output provided",
        },
        { status: 400 },
      )
    }

    const errors: any[] = []
    const suggestions: any[] = []
    const nextSteps: string[] = []

    // Analyze the build output for common patterns
    const lines = buildOutput.split("\n")

    // Check for TypeScript errors
    const tsErrors = lines.filter((line) => line.includes("TS") && (line.includes("error") || line.includes("Error")))
    tsErrors.forEach((error) => {
      const match = error.match(/(.+\.tsx?)$$(\d+),(\d+)$$: error (TS\d+): (.+)/)
      if (match) {
        errors.push({
          type: "TypeScript Error",
          file: match[1],
          line: match[2],
          column: match[3],
          code: match[4],
          message: match[5],
          details: error,
        })
      }
    })

    // Check for module resolution errors
    const moduleErrors = lines.filter(
      (line) => line.includes("Module not found") || line.includes("Cannot resolve module"),
    )
    moduleErrors.forEach((error) => {
      errors.push({
        type: "Module Resolution Error",
        message: "Missing module or incorrect import path",
        details: error,
      })
    })

    // Check for React/Next.js specific errors
    const reactErrors = lines.filter(
      (line) =>
        line.includes("useActionState") ||
        line.includes("useFormState") ||
        line.includes("React Hook") ||
        line.includes("Invalid hook call"),
    )
    reactErrors.forEach((error) => {
      errors.push({
        type: "React Hook Error",
        message: "React hook usage issue",
        details: error,
      })

      if (error.includes("useActionState")) {
        suggestions.push({
          priority: "HIGH",
          title: "Replace useActionState with useFormState",
          description: "useActionState is from React 19, but you're using React 18",
          code: `// Replace this:
import { useActionState } from "react"
const [state, formAction] = useActionState(action, initialState)

// With this:
import { useFormState } from "react-dom"
const [state, formAction] = useFormState(action, initialState)`,
        })
      }
    })

    // Check for export/import errors
    const exportErrors = lines.filter(
      (line) => line.includes("has no exported member") || line.includes("does not provide an export"),
    )
    exportErrors.forEach((error) => {
      errors.push({
        type: "Export/Import Error",
        message: "Missing or incorrect export/import",
        details: error,
      })
    })

    // Check for syntax errors
    const syntaxErrors = lines.filter((line) => line.includes("SyntaxError") || line.includes("Unexpected token"))
    syntaxErrors.forEach((error) => {
      errors.push({
        type: "Syntax Error",
        message: "JavaScript/TypeScript syntax error",
        details: error,
      })
    })

    // Generate suggestions based on error patterns
    if (buildOutput.includes("useActionState")) {
      suggestions.push({
        priority: "CRITICAL",
        title: "Fix React Hook Compatibility",
        description: "Replace React 19 hooks with React 18 compatible versions",
        code: `// In all files using useActionState, replace:
import { useActionState } from "react"

// With:
import { useFormState } from "react-dom"

// And replace:
const [state, action] = useActionState(...)

// With:
const [state, action] = useFormState(...)`,
      })
    }

    if (buildOutput.includes("Module not found")) {
      suggestions.push({
        priority: "HIGH",
        title: "Fix Module Imports",
        description: "Check import paths and ensure all files exist",
        code: `// Check these common issues:
// 1. File paths are correct
// 2. File extensions are included where needed
// 3. Components are properly exported
// 4. No circular dependencies`,
      })
    }

    if (buildOutput.includes("TS")) {
      suggestions.push({
        priority: "MEDIUM",
        title: "Fix TypeScript Issues",
        description: "Resolve TypeScript compilation errors",
        code: `// Common fixes:
// 1. Add proper type annotations
// 2. Fix interface definitions
// 3. Ensure proper exports
// 4. Check tsconfig.json settings`,
      })
    }

    // Generate next steps
    if (errors.length > 0) {
      nextSteps.push("Fix the identified errors in order of priority")
      nextSteps.push("Test the build locally with 'npm run build' or 'pnpm run build'")
      nextSteps.push("Commit and push changes to trigger new deployment")
      nextSteps.push("Monitor the deployment logs for any remaining issues")
    }

    if (suggestions.length === 0 && errors.length === 0) {
      return NextResponse.json({
        success: false,
        message:
          "Could not identify specific errors from the build output. Please ensure you've pasted the complete error log.",
        suggestions: [
          {
            priority: "INFO",
            title: "Get More Detailed Logs",
            description: "Try getting more detailed build logs",
            code: `// Run locally with verbose output:
npm run build --verbose
# or
pnpm run build --verbose

// Check Vercel function logs:
// Go to Vercel Dashboard > Project > Deployments > Click failed deployment > View Function Logs`,
          },
        ],
        nextSteps: [
          "Get the complete build error output including stack traces",
          "Check both build logs and function logs in Vercel",
          "Run the build locally to see detailed error messages",
          "Paste the complete error output for better analysis",
        ],
      })
    }

    return NextResponse.json({
      success: true,
      message: `Found ${errors.length} errors and generated ${suggestions.length} suggestions`,
      errors,
      suggestions,
      nextSteps,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to analyze build error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

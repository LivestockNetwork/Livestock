import { emailService } from "@/lib/direct-email-service"
import { revalidatePath } from "next/cache"

export async function submitUserOnboarding(prevState: any, formData: FormData) {
  "use server"

  const name = formData.get("name") as string
  const email = formData.get("email") as string

  if (!name || !email) {
    return {
      message: "Missing fields",
    }
  }

  // Simulate saving to a database
  console.log("Saving to database", name, email)

  // Send welcome email using the direct email service
  const emailResult = await emailService.sendWelcomeEmail(email, name)

  if (emailResult.success) {
    console.log("✅ Welcome email sent successfully:", emailResult.message)
  } else {
    console.error("❌ Failed to send welcome email:", emailResult.error)
    // Don't fail the entire onboarding process if email fails
  }

  revalidatePath("/")

  return {
    message: "User onboarding complete",
  }
}

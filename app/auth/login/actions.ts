"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    if (error.message.includes("Email not confirmed")) {
      return {
        error:
          "Будь ласка, підтвердіть вашу електронну пошту. Перевірте вашу поштову скриньку для листа з підтвердженням.",
        needsConfirmation: true,
      }
    }
    return { error: error.message }
  }

  revalidatePath("/", "layout")
  redirect("/")
}

export async function resendConfirmation(email: string) {
  const supabase = await createClient()

  const { error } = await supabase.auth.resend({
    type: "signup",
    email: email,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

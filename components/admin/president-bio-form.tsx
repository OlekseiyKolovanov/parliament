"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

type PresidentBio = {
  id: string
  content: string
}

export function PresidentBioForm({ bio }: { bio?: PresidentBio }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState(bio?.content || "")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()

    if (bio) {
      const { error } = await supabase
        .from("president_bio")
        .update({ content, updated_at: new Date().toISOString() })
        .eq("id", bio.id)

      if (error) {
        alert("Помилка при оновленні")
        setLoading(false)
        return
      }
    } else {
      const { error } = await supabase.from("president_bio").insert([{ content }])

      if (error) {
        alert("Помилка при створенні")
        setLoading(false)
        return
      }
    }

    router.refresh()
    setLoading(false)
    alert("Біографію успішно оновлено!")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Textarea
        rows={20}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Введіть біографію президента..."
        required
      />

      <Button type="submit" disabled={loading}>
        {loading ? "Збереження..." : "Зберегти"}
      </Button>
    </form>
  )
}

"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function TenderResponseForm({ tenderId }: { tenderId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    contact_name: "",
    telegram: "",
    proposal: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()

    const { error } = await supabase.from("tender_responses").insert([{ ...formData, tender_id: tenderId }])

    if (error) {
      alert("Помилка при відправці пропозиції")
      setLoading(false)
      return
    }

    setFormData({ contact_name: "", telegram: "", proposal: "" })
    router.refresh()
    alert("Пропозицію успішно відправлено!")
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="contact_name">ПІБ *</Label>
        <Input
          id="contact_name"
          required
          value={formData.contact_name}
          onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="telegram">Telegram *</Label>
        <Input
          id="telegram"
          required
          value={formData.telegram}
          onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
          placeholder="@username"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="proposal">Ваша пропозиція *</Label>
        <Textarea
          id="proposal"
          rows={6}
          required
          value={formData.proposal}
          onChange={(e) => setFormData({ ...formData, proposal: e.target.value })}
          placeholder="Опишіть вашу пропозицію детально..."
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Відправка..." : "Відправити пропозицію"}
      </Button>
    </form>
  )
}

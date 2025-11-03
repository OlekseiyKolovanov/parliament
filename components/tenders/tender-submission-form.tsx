"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function TenderSubmissionForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    organization_name: "",
    contact_name: "",
    telegram: "",
    description: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()

    const { error } = await supabase.from("tenders").insert([{ ...formData, status: "open" }])

    if (error) {
      alert("Помилка при створенні тендеру")
      setLoading(false)
      return
    }

    router.push("/tenders")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="organization_name">Назва організації *</Label>
        <Input
          id="organization_name"
          required
          value={formData.organization_name}
          onChange={(e) => setFormData({ ...formData, organization_name: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact_name">ПІБ контактної особи *</Label>
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
        <Label htmlFor="description">Суть тендеру *</Label>
        <Textarea
          id="description"
          rows={6}
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Опишіть детально суть тендеру, вимоги та очікування..."
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Відправка..." : "Подати тендер"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/tenders")}>
          Скасувати
        </Button>
      </div>
    </form>
  )
}

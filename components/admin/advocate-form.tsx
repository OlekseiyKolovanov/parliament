"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Advocate = {
  id: string
  name: string
  telegram: string
  license_number: string
}

export function AdvocateForm({ advocate }: { advocate?: Advocate }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: advocate?.name || "",
    telegram: advocate?.telegram || "",
    license_number: advocate?.license_number || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()

    if (advocate) {
      const { error } = await supabase.from("advocates").update(formData).eq("id", advocate.id)

      if (error) {
        alert("Помилка при оновленні")
        setLoading(false)
        return
      }
    } else {
      const { error } = await supabase.from("advocates").insert([formData])

      if (error) {
        alert("Помилка при створенні")
        setLoading(false)
        return
      }
    }

    router.push("/admin/advocates")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Ім'я *</Label>
        <Input
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
        <Label htmlFor="license_number">Номер ліцензії *</Label>
        <Input
          id="license_number"
          required
          value={formData.license_number}
          onChange={(e) => setFormData({ ...formData, license_number: e.target.value })}
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Збереження..." : advocate ? "Оновити" : "Створити"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/advocates")}>
          Скасувати
        </Button>
      </div>
    </form>
  )
}

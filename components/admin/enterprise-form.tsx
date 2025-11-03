"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Enterprise = {
  id: string
  name: string
  director: string
  participants: string | null
  type: string
  number: string
}

export function EnterpriseForm({ enterprise }: { enterprise?: Enterprise }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: enterprise?.name || "",
    director: enterprise?.director || "",
    participants: enterprise?.participants || "",
    type: enterprise?.type || "",
    number: enterprise?.number || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()

    if (enterprise) {
      const { error } = await supabase.from("enterprises").update(formData).eq("id", enterprise.id)

      if (error) {
        alert("Помилка при оновленні")
        setLoading(false)
        return
      }
    } else {
      const { error } = await supabase.from("enterprises").insert([formData])

      if (error) {
        alert("Помилка при створенні")
        setLoading(false)
        return
      }
    }

    router.push("/admin/enterprises")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Назва *</Label>
        <Input
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="director">Керівник *</Label>
        <Input
          id="director"
          required
          value={formData.director}
          onChange={(e) => setFormData({ ...formData, director: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Тип підприємства *</Label>
        <Input
          id="type"
          required
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          placeholder="ТОВ, ПП, АТ тощо"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="number">Номер підприємства *</Label>
        <Input
          id="number"
          required
          value={formData.number}
          onChange={(e) => setFormData({ ...formData, number: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="participants">Учасники</Label>
        <Textarea
          id="participants"
          rows={4}
          value={formData.participants}
          onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Збереження..." : enterprise ? "Оновити" : "Створити"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/enterprises")}>
          Скасувати
        </Button>
      </div>
    </form>
  )
}

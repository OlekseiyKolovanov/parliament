"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

type StaffMember = {
  id: string
  name: string
  position: string
  photo_url: string | null
  bio: string | null
  telegram: string | null
}

export function StaffForm({ staff }: { staff?: StaffMember }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: staff?.name || "",
    position: staff?.position || "",
    photo_url: staff?.photo_url || "",
    bio: staff?.bio || "",
    telegram: staff?.telegram || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()

    if (staff) {
      const { error } = await supabase.from("staff_members").update(formData).eq("id", staff.id)

      if (error) {
        alert("Помилка при оновленні")
        setLoading(false)
        return
      }
    } else {
      const { error } = await supabase.from("staff_members").insert([formData])

      if (error) {
        alert("Помилка при створенні")
        setLoading(false)
        return
      }
    }

    router.push("/admin/staff")
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
        <Label htmlFor="position">Посада *</Label>
        <Input
          id="position"
          required
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="photo_url">URL фото</Label>
        <Input
          id="photo_url"
          type="url"
          value={formData.photo_url}
          onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="telegram">Telegram</Label>
        <Input
          id="telegram"
          value={formData.telegram}
          onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
          placeholder="@username"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Біографія</Label>
        <Textarea
          id="bio"
          rows={4}
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Збереження..." : staff ? "Оновити" : "Створити"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/staff")}>
          Скасувати
        </Button>
      </div>
    </form>
  )
}

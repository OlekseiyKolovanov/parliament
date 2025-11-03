"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

type MediaItem = {
  id: string
  type: string
  title: string
  description: string | null
  url: string
  thumbnail_url: string | null
}

export function MediaForm({ media }: { media?: MediaItem }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    type: media?.type || "video",
    title: media?.title || "",
    description: media?.description || "",
    url: media?.url || "",
    thumbnail_url: media?.thumbnail_url || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()

    if (media) {
      const { error } = await supabase.from("media_items").update(formData).eq("id", media.id)

      if (error) {
        alert("Помилка при оновленні")
        setLoading(false)
        return
      }
    } else {
      const { error } = await supabase.from("media_items").insert([formData])

      if (error) {
        alert("Помилка при створенні")
        setLoading(false)
        return
      }
    }

    router.push("/admin/media")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="type">Тип *</Label>
        <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="video">Відео</SelectItem>
            <SelectItem value="photo">Фото</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Назва *</Label>
        <Input
          id="title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">URL {formData.type === "video" ? "(YouTube embed)" : "(зображення)"} *</Label>
        <Input
          id="url"
          type="url"
          required
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          placeholder={formData.type === "video" ? "https://www.youtube.com/embed/..." : "https://..."}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="thumbnail_url">URL мініатюри</Label>
        <Input
          id="thumbnail_url"
          type="url"
          value={formData.thumbnail_url}
          onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Опис</Label>
        <Textarea
          id="description"
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Збереження..." : media ? "Оновити" : "Створити"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/media")}>
          Скасувати
        </Button>
      </div>
    </form>
  )
}

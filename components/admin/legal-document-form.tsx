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

type LegalDocument = {
  id: string
  category: string
  title: string
  content: string
  document_url: string | null
}

export function LegalDocumentForm({ document }: { document?: LegalDocument }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    category: document?.category || "announcement",
    title: document?.title || "",
    content: document?.content || "",
    document_url: document?.document_url || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()

    if (document) {
      const { error } = await supabase.from("legal_documents").update(formData).eq("id", document.id)

      if (error) {
        alert("Помилка при оновленні")
        setLoading(false)
        return
      }
    } else {
      const { error } = await supabase.from("legal_documents").insert([formData])

      if (error) {
        alert("Помилка при створенні")
        setLoading(false)
        return
      }
    }

    router.push("/admin/legal")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="category">Категорія *</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="announcement">Оголошення</SelectItem>
            <SelectItem value="lecture">Лекція</SelectItem>
            <SelectItem value="information">Інформація</SelectItem>
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
        <Label htmlFor="content">Контент *</Label>
        <Textarea
          id="content"
          rows={10}
          required
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="document_url">URL документу</Label>
        <Input
          id="document_url"
          type="url"
          value={formData.document_url}
          onChange={(e) => setFormData({ ...formData, document_url: e.target.value })}
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Збереження..." : document ? "Оновити" : "Створити"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/legal")}>
          Скасувати
        </Button>
      </div>
    </form>
  )
}

"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

type PresidentialOrder = {
  id: string
  order_number: string
  title: string
  content: string
  document_url: string | null
  date_issued: string
}

export function PresidentialOrderForm({ order }: { order?: PresidentialOrder }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    order_number: order?.order_number || "",
    title: order?.title || "",
    content: order?.content || "",
    document_url: order?.document_url || "",
    date_issued: order?.date_issued || new Date().toISOString().split("T")[0],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()

    if (order) {
      const { error } = await supabase.from("presidential_orders").update(formData).eq("id", order.id)

      if (error) {
        alert("Помилка при оновленні")
        setLoading(false)
        return
      }
    } else {
      const { error } = await supabase.from("presidential_orders").insert([formData])

      if (error) {
        alert("Помилка при створенні")
        setLoading(false)
        return
      }
    }

    router.push("/admin/orders")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="order_number">Номер наказу *</Label>
        <Input
          id="order_number"
          required
          value={formData.order_number}
          onChange={(e) => setFormData({ ...formData, order_number: e.target.value })}
          placeholder="№123/2025"
        />
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
        <Label htmlFor="date_issued">Дата видання *</Label>
        <Input
          id="date_issued"
          type="date"
          required
          value={formData.date_issued}
          onChange={(e) => setFormData({ ...formData, date_issued: e.target.value })}
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
          {loading ? "Збереження..." : order ? "Оновити" : "Створити"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/orders")}>
          Скасувати
        </Button>
      </div>
    </form>
  )
}

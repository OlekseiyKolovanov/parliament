"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Tender = {
  id: string
  organization_name: string
  contact_name: string
  telegram: string
  description: string
  status: string
  created_at: string
}

export function TendersList({ tenders }: { tenders: Tender[] }) {
  const router = useRouter()

  const handleDelete = async (id: string) => {
    if (!confirm("Ви впевнені, що хочете видалити цей тендер?")) return

    const supabase = createClient()
    const { error } = await supabase.from("tenders").delete().eq("id", id)

    if (error) {
      alert("Помилка при видаленні")
      return
    }

    router.refresh()
  }

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "open" ? "closed" : "open"
    const supabase = createClient()

    const { error } = await supabase.from("tenders").update({ status: newStatus }).eq("id", id)

    if (error) {
      alert("Помилка при оновленні статусу")
      return
    }

    router.refresh()
  }

  if (tenders.length === 0) {
    return <p className="text-center text-muted-foreground py-8">Тендерів ще немає</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Організація</TableHead>
          <TableHead>Контакт</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead>Дата</TableHead>
          <TableHead className="text-right">Дії</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tenders.map((tender) => (
          <TableRow key={tender.id}>
            <TableCell className="font-medium">{tender.organization_name}</TableCell>
            <TableCell>{tender.contact_name}</TableCell>
            <TableCell>
              <Badge
                variant={tender.status === "open" ? "default" : "secondary"}
                className="cursor-pointer"
                onClick={() => toggleStatus(tender.id, tender.status)}
              >
                {tender.status === "open" ? "Відкритий" : "Закритий"}
              </Badge>
            </TableCell>
            <TableCell>{new Date(tender.created_at).toLocaleDateString("uk-UA")}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/admin/tenders/${tender.id}`}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(tender.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

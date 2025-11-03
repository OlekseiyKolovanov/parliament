"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Trash2, Edit } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type LegalDocument = {
  id: string
  category: string
  title: string
  content: string
  document_url: string | null
  created_at: string
}

export function LegalDocumentsList({ documents }: { documents: LegalDocument[] }) {
  const router = useRouter()

  const handleDelete = async (id: string) => {
    if (!confirm("Ви впевнені, що хочете видалити цей документ?")) return

    const supabase = createClient()
    const { error } = await supabase.from("legal_documents").delete().eq("id", id)

    if (error) {
      alert("Помилка при видаленні")
      return
    }

    router.refresh()
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "announcement":
        return "Оголошення"
      case "lecture":
        return "Лекція"
      case "information":
        return "Інформація"
      default:
        return category
    }
  }

  if (documents.length === 0) {
    return <p className="text-center text-muted-foreground py-8">Документів ще немає</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Назва</TableHead>
          <TableHead>Категорія</TableHead>
          <TableHead>Дата</TableHead>
          <TableHead className="text-right">Дії</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.map((doc) => (
          <TableRow key={doc.id}>
            <TableCell className="font-medium">{doc.title}</TableCell>
            <TableCell>
              <Badge variant="outline">{getCategoryLabel(doc.category)}</Badge>
            </TableCell>
            <TableCell>{new Date(doc.created_at).toLocaleDateString("uk-UA")}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/admin/legal/${doc.id}`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(doc.id)}>
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

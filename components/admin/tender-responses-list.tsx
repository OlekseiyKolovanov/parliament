"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type TenderResponse = {
  id: string
  contact_name: string
  telegram: string
  proposal: string
  created_at: string
}

export function TenderResponsesList({ responses }: { responses: TenderResponse[] }) {
  const router = useRouter()

  const handleDelete = async (id: string) => {
    if (!confirm("Ви впевнені, що хочете видалити цю відповідь?")) return

    const supabase = createClient()
    const { error } = await supabase.from("tender_responses").delete().eq("id", id)

    if (error) {
      alert("Помилка при видаленні")
      return
    }

    router.refresh()
  }

  if (responses.length === 0) {
    return <p className="text-center text-muted-foreground py-8">Відповідей ще немає</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Контакт</TableHead>
          <TableHead>Telegram</TableHead>
          <TableHead>Пропозиція</TableHead>
          <TableHead>Дата</TableHead>
          <TableHead className="text-right">Дії</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {responses.map((response) => (
          <TableRow key={response.id}>
            <TableCell className="font-medium">{response.contact_name}</TableCell>
            <TableCell>{response.telegram}</TableCell>
            <TableCell className="max-w-xs truncate">{response.proposal}</TableCell>
            <TableCell>{new Date(response.created_at).toLocaleDateString("uk-UA")}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm" onClick={() => handleDelete(response.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

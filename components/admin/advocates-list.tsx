"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Trash2, Edit } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Advocate = {
  id: string
  name: string
  telegram: string
  license_number: string
}

export function AdvocatesList({ advocates }: { advocates: Advocate[] }) {
  const router = useRouter()

  const handleDelete = async (id: string) => {
    if (!confirm("Ви впевнені, що хочете видалити цього адвоката?")) return

    const supabase = createClient()
    const { error } = await supabase.from("advocates").delete().eq("id", id)

    if (error) {
      alert("Помилка при видаленні")
      return
    }

    router.refresh()
  }

  if (advocates.length === 0) {
    return <p className="text-center text-muted-foreground py-8">Адвокатів ще немає</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Ім'я</TableHead>
          <TableHead>Telegram</TableHead>
          <TableHead>Номер ліцензії</TableHead>
          <TableHead className="text-right">Дії</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {advocates.map((advocate) => (
          <TableRow key={advocate.id}>
            <TableCell className="font-medium">{advocate.name}</TableCell>
            <TableCell>{advocate.telegram}</TableCell>
            <TableCell>
              <Badge variant="outline" className="font-mono">
                {advocate.license_number}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/admin/advocates/${advocate.id}`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(advocate.id)}>
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

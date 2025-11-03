"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Trash2, Edit } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Enterprise = {
  id: string
  name: string
  director: string
  participants: string | null
  type: string
  number: string
}

export function EnterprisesList({ enterprises }: { enterprises: Enterprise[] }) {
  const router = useRouter()

  const handleDelete = async (id: string) => {
    if (!confirm("Ви впевнені, що хочете видалити це підприємство?")) return

    const supabase = createClient()
    const { error } = await supabase.from("enterprises").delete().eq("id", id)

    if (error) {
      alert("Помилка при видаленні")
      return
    }

    router.refresh()
  }

  if (enterprises.length === 0) {
    return <p className="text-center text-muted-foreground py-8">Підприємств ще немає</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Назва</TableHead>
          <TableHead>Керівник</TableHead>
          <TableHead>Тип</TableHead>
          <TableHead>Номер</TableHead>
          <TableHead className="text-right">Дії</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {enterprises.map((enterprise) => (
          <TableRow key={enterprise.id}>
            <TableCell className="font-medium">{enterprise.name}</TableCell>
            <TableCell>{enterprise.director}</TableCell>
            <TableCell>
              <Badge variant="secondary">{enterprise.type}</Badge>
            </TableCell>
            <TableCell className="font-mono text-sm">{enterprise.number}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/admin/enterprises/${enterprise.id}`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(enterprise.id)}>
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

"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Trash2, Edit } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type MediaItem = {
  id: string
  type: string
  title: string
  description: string | null
  url: string
  thumbnail_url: string | null
  created_at: string
}

export function MediaList({ media }: { media: MediaItem[] }) {
  const router = useRouter()

  const handleDelete = async (id: string) => {
    if (!confirm("Ви впевнені, що хочете видалити цей медіа-файл?")) return

    const supabase = createClient()
    const { error } = await supabase.from("media_items").delete().eq("id", id)

    if (error) {
      alert("Помилка при видаленні")
      return
    }

    router.refresh()
  }

  if (media.length === 0) {
    return <p className="text-center text-muted-foreground py-8">Медіа ще немає</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Назва</TableHead>
          <TableHead>Тип</TableHead>
          <TableHead>Дата</TableHead>
          <TableHead className="text-right">Дії</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {media.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell>
              <Badge variant={item.type === "video" ? "default" : "secondary"}>
                {item.type === "video" ? "Відео" : "Фото"}
              </Badge>
            </TableCell>
            <TableCell>{new Date(item.created_at).toLocaleDateString("uk-UA")}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/admin/media/${item.id}`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
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

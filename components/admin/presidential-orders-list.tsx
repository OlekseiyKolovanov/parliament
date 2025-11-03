"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Trash2, Edit } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type PresidentialOrder = {
  id: string
  order_number: string
  title: string
  content: string
  document_url: string | null
  date_issued: string
}

export function PresidentialOrdersList({ orders }: { orders: PresidentialOrder[] }) {
  const router = useRouter()

  const handleDelete = async (id: string) => {
    if (!confirm("Ви впевнені, що хочете видалити цей наказ?")) return

    const supabase = createClient()
    const { error } = await supabase.from("presidential_orders").delete().eq("id", id)

    if (error) {
      alert("Помилка при видаленні")
      return
    }

    router.refresh()
  }

  if (orders.length === 0) {
    return <p className="text-center text-muted-foreground py-8">Наказів ще немає</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Номер</TableHead>
          <TableHead>Назва</TableHead>
          <TableHead>Дата видання</TableHead>
          <TableHead className="text-right">Дії</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>
              <Badge variant="outline">{order.order_number}</Badge>
            </TableCell>
            <TableCell className="font-medium">{order.title}</TableCell>
            <TableCell>{new Date(order.date_issued).toLocaleDateString("uk-UA")}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/admin/orders/${order.id}`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(order.id)}>
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

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { Plus } from "lucide-react"
import Link from "next/link"
import { PresidentialOrdersList } from "@/components/admin/presidential-orders-list"

export default async function AdminOrdersPage() {
  const supabase = await createClient()

  const { data: orders } = await supabase
    .from("presidential_orders")
    .select("*")
    .order("date_issued", { ascending: false })

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Накази Президента</h1>
          <p className="text-muted-foreground">Керування наказами та розпорядженнями</p>
        </div>
        <Button asChild>
          <Link href="/admin/orders/new">
            <Plus className="mr-2 h-4 w-4" />
            Додати
          </Link>
        </Button>
      </div>

      <Card className="glass shadow-elegant">
        <CardHeader>
          <CardTitle>Список наказів</CardTitle>
        </CardHeader>
        <CardContent>
          <PresidentialOrdersList orders={orders || []} />
        </CardContent>
      </Card>
    </div>
  )
}

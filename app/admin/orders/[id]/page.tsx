import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PresidentialOrderForm } from "@/components/admin/presidential-order-form"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export default async function EditOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: order } = await supabase.from("presidential_orders").select("*").eq("id", id).single()

  if (!order) {
    notFound()
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Редагувати наказ</h1>
        <p className="text-muted-foreground">Оновлення інформації</p>
      </div>

      <Card className="glass shadow-elegant max-w-2xl">
        <CardHeader>
          <CardTitle>Інформація про наказ</CardTitle>
        </CardHeader>
        <CardContent>
          <PresidentialOrderForm order={order} />
        </CardContent>
      </Card>
    </div>
  )
}

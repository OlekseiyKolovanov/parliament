import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import { FileText } from "lucide-react"

export default async function OrdersPage() {
  const supabase = await createClient()

  const { data: orders } = await supabase
    .from("presidential_orders")
    .select("*")
    .order("date_issued", { ascending: false })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <FileText className="h-8 w-8 text-primary" />
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Накази Президента</h1>
        <p className="text-lg text-muted-foreground">Нормативно-правові акти та розпорядження</p>
      </div>

      {!orders || orders.length === 0 ? (
        <Card className="glass shadow-elegant mx-auto max-w-2xl">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Накази будуть опубліковані найближчим часом</p>
          </CardContent>
        </Card>
      ) : (
        <div className="mx-auto max-w-4xl space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="glass shadow-elegant">
              <CardHeader>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1">
                    <CardTitle className="mb-2">{order.title}</CardTitle>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge>{order.order_number}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(order.date_issued).toLocaleDateString("uk-UA")}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-muted-foreground mb-4">{order.content}</p>
                {order.document_url && (
                  <a
                    href={order.document_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm text-primary hover:underline"
                  >
                    Завантажити повний текст →
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { TenderResponsesList } from "@/components/admin/tender-responses-list"

export default async function TenderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: tender } = await supabase.from("tenders").select("*").eq("id", id).single()

  if (!tender) {
    notFound()
  }

  const { data: responses } = await supabase
    .from("tender_responses")
    .select("*")
    .eq("tender_id", id)
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Деталі тендеру</h1>
        <p className="text-muted-foreground">Інформація та відповіді</p>
      </div>

      <Card className="glass shadow-elegant">
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle>{tender.organization_name}</CardTitle>
            <Badge variant={tender.status === "open" ? "default" : "secondary"}>
              {tender.status === "open" ? "Відкритий" : "Закритий"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium">Контактна особа:</p>
            <p className="text-sm text-muted-foreground">{tender.contact_name}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Telegram:</p>
            <p className="text-sm text-muted-foreground">{tender.telegram}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Опис:</p>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{tender.description}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Дата створення:</p>
            <p className="text-sm text-muted-foreground">{new Date(tender.created_at).toLocaleString("uk-UA")}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="glass shadow-elegant">
        <CardHeader>
          <CardTitle>Відповіді ({responses?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          <TenderResponsesList responses={responses || []} />
        </CardContent>
      </Card>
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { TendersList } from "@/components/admin/tenders-list"

export default async function AdminTendersPage() {
  const supabase = await createClient()

  const { data: tenders } = await supabase
    .from("tenders")
    .select("*, tender_responses(count)")
    .order("created_at", { ascending: false })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Тендери</h1>
        <p className="text-muted-foreground">Керування тендерами та відповідями</p>
      </div>

      <Card className="glass shadow-elegant">
        <CardHeader>
          <CardTitle>Список тендерів</CardTitle>
        </CardHeader>
        <CardContent>
          <TendersList tenders={tenders || []} />
        </CardContent>
      </Card>
    </div>
  )
}

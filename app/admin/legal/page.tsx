import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { Plus } from "lucide-react"
import Link from "next/link"
import { LegalDocumentsList } from "@/components/admin/legal-documents-list"

export default async function AdminLegalPage() {
  const supabase = await createClient()

  const { data: documents } = await supabase
    .from("legal_documents")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Адвокатура</h1>
          <p className="text-muted-foreground">Керування правовими документами</p>
        </div>
        <Button asChild>
          <Link href="/admin/legal/new">
            <Plus className="mr-2 h-4 w-4" />
            Додати
          </Link>
        </Button>
      </div>

      <Card className="glass shadow-elegant">
        <CardHeader>
          <CardTitle>Список документів</CardTitle>
        </CardHeader>
        <CardContent>
          <LegalDocumentsList documents={documents || []} />
        </CardContent>
      </Card>
    </div>
  )
}

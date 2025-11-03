import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LegalDocumentForm } from "@/components/admin/legal-document-form"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export default async function EditLegalDocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: document } = await supabase.from("legal_documents").select("*").eq("id", id).single()

  if (!document) {
    notFound()
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Редагувати документ</h1>
        <p className="text-muted-foreground">Оновлення інформації</p>
      </div>

      <Card className="glass shadow-elegant max-w-2xl">
        <CardHeader>
          <CardTitle>Інформація про документ</CardTitle>
        </CardHeader>
        <CardContent>
          <LegalDocumentForm document={document} />
        </CardContent>
      </Card>
    </div>
  )
}

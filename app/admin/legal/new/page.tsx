import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LegalDocumentForm } from "@/components/admin/legal-document-form"

export default function NewLegalDocumentPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Додати документ</h1>
        <p className="text-muted-foreground">Створення нового правового документу</p>
      </div>

      <Card className="glass shadow-elegant max-w-2xl">
        <CardHeader>
          <CardTitle>Інформація про документ</CardTitle>
        </CardHeader>
        <CardContent>
          <LegalDocumentForm />
        </CardContent>
      </Card>
    </div>
  )
}

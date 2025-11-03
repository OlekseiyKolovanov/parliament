import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EnterpriseForm } from "@/components/admin/enterprise-form"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export default async function EditEnterprisePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: enterprise } = await supabase.from("enterprises").select("*").eq("id", id).single()

  if (!enterprise) {
    notFound()
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Редагувати підприємство</h1>
        <p className="text-muted-foreground">Оновлення інформації</p>
      </div>

      <Card className="glass shadow-elegant max-w-2xl">
        <CardHeader>
          <CardTitle>Інформація про підприємство</CardTitle>
        </CardHeader>
        <CardContent>
          <EnterpriseForm enterprise={enterprise} />
        </CardContent>
      </Card>
    </div>
  )
}

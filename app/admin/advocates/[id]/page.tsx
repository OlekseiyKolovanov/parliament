import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdvocateForm } from "@/components/admin/advocate-form"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export default async function EditAdvocatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: advocate } = await supabase.from("advocates").select("*").eq("id", id).single()

  if (!advocate) {
    notFound()
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Редагувати адвоката</h1>
        <p className="text-muted-foreground">Оновлення інформації</p>
      </div>

      <Card className="glass shadow-elegant max-w-2xl">
        <CardHeader>
          <CardTitle>Інформація про адвоката</CardTitle>
        </CardHeader>
        <CardContent>
          <AdvocateForm advocate={advocate} />
        </CardContent>
      </Card>
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MediaForm } from "@/components/admin/media-form"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export default async function EditMediaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: media } = await supabase.from("media_items").select("*").eq("id", id).single()

  if (!media) {
    notFound()
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Редагувати медіа</h1>
        <p className="text-muted-foreground">Оновлення інформації</p>
      </div>

      <Card className="glass shadow-elegant max-w-2xl">
        <CardHeader>
          <CardTitle>Інформація про медіа</CardTitle>
        </CardHeader>
        <CardContent>
          <MediaForm media={media} />
        </CardContent>
      </Card>
    </div>
  )
}

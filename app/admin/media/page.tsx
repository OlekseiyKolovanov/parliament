import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { Plus } from "lucide-react"
import Link from "next/link"
import { MediaList } from "@/components/admin/media-list"

export default async function AdminMediaPage() {
  const supabase = await createClient()

  const { data: media } = await supabase.from("media_items").select("*").order("created_at", { ascending: false })

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Медіа</h1>
          <p className="text-muted-foreground">Керування відео та фото</p>
        </div>
        <Button asChild>
          <Link href="/admin/media/new">
            <Plus className="mr-2 h-4 w-4" />
            Додати
          </Link>
        </Button>
      </div>

      <Card className="glass shadow-elegant">
        <CardHeader>
          <CardTitle>Список медіа</CardTitle>
        </CardHeader>
        <CardContent>
          <MediaList media={media || []} />
        </CardContent>
      </Card>
    </div>
  )
}

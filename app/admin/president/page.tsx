import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PresidentBioForm } from "@/components/admin/president-bio-form"
import { createClient } from "@/lib/supabase/server"

export default async function AdminPresidentPage() {
  const supabase = await createClient()

  const { data: bio } = await supabase
    .from("president_bio")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(1)
    .single()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Біографія Президента</h1>
        <p className="text-muted-foreground">Редагування біографії</p>
      </div>

      <Card className="glass shadow-elegant max-w-4xl">
        <CardHeader>
          <CardTitle>Контент біографії</CardTitle>
        </CardHeader>
        <CardContent>
          <PresidentBioForm bio={bio} />
        </CardContent>
      </Card>
    </div>
  )
}

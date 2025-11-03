import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { User } from "lucide-react"

export default async function PresidentPage() {
  const supabase = await createClient()

  const { data: bio } = await supabase
    .from("president_bio")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(1)
    .single()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <User className="h-10 w-10 text-primary" />
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Президент</h1>
          <p className="text-lg text-muted-foreground">Біографія та інформація про Президента Західної України</p>
        </div>

        <Card className="glass shadow-elegant">
          <CardHeader>
            <CardTitle>Біографія</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-foreground">
              {bio?.content || "Інформація буде додана найближчим часом."}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

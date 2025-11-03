import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import { Building2 } from "lucide-react"

export default async function EnterprisesPage() {
  const supabase = await createClient()

  const { data: enterprises } = await supabase.from("enterprises").select("*").order("created_at", { ascending: false })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Building2 className="h-8 w-8 text-primary" />
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Підприємства</h1>
        <p className="text-lg text-muted-foreground">Реєстр підприємств Західної України</p>
      </div>

      {!enterprises || enterprises.length === 0 ? (
        <Card className="glass shadow-elegant mx-auto max-w-2xl">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Підприємства будуть додані найближчим часом</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {enterprises.map((enterprise) => (
            <Card key={enterprise.id} className="glass shadow-elegant">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{enterprise.name}</CardTitle>
                  <Badge variant="secondary">{enterprise.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Керівник:</p>
                  <p className="text-sm text-muted-foreground">{enterprise.director}</p>
                </div>
                {enterprise.participants && (
                  <div>
                    <p className="text-sm font-medium">Учасники:</p>
                    <p className="text-sm text-muted-foreground">{enterprise.participants}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium">Номер:</p>
                  <p className="text-sm text-muted-foreground font-mono">{enterprise.number}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

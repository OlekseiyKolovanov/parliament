import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import { Gavel } from "lucide-react"

export default async function AdvocatesPage() {
  const supabase = await createClient()

  const { data: advocates } = await supabase.from("advocates").select("*").order("created_at", { ascending: false })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Gavel className="h-8 w-8 text-primary" />
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Адвокати</h1>
        <p className="text-lg text-muted-foreground">Ліцензовані адвокати Західної України</p>
      </div>

      {!advocates || advocates.length === 0 ? (
        <Card className="glass shadow-elegant mx-auto max-w-2xl">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Список адвокатів буде додано найближчим часом</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {advocates.map((advocate) => (
            <Card key={advocate.id} className="glass shadow-elegant">
              <CardHeader>
                <CardTitle className="text-lg">{advocate.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Номер ліцензії:</p>
                  <Badge variant="outline" className="mt-1 font-mono">
                    {advocate.license_number}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium">Контакт:</p>
                  <p className="text-sm text-primary">{advocate.telegram}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

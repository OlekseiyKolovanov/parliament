import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import { Briefcase, Plus } from "lucide-react"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"

export default async function TendersPage() {
  const supabase = await createClient()
  const user = await getCurrentUser()

  const { data: tenders } = await supabase
    .from("tenders")
    .select("*, tender_responses(count)")
    .eq("status", "open")
    .order("created_at", { ascending: false })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight">Тендери</h1>
            <p className="text-lg text-muted-foreground">Відкриті тендери та можливості для співпраці</p>
          </div>
          {user && (
            <Button asChild size="lg">
              <Link href="/tenders/new">
                <Plus className="mr-2 h-4 w-4" />
                Подати тендер
              </Link>
            </Button>
          )}
        </div>
        {!user && (
          <Card className="glass shadow-elegant border-primary/20">
            <CardContent className="py-6">
              <p className="text-center text-muted-foreground">
                <Link href="/auth/login" className="text-primary hover:underline">
                  Увійдіть
                </Link>{" "}
                або{" "}
                <Link href="/auth/sign-up" className="text-primary hover:underline">
                  зареєструйтесь
                </Link>{" "}
                щоб подати тендер або відповісти на існуючі
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {!tenders || tenders.length === 0 ? (
        <Card className="glass shadow-elegant mx-auto max-w-2xl">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Наразі немає відкритих тендерів</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tenders.map((tender) => (
            <Card key={tender.id} className="glass shadow-elegant hover:shadow-2xl transition-all">
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge variant="default">Відкритий</Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(tender.created_at).toLocaleDateString("uk-UA")}
                  </span>
                </div>
                <CardTitle className="text-lg">{tender.organization_name}</CardTitle>
                <CardDescription className="line-clamp-3">{tender.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Відповідей: {tender.tender_responses?.[0]?.count || 0}
                  </span>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/tenders/${tender.id}`}>Детальніше</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

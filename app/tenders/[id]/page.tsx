import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { TenderResponseForm } from "@/components/tenders/tender-response-form"
import { MessageSquare, Calendar, User, Send } from "lucide-react"
import Link from "next/link"

export default async function TenderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: tender } = await supabase.from("tenders").select("*").eq("id", id).single()

  if (!tender) {
    notFound()
  }

  const { data: responses } = await supabase
    .from("tender_responses")
    .select("*")
    .eq("tender_id", id)
    .order("created_at", { ascending: false })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <Card className="glass shadow-2xl hover-lift animate-fade-in">
          <CardHeader>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={tender.status === "open" ? "default" : "secondary"} className="shadow-lg">
                    {tender.status === "open" ? "Відкритий" : "Закритий"}
                  </Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(tender.created_at).toLocaleDateString("uk-UA")}
                  </span>
                </div>
                <CardTitle className="text-2xl mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {tender.organization_name}
                </CardTitle>
                <CardDescription className="flex items-center gap-1 text-base">
                  <User className="h-4 w-4" />
                  {tender.contact_name} • {tender.telegram}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 text-lg">Опис тендеру:</h3>
                <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{tender.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {tender.status === "open" && (
          <Card className="glass shadow-2xl border-primary/30 hover-lift animate-fade-in [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Send className="h-5 w-5 text-primary" />
                Подати пропозицію
              </CardTitle>
              <CardDescription className="text-base">
                Заповніть форму для відповіді на цей тендер. Реєстрація не потрібна.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TenderResponseForm tenderId={id} />
            </CardContent>
          </Card>
        )}

        <Card className="glass shadow-2xl animate-fade-in [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <MessageSquare className="h-5 w-5 text-primary" />
              Пропозиції ({responses?.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!responses || responses.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">Поки що немає пропозицій на цей тендер</p>
              </div>
            ) : (
              <div className="space-y-4">
                {responses.map((response, index) => (
                  <Card
                    key={response.id}
                    className="border-border/50 hover-lift animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms`, opacity: 0, animationFillMode: "forwards" }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <CardTitle className="text-base font-semibold">{response.contact_name}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <Send className="h-3 w-3" />
                            {response.telegram}
                          </CardDescription>
                        </div>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(response.created_at).toLocaleDateString("uk-UA")}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                        {response.proposal}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-center animate-fade-in [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
          <Button asChild variant="outline" size="lg" className="glass hover-lift bg-transparent">
            <Link href="/tenders">← Повернутися до тендерів</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

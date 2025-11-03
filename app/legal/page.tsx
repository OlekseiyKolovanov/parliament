import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import { Scale } from "lucide-react"

export default async function LegalPage() {
  const supabase = await createClient()

  const { data: documents } = await supabase
    .from("legal_documents")
    .select("*")
    .order("created_at", { ascending: false })

  const announcements = documents?.filter((d) => d.category === "announcement") || []
  const lectures = documents?.filter((d) => d.category === "lecture") || []
  const information = documents?.filter((d) => d.category === "information") || []

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Scale className="h-8 w-8 text-primary" />
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Адвокатура</h1>
        <p className="text-lg text-muted-foreground">Оголошення, лекції та правова інформація</p>
      </div>

      <Tabs defaultValue="announcements" className="w-full">
        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3">
          <TabsTrigger value="announcements">Оголошення</TabsTrigger>
          <TabsTrigger value="lectures">Лекції</TabsTrigger>
          <TabsTrigger value="information">Інформація</TabsTrigger>
        </TabsList>

        <TabsContent value="announcements" className="mt-8">
          {announcements.length === 0 ? (
            <Card className="glass shadow-elegant mx-auto max-w-2xl">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Оголошень поки немає</p>
              </CardContent>
            </Card>
          ) : (
            <div className="mx-auto max-w-4xl space-y-6">
              {announcements.map((doc) => (
                <Card key={doc.id} className="glass shadow-elegant">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <CardTitle>{doc.title}</CardTitle>
                      <Badge>Оголошення</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap text-muted-foreground">{doc.content}</p>
                    {doc.document_url && (
                      <a
                        href={doc.document_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block text-sm text-primary hover:underline"
                      >
                        Завантажити документ →
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="lectures" className="mt-8">
          {lectures.length === 0 ? (
            <Card className="glass shadow-elegant mx-auto max-w-2xl">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Лекцій поки немає</p>
              </CardContent>
            </Card>
          ) : (
            <div className="mx-auto max-w-4xl space-y-6">
              {lectures.map((doc) => (
                <Card key={doc.id} className="glass shadow-elegant">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <CardTitle>{doc.title}</CardTitle>
                      <Badge variant="secondary">Лекція</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap text-muted-foreground">{doc.content}</p>
                    {doc.document_url && (
                      <a
                        href={doc.document_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block text-sm text-primary hover:underline"
                      >
                        Завантажити матеріали →
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="information" className="mt-8">
          {information.length === 0 ? (
            <Card className="glass shadow-elegant mx-auto max-w-2xl">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Інформації поки немає</p>
              </CardContent>
            </Card>
          ) : (
            <div className="mx-auto max-w-4xl space-y-6">
              {information.map((doc) => (
                <Card key={doc.id} className="glass shadow-elegant">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <CardTitle>{doc.title}</CardTitle>
                      <Badge variant="outline">Інформація</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap text-muted-foreground">{doc.content}</p>
                    {doc.document_url && (
                      <a
                        href={doc.document_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block text-sm text-primary hover:underline"
                      >
                        Завантажити документ →
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

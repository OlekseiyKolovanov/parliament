import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { Plus } from "lucide-react"
import Link from "next/link"
import { AdvocatesList } from "@/components/admin/advocates-list"

export default async function AdminAdvocatesPage() {
  const supabase = await createClient()

  const { data: advocates } = await supabase.from("advocates").select("*").order("created_at", { ascending: false })

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Адвокати</h1>
          <p className="text-muted-foreground">Керування реєстром адвокатів</p>
        </div>
        <Button asChild>
          <Link href="/admin/advocates/new">
            <Plus className="mr-2 h-4 w-4" />
            Додати
          </Link>
        </Button>
      </div>

      <Card className="glass shadow-elegant">
        <CardHeader>
          <CardTitle>Список адвокатів</CardTitle>
        </CardHeader>
        <CardContent>
          <AdvocatesList advocates={advocates || []} />
        </CardContent>
      </Card>
    </div>
  )
}

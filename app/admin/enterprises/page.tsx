import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { Plus } from "lucide-react"
import Link from "next/link"
import { EnterprisesList } from "@/components/admin/enterprises-list"

export default async function AdminEnterprisesPage() {
  const supabase = await createClient()

  const { data: enterprises } = await supabase.from("enterprises").select("*").order("created_at", { ascending: false })

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Підприємства</h1>
          <p className="text-muted-foreground">Керування реєстром підприємств</p>
        </div>
        <Button asChild>
          <Link href="/admin/enterprises/new">
            <Plus className="mr-2 h-4 w-4" />
            Додати
          </Link>
        </Button>
      </div>

      <Card className="glass shadow-elegant">
        <CardHeader>
          <CardTitle>Список підприємств</CardTitle>
        </CardHeader>
        <CardContent>
          <EnterprisesList enterprises={enterprises || []} />
        </CardContent>
      </Card>
    </div>
  )
}

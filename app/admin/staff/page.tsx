import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { Plus } from "lucide-react"
import Link from "next/link"
import { StaffList } from "@/components/admin/staff-list"

export default async function AdminStaffPage() {
  const supabase = await createClient()

  const { data: staff } = await supabase.from("staff_members").select("*").order("created_at", { ascending: false })

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Співробітники</h1>
          <p className="text-muted-foreground">Керування співробітниками Верховної Ради</p>
        </div>
        <Button asChild>
          <Link href="/admin/staff/new">
            <Plus className="mr-2 h-4 w-4" />
            Додати
          </Link>
        </Button>
      </div>

      <Card className="glass shadow-elegant">
        <CardHeader>
          <CardTitle>Список співробітників</CardTitle>
        </CardHeader>
        <CardContent>
          <StaffList staff={staff || []} />
        </CardContent>
      </Card>
    </div>
  )
}

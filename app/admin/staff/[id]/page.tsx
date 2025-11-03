import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StaffForm } from "@/components/admin/staff-form"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export default async function EditStaffPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: staff } = await supabase.from("staff_members").select("*").eq("id", id).single()

  if (!staff) {
    notFound()
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Редагувати співробітника</h1>
        <p className="text-muted-foreground">Оновлення інформації</p>
      </div>

      <Card className="glass shadow-elegant max-w-2xl">
        <CardHeader>
          <CardTitle>Інформація про співробітника</CardTitle>
        </CardHeader>
        <CardContent>
          <StaffForm staff={staff} />
        </CardContent>
      </Card>
    </div>
  )
}

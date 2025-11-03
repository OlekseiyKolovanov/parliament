import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StaffForm } from "@/components/admin/staff-form"

export default function NewStaffPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Додати співробітника</h1>
        <p className="text-muted-foreground">Створення нового співробітника</p>
      </div>

      <Card className="glass shadow-elegant max-w-2xl">
        <CardHeader>
          <CardTitle>Інформація про співробітника</CardTitle>
        </CardHeader>
        <CardContent>
          <StaffForm />
        </CardContent>
      </Card>
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EnterpriseForm } from "@/components/admin/enterprise-form"

export default function NewEnterprisePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Додати підприємство</h1>
        <p className="text-muted-foreground">Створення нового підприємства</p>
      </div>

      <Card className="glass shadow-elegant max-w-2xl">
        <CardHeader>
          <CardTitle>Інформація про підприємство</CardTitle>
        </CardHeader>
        <CardContent>
          <EnterpriseForm />
        </CardContent>
      </Card>
    </div>
  )
}

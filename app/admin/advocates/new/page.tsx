import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdvocateForm } from "@/components/admin/advocate-form"

export default function NewAdvocatePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Додати адвоката</h1>
        <p className="text-muted-foreground">Створення нового адвоката</p>
      </div>

      <Card className="glass shadow-elegant max-w-2xl">
        <CardHeader>
          <CardTitle>Інформація про адвоката</CardTitle>
        </CardHeader>
        <CardContent>
          <AdvocateForm />
        </CardContent>
      </Card>
    </div>
  )
}

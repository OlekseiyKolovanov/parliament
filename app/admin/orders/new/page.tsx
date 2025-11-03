import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PresidentialOrderForm } from "@/components/admin/presidential-order-form"

export default function NewOrderPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Додати наказ</h1>
        <p className="text-muted-foreground">Створення нового наказу</p>
      </div>

      <Card className="glass shadow-elegant max-w-2xl">
        <CardHeader>
          <CardTitle>Інформація про наказ</CardTitle>
        </CardHeader>
        <CardContent>
          <PresidentialOrderForm />
        </CardContent>
      </Card>
    </div>
  )
}

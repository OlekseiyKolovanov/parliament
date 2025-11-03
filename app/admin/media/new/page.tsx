import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MediaForm } from "@/components/admin/media-form"

export default function NewMediaPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Додати медіа</h1>
        <p className="text-muted-foreground">Створення нового медіа-файлу</p>
      </div>

      <Card className="glass shadow-elegant max-w-2xl">
        <CardHeader>
          <CardTitle>Інформація про медіа</CardTitle>
        </CardHeader>
        <CardContent>
          <MediaForm />
        </CardContent>
      </Card>
    </div>
  )
}

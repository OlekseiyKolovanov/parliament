import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { TenderSubmissionForm } from "@/components/tenders/tender-submission-form"

export default async function NewTenderPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Подати тендер
          </h1>
          <p className="text-muted-foreground text-lg">
            Заповніть форму для створення нового тендеру. Реєстрація не потрібна.
          </p>
        </div>

        <Card className="glass shadow-2xl hover-lift animate-fade-in [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
          <CardHeader>
            <CardTitle>Інформація про тендер</CardTitle>
            <CardDescription>Всі поля обов'язкові для заповнення</CardDescription>
          </CardHeader>
          <CardContent>
            <TenderSubmissionForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

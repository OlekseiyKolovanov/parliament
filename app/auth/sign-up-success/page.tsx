import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            <CardTitle className="text-2xl">Реєстрація успішна!</CardTitle>
            <CardDescription>Перевірте вашу електронну пошту для підтвердження акаунту</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Ми відправили лист з посиланням для підтвердження на вашу електронну адресу. Після підтвердження ви
              зможете увійти в систему.
            </p>
            <Link href="/auth/login" className="text-sm text-primary underline underline-offset-4">
              Повернутися до входу
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

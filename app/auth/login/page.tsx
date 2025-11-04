"use client"

import { login, resendConfirmation } from "./actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Shield, LogIn, AlertCircle, Mail } from "lucide-react"
import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [needsConfirmation, setNeedsConfirmation] = useState(false)
  const [email, setEmail] = useState("")
  const [resendSuccess, setResendSuccess] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    setResendSuccess(false)

    const emailValue = formData.get("email") as string
    setEmail(emailValue)

    const result = await login(formData)

    if (result?.error) {
      setError(result.error)
      if (result.needsConfirmation) {
        setNeedsConfirmation(true)
      }
      setLoading(false)
    }
  }

  async function handleResendConfirmation() {
    setResendLoading(true)
    setResendSuccess(false)
    setError(null)

    const result = await resendConfirmation(email)

    if (result?.error) {
      setError(result.error)
    } else if (result?.success) {
      setResendSuccess(true)
    }

    setResendLoading(false)
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 gradient-primary">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <Shield className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Вітаємо знову!
          </h1>
          <p className="text-muted-foreground">Увійдіть до свого акаунту</p>
        </div>

        <Card className="glass shadow-2xl hover-lift border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <LogIn className="h-5 w-5 text-primary" />
              Вхід
            </CardTitle>
            <CardDescription>Введіть ваші дані для входу в систему</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {resendSuccess && (
              <Alert className="mb-4 border-green-500/50 bg-green-500/10">
                <Mail className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-500">
                  Лист з підтвердженням відправлено! Перевірте вашу пошту.
                </AlertDescription>
              </Alert>
            )}

            <form action={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    required
                    className="glass"
                    disabled={loading}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Пароль</Label>
                  <Input id="password" name="password" type="password" required className="glass" disabled={loading} />
                </div>

                {needsConfirmation && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={handleResendConfirmation}
                    disabled={resendLoading}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    {resendLoading ? "Відправка..." : "Відправити лист підтвердження знову"}
                  </Button>
                )}

                <Button type="submit" className="w-full shadow-lg hover-lift" size="lg" disabled={loading}>
                  {loading ? "Вхід..." : "Увійти"}
                </Button>
              </div>
              <div className="mt-6 text-center text-sm">
                Немає акаунту?{" "}
                <Link href="/auth/sign-up" className="text-primary hover:underline underline-offset-4 font-semibold">
                  Зареєструватися
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

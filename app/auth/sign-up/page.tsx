"use client"

import { signUp } from "./actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Shield, UserPlus, AlertCircle } from "lucide-react"
import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)

    const password = formData.get("password") as string
    const repeatPassword = formData.get("repeatPassword") as string

    if (password !== repeatPassword) {
      setError("Паролі не співпадають")
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Пароль має містити мінімум 6 символів")
      setLoading(false)
      return
    }

    const result = await signUp(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 gradient-secondary">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <Shield className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Приєднуйтесь до нас!
          </h1>
          <p className="text-muted-foreground">Створіть акаунт для доступу до всіх функцій</p>
        </div>

        <Card className="glass shadow-2xl hover-lift border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-primary" />
              Реєстрація
            </CardTitle>
            <CardDescription>Заповніть форму для створення нового акаунту</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
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
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Мінімум 6 символів"
                    required
                    className="glass"
                    disabled={loading}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="repeatPassword">Повторіть пароль</Label>
                  <Input
                    id="repeatPassword"
                    name="repeatPassword"
                    type="password"
                    placeholder="Введіть пароль ще раз"
                    required
                    className="glass"
                    disabled={loading}
                  />
                </div>
                <Button type="submit" className="w-full shadow-lg hover-lift" size="lg" disabled={loading}>
                  {loading ? "Реєстрація..." : "Зареєструватися"}
                </Button>
              </div>
              <div className="mt-6 text-center text-sm">
                Вже є акаунт?{" "}
                <Link href="/auth/login" className="text-primary hover:underline underline-offset-4 font-semibold">
                  Увійти
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

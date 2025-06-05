"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthService } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Footer } from "@/components/footer"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { usuario } = await AuthService.login(email, senha)

      // Redirecionar baseado no perfil
      switch (usuario.perfil) {
        case "familia":
          router.push("/familia")
          break
        case "tecnico":
          router.push("/tecnico")
          break
        case "coordenacao":
          router.push("/coordenacao")
          break
        case "admin":
          router.push("/admin")
          break
        default:
          router.push("/")
      }
    } catch (error: any) {
      setError(error.message || "Erro ao fazer login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-3xl font-bold text-green-700">OCAdastramento</CardTitle>
              <CardDescription className="text-base">
                OCA PA Quilombo - Sistema de Automação Social Regenerativa
              </CardDescription>
              {!process.env.NEXT_PUBLIC_SUPABASE_URL && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg text-sm">
                  <strong>Modo Desenvolvimento:</strong> Use qualquer email dos perfis (familia@teste.com,
                  tecnico@teste.com, coordenacao@teste.com, admin@teste.com) com senha "123"
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="seu@email.com"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="senha" className="text-sm font-medium">
                    Senha
                  </Label>
                  <Input
                    id="senha"
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                    placeholder="Sua senha"
                    className="h-11"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm text-center">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-medium"
                  disabled={loading}
                >
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
              </form>

              <div className="text-center">
                <Button
                  variant="link"
                  onClick={() => router.push("/registro")}
                  className="text-green-600 hover:text-green-700"
                >
                  Não tem conta? Cadastre-se aqui
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}

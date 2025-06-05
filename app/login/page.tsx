"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { AuthService } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Footer } from "@/components/footer"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const message = searchParams.get("message")
    if (message) {
      setSuccess(message)
    }
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

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

  const preencherTeste = (perfil: string) => {
    setEmail(`${perfil}@teste.com`)
    setSenha("123")
    setError("")
    setSuccess("")
  }

  const loginRapido = async (perfil: string) => {
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const { usuario } = await AuthService.login(`${perfil}@teste.com`, "123")
      router.push(`/${perfil}`)
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

              {/* Modo desenvolvimento */}
              {!process.env.NEXT_PUBLIC_SUPABASE_URL && (
                <Alert className="bg-yellow-50 border-yellow-200">
                  <AlertDescription>
                    <div className="space-y-3">
                      <p className="font-semibold text-yellow-800">🔧 Modo Desenvolvimento Ativo</p>

                      <div className="space-y-2">
                        <p className="text-sm text-yellow-700">Login Rápido:</p>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => loginRapido("familia")}
                            disabled={loading}
                            className="text-xs bg-green-50 hover:bg-green-100"
                          >
                            👨‍👩‍👧‍👦 Família
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => loginRapido("tecnico")}
                            disabled={loading}
                            className="text-xs bg-blue-50 hover:bg-blue-100"
                          >
                            🔧 Técnico
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => loginRapido("coordenacao")}
                            disabled={loading}
                            className="text-xs bg-purple-50 hover:bg-purple-100"
                          >
                            📊 Coordenação
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => loginRapido("admin")}
                            disabled={loading}
                            className="text-xs bg-red-50 hover:bg-red-100"
                          >
                            ⚙️ Admin
                          </Button>
                        </div>
                      </div>

                      <div className="border-t border-yellow-300 pt-2">
                        <p className="text-sm text-yellow-700">Ou preencha manualmente:</p>
                        <div className="grid grid-cols-2 gap-1 mt-1">
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => preencherTeste("familia")}
                            className="text-xs h-6"
                          >
                            Família
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => preencherTeste("tecnico")}
                            className="text-xs h-6"
                          >
                            Técnico
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => preencherTeste("coordenacao")}
                            className="text-xs h-6"
                          >
                            Coordenação
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => preencherTeste("admin")}
                            className="text-xs h-6"
                          >
                            Admin
                          </Button>
                        </div>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
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
                  <div className="relative">
                    <Input
                      id="senha"
                      type={showPassword ? "text" : "password"}
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      required
                      placeholder="Sua senha"
                      className="h-11 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-11 px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                {error && (
                  <Alert className="bg-red-50 border-red-200">
                    <AlertDescription className="text-red-700 text-sm">{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="bg-green-50 border-green-200">
                    <AlertDescription className="text-green-700 text-sm">{success}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-medium"
                  disabled={loading}
                >
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
              </form>

              <div className="space-y-3">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Ou</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-11"
                    onClick={() => router.push("/registro")}
                  >
                    Criar Nova Conta
                  </Button>

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={() => router.push("/faq")}
                    >
                      ❓ FAQ
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={() => router.push("/sobre")}
                    >
                      ℹ️ Sobre
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={() => router.push("/contato")}
                    >
                      📞 Contato
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}

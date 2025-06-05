"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthService } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Footer } from "@/components/footer"

export default function RegistroPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    perfil: "familia" as "familia" | "tecnico" | "coordenacao" | "admin",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (formData.senha !== formData.confirmarSenha) {
      setError("As senhas não coincidem")
      setLoading(false)
      return
    }

    try {
      await AuthService.registrarUsuario({
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        perfil: formData.perfil,
        tipo_dispositivo: navigator.userAgent,
      })

      router.push("/login?message=Cadastro realizado com sucesso!")
    } catch (error: any) {
      setError(error.message || "Erro ao criar conta")
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
              <CardDescription className="text-base">Crie sua conta no sistema OCA PA Quilombo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-sm font-medium">
                    Nome Completo
                  </Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    required
                    placeholder="Seu nome completo"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="seu@email.com"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="perfil" className="text-sm font-medium">
                    Perfil
                  </Label>
                  <Select
                    value={formData.perfil}
                    onValueChange={(value: any) => setFormData({ ...formData, perfil: value })}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Selecione seu perfil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="familia">Família</SelectItem>
                      <SelectItem value="tecnico">Técnico</SelectItem>
                      <SelectItem value="coordenacao">Coordenação</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="senha" className="text-sm font-medium">
                    Senha
                  </Label>
                  <Input
                    id="senha"
                    type="password"
                    value={formData.senha}
                    onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                    required
                    placeholder="Sua senha"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmarSenha" className="text-sm font-medium">
                    Confirmar Senha
                  </Label>
                  <Input
                    id="confirmarSenha"
                    type="password"
                    value={formData.confirmarSenha}
                    onChange={(e) => setFormData({ ...formData, confirmarSenha: e.target.value })}
                    required
                    placeholder="Confirme sua senha"
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
                  {loading ? "Criando conta..." : "Criar Conta"}
                </Button>
              </form>

              <div className="text-center">
                <Button
                  variant="link"
                  onClick={() => router.push("/login")}
                  className="text-green-600 hover:text-green-700"
                >
                  Já tem conta? Faça login
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

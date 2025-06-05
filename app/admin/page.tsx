"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AuthService } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"

export default function AdminPage() {
  const [usuario, setUsuario] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const verificarAuth = async () => {
      try {
        const user = await AuthService.getUsuarioAtual()
        if (!user || user.perfil !== "admin") {
          router.push("/login")
          return
        }
        setUsuario(user)
      } catch (error) {
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }

    verificarAuth()
  }, [router])

  const handleLogout = async () => {
    try {
      await AuthService.logout()
      router.push("/login")
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-700 mb-4">OCAdastramento</h1>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-green-700">CalangoADM</h1>
            <Button onClick={handleLogout} variant="outline">
              Sair
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Bem-vindo, {usuario?.nome}!</CardTitle>
              <CardDescription>Painel completo de administração do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  <strong>Email:</strong> {usuario?.email}
                </p>
                <p className="text-gray-600">
                  <strong>Perfil:</strong> {usuario?.perfil}
                </p>

                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">Funcionalidades em Desenvolvimento:</h3>
                  <ul className="text-red-700 space-y-1">
                    <li>• Painel completo de controle</li>
                    <li>• Acesso a logs do sistema</li>
                    <li>• Manutenção de FAQ</li>
                    <li>• Edição de qualquer campo</li>
                    <li>• Gestão de usuários e permissões</li>
                  </ul>
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

"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { ArrowLeft, Users, Target, Zap, Shield } from "lucide-react"

export default function SobrePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-green-700">Sobre o OCAdastramento</h1>
              <p className="text-gray-600">Sistema de Automação Social Regenerativa</p>
            </div>
          </div>

          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-green-800">OCA PA Quilombo</h2>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                  Uma iniciativa inovadora que combina tecnologia e sustentabilidade para fortalecer comunidades
                  quilombolas através de automação social regenerativa.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Target className="h-6 w-6 text-green-600" />
                  <CardTitle>Nossa Missão</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Facilitar o cadastro e acompanhamento de famílias quilombolas através de um sistema digital integrado
                  que promove a inclusão social e o desenvolvimento sustentável.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-blue-600" />
                  <CardTitle>Quem Somos</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Desenvolvido pela CalangoFlux, uma equipe dedicada a criar soluções tecnológicas que impactem
                  positivamente comunidades tradicionais e promovam a justiça social.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Zap className="h-6 w-6 text-yellow-600" />
                Funcionalidades Principais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-700">Para Famílias:</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Cadastro simplificado e intuitivo</li>
                    <li>• Geração automática de links Pix</li>
                    <li>• Envio de comprovantes via WhatsApp</li>
                    <li>• Acompanhamento do status da solicitação</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-blue-700">Para Técnicos:</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Acesso completo ao banco de dados</li>
                    <li>• Inserção de dados georreferenciados</li>
                    <li>• Upload de croquis e documentos</li>
                    <li>• Ferramentas de análise e relatórios</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-purple-600" />
                Segurança e Privacidade
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">Levamos a segurança dos dados muito a sério. Nosso sistema implementa:</p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-purple-800 mb-2">Row-Level Security</h5>
                  <p className="text-sm text-purple-700">
                    Controle granular de acesso aos dados baseado no perfil do usuário.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-blue-800 mb-2">Auditoria Completa</h5>
                  <p className="text-sm text-blue-700">Registro detalhado de todas as ações realizadas no sistema.</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-green-800 mb-2">Criptografia</h5>
                  <p className="text-sm text-green-700">Dados sensíveis protegidos com criptografia de ponta.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-50">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Tecnologias Utilizadas</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    "Next.js 14",
                    "React",
                    "TypeScript",
                    "Supabase",
                    "PostgreSQL",
                    "Tailwind CSS",
                    "Vercel",
                    "n8n",
                    "API Pix",
                    "WhatsApp API",
                  ].map((tech) => (
                    <span key={tech} className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4">
            <Button onClick={() => router.push("/contato")} className="bg-green-600 hover:bg-green-700">
              Entre em Contato
            </Button>
            <Button variant="outline" onClick={() => router.push("/login")}>
              Acessar Sistema
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

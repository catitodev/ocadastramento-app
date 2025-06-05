"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AuthService } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Users,
  CreditCard,
  MessageSquare,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Copy,
  ExternalLink,
} from "lucide-react"

export default function FamiliaPage() {
  const [usuario, setUsuario] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [familiaData, setFamiliaData] = useState({
    nome_familia: "",
    membros: 1,
    observacoes: "",
  })
  const [pixLink, setPixLink] = useState("")
  const [comprovante, setComprovante] = useState<File | null>(null)
  const [status, setStatus] = useState("pendente")
  const router = useRouter()

  useEffect(() => {
    const verificarAuth = async () => {
      try {
        const user = await AuthService.getUsuarioAtual()
        if (!user || user.perfil !== "familia") {
          router.push("/login")
          return
        }
        setUsuario(user)

        // Simular dados da família
        setFamiliaData({
          nome_familia: `Família ${user.nome.split(" ")[0]}`,
          membros: 4,
          observacoes: "",
        })
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

  const gerarPixLink = () => {
    // Simular geração de link Pix
    const linkSimulado = `pix.exemplo.com/qr/v2/cobv/${Date.now()}`
    setPixLink(linkSimulado)
  }

  const copiarPixLink = () => {
    navigator.clipboard.writeText(pixLink)
    alert("Link Pix copiado para a área de transferência!")
  }

  const enviarWhatsApp = () => {
    const numero = "5511999999999" // Número fictício
    const mensagem = encodeURIComponent(
      `Olá! Sou ${usuario?.nome} da ${familiaData.nome_familia}. Segue o comprovante de pagamento do OCAdastramento.`,
    )
    window.open(`https://wa.me/${numero}?text=${mensagem}`, "_blank")
  }

  const salvarDados = () => {
    // Simular salvamento
    alert("Dados salvos com sucesso!")
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
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-green-700">Painel da Família</h1>
              <p className="text-gray-600">Bem-vindo, {usuario?.nome}!</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => router.push("/faq")}>
                ❓ FAQ
              </Button>
              <Button onClick={handleLogout} variant="outline">
                Sair
              </Button>
            </div>
          </div>

          {/* Status Card */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-800">{familiaData.nome_familia}</h3>
                    <p className="text-sm text-green-600">{familiaData.membros} membros</p>
                  </div>
                </div>
                <Badge
                  variant={status === "aprovado" ? "default" : status === "em_analise" ? "secondary" : "outline"}
                  className="flex items-center gap-1"
                >
                  {status === "aprovado" && <CheckCircle className="h-3 w-3" />}
                  {status === "em_analise" && <Clock className="h-3 w-3" />}
                  {status === "pendente" && <AlertCircle className="h-3 w-3" />}
                  {status === "aprovado" ? "Aprovado" : status === "em_analise" ? "Em Análise" : "Pendente"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="cadastro" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="cadastro" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Cadastro
              </TabsTrigger>
              <TabsTrigger value="pagamento" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Pagamento
              </TabsTrigger>
              <TabsTrigger value="comprovante" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Comprovante
              </TabsTrigger>
              <TabsTrigger value="acompanhamento" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Status
              </TabsTrigger>
            </TabsList>

            {/* Aba Cadastro */}
            <TabsContent value="cadastro">
              <Card>
                <CardHeader>
                  <CardTitle>Dados da Família</CardTitle>
                  <CardDescription>Preencha as informações básicas da sua família</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome_familia">Nome da Família</Label>
                      <Input
                        id="nome_familia"
                        value={familiaData.nome_familia}
                        onChange={(e) => setFamiliaData({ ...familiaData, nome_familia: e.target.value })}
                        placeholder="Ex: Família Silva"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="membros">Número de Membros</Label>
                      <Input
                        id="membros"
                        type="number"
                        min="1"
                        value={familiaData.membros}
                        onChange={(e) => setFamiliaData({ ...familiaData, membros: Number.parseInt(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="observacoes">Observações</Label>
                    <Textarea
                      id="observacoes"
                      value={familiaData.observacoes}
                      onChange={(e) => setFamiliaData({ ...familiaData, observacoes: e.target.value })}
                      placeholder="Informações adicionais sobre a família..."
                      rows={4}
                    />
                  </div>

                  <Button onClick={salvarDados} className="bg-green-600 hover:bg-green-700">
                    Salvar Dados
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Pagamento */}
            <TabsContent value="pagamento">
              <Card>
                <CardHeader>
                  <CardTitle>Pagamento via Pix</CardTitle>
                  <CardDescription>Gere o link Pix para realizar o pagamento</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!pixLink ? (
                    <div className="text-center py-8">
                      <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Clique no botão abaixo para gerar seu link de pagamento Pix</p>
                      <Button onClick={gerarPixLink} className="bg-green-600 hover:bg-green-700">
                        Gerar Link Pix
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Alert className="bg-green-50 border-green-200">
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription className="text-green-700">
                          Link Pix gerado com sucesso! Use o link abaixo para realizar o pagamento.
                        </AlertDescription>
                      </Alert>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <Label className="text-sm font-medium">Link de Pagamento:</Label>
                        <div className="flex items-center gap-2 mt-2">
                          <Input value={pixLink} readOnly className="font-mono text-sm" />
                          <Button size="sm" variant="outline" onClick={copiarPixLink}>
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => window.open(`https://${pixLink}`, "_blank")}
                          className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Abrir Link de Pagamento
                        </Button>
                        <Button variant="outline" onClick={gerarPixLink}>
                          Gerar Novo Link
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Comprovante */}
            <TabsContent value="comprovante">
              <Card>
                <CardHeader>
                  <CardTitle>Envio de Comprovante</CardTitle>
                  <CardDescription>Envie o comprovante de pagamento via WhatsApp</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="comprovante">Selecionar Comprovante</Label>
                    <Input
                      id="comprovante"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => setComprovante(e.target.files?.[0] || null)}
                    />
                    <p className="text-sm text-gray-500">Formatos aceitos: JPG, PNG, PDF (máx. 5MB)</p>
                  </div>

                  {comprovante && (
                    <Alert className="bg-blue-50 border-blue-200">
                      <FileText className="h-4 w-4" />
                      <AlertDescription className="text-blue-700">
                        Arquivo selecionado: {comprovante.name}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Como enviar:</h4>
                    <ol className="text-sm text-yellow-700 space-y-1">
                      <li>1. Selecione o arquivo do comprovante acima</li>
                      <li>2. Clique em "Enviar via WhatsApp"</li>
                      <li>3. O WhatsApp abrirá com uma mensagem pré-formatada</li>
                      <li>4. Anexe o comprovante e envie a mensagem</li>
                    </ol>
                  </div>

                  <Button
                    onClick={enviarWhatsApp}
                    className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                    disabled={!comprovante}
                  >
                    <MessageSquare className="h-4 w-4" />
                    Enviar via WhatsApp
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Acompanhamento */}
            <TabsContent value="acompanhamento">
              <Card>
                <CardHeader>
                  <CardTitle>Acompanhamento do Processo</CardTitle>
                  <CardDescription>Veja o status atual da sua solicitação</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      <div>
                        <h4 className="font-semibold text-green-800">Cadastro Realizado</h4>
                        <p className="text-sm text-green-600">Dados básicos preenchidos</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                      <Clock className="h-6 w-6 text-blue-600" />
                      <div>
                        <h4 className="font-semibold text-blue-800">Aguardando Pagamento</h4>
                        <p className="text-sm text-blue-600">Link Pix gerado, aguardando confirmação</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg opacity-50">
                      <AlertCircle className="h-6 w-6 text-gray-400" />
                      <div>
                        <h4 className="font-semibold text-gray-600">Análise Técnica</h4>
                        <p className="text-sm text-gray-500">Aguardando etapas anteriores</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg opacity-50">
                      <AlertCircle className="h-6 w-6 text-gray-400" />
                      <div>
                        <h4 className="font-semibold text-gray-600">Aprovação Final</h4>
                        <p className="text-sm text-gray-500">Aguardando etapas anteriores</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  )
}

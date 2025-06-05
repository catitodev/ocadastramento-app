"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Mail, Phone, MapPin, Github, ExternalLink } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ContatoPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    categoria: "",
    mensagem: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simular envio
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setSuccess(true)
    setLoading(false)

    // Reset form
    setTimeout(() => {
      setFormData({
        nome: "",
        email: "",
        assunto: "",
        categoria: "",
        mensagem: "",
      })
      setSuccess(false)
    }, 3000)
  }

  const abrirWhatsApp = () => {
    const numero = "5511999999999" // Número fictício para demo
    const mensagem = encodeURIComponent("Olá! Gostaria de saber mais sobre o OCAdastramento.")
    window.open(`https://wa.me/${numero}?text=${mensagem}`, "_blank")
  }

  const abrirEmail = () => {
    window.open("mailto:calangoflux@gmail.com?subject=Contato OCAdastramento", "_blank")
  }

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
              <h1 className="text-3xl font-bold text-green-700">Contato</h1>
              <p className="text-gray-600">Entre em contato conosco</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Informações de Contato */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informações de Contato</CardTitle>
                  <CardDescription>Canais oficiais de comunicação</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Email</p>
                      <Button variant="link" className="p-0 h-auto text-sm text-blue-600" onClick={abrirEmail}>
                        calangoflux@gmail.com
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <Button variant="link" className="p-0 h-auto text-sm text-blue-600" onClick={abrirWhatsApp}>
                        Enviar mensagem
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Github className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">GitHub</p>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-sm text-blue-600 flex items-center gap-1"
                        onClick={() => window.open("https://github.com/catitodev/calangoflux", "_blank")}
                      >
                        catitodev/calangoflux
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Localização</p>
                      <p className="text-sm text-gray-600">Pará, Brasil</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Horário de Atendimento</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>Segunda a Sexta: 8h às 17h</p>
                    <p>Sábado: 8h às 12h</p>
                    <p>Domingo: Fechado</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Formulário de Contato */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Envie uma Mensagem</CardTitle>
                  <CardDescription>Preencha o formulário abaixo e entraremos em contato em breve</CardDescription>
                </CardHeader>
                <CardContent>
                  {success && (
                    <Alert className="mb-6 bg-green-50 border-green-200">
                      <AlertDescription className="text-green-700">
                        ✅ Mensagem enviada com sucesso! Entraremos em contato em breve.
                      </AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome Completo *</Label>
                        <Input
                          id="nome"
                          value={formData.nome}
                          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                          required
                          placeholder="Seu nome completo"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="categoria">Categoria</Label>
                        <Select
                          value={formData.categoria}
                          onValueChange={(value) => setFormData({ ...formData, categoria: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="suporte">Suporte Técnico</SelectItem>
                            <SelectItem value="duvida">Dúvida Geral</SelectItem>
                            <SelectItem value="sugestao">Sugestão</SelectItem>
                            <SelectItem value="problema">Relatar Problema</SelectItem>
                            <SelectItem value="parceria">Parceria</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="assunto">Assunto *</Label>
                        <Input
                          id="assunto"
                          value={formData.assunto}
                          onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                          required
                          placeholder="Assunto da mensagem"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mensagem">Mensagem *</Label>
                      <Textarea
                        id="mensagem"
                        value={formData.mensagem}
                        onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                        required
                        placeholder="Descreva sua mensagem detalhadamente..."
                        rows={6}
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={loading}>
                        {loading ? "Enviando..." : "Enviar Mensagem"}
                      </Button>

                      <Button type="button" variant="outline" onClick={() => router.push("/login")}>
                        Voltar ao Login
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { ChevronDown, ChevronUp, ArrowLeft } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const faqData = [
  {
    categoria: "Geral",
    perguntas: [
      {
        pergunta: "O que é o OCAdastramento?",
        resposta:
          "O OCAdastramento é um sistema de automação social regenerativa desenvolvido para comunidades quilombolas, facilitando o cadastro e acompanhamento de famílias no programa OCA PA Quilombo.",
      },
      {
        pergunta: "Como posso me cadastrar no sistema?",
        resposta:
          "Você pode se cadastrar clicando em 'Criar Nova Conta' na página de login e preenchendo seus dados. Escolha o perfil adequado (Família, Técnico, Coordenação ou Admin).",
      },
      {
        pergunta: "Quais são os diferentes perfis de usuário?",
        resposta:
          "Existem 4 perfis: Família (para cadastro e acompanhamento), Técnico (para inserção de dados técnicos), Coordenação (dashboard de acompanhamento) e Admin (gestão completa do sistema).",
      },
    ],
  },
  {
    categoria: "Família",
    perguntas: [
      {
        pergunta: "Como faço para cadastrar minha família?",
        resposta:
          "Após fazer login com perfil de Família, você terá acesso a um formulário simplificado para cadastrar os dados da sua família, incluindo número de membros e documentos.",
      },
      {
        pergunta: "Como gero o link Pix para pagamento?",
        resposta:
          "No painel da família, há um botão específico para gerar o link Pix. Após gerar, você pode usar este link para fazer o pagamento necessário.",
      },
      {
        pergunta: "Como envio o comprovante de pagamento?",
        resposta:
          "Após realizar o pagamento, use o botão 'Enviar Comprovante via WhatsApp' que irá abrir o WhatsApp com uma mensagem pré-formatada para envio do comprovante.",
      },
    ],
  },
  {
    categoria: "Técnico",
    perguntas: [
      {
        pergunta: "Como inserir dados de georreferenciamento?",
        resposta:
          "No painel técnico, você tem acesso a campos específicos para inserir latitude, longitude e pode fazer upload de croquis ou shapes da propriedade.",
      },
      {
        pergunta: "Posso editar dados de qualquer família?",
        resposta:
          "Sim, técnicos têm acesso ao banco completo de famílias cadastradas e podem complementar ou editar informações técnicas necessárias.",
      },
      {
        pergunta: "Como faço upload de documentos?",
        resposta:
          "No painel técnico há uma área específica para upload de croquis, imagens e outros documentos relacionados às propriedades.",
      },
    ],
  },
  {
    categoria: "Sistema",
    perguntas: [
      {
        pergunta: "O sistema funciona offline?",
        resposta:
          "Sim, o sistema tem suporte a funcionamento offline com sincronização automática quando a conexão for restabelecida.",
      },
      {
        pergunta: "Como é garantida a segurança dos dados?",
        resposta:
          "O sistema utiliza Row-Level Security (RLS) no banco de dados, autenticação segura e logs de auditoria para todas as ações realizadas.",
      },
      {
        pergunta: "Posso acessar pelo celular?",
        resposta:
          "Sim, o sistema é totalmente responsivo e funciona perfeitamente em dispositivos móveis, incluindo suporte a biometria para alguns perfis.",
      },
    ],
  },
]

export default function FAQPage() {
  const router = useRouter()
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
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
              <h1 className="text-3xl font-bold text-green-700">Perguntas Frequentes</h1>
              <p className="text-gray-600">Encontre respostas para as dúvidas mais comuns</p>
            </div>
          </div>

          <div className="space-y-6">
            {faqData.map((categoria, categoriaIndex) => (
              <Card key={categoriaIndex}>
                <CardHeader>
                  <CardTitle className="text-xl text-green-700">{categoria.categoria}</CardTitle>
                  <CardDescription>
                    {categoria.perguntas.length} pergunta{categoria.perguntas.length !== 1 ? "s" : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categoria.perguntas.map((item, index) => {
                    const itemId = `${categoriaIndex}-${index}`
                    const isOpen = openItems.includes(itemId)

                    return (
                      <Collapsible key={index}>
                        <CollapsibleTrigger
                          className="flex w-full items-center justify-between rounded-lg border p-4 text-left hover:bg-gray-50"
                          onClick={() => toggleItem(itemId)}
                        >
                          <span className="font-medium">{item.pergunta}</span>
                          {isOpen ? (
                            <ChevronUp className="h-4 w-4 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                          )}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-4 pb-4 pt-2">
                          <p className="text-gray-600 leading-relaxed">{item.resposta}</p>
                        </CollapsibleContent>
                      </Collapsible>
                    )
                  })}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-green-800 mb-2">Não encontrou sua resposta?</h3>
              <p className="text-green-700 mb-4">
                Entre em contato conosco através dos canais oficiais ou acesse a página de contato.
              </p>
              <div className="flex gap-2">
                <Button onClick={() => router.push("/contato")} className="bg-green-600 hover:bg-green-700">
                  Entrar em Contato
                </Button>
                <Button variant="outline" onClick={() => router.push("/login")}>
                  Voltar ao Login
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

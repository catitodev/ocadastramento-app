import { createClient } from "@supabase/supabase-js"

// Verificar se as variáveis de ambiente estão definidas
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL é obrigatória. Adicione no arquivo .env.local")
}

if (!supabaseAnonKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY é obrigatória. Adicione no arquivo .env.local")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos do banco de dados
export interface Usuario {
  id: string
  nome: string
  email: string
  perfil: "familia" | "tecnico" | "coordenacao" | "admin"
  senha_hash: string
  tipo_dispositivo?: string
  created_at: string
  updated_at: string
}

export interface Familia {
  id: string
  id_usuario: string
  nome_familia: string
  membros: number
  documentos?: any
  propriedade_id?: string
  status: "pendente" | "em_analise" | "aprovado" | "rejeitado"
  created_at: string
  updated_at: string
}

export interface Propriedade {
  id: string
  id_familia: string
  latitude?: number
  longitude?: number
  qr_code?: string
  croqui_url?: string
  observacoes?: string
  created_at: string
  updated_at: string
}

export interface Pagamento {
  id: string
  id_familia: string
  link_pix?: string
  status: "pendente" | "pago" | "expirado"
  comprovante_url?: string
  timestamp_envio?: string
  origem_whatsapp?: string
  valor?: number
  created_at: string
  updated_at: string
}

export interface LogEntry {
  id: string
  tipo_evento: string
  usuario_id?: string
  ip_origem?: string
  data_hora: string
  entidade_modificada?: string
  detalhes?: any
  created_at: string
}

export interface FAQ {
  id: string
  pergunta: string
  resposta: string
  categoria?: string
  ativo: boolean
  ordem: number
  created_at: string
  updated_at: string
}

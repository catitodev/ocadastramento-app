import { MockAuthService } from "./auth-mock"

// Verificar se Supabase está configurado
const isSupabaseConfigured =
  typeof window !== "undefined" && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabase: any = null
let bcrypt: any = null

// Importar dinamicamente apenas se Supabase estiver configurado
if (isSupabaseConfigured) {
  try {
    const supabaseModule = require("./supabase")
    supabase = supabaseModule.supabase
    // bcrypt só funciona no servidor, não no cliente
    if (typeof window === "undefined") {
      bcrypt = require("bcryptjs")
    }
  } catch (error) {
    console.warn("Erro ao carregar Supabase, usando modo mock:", error)
  }
}

export class AuthService {
  static async login(email: string, senha: string) {
    // Se Supabase não estiver configurado, usar mock
    if (!supabase) {
      console.log("🔧 Modo desenvolvimento: usando autenticação mock")
      return MockAuthService.login(email, senha)
    }

    try {
      // Fazer login direto no Supabase Auth (sem verificação manual de senha)
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      })

      if (authError) {
        throw new Error("Email ou senha incorretos")
      }

      // Buscar dados do usuário
      const { data: usuario, error } = await supabase.from("usuarios").select("*").eq("email", email).single()

      if (error || !usuario) {
        throw new Error("Dados do usuário não encontrados")
      }

      // Registrar log de login
      await this.registrarLog("LOGIN", usuario.id, "usuarios")

      return { usuario, session: authData.session }
    } catch (error: any) {
      console.error("Erro no login:", error)
      throw new Error(error.message || "Erro ao fazer login")
    }
  }

  static async registrarUsuario(dadosUsuario: {
    nome: string
    email: string
    senha: string
    perfil: "familia" | "tecnico" | "coordenacao" | "admin"
    tipo_dispositivo?: string
  }) {
    // Se Supabase não estiver configurado, usar mock
    if (!supabase) {
      console.log("🔧 Modo desenvolvimento: usando registro mock")
      return MockAuthService.registrarUsuario(dadosUsuario)
    }

    try {
      // Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: dadosUsuario.email,
        password: dadosUsuario.senha,
      })

      if (authError) {
        throw authError
      }

      // Inserir dados do usuário na tabela (sem hash manual da senha)
      const { data: usuario, error } = await supabase
        .from("usuarios")
        .insert({
          id: authData.user?.id,
          nome: dadosUsuario.nome,
          email: dadosUsuario.email,
          perfil: dadosUsuario.perfil,
          senha_hash: "managed_by_supabase_auth", // Placeholder
          tipo_dispositivo: dadosUsuario.tipo_dispositivo,
        })
        .select()
        .single()

      if (error) {
        throw error
      }

      return usuario
    } catch (error: any) {
      console.error("Erro no registro:", error)
      throw new Error(error.message || "Erro ao criar conta")
    }
  }

  static async logout() {
    if (!supabase) {
      return MockAuthService.logout()
    }

    const { error } = await supabase.auth.signOut()
    if (error) {
      throw error
    }
  }

  static async getUsuarioAtual() {
    if (!supabase) {
      return MockAuthService.getUsuarioAtual()
    }

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return null
    }

    const { data: usuario, error } = await supabase.from("usuarios").select("*").eq("id", session.user.id).single()

    if (error) {
      throw error
    }

    return usuario
  }

  static async registrarLog(tipoEvento: string, usuarioId: string, entidadeModificada: string, detalhes?: any) {
    if (!supabase) {
      return MockAuthService.registrarLog(tipoEvento, usuarioId, entidadeModificada, detalhes)
    }

    try {
      await supabase.from("logs").insert({
        tipo_evento: tipoEvento,
        usuario_id: usuarioId,
        entidade_modificada: entidadeModificada,
        detalhes,
      })
    } catch (error) {
      console.error("Erro ao registrar log:", error)
    }
  }
}

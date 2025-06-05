// Sistema de autenticação mock para desenvolvimento
// Use apenas quando as variáveis do Supabase não estiverem configuradas

export interface MockUser {
  id: string
  nome: string
  email: string
  perfil: "familia" | "tecnico" | "coordenacao" | "admin"
}

// Usuários mock para desenvolvimento
const mockUsers: MockUser[] = [
  {
    id: "1",
    nome: "João Silva",
    email: "familia@teste.com",
    perfil: "familia",
  },
  {
    id: "2",
    nome: "Maria Santos",
    email: "tecnico@teste.com",
    perfil: "tecnico",
  },
  {
    id: "3",
    nome: "Pedro Costa",
    email: "coordenacao@teste.com",
    perfil: "coordenacao",
  },
  {
    id: "4",
    nome: "Ana Admin",
    email: "admin@teste.com",
    perfil: "admin",
  },
]

export class MockAuthService {
  static async login(email: string, senha: string) {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const usuario = mockUsers.find((u) => u.email === email)

    if (!usuario) {
      throw new Error("Usuário não encontrado")
    }

    // Para desenvolvimento, aceitar qualquer senha
    if (senha.length < 3) {
      throw new Error("Senha deve ter pelo menos 3 caracteres")
    }

    // Salvar no localStorage para simular sessão
    localStorage.setItem("mockUser", JSON.stringify(usuario))

    return { usuario, session: { user: usuario } }
  }

  static async registrarUsuario(dadosUsuario: {
    nome: string
    email: string
    senha: string
    perfil: "familia" | "tecnico" | "coordenacao" | "admin"
  }) {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Verificar se email já existe
    if (mockUsers.find((u) => u.email === dadosUsuario.email)) {
      throw new Error("Email já cadastrado")
    }

    const novoUsuario: MockUser = {
      id: Date.now().toString(),
      nome: dadosUsuario.nome,
      email: dadosUsuario.email,
      perfil: dadosUsuario.perfil,
    }

    mockUsers.push(novoUsuario)

    return novoUsuario
  }

  static async logout() {
    localStorage.removeItem("mockUser")
  }

  static async getUsuarioAtual() {
    const userData = localStorage.getItem("mockUser")
    return userData ? JSON.parse(userData) : null
  }

  static async registrarLog(tipoEvento: string, usuarioId: string, entidadeModificada: string, detalhes?: any) {
    console.log("Mock Log:", { tipoEvento, usuarioId, entidadeModificada, detalhes })
  }
}

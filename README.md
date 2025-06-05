# OCAdastramento - OCA PA Quilombo

Sistema de automação social regenerativa para comunidades quilombolas.

## 🚀 Configuração Rápida

### 1. Variáveis de Ambiente

Copie o arquivo `.env.local.example` para `.env.local`:

\`\`\`bash
cp .env.local.example .env.local
\`\`\`

### 2. Configuração do Supabase

1. Crie um projeto no [Supabase](https://supabase.com)
2. Vá em Settings > API
3. Copie a URL e a chave anônima para o `.env.local`:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
\`\`\`

### 3. Executar Scripts SQL

Execute os scripts na seguinte ordem no SQL Editor do Supabase:

1. `scripts/01-create-tables.sql`
2. `scripts/02-setup-rls.sql` 
3. `scripts/03-audit-functions.sql`

### 4. Instalar Dependências

\`\`\`bash
npm install
\`\`\`

### 5. Executar o Projeto

\`\`\`bash
npm run dev
\`\`\`

## 🔧 Modo Desenvolvimento

Se as variáveis do Supabase não estiverem configuradas, o sistema funcionará em modo mock com usuários de teste:

- **Família**: familia@teste.com (senha: 123)
- **Técnico**: tecnico@teste.com (senha: 123)
- **Coordenação**: coordenacao@teste.com (senha: 123)
- **Admin**: admin@teste.com (senha: 123)

## 📋 Perfis do Sistema

### Família
- Cadastro simplificado
- Geração de link Pix
- Envio de comprovante via WhatsApp
- Visualização da própria ficha

### Técnico
- Acesso ao banco completo
- Inserção de georreferenciamento
- Upload de croqui/imagens
- Inserção de observações

### Coordenação
- Dashboard em tempo real
- Acesso somente leitura
- Autenticação via biometria (mobile)

### Admin (CalangoADM)
- Painel completo de controle
- Acesso a logs do sistema
- Manutenção de FAQ
- Edição de qualquer campo

## 🛠️ Tecnologias

- **Frontend**: Next.js 14, React, TypeScript
- **Backend**: Supabase (PostgreSQL)
- **Autenticação**: Supabase Auth + bcrypt
- **UI**: shadcn/ui + Tailwind CSS
- **Deploy**: Vercel
- **Automação**: n8n (self-hosted)
- **Integrações**: API Pix, WhatsApp, Glide

## 📞 Contato

**CalangoFlux**: calangoflux@gmail.com  
**Repositório**: https://github.com/catitodev/calangoflux

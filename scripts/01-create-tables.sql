-- Criação das tabelas principais do sistema CalangoFlux
-- Executar no Supabase SQL Editor

-- Tabela de usuários
CREATE TABLE usuarios (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    perfil VARCHAR(50) NOT NULL CHECK (perfil IN ('familia', 'tecnico', 'coordenacao', 'admin')),
    senha_hash VARCHAR(255) NOT NULL,
    tipo_dispositivo VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de famílias
CREATE TABLE familias (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    id_usuario UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    nome_familia VARCHAR(255) NOT NULL,
    membros INTEGER NOT NULL DEFAULT 1,
    documentos JSONB,
    propriedade_id UUID,
    status VARCHAR(50) DEFAULT 'pendente' CHECK (status IN ('pendente', 'em_analise', 'aprovado', 'rejeitado')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de propriedades
CREATE TABLE propriedades (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    id_familia UUID REFERENCES familias(id) ON DELETE CASCADE,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    qr_code VARCHAR(255),
    croqui_url VARCHAR(500),
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de pagamentos
CREATE TABLE pagamentos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    id_familia UUID REFERENCES familias(id) ON DELETE CASCADE,
    link_pix VARCHAR(500),
    status VARCHAR(50) DEFAULT 'pendente' CHECK (status IN ('pendente', 'pago', 'expirado')),
    comprovante_url VARCHAR(500),
    timestamp_envio TIMESTAMP WITH TIME ZONE,
    origem_whatsapp VARCHAR(20),
    valor DECIMAL(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de logs
CREATE TABLE logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tipo_evento VARCHAR(100) NOT NULL,
    usuario_id UUID REFERENCES usuarios(id),
    ip_origem INET,
    data_hora TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    entidade_modificada VARCHAR(100),
    detalhes JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de FAQ
CREATE TABLE faq (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pergunta TEXT NOT NULL,
    resposta TEXT NOT NULL,
    categoria VARCHAR(100),
    ativo BOOLEAN DEFAULT true,
    ordem INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

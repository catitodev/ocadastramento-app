-- Configuração de Row-Level Security (RLS)
-- Executar no Supabase SQL Editor

-- Ativar RLS em todas as tabelas
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE familias ENABLE ROW LEVEL SECURITY;
ALTER TABLE propriedades ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;

-- Políticas para usuários
CREATE POLICY "Usuários podem ver próprio perfil" ON usuarios
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar próprio perfil" ON usuarios
    FOR UPDATE USING (auth.uid() = id);

-- Políticas para famílias
CREATE POLICY "Famílias podem ver próprios dados" ON familias
    FOR SELECT USING (
        id_usuario = auth.uid() OR 
        EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND perfil IN ('tecnico', 'coordenacao', 'admin'))
    );

CREATE POLICY "Famílias podem inserir próprios dados" ON familias
    FOR INSERT WITH CHECK (id_usuario = auth.uid());

CREATE POLICY "Técnicos e admins podem atualizar famílias" ON familias
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND perfil IN ('tecnico', 'admin'))
    );

-- Políticas para propriedades
CREATE POLICY "Propriedades visíveis conforme perfil" ON propriedades
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM familias f 
            JOIN usuarios u ON f.id_usuario = u.id 
            WHERE f.id = propriedades.id_familia 
            AND (u.id = auth.uid() OR EXISTS (
                SELECT 1 FROM usuarios WHERE id = auth.uid() AND perfil IN ('tecnico', 'coordenacao', 'admin')
            ))
        )
    );

-- Políticas para pagamentos
CREATE POLICY "Pagamentos visíveis conforme perfil" ON pagamentos
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM familias f 
            JOIN usuarios u ON f.id_usuario = u.id 
            WHERE f.id = pagamentos.id_familia 
            AND (u.id = auth.uid() OR EXISTS (
                SELECT 1 FROM usuarios WHERE id = auth.uid() AND perfil IN ('tecnico', 'coordenacao', 'admin')
            ))
        )
    );

-- Políticas para FAQ (todos podem ler)
CREATE POLICY "FAQ público para leitura" ON faq
    FOR SELECT USING (ativo = true);

CREATE POLICY "Apenas admins podem modificar FAQ" ON faq
    FOR ALL USING (
        EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND perfil = 'admin')
    );

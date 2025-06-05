-- Funções e triggers para auditoria automática
-- Executar no Supabase SQL Editor

-- Função para atualizar timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Função para log automático
CREATE OR REPLACE FUNCTION log_changes()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO logs (tipo_evento, usuario_id, entidade_modificada, detalhes)
    VALUES (
        TG_OP,
        auth.uid(),
        TG_TABLE_NAME,
        CASE 
            WHEN TG_OP = 'DELETE' THEN row_to_json(OLD)
            ELSE row_to_json(NEW)
        END
    );
    
    IF TG_OP = 'DELETE' THEN
        RETURN OLD;
    ELSE
        RETURN NEW;
    END IF;
END;
$$ language 'plpgsql';

-- Aplicar triggers de updated_at
CREATE TRIGGER update_usuarios_updated_at BEFORE UPDATE ON usuarios
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_familias_updated_at BEFORE UPDATE ON familias
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_propriedades_updated_at BEFORE UPDATE ON propriedades
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pagamentos_updated_at BEFORE UPDATE ON pagamentos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faq_updated_at BEFORE UPDATE ON faq
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Aplicar triggers de auditoria
CREATE TRIGGER audit_usuarios AFTER INSERT OR UPDATE OR DELETE ON usuarios
    FOR EACH ROW EXECUTE FUNCTION log_changes();

CREATE TRIGGER audit_familias AFTER INSERT OR UPDATE OR DELETE ON familias
    FOR EACH ROW EXECUTE FUNCTION log_changes();

CREATE TRIGGER audit_propriedades AFTER INSERT OR UPDATE OR DELETE ON propriedades
    FOR EACH ROW EXECUTE FUNCTION log_changes();

CREATE TRIGGER audit_pagamentos AFTER INSERT OR UPDATE OR DELETE ON pagamentos
    FOR EACH ROW EXECUTE FUNCTION log_changes();

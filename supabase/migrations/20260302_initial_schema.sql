-- ==============================================================================
-- MEU BOLSO - Schema Inicial com Políticas de Segurança RLS
-- Criado em: Março de 2026
-- Stack: Supabase PostgreSQL 17
-- ==============================================================================

-- 1. TABELA DE PERFIS DE USUÁRIOS
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. TABELA DE NÚCLEOS FAMILIARES
CREATE TABLE IF NOT EXISTS public.families (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    invite_code TEXT UNIQUE NOT NULL DEFAULT substring(md5(random()::text) from 1 for 8),
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. INTEGRANTES DA FAMÍLIA (RBAC: admin, member, dependent)
CREATE TABLE IF NOT EXISTS public.family_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    family_id UUID NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('admin', 'member', 'dependent')),
    color_tag TEXT DEFAULT '#0D9488',
    joined_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(family_id, user_id)
);

-- 4. CATEGORIAS DE GASTO E TETOS ORÇAMENTÁRIOS (BUDGET CAPS)
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    family_id UUID NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    icon TEXT NOT NULL DEFAULT 'tag',
    monthly_budget NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. TRANSAÇÕES FINANCEIRAS
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    family_id UUID NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
    paid_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
    amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
    description TEXT NOT NULL,
    split_type TEXT NOT NULL CHECK (split_type IN ('house_fixed', 'split_50_50', 'personal', 'custom')),
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. RATEIOS DE TRANSAÇÃO (QUEM DEVE QUANTO)
CREATE TABLE IF NOT EXISTS public.transaction_splits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_id UUID NOT NULL REFERENCES public.transactions(id) ON DELETE CASCADE,
    debtor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    share_amount NUMERIC(12,2) NOT NULL,
    is_settled BOOLEAN NOT NULL DEFAULT FALSE
);

-- 7. COFRES FAMILIARES (METAS)
CREATE TABLE IF NOT EXISTS public.goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    family_id UUID NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    target_amount NUMERIC(12,2) NOT NULL CHECK (target_amount > 0),
    current_amount NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    target_date DATE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. ACERTOS DE CONTAS LIQUIDADOS (SETTLEMENTS)
CREATE TABLE IF NOT EXISTS public.settlements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    family_id UUID NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
    from_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    to_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
    settled_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. TRILHA DE AUDITORIA
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    family_id UUID NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) - ISOLAMENTO ABSOLUTO ENTRE FAMÍLIAS
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.families ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transaction_splits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE PERFIS
DROP POLICY IF EXISTS "Perfis públicos para membros autenticados" ON public.profiles;
CREATE POLICY "Perfis públicos para membros autenticados" ON public.profiles
FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Usuário edita seu próprio perfil" ON public.profiles;
CREATE POLICY "Usuário edita seu próprio perfil" ON public.profiles
FOR ALL USING (auth.uid() = id);

-- POLÍTICAS DE FAMÍLIAS
DROP POLICY IF EXISTS "Membros acessam sua família" ON public.families;
CREATE POLICY "Membros acessam sua família" ON public.families
FOR ALL USING (
    id IN (SELECT family_id FROM public.family_members WHERE user_id = auth.uid())
);

-- POLÍTICAS DE INTEGRANTES DA FAMÍLIA
DROP POLICY IF EXISTS "Membros veem integrantes da mesma família" ON public.family_members;
CREATE POLICY "Membros veem integrantes da mesma família" ON public.family_members
FOR SELECT USING (
    family_id IN (SELECT family_id FROM public.family_members WHERE user_id = auth.uid())
);

-- POLÍTICAS DE CATEGORIAS
DROP POLICY IF EXISTS "Membros acessam categorias da família" ON public.categories;
CREATE POLICY "Membros acessam categorias da família" ON public.categories
FOR ALL USING (
    family_id IN (SELECT family_id FROM public.family_members WHERE user_id = auth.uid())
);

-- POLÍTICAS DE TRANSAÇÕES
DROP POLICY IF EXISTS "Membros acessam transações da família" ON public.transactions;
CREATE POLICY "Membros acessam transações da família" ON public.transactions
FOR ALL USING (
    family_id IN (SELECT family_id FROM public.family_members WHERE user_id = auth.uid())
);

-- POLÍTICAS DE METAS / COFRES
DROP POLICY IF EXISTS "Membros acessam metas da família" ON public.goals;
CREATE POLICY "Membros acessam metas da família" ON public.goals
FOR ALL USING (
    family_id IN (SELECT family_id FROM public.family_members WHERE user_id = auth.uid())
);

-- POLÍTICAS DE RATEIOS (SPLITS)
DROP POLICY IF EXISTS "Membros acessam splits de transações da família" ON public.transaction_splits;
CREATE POLICY "Membros acessam splits de transações da família" ON public.transaction_splits
FOR ALL USING (
    transaction_id IN (
        SELECT id FROM public.transactions 
        WHERE family_id IN (SELECT family_id FROM public.family_members WHERE user_id = auth.uid())
    )
);

-- TRIGGER AUTOMÁTICO: CRIAR PERFIL QUANDO NOVO USUÁRIO É REGISTRADO
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url)
    VALUES (
        new.id,
        COALESCE(new.raw_user_meta_data->>'full_name', 'Membro da Família'),
        new.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

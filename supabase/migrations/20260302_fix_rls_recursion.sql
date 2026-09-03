-- ==============================================================================
-- CORREÇÃO DE RECURSÃO INFINITA EM POLÍTICA DE RLS
-- ==============================================================================

-- 1. Função com SECURITY DEFINER para quebrar o ciclo recursivo no PostgreSQL
CREATE OR REPLACE FUNCTION public.get_user_family_ids(p_user_id UUID)
RETURNS TABLE (family_id UUID) AS $$
BEGIN
    RETURN QUERY
    SELECT fm.family_id 
    FROM public.family_members fm 
    WHERE fm.user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- 2. Recriação da política de family_members sem recursão direta
DROP POLICY IF EXISTS "Membros veem integrantes da mesma família" ON public.family_members;
CREATE POLICY "Membros veem integrantes da mesma família" ON public.family_members
FOR SELECT USING (
    user_id = auth.uid() OR family_id IN (SELECT public.get_user_family_ids(auth.uid()))
);

-- 3. Atualização das demais políticas para utilizar a função otimizada
DROP POLICY IF EXISTS "Membros acessam sua família" ON public.families;
CREATE POLICY "Membros acessam sua família" ON public.families
FOR ALL USING (
    id IN (SELECT public.get_user_family_ids(auth.uid()))
);

DROP POLICY IF EXISTS "Membros acessam categorias da família" ON public.categories;
CREATE POLICY "Membros acessam categorias da família" ON public.categories
FOR ALL USING (
    family_id IN (SELECT public.get_user_family_ids(auth.uid()))
);

DROP POLICY IF EXISTS "Membros acessam transações da família" ON public.transactions;
CREATE POLICY "Membros acessam transações da família" ON public.transactions
FOR ALL USING (
    family_id IN (SELECT public.get_user_family_ids(auth.uid()))
);

DROP POLICY IF EXISTS "Membros acessam metas da família" ON public.goals;
CREATE POLICY "Membros acessam metas da família" ON public.goals
FOR ALL USING (
    family_id IN (SELECT public.get_user_family_ids(auth.uid()))
);

-- 4. Notificar PostgREST para recarregar o schema
SELECT pg_notify('pgrst', 'reload schema');

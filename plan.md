# PLANO TÉCNICO & ARQUITETURA: MEU BOLSO (O COMO)
Versão: 1.0.0

## 1. Stack Tecnológica (100% Always Free & Open Source)
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons.
- **Backend / BaaS**: Supabase PostgreSQL 17 (sa-east-1) com Row Level Security (RLS).
- **Hospedagem & Edge**: Cloudflare Pages (distribuição global com SSL automático e compactação Brotli).
- **Controle de Versão & CI/CD**: GitHub (henrimafra-glitch/meu-bolso-app).

## 2. Contrato de Dados & Esquema Relacional
- Tabelas: `profiles`, `families`, `family_members`, `categories`, `transactions`, `transaction_splits`, `goals`, `settlements`, `audit_logs`.
- Integridade: Chaves estrangeiras com regras de exclusão em cascata controladas e triggers para criação automática de perfis.

## 3. Segurança de Borda (Cloudflare Pages)
- Arquivo `_headers` aplicando HSTS, CSP estrito, X-Frame-Options: DENY, X-Content-Type-Options: nosniff.
- Arquivo `_redirects` garantindo roteamento transparente para SPA (Single Page Application).

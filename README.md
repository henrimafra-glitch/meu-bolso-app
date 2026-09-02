# MEU BOLSO · Gestão Financeira Familiar & Colaborativa

Plataforma moderna, minimalista e responsiva de gestão financeira familiar, desenvolvida sob os preceitos de **Spec-Driven Development (SDD)** com o **GitHub Spec Kit**.

---

## Características Principais

- **Painel Consolidado da Casa**: Visão unificada do Saldo Familiar Disponível, Receitas, Despesas e Comprometimento da Renda (%).
- **Barra de Rateio Familiar**: Visualização clara e segmentada da porcentagem efetiva que cada integrante desembolsou nas despesas do mês.
- **Orçamentos por Categoria (Budget Caps)**: Tetos mensais para Moradia, Supermercado, Lazer, Saúde e Educação com alertas aos 80% e 100%.
- **Transações com Divisão Inteligente**: Classificação em *Compartilhado 50/50*, *Fixo da Casa* ou *100% Pessoal*, com recálculo imediato de saldos.
- **Acerto de Contas Automático**: Algoritmo que calcula de forma transparente "quem deve a quem", eliminando atritos conjugais.
- **Cofres da Família**: Metas coletivas (Reserva de Emergência, Férias, Veículo) com progresso e registro de aportes.
- **Responsividade Real**:
  - **Mobile (< 1024px)**: Experiência de aplicativo de smartphone com barra inferior (Bottom Nav) de 4 abas, botão de ação rápida (FAB central) e formulários em gavetas deslizantes (bottom sheets).
  - **Desktop (>= 1024px)**: Dashboard executivo com barra lateral retrátil (Sidebar), tabelas densas com filtros rápidos e busca instantânea.

---

## Arquitetura & Stack (100% Always Free)

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons.
- **BaaS (Backend as a Service)**: Supabase PostgreSQL 17 com Row Level Security (RLS) mandatório.
- **Hospedagem & Borda**: Cloudflare Pages com certificados SSL/TLS automáticos e cabeçalhos de segurança (HSTS, CSP estrito).
- **URL de Produção**: [meu-bolso-t1k.pages.dev](https://meu-bolso-t1k.pages.dev)
- **Controle de Versão & CI/CD**: GitHub com artefatos vivos do GitHub Spec Kit.

---

## Estrutura de Artefatos SDD (Spec Kit)

```text
.specify/
└── memory/
    └── constitution.md     # Princípios inegociáveis do projeto
specs/
└── meu-bolso/
    └── spec.md             # Especificação funcional detalhada (o QUÊ)
plan.md                     # Plano técnico, arquitetura e contratos (o COMO)
tasks.md                    # Decomposição em tarefas ordenadas de implementação
supabase/
└── migrations/
    └── 20260302_initial_schema.sql  # DDL completo do PostgreSQL com RLS
```

---

## Como Executar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/henrimafra-glitch/meu-bolso-app.git
   cd meu-bolso-app
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Para compilar a versão de produção:
   ```bash
   npm run build
   ```

---

## Licença

Distribuído sob a licença MIT. 100% Open Source e Always Free.

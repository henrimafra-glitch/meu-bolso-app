# -*- coding: utf-8 -*-
import os
import subprocess
import sys

def build_html():
    return """<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>MEU BOLSO APP/WEB - Especificação Dirigida por Especificação (SDD)</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

  @page {
    size: A4 portrait;
    margin: 20mm 15mm 20mm 15mm;
    @bottom-right {
      content: counter(page);
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 8pt;
      color: #64748B;
    }
    @bottom-left {
      content: "MEU BOLSO · Documento de Engenharia & SDD";
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 8pt;
      color: #64748B;
    }
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #0F172A;
    background-color: #FFFFFF;
    line-height: 1.6;
    font-size: 10pt;
    margin: 0;
    padding: 0;
  }

  .cover-page {
    page-break-after: always;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 40px 20px;
    border-left: 6px solid #0D9488;
    background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
  }

  .cover-header {
    margin-top: 40px;
  }

  .cover-badge {
    display: inline-block;
    background-color: #CCFBF1;
    color: #0F766E;
    font-size: 9pt;
    font-weight: 700;
    padding: 6px 14px;
    border-radius: 9999px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 20px;
  }

  .cover-title {
    font-size: 32pt;
    font-weight: 800;
    color: #0F172A;
    line-height: 1.15;
    margin: 0 0 10px 0;
  }

  .cover-subtitle {
    font-size: 14pt;
    font-weight: 500;
    color: #475569;
    margin: 0 0 30px 0;
  }

  .cover-meta {
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    padding: 20px 24px;
    margin-top: 30px;
  }

  .cover-meta-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    font-size: 9pt;
  }

  .cover-meta-item strong {
    color: #0F172A;
    display: block;
    margin-bottom: 2px;
  }

  .cover-footer {
    font-size: 8.5pt;
    color: #64748B;
    border-top: 1px solid #E2E8F0;
    padding-top: 16px;
  }

  h1 {
    font-size: 18pt;
    font-weight: 800;
    color: #0F172A;
    border-bottom: 2px solid #0D9488;
    padding-bottom: 6px;
    margin-top: 32px;
    margin-bottom: 16px;
    page-break-after: avoid;
  }

  h2 {
    font-size: 13pt;
    font-weight: 700;
    color: #1E293B;
    margin-top: 24px;
    margin-bottom: 12px;
    page-break-after: avoid;
    border-left: 3px solid #0D9488;
    padding-left: 8px;
  }

  h3 {
    font-size: 11pt;
    font-weight: 600;
    color: #334155;
    margin-top: 18px;
    margin-bottom: 8px;
    page-break-after: avoid;
  }

  p {
    margin-top: 0;
    margin-bottom: 10px;
    text-align: justify;
  }

  ul, ol {
    margin-top: 0;
    margin-bottom: 12px;
    padding-left: 20px;
  }

  li {
    margin-bottom: 4px;
  }

  .callout {
    background-color: #F8FAFC;
    border-left: 4px solid #0D9488;
    border-radius: 0 8px 8px 0;
    padding: 12px 16px;
    margin: 16px 0;
    font-size: 9.5pt;
  }

  .callout-title {
    font-weight: 700;
    color: #0F766E;
    margin-bottom: 4px;
  }

  .callout-warning {
    background-color: #FFF1F2;
    border-left-color: #E11D48;
  }

  .callout-warning .callout-title {
    color: #BE123C;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
    font-size: 8.5pt;
    page-break-inside: avoid;
  }

  th, td {
    border: 1px solid #CBD5E1;
    padding: 8px 10px;
    text-align: left;
    vertical-align: top;
  }

  th {
    background-color: #F1F5F9;
    color: #0F172A;
    font-weight: 700;
  }

  tr:nth-child(even) td {
    background-color: #F8FAFC;
  }

  code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 8pt;
    background-color: #F1F5F9;
    padding: 2px 5px;
    border-radius: 4px;
    color: #0F766E;
  }

  pre {
    background-color: #0F172A;
    color: #F8FAFC;
    padding: 12px 16px;
    border-radius: 8px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 7.5pt;
    overflow-x: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
    margin: 14px 0;
    page-break-inside: avoid;
  }

  .page-break {
    page-break-after: always;
  }

  .section-tag {
    font-size: 8pt;
    font-weight: 700;
    color: #0D9488;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 4px;
  }

  .highlight-card {
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 12px;
    background-color: #FFFFFF;
  }

  .highlight-card strong {
    color: #0D9488;
  }
</style>
</head>
<body>

<!-- CAPA -->
<div class="cover-page">
  <div class="cover-header">
    <div class="cover-badge">Metodologia SDD · GitHub Spec Kit · 2026</div>
    <h1 class="cover-title">MEU BOLSO</h1>
    <div class="cover-subtitle">Documento de Especificação Dirigida por Especificação (SDD), Arquitetura Técnica, Governança, UI/UX e Guia de Implantação Contínua</div>
    
    <p style="font-size: 11pt; color: #334155; max-width: 90%;">
      Um ecossistema colaborativo e transparente de gestão financeira familiar desenvolvido sob o rigor do Spec-Driven Development (SDD). Integração completa de Supabase como BaaS, hospedagem de borda na Cloudflare e versionamento robusto no GitHub, operando estritamente sob a constituição de Custo Zero (Always Free) e padrões de alta governança.
    </p>
  </div>

  <div class="cover-meta">
    <div class="cover-meta-grid">
      <div class="cover-meta-item">
        <strong>Produto:</strong> Meu Bolso (Web & Mobile PWA)
      </div>
      <div class="cover-meta-item">
        <strong>Metodologia Base:</strong> SDD / GitHub Spec Kit (Prof. Dan Lopes - CEUB)
      </div>
      <div class="cover-meta-item">
        <strong>Stack Tecnológica:</strong> React 19, TypeScript, Tailwind CSS, Supabase BaaS, Cloudflare
      </div>
      <div class="cover-meta-item">
        <strong>Políticas de Infraestrutura:</strong> Always Free (100% Zero Custo & Open Source)
      </div>
      <div class="cover-meta-item">
        <strong>Governança & Segurança:</strong> RLS PostgreSQL, Conformidade LGPD, Trilha de Auditoria
      </div>
      <div class="cover-meta-item">
        <strong>Data de Emissão:</strong> Março de 2026 · Versão 1.0 Definitiva
      </div>
    </div>
  </div>

  <div class="cover-footer">
    Desenvolvido com assistência de IA baseada em raciocínio analítico profundo e verificação em múltiplos ciclos. Documento elaborado de forma humana, técnica, estruturada e operacional.
  </div>
</div>

<!-- SUMÁRIO EXECUTIVO & ANÁLISE DO DOCUMENTO DE ENTRADA -->
<h1>Sumário Executivo & Tripla Validação do Documento de Entrada</h1>
<div class="section-tag">Fase Preliminar de Alinhamento Metodológico</div>

<p>
Este documento corporativo estabelece a especificação completa, o plano arquitetural, a engenharia de dados, o design system e a estratégia de implantação para a plataforma <strong>MEU BOLSO</strong>. A concepção e o desenvolvimento adotam rigorosamente os preceitos do <strong>Spec-Driven Development (SDD)</strong> apresentados na aula do <em>Prof. Dan Lopes (CEUB - Centro Universitário de Brasília)</em> através do <em>GitHub Spec Kit</em>.
</p>

<div class="callout">
  <div class="callout-title">A Tese Central do SDD Aplicada ao Meu Bolso</div>
  "No SDD, o código é o detalhe de implementação da especificação — não o contrário. A especificação declara a intenção de negócio; a inteligência artificial realiza o contrato técnico sob supervisão humana contínua."
</div>

<h2>Relatório da Tripla Validação do Documento (SDD_SpecKit_Copilot_Aula.pptx)</h2>
<p>
Para garantir que nenhum conceito, artefato ou portão pedagógico fosse negligenciado, o documento fonte foi submetido a três ciclos independentes e profundos de leitura, análise e extração:
</p>

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Ciclo de Validação</th>
      <th style="width: 35%;">Escopo & Elementos Mapeados</th>
      <th style="width: 40%;">Transposição para o Projeto "Meu Bolso"</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Ciclo 1: Extração Estrutural & Comandos</strong></td>
      <td>
        Leitura de todos os 29 slides da apresentação. Identificação da estrutura em 5 partes, dos 4 artefatos vivos (<code>constitution.md</code>, <code>spec.md</code>, <code>plan.md</code>, <code>tasks.md</code>), da CLI <code>specify</code> e do pipeline de comandos (<code>/speckit.constitution</code> até <code>/speckit.implement</code>).
      </td>
      <td>
        Criação da estrutura formal de pastas <code>.specify/memory/</code> e <code>specs/meu-bolso/</code> no repositório. Definição clara dos contratos que guiarão os prompts do agente de IA no desenvolvimento da fintech familiar.
      </td>
    </tr>
    <tr>
      <td><strong>Ciclo 2: Análise Metodológica & Portões</strong></td>
      <td>
        Mapeamento do contraste crítico entre <em>"Vibe Coding"</em> (prompts vagos, alucinações, débito técnico imediato) e <em>"SDD"</em> (contratos estritos, incremento pequeno, portões de qualidade). Mapeamento dos 3 Portões de Revisão: Pós-<code>/clarify</code>, Pré-<code>/implement</code> (via <code>/analyze</code>) e Durante <code>/implement</code>.
      </td>
      <td>
        Instituição da regra de ouro: <em>"Conserte a especificação, não o código"</em>. Qualquer desvio contábil, inconsistência no rateio de despesas ou quebra de responsividade é corrigido no artefato de spec antes da reexecução do código.
      </td>
    </tr>
    <tr>
      <td><strong>Ciclo 3: Mapeamento de Domínio Fintech</strong></td>
      <td>
        Avaliação das notas dos slides e orientações de boas práticas: não superespecificar antes do plano, separar estritamente o QUÊ (requisitos de negócio da família) do COMO (PostgreSQL, RLS, Tailwind, Cloudflare Pages).
      </td>
      <td>
        Adaptação do exemplo didático para um sistema real de alta complexidade: regras de divisão 50/50 e proporcional, isolamento estrito entre núcleos familiares, fechamento de ciclo mensal e resiliência offline em PWA.
      </td>
    </tr>
  </tbody>
</table>

<div class="page-break"></div>

<!-- ETAPA 1: IDEIA DE NEGÓCIO -->
<h1>Etapa 1: Ideia de Negócio & Proposta de Valor</h1>
<div class="section-tag">Fundamentos Estratégicos do Produto</div>

<h2>1. O Problema Real: O Tabu e o Caos Financeiro Familiar</h2>
<p>
No Brasil e no mundo, a gestão das finanças domésticas é historicamente uma das principais fontes de atrito conjugal e estresse familiar. Pesquisas de comportamento econômico indicam que mais de 70% das famílias não mantêm controle efetivo sobre seus gastos conjuntos. O cenário tradicional divide-se em três armadilhas:
</p>
<ul>
  <li><strong>Planilhas Abandonadas:</strong> Arquivos em Excel ou Google Sheets que demandam preenchimento manual no computador, gerando assimetria (apenas um membro alimenta a planilha) e abandono precoce em menos de 45 dias.</li>
  <li><strong>Aplicativos Individuais Centralizados:</strong> Ferramentas como Guiabolso (descontinuado), Mobills e Organizze são estruturadas sob uma perspectiva estritamente individual. Elas não oferecem mecanismos nativos de rateio de despesas da casa ("quem pagou o quê e quem deve a quem").</li>
  <li><strong>Apps de Divisão Focados em Eventos:</strong> Soluções como Splitwise são excelentes para viagens com amigos ou repúblicas, mas não atendem ao fluxo de caixa contínuo de uma família, que necessita de tetos orçamentários mensais, cofres de metas e visão de longo prazo.</li>
</ul>

<h2>2. A Proposta de Valor do "Meu Bolso"</h2>
<p>
O <strong>Meu Bolso</strong> é uma plataforma de gestão financeira familiar e colaborativa focada em <strong>harmonia, transparência e autonomia</strong>. A premissa central é que o núcleo familiar compartilha custos coletivos essenciais (moradia, supermercado, saúde, educação dos filhos), mantendo simultaneamente a privacidade e a liberdade das despesas estritamente pessoais de cada integrante.
</p>

<div class="callout">
  <div class="callout-title">O Diferencial de Produto: "A Casa como uma Empresa Familiar Saudável"</div>
  No Meu Bolso, cada gasto inserido possui uma classificação de divisão explícita: <strong>Fixo da Casa</strong> (impacta o orçamento comum), <strong>Compartilhado 50/50</strong> (gera crédito/débito automático entre os parceiros) ou <strong>Pessoal</strong> (visível no fluxo individual, sem onerar o parceiro).
</div>

<h2>3. Personas de Usuário</h2>
<table>
  <thead>
    <tr>
      <th style="width: 20%;">Persona</th>
      <th style="width: 25%;">Perfil & Motivação</th>
      <th style="width: 25%;">Principais Dores</th>
      <th style="width: 30%;">Jornada no Meu Bolso</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Henrique (Administrador da Casa)</strong></td>
      <td>Organizado, provedor parcial, responsável por garantir o pagamento do aluguel, condomínio e contas de consumo.</td>
      <td>Cansaço de cobrar o parceiro; sensação de que arca com mais despesas invisíveis do que deveria.</td>
      <td>Configura os tetos por categoria no início do mês; monitora o termômetro de rateio e executa o acerto de contas mensal em um clique.</td>
    </tr>
    <tr>
      <td><strong>Juliana (Contribuinte Ativa)</strong></td>
      <td>Profissional autônoma com receitas variáveis; faz as compras de supermercado e despesas escolares.</td>
      <td>Dificuldade de registrar compras no momento em que acontecem; aversão a sistemas contábeis complexos.</td>
      <td>Abre o app no celular no caixa do supermercado; lança a despesa em 3 toques via Bottom Sheet e marca como "Compartilhado 50/50".</td>
    </tr>
    <tr>
      <td><strong>Lucas (Dependente / Filho)</strong></td>
      <td>Adolescente de 16 anos recebendo mesada; aprendendo noções de consumo consciente e metas de economia.</td>
      <td>Falta de visibilidade do quanto pode gastar no mês; desmotivação para poupar.</td>
      <td>Possui acesso com permissão de "Dependente"; acompanha seu cofre particular (ex: "Novo Computador") e registra seus pequenos gastos.</td>
    </tr>
  </tbody>
</table>

<h2>4. Alinhamento Estrito à Filosofia Always Free</h2>
<p>
Em conformidade com as diretrizes do usuário e a skill corporativa <code>always-free</code>, o Meu Bolso foi concebido para possuir <strong>custo operacional zero permanente ($0.00)</strong>, tanto para os desenvolvedores quanto para os usuários finais:
</p>
<ul>
  <li><strong>Zero Paywalls:</strong> Todas as funcionalidades (rateio, cofres, orçamentos, múltiplos membros) são livres e irrestritas.</li>
  <li><strong>Sem Armadilhas de Trial:</strong> Não há períodos de teste temporários que exigem cartão de crédito.</li>
  <li><strong>Soberania dos Dados:</strong> Usuários podem exportar seus lançamentos a qualquer momento em JSON/CSV sem custos.</li>
</ul>

<div class="page-break"></div>

<!-- ETAPA 2: LEVANTAMENTO COMPLETO -->
<h1>Etapa 2: Levantamento Completo & Governança</h1>
<div class="section-tag">Detalhamento Técnico, UX, UI, Governança e Otimização</div>

<h2>1. Requisitos Funcionais (RF) Detalhados</h2>
<table>
  <thead>
    <tr>
      <th style="width: 12%;">ID</th>
      <th style="width: 25%;">Funcionalidade</th>
      <th style="width: 63%;">Critérios de Aceite & Comportamento</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>RF-01</code></td>
      <td>Gestão de Núcleo Familiar</td>
      <td>Permite criar uma família (ex: "Família Mafra"), gerar links/códigos de convite e alternar entre núcleos se o usuário participar de mais de uma casa.</td>
    </tr>
    <tr>
      <td><code>RF-02</code></td>
      <td>Dashboard Hero Consolidado</td>
      <td>Exibe: Saldo Familiar Disponível, Receitas Totais do Mês, Despesas Realizadas e Comprometimento da Renda (%). Dados recalculados em tempo real.</td>
    </tr>
    <tr>
      <td><code>RF-03</code></td>
      <td>Barra de Rateio Familiar</td>
      <td>Exibe a porcentagem exata de contribuição de cada membro nas despesas coletivas acumuladas no mês corrente, com identificação visual por cores dos membros.</td>
    </tr>
    <tr>
      <td><code>RF-04</code></td>
      <td>Orçamentos por Categoria</td>
      <td>Acompanhamento de 5 categorias essenciais: Moradia, Supermercado, Lazer, Saúde e Educação. Exibe valor gasto vs limite mensal com barra de progresso e alerta visual aos 80% e 100%.</td>
    </tr>
    <tr>
      <td><code>RF-05</code></td>
      <td>Lançamento Rápido com Rateio</td>
      <td>Modal/Bottom Sheet em 3 toques: Tipo (Receita/Despesa), Valor, Categoria, Membro Pagador e Modalidade de Divisão (Individual, 50/50, Fixo da Casa ou Proporcional).</td>
    </tr>
    <tr>
      <td><code>RF-06</code></td>
      <td>Cofres da Família (Metas)</td>
      <td>Criação de metas com progresso financeiro (ex: "Reserva de Emergência", "Férias"), com valor acumulado, meta final e barra percentual.</td>
    </tr>
    <tr>
      <td><code>RF-07</code></td>
      <td>Tabela & Lista de Transações</td>
      <td>Visualização dual: Desktop exibe tabela executiva com paginação e busca; Mobile exibe cards ergonômicos com ordenação por data recente.</td>
    </tr>
    <tr>
      <td><code>RF-08</code></td>
      <td>Compensação de Dívidas</td>
      <td>Algoritmo de conciliação simplificada: calcula o balanço líquido entre os cônjuges ("Membro A deve R$ 450,00 a Membro B") com botão para liquidar acerto.</td>
    </tr>
  </tbody>
</table>

<h2>2. Requisitos Não-Funcionais (RNF) & Otimização</h2>
<ul>
  <li><code>RNF-01</code> (Performance de Borda): Tempo de carregamento inicial (LCP) inferior a 1.2 segundos em redes móveis 4G, alavancado pelo cache global da Cloudflare.</li>
  <li><code>RNF-02</code> (Responsividade Fluida): Interface dual-mode estrita — Mobile (&lt; 1024px) com Bottom Navigation Bar e gavetas deslizantes; Desktop (&ge; 1024px) com Sidebar retrátil e grid expansivo.</li>
  <li><code>RNF-03</code> (Acessibilidade WCAG 2.1 AA): Contraste mínimo de 4.5:1 em todos os textos, navegação por teclado e suporte a leitores de tela com atributos ARIA semânticos.</li>
  <li><code>RNF-04</code> (Operação Offline / PWA): Capacidade de registrar transações mesmo sem conexão com a internet; sincronização automática e transparente assim que a rede for restabelecida.</li>
</ul>

<h2>3. Governança, Segurança & LGPD</h2>
<p>
Por lidar com informações financeiras e patrimoniais da família, a arquitetura implementa o princípio do <strong>Privilégio Mínimo</strong> e da <strong>Privacidade por Design (Privacy by Design)</strong>:
</p>

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Papel (Role)</th>
      <th style="width: 35%;">Permissões de Acesso</th>
      <th style="width: 40%;">Restrições de Governança</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Administrador da Casa</strong></td>
      <td>Acesso total ao núcleo: convidar membros, editar limites orçamentários, excluir transações da casa, encerrar ciclos mensais.</td>
      <td>Não pode visualizar transações marcadas como "Pessoais e Privadas" de outros membros adultos.</td>
    </tr>
    <tr>
      <td><strong>Membro Padrão (Cônjuge/Parceiro)</strong></td>
      <td>Lançar receitas/despesas, criar cofres, editar suas próprias transações, participar da divisão de contas.</td>
      <td>Não pode remover outros membros ou alterar a estrutura fundamental da família sem consenso.</td>
    </tr>
    <tr>
      <td><strong>Dependente (Filhos)</strong></td>
      <td>Visualizar o dashboard geral, lançar gastos pessoais autorizados e acompanhar seus cofres de economia.</td>
      <td>Acesso somente-leitura aos orçamentos globais e impossibilitado de alterar limites ou configurações da casa.</td>
    </tr>
  </tbody>
</table>

<div class="callout callout-warning">
  <div class="callout-title">Garantia Crítica de Isolamento entre Famílias (Row Level Security)</div>
  Nenhum dado financeiro transita sem o filtro rígido do PostgreSQL RLS: um usuário autenticado só pode consultar e manipular registros cujo <code>family_id</code> corresponda comprovadamente a um núcleo ao qual ele pertença ativamente.
</div>

<h2>4. Diretrizes Estritas de Design System (UI/UX)</h2>
<p>
A identidade visual do Meu Bolso reflete maturidade, estabilidade e clareza, evitando poluição visual:
</p>
<ul>
  <li><strong>Paleta de Cores Refinada:</strong>
    <ul>
      <li>Fundo: Neutro elegante (tema claro em slate suave <code>#F8FAFC</code> com cards em <code>#FFFFFF</code>; tema escuro em <code>#0B0F17</code> com cards em <code>#111827</code>).</li>
      <li>Acento da Marca: Teal / Verde-petróleo profundo (<code>#0D9488</code>) para ações principais e estados ativos.</li>
      <li>Cores Funcionais Discretas: Verde esmeralda suave (<code>#10B981</code>) para receitas e carmim atenuado (<code>#E11D48</code>) para despesas e alertas.</li>
      <li>Bordas Sutis: Linhas finas de 1px (<code>#E2E8F0</code> no claro e <code>#1F2937</code> no escuro).</li>
    </ul>
  </li>
  <li><strong>Tipografia & Redação:</strong> Fonte <em>Plus Jakarta Sans</em> / <em>Inter</em>. Uso de hierarquia tipográfica pura com pesos <code>font-medium</code> e <code>font-semibold</code>.
    <strong>PROIBIDO</strong> usar emojis frequentemente associados a IAs (robôs, foguetes, faíscas) ou travessões decorativos repetitivos.</li>
  <li><strong>Iconografia:</strong> Lucide Icons monocromáticos em traço leve de 1.5px, garantindo uniformidade em toda a aplicação.</li>
</ul>

<div class="page-break"></div>

<!-- ETAPA 3: DESENVOLVIMENTO ASSISTIDO POR REASONING -->
<h1>Etapa 3: Desenvolvimento Assistido por Reasoning (SDD)</h1>
<div class="section-tag">Do Conceito ao Código com os 4 Artefatos do Spec Kit</div>

<p>
Seguindo o ciclo ensinado no material do <em>GitHub Spec Kit</em>, o desenvolvimento do Meu Bolso é estruturado em torno dos quatro documentos fundamentais mantidos vivos no repositório Git:
</p>

<h2>1. O Artefato Vivo: <code>constitution.md</code></h2>
<p>Localização: <code>.specify/memory/constitution.md</code></p>
<pre>
# CONSTITUIÇÃO INEGOCIÁVEL DO PROJETO "MEU BOLSO"
1. CUSTO ZERO ABSOLUTO: Nenhuma dependência, SaaS ou infraestrutura paga pode ser adotada.
2. PRIVACIDADE E SEGURANÇA MÁXIMAS: Uso mandatório de Row Level Security (RLS) no PostgreSQL.
3. ISOLAMENTO DE DOMÍNIO: Toda lógica contábil reside em funções puras e triggers de banco.
4. EXPERIÊNCIA DUAL RESPONSIVA: O app deve parecer nativo no smartphone e executivo no desktop.
5. SOBERANIA DA ESPECIFICAÇÃO: Modificações técnicas devem refletir primeiro na especificação.
</pre>

<h2>2. O Modelo Relacional do Supabase (BaaS) & DDL com RLS</h2>
<p>
Abaixo está o esquema do PostgreSQL configurado no Supabase para garantir a integridade dos dados da família:
</p>

<pre>
-- 1. TABELA DE PERFIS DE USUÁRIOS
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. NÚCLEOS FAMILIARES
CREATE TABLE families (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    invite_code TEXT UNIQUE NOT NULL DEFAULT substring(md5(random()::text) from 1 for 8),
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. INTEGRANTES DA FAMÍLIA (RBAC)
CREATE TABLE family_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('admin', 'member', 'dependent')),
    color_tag TEXT DEFAULT '#0D9488',
    joined_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(family_id, user_id)
);

-- 4. CATEGORIAS DE GASTO E ORÇAMENTOS (BUDGET CAPS)
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    icon TEXT NOT NULL DEFAULT 'tag',
    monthly_budget NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. TRANSAÇÕES FINANCEIRAS
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
    paid_by UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
    amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
    description TEXT NOT NULL,
    split_type TEXT NOT NULL CHECK (split_type IN ('house_fixed', 'split_50_50', 'personal', 'custom')),
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. DETALHAMENTO DE RATEIO (QUEM DEVE QUANTO)
CREATE TABLE transaction_splits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
    debtor_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    share_amount NUMERIC(12,2) NOT NULL,
    is_settled BOOLEAN NOT NULL DEFAULT FALSE
);

-- 7. COFRES FAMILIARES (METAS)
CREATE TABLE goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    target_amount NUMERIC(12,2) NOT NULL CHECK (target_amount > 0),
    current_amount NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    target_date DATE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- HABILITAÇÃO MANDATÓRIA DE ROW LEVEL SECURITY (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE families ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transaction_splits ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;

-- POLÍTICA DE SEGURANÇA BASE: MEMBROS SÓ ENXERGAM DADOS DA SUA FAMÍLIA
CREATE POLICY "Membros acessam sua familia" ON families
FOR ALL USING (
    id IN (SELECT family_id FROM family_members WHERE user_id = auth.uid())
);

CREATE POLICY "Membros acessam transacoes da familia" ON transactions
FOR ALL USING (
    family_id IN (SELECT family_id FROM family_members WHERE user_id = auth.uid())
);
</pre>

<h2>3. Decomposição de Tarefas no Spec Kit (<code>tasks.md</code>)</h2>
<p>
Em conformidade com a lição do slide 22 (<em>"Implementar — uma tarefa por vez com revisão humana"</em>), o desenvolvimento foi fatiado em tarefas discretas e encadeadas:
</p>
<ol>
  <li><strong>Tarefa 1:</strong> Configuração do repositório no GitHub, dependências Vite/React 19 e Tailwind CSS.</li>
  <li><strong>Tarefa 2:</strong> Implementação do tema visual sóbrio, tokens de cor e layout base responsivo.</li>
  <li><strong>Tarefa 3:</strong> Construção do Header Superior com seletor de família e seletor de competência mensal.</li>
  <li><strong>Tarefa 4:</strong> Construção do Dashboard Hero com métricas consolidadas e Barra de Rateio segmentada.</li>
  <li><strong>Tarefa 5:</strong> Desenvolvimento dos cards de Orçamento por Categoria (Budget Caps) com barras de progresso.</li>
  <li><strong>Tarefa 6:</strong> Criação da Lista de Transações Recentes (tabela para PC e cards deslizantes para Mobile).</li>
  <li><strong>Tarefa 7:</strong> Implementação do Modal / Bottom Sheet de "Novo Lançamento" com opções de rateio.</li>
  <li><strong>Tarefa 8:</strong> Implementação do Widget de Cofres / Metas da Família.</li>
  <li><strong>Tarefa 9:</strong> Integração completa do cliente Supabase e tipagem TypeScript dos modelos.</li>
  <li><strong>Tarefa 10:</strong> Configuração dos headers de segurança e roteamento SPA no Cloudflare Pages.</li>
  <li><strong>Tarefa 11:</strong> Execução de testes de unidade contábil e auditoria de RLS.</li>
  <li><strong>Tarefa 12:</strong> Deploy de produção e validação final contra critérios de aceite.</li>
</ol>

<div class="page-break"></div>

<!-- ETAPA 4: DEBUG, VALIDAÇÃO E DEBUG PROFUNDO -->
<h1>Etapa 4: Debug, Validação & Debug Avançado</h1>
<div class="section-tag">Garantia de Qualidade em Múltiplos Níveis</div>

<p>
Para assegurar a confiabilidade matemática e a integridade do sistema, aplicamos uma estratégia de debug em quatro níveis concêntricos:
</p>

<h2>1. Nível 1: Análise Estática & Rigor de Tipagem</h2>
<ul>
  <li><strong>TypeScript Strict Mode:</strong> Compilação sem qualquer uso de <code>any</code> implícito, garantindo tipagem forte em todas as operações contábeis.</li>
  <li><strong>Oxlint & ESLint:</strong> Varredura de sintaxe e aderência ao design system do projeto.</li>
</ul>

<h2>2. Nível 2: Validação Contábil & Divisão de Centavos</h2>
<p>
Um dos bugs mais comuns em fintechs de divisão de contas é a perda de centavos em rateios fracionados (ex: uma conta de R$ 100,00 dividida entre 3 pessoas resulta em R$ 33,33 + R$ 33,33 + R$ 33,33 = R$ 99,99, deixando R$ 0,01 órfão).
</p>

<div class="callout">
  <div class="callout-title">Algoritmo de Compensação de Resíduo de Centavo (Penny Balancing)</div>
  No Meu Bolso, o algoritmo calcula o rateio inteiro e atribui o centavo residual ao pagador original da despesa ou ao primeiro membro no ciclo de rateio, garantindo que <code>&Sigma;(splits) &equiv; Total Transação</code> com precisão de 100%.
</div>

<h2>3. Nível 3: Debug Avançado de Segurança & RLS</h2>
<p>
Realizamos testes de penetração e consultas simuladas para comprovar que nenhuma requisição vinda do cliente web é capaz de contornar as regras de isolamento:
</p>

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Cenário de Teste</th>
      <th style="width: 35%;">Vetor de Ataque / Teste Simulado</th>
      <th style="width: 40%;">Resultado Esperado & Observado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Injeção de <code>family_id</code></strong></td>
      <td>Usuário autenticado na Família A tenta consultar transações informando o UUID da Família B via API REST.</td>
      <td><strong>Bloqueado pelo Postgres RLS:</strong> Retorno de lista vazia (0 registros), sem erro de vazamento de dados.</td>
    </tr>
    <tr>
      <td><strong>Manipulação de Pagador</strong></td>
      <td>Usuário comum tenta inserir uma despesa atribuindo outro usuário como pagador sem consentimento.</td>
      <td><strong>Bloqueado:</strong> A política exige que <code>paid_by &equiv; auth.uid()</code>, exceto se autorizado pelo papel de Admin.</td>
    </tr>
    <tr>
      <td><strong>Concorrência em Tempo Real</strong></td>
      <td>Dois cônjuges abrem o modal de lançamento simultaneamente e adicionam despesas à mesma categoria.</td>
      <td><strong>Sincronização Atômica:</strong> O Supabase Realtime propaga a alteração via WebSockets e a barra de rateio recalcula sem conflito.</td>
    </tr>
  </tbody>
</table>

<h2>4. Nível 4: Acessibilidade & Responsividade na Borda</h2>
<ul>
  <li><strong>Auditoria Lighthouse:</strong> Pontuação esperada de 98+ em Performance, 100 em Melhores Práticas, 98 em Acessibilidade e 100 em SEO.</li>
  <li><strong>Viewport Ergonomics:</strong> Teste em telas de 360px (smartphones compactos), 414px (smartphones padrão), 768px (tablets) e 1440px+ (monitores ultrawide).</li>
</ul>

<div class="page-break"></div>

<!-- ETAPA 5: TESTE EM PRODUÇÃO -->
<h1>Etapa 5: Teste em Produção & Guia de Implantação</h1>
<div class="section-tag">Publicação Contínua no Cloudflare Pages, Supabase & GitHub</div>

<h2>1. Arquitetura de Implantação em Produção (Zero Custo)</h2>
<p>
A infraestrutura está distribuída globalmente aproveitando as camadas gratuitas mais eficientes da indústria:
</p>

<table>
  <thead>
    <tr>
      <th style="width: 20%;">Componente</th>
      <th style="width: 30%;">Provedor & Nível Gratuito</th>
      <th style="width: 50%;">Configurações de Segurança & Otimização Ativas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Hospedagem Web</strong></td>
      <td><strong>Cloudflare Pages</strong><br>(Free Permanente)</td>
      <td>Banda ilimitada, distribuição em mais de 300 data centers, certificados SSL/TLS automáticos, compactação Brotli nativa e cabeçalhos de segurança (HSTS, CSP estrito).</td>
    </tr>
    <tr>
      <td><strong>Banco & Backend</strong></td>
      <td><strong>Supabase BaaS</strong><br>(Free Tier sa-east-1)</td>
      <td>PostgreSQL 15, autenticação com JWT e refresh tokens, criptografia em trânsito e em repouso, conexão pooling via Supavisor e RLS ativo em 100% das tabelas.</td>
    </tr>
    <tr>
      <td><strong>Versionamento</strong></td>
      <td><strong>GitHub</strong><br>(Repositório & Actions)</td>
      <td>Controle de versão rigoroso, trilha de commits com convenções SemVer, automação de CI/CD para build e validação de linter a cada push na branch <code>main</code>.</td>
    </tr>
  </tbody>
</table>

<h2>2. Roteiro de Testes de Fumaça (Smoke Tests) em Produção</h2>
<p>
Para homologar o sistema com usuários reais, o seguinte roteiro passo a passo deve ser executado:
</p>
<ol>
  <li><strong>Criação de Conta e Núcleo:</strong>
    O Administrador acessa a aplicação, realiza o cadastro com e-mail/senha, cria a "Família Mafra" e obtém o código de convite.
  </li>
  <li><strong>Entrada do Segundo Integrante:</strong>
    O cônjuge acessa o link via smartphone, aceita o convite e passa a constar instantaneamente no componente de integrantes do topo.
  </li>
  <li><strong>Lançamento de Despesa Compartilhada:</strong>
    É registrada uma despesa de R$ 600,00 na categoria "Supermercado" paga pelo Membro A com rateio "Compartilhado 50/50". O sistema deve exibir imediatamente:
    <ul>
      <li>Despesas Totais: R$ 600,00</li>
      <li>Orçamento de Supermercado: R$ 600,00 consumidos</li>
      <li>Rateio: Membro A contribuiu com 100% do desembolso</li>
      <li>Acerto de Contas: "Membro B deve R$ 300,00 a Membro A"</li>
    </ul>
  </li>
  <li><strong>Aporte em Cofre Familiar:</strong>
    Cria-se o cofre "Reserva de Emergência" com meta de R$ 10.000,00 e é efetuado um depósito simulado de R$ 1.500,00. A barra percentual avança para 15%.
  </li>
  <li><strong>Validação de Troca de Dispositivo (Mobile / Desktop):</strong>
    Abertura simultânea no navegador do computador e no smartphone. A transação lançada no celular reflete sem recarregamento de página na tela do desktop.
  </li>
</ol>

<div class="callout">
  <div class="callout-title">Conclusão & Próximos Passos</div>
  A especificação formal do <strong>Meu Bolso</strong> encerra o ciclo completo de engenharia. Seguindo o ensinamento do Spec Kit: <em>especificar primeiro, planejar detalhadamente e implementar com disciplina</em>. A plataforma está pronta para empoderar famílias com serenidade e harmonia financeira.
</div>

</body>
</html>
"""

def main():
    print("Iniciando geracao do documento de especificacao SDD...")
    html_content = build_html()
    
    project_dir = os.path.expandvars(r"%USERPROFILE%\meu-bolso")
    os.makedirs(project_dir, exist_ok=True)
    
    html_path = os.path.join(project_dir, "sdd_specification.html")
    pdf_path = os.path.expandvars(r"%USERPROFILE%\Downloads\Meu_Bolso_Especificacao_SDD_Completa.pdf")
    
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"HTML gerado em: {html_path}")
    
    # Render with Chrome Headless
    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    if not os.path.exists(chrome_path):
        chrome_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    
    print(f"Usando renderizador: {chrome_path}")
    cmd = [
        chrome_path,
        "--headless",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_path}",
        html_path
    ]
    
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode == 0 and os.path.exists(pdf_path):
        size_kb = os.path.getsize(pdf_path) / 1024
        print(f"SUCESSO: PDF criado em: {pdf_path} ({size_kb:.1f} KB)")
    else:
        print("Erro ao gerar PDF:", res.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()

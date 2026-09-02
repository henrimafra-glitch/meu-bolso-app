# ESPECIFICAÇÃO FUNCIONAL: MEU BOLSO (O QUÊ)
ID da Feature: `MB-CORE-001`
Status: Aprovado

## 1. Visão Geral e Intenção de Negócio
Plataforma de gestão financeira familiar que permite aos membros de uma casa compartilhar custos coletivos, monitorar orçamentos por categoria, estabelecer cofres de metas e apurar automaticamente o rateio de despesas (50/50, fixo ou pessoal) sem atritos.

## 2. Histórias de Usuário & Critérios de Aceite (BDD)

### Cenário 1: Visualização do Painel Consolidado da Casa
- **Dado** que o usuário pertence ao núcleo familiar "Família Mafra";
- **Quando** acessa a tela principal;
- **Então** visualiza o Saldo Familiar Disponível, Receitas Totais, Despesas Totais e Comprometimento da Renda (%);
- **E** visualiza a Barra de Rateio com o percentual de desembolso acumulado por cada membro no mês.

### Cenário 2: Registro de Despesa com Rateio 50/50
- **Dado** que um membro realizou uma compra de supermercado de R$ 720,00;
- **Quando** abre o modal de novo lançamento e seleciona "Compartilhado 50/50";
- **Então** o sistema debita R$ 720,00 do orçamento da categoria "Supermercado";
- **E** registra que o cônjuge possui uma obrigação de compensação de R$ 360,00 com o pagador.

### Cenário 3: Alerta de Estouro de Orçamento por Categoria
- **Dado** que a categoria "Lazer" possui teto de R$ 600,00;
- **Quando** as despesas acumuladas atingem R$ 580,00 (96%);
- **Então** o card exibe badge de alerta âmbar;
- **E** se ultrapassar R$ 600,00, exibe badge vermelho com o valor excedente.

### Cenário 4: Aporte em Cofre de Meta Familiar
- **Dado** que a família possui a meta "Reserva de Emergência";
- **Quando** um membro clica em "+ Aportar" e informa um valor de R$ 500,00;
- **Então** o saldo atual do cofre é incrementado e a barra de progresso percentual avança.

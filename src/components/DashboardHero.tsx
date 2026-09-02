import React from 'react';
import { BalanceSummary } from '../types';
import { ArrowDownRight, ArrowUpRight, CheckCircle2, DollarSign, Scale, Wallet } from 'lucide-react';

interface DashboardHeroProps {
  summary: BalanceSummary;
  onSettleDebt: () => void;
}

export const DashboardHero: React.FC<DashboardHeroProps> = ({ summary, onSettleDebt }) => {
  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <div className="space-y-4">
      {/* Grid Principal de Indicadores da Casa */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Saldo Familiar Disponível */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Saldo Familiar Disponível
            </span>
            <div className="p-2 rounded-lg bg-brand-50 dark:bg-brand-950/50 text-brand-600">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {formatBRL(summary.totalAvailable)}
            </span>
          </div>
          <div className="mt-2 flex items-center text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium text-slate-700 dark:text-slate-300 mr-1">Renda familiar livre</span> após gastos fixos e variáveis
          </div>
        </div>

        {/* Receitas do Mês */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Receitas Totais
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {formatBRL(summary.monthlyIncome)}
            </span>
          </div>
          <div className="mt-2 flex items-center text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            Entradas consolidadas da casa
          </div>
        </div>

        {/* Despesas Totais */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Despesas Realizadas
            </span>
            <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {formatBRL(summary.monthlyExpense)}
            </span>
          </div>
          <div className="mt-2 flex items-center text-xs text-slate-500 dark:text-slate-400">
            Soma de fixos e rateios do mês
          </div>
        </div>

        {/* Comprometimento da Renda */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Comprometimento Renda
            </span>
            <div className={`p-2 rounded-lg ${summary.incomeCommitmentPct > 70 ? 'bg-amber-50 text-amber-600' : 'bg-brand-50 text-brand-600'}`}>
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {summary.incomeCommitmentPct}%
            </span>
            <span className="text-xs font-medium text-slate-500">do orçamento total</span>
          </div>
          <div className="mt-2 w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                summary.incomeCommitmentPct > 80 ? 'bg-rose-500' : summary.incomeCommitmentPct > 60 ? 'bg-amber-500' : 'bg-brand-600'
              }`}
              style={{ width: `${Math.min(summary.incomeCommitmentPct, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Seção Integrada: Barra de Rateio Familiar + Acerto de Contas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Barra de Rateio Familiar (2 colunas em telas grandes) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                Divisão e Contribuição nas Despesas da Casa
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Porcentagem efetiva desembolsada por cada membro no mês corrente
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300">
              <Scale className="w-3.5 h-3.5 text-brand-600" />
              <span>Rateio Ativo</span>
            </div>
          </div>

          {/* Barra Segmentada de Contribuição */}
          <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full flex overflow-hidden p-0.5 gap-0.5">
            {summary.splitsByMember.map((m) => (
              <div
                key={m.memberId}
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${m.percentage}%`,
                  backgroundColor: m.color,
                }}
                title={`${m.memberName}: ${m.percentage}% (${formatBRL(m.spentAmount)})`}
              />
            ))}
          </div>

          {/* Legenda dos Membros */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            {summary.splitsByMember.map((m) => (
              <div key={m.memberId} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: m.color }} />
                <div className="overflow-hidden">
                  <p className="text-xs font-medium text-slate-900 dark:text-slate-200 truncate leading-tight">
                    {m.memberName}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                    {formatBRL(m.spentAmount)} ({m.percentage}%)
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card de Acerto de Contas (Compensação entre os parceiros) */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-brand-600" />
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                Equilíbrio do Mês
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Acerto de contas automático das despesas compartilhadas 50/50.
            </p>

            <div className="mt-4">
              {summary.debtSettlements.length > 0 ? (
                summary.debtSettlements.map((debt, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="text-xs text-slate-600 dark:text-slate-300">
                      <span className="font-semibold text-slate-900 dark:text-white">{debt.debtorName}</span> deve a{' '}
                      <span className="font-semibold text-slate-900 dark:text-white">{debt.creditorName}</span>:
                    </div>
                    <div className="text-lg font-bold text-brand-700 dark:text-brand-400 mt-1 font-mono">
                      {formatBRL(debt.amount)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Contas 100% equilibradas e zeradas neste mês.</span>
                </div>
              )}
            </div>
          </div>

          {summary.debtSettlements.length > 0 && (
            <button
              onClick={onSettleDebt}
              className="mt-4 w-full py-2 px-3 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition shadow-sm text-center"
            >
              Registrar Acerto de Contas
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Category } from '../types';
import { GraduationCap, HeartPulse, Home, ShoppingCart, Utensils, AlertCircle, PieChart } from 'lucide-react';

interface BudgetSectionProps {
  categories: Category[];
}

export const BudgetSection: React.FC<BudgetSectionProps> = ({ categories }) => {
  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return <Home className="w-4 h-4" />;
      case 'ShoppingCart':
        return <ShoppingCart className="w-4 h-4" />;
      case 'HeartPulse':
        return <HeartPulse className="w-4 h-4" />;
      case 'Utensils':
        return <Utensils className="w-4 h-4" />;
      case 'GraduationCap':
        return <GraduationCap className="w-4 h-4" />;
      default:
        return <Home className="w-4 h-4" />;
    }
  };

  const categoryColors: Record<string, string> = {
    cat_moradia: '#0D9488', // Teal
    cat_supermercado: '#10B981', // Emerald
    cat_saude: '#06B6D4', // Cyan
    cat_lazer: '#F59E0B', // Amber
    cat_educacao: '#6366F1', // Indigo
  };

  const totalBudget = categories.reduce((acc, c) => acc + c.monthly_budget, 0);
  const totalSpent = categories.reduce((acc, c) => acc + c.spent, 0);
  const totalPercentage = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <PieChart className="w-4 h-4 text-brand-600" />
            <h2 className="font-semibold text-slate-900 dark:text-white text-base">
              Orçamentos por Categoria (Budget Caps)
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Acompanhamento dos limites mensais definidos para as despesas da casa
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 self-start sm:self-auto">
          <span>Teto Total da Casa:</span>
          <span className="font-mono font-bold text-slate-900 dark:text-white">
            {formatBRL(totalSpent)} / {formatBRL(totalBudget)} ({totalPercentage}%)
          </span>
        </div>
      </div>

      {/* Barra Consolidada de Distribuição das Despesas da Casa */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
          <span>Composição do Consumo Orçamentário</span>
          <span className="font-mono font-semibold text-slate-900 dark:text-white">{totalPercentage}% comprometido</span>
        </div>

        {/* Barra Segmentada Colorida */}
        <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
          {categories.map((cat) => {
            const shareOfTotal = totalSpent > 0 ? (cat.spent / totalSpent) * 100 : 0;
            if (shareOfTotal <= 0) return null;
            return (
              <div
                key={cat.id}
                className="h-full transition-all duration-500 first:rounded-l-full last:rounded-r-full"
                style={{
                  width: `${shareOfTotal}%`,
                  backgroundColor: categoryColors[cat.id] || '#64748B',
                }}
                title={`${cat.name}: ${Math.round(shareOfTotal)}% (${formatBRL(cat.spent)})`}
              />
            );
          })}
        </div>

        {/* Legenda de Categorias */}
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-slate-500 dark:text-slate-400">
          {categories.map((cat) => {
            const share = totalSpent > 0 ? Math.round((cat.spent / totalSpent) * 100) : 0;
            return (
              <div key={cat.id} className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: categoryColors[cat.id] || '#64748B' }}
                />
                <span className="font-medium text-slate-700 dark:text-slate-300">{cat.name}:</span>
                <span className="font-mono">{share}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid de Cards Individuais de Categoria */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const pct = cat.monthly_budget > 0 ? Math.round((cat.spent / cat.monthly_budget) * 100) : 0;
          const isOver = pct >= 100;
          const isWarning = pct >= 80 && pct < 100;

          return (
            <div
              key={cat.id}
              className="p-4 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-slate-200/70 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                      {getCategoryIcon(cat.icon)}
                    </div>
                    <span className="font-semibold text-xs text-slate-900 dark:text-white">
                      {cat.name}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isOver
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
                        : isWarning
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                    }`}
                  >
                    {pct}%
                  </span>
                </div>

                {/* Valores Gasto vs Limite */}
                <div className="flex items-baseline justify-between mt-3 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white font-mono">
                    {formatBRL(cat.spent)}
                  </span>
                  <span className="text-slate-400 dark:text-slate-500 font-mono text-[11px]">
                    de {formatBRL(cat.monthly_budget)}
                  </span>
                </div>

                {/* Barra de Progresso Individual */}
                <div className="mt-2 w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isOver ? 'bg-rose-600' : isWarning ? 'bg-amber-500' : 'bg-brand-600'
                    }`}
                    style={{ width: `${Math.min(pct, 100)}%` }}
                  />
                </div>
              </div>

              {isOver && (
                <div className="mt-3 pt-2 border-t border-rose-100 dark:border-rose-900/30 flex items-center gap-1.5 text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Limite estourado em {formatBRL(cat.spent - cat.monthly_budget)}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

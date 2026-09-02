import React from 'react';
import { Category } from '../types';
import { GraduationCap, HeartPulse, Home, ShoppingCart, Utensils, AlertCircle } from 'lucide-react';

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

  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-semibold text-slate-900 dark:text-white text-base">
            Orçamentos por Categoria (Budget Caps)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Acompanhamento dos limites mensais definidos para as despesas da casa
          </p>
        </div>
      </div>

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

                {/* Barra de Progresso */}
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

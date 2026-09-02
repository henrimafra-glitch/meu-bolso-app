import React from 'react';
import { Goal } from '../types';
import { PiggyBank, Plus } from 'lucide-react';

interface GoalsSectionProps {
  goals: Goal[];
  onAddDeposit: (goalId: string) => void;
  onNewGoal: () => void;
}

export const GoalsSection: React.FC<GoalsSectionProps> = ({ goals, onAddDeposit, onNewGoal }) => {
  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
    return dateStr;
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-semibold text-slate-900 dark:text-white text-base">
            Cofres da Família (Metas)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Reservas e economias conjuntas para os sonhos da casa
          </p>
        </div>

        <button
          onClick={onNewGoal}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
        >
          <Plus className="w-3.5 h-3.5 text-brand-600" />
          <span>Novo Cofre</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {goals.map((goal) => {
          const pct = Math.min(Math.round((goal.current_amount / goal.target_amount) * 100), 100);

          return (
            <div
              key={goal.id}
              className="p-4 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-brand-100 dark:bg-brand-950/70 text-brand-700 dark:text-brand-300">
                      <PiggyBank className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-xs text-slate-900 dark:text-white">
                      {goal.title}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                    {pct}%
                  </span>
                </div>

                <div className="flex items-baseline justify-between mt-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white font-mono text-sm">
                      {formatBRL(goal.current_amount)}
                    </span>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">
                      de {formatBRL(goal.target_amount)}
                    </p>
                  </div>

                  {goal.target_date && (
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400">Prazo</span>
                      <p className="text-[11px] font-medium text-slate-700 dark:text-slate-300">
                        {formatDate(goal.target_date)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Barra de Progresso */}
                <div className="mt-2.5 w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-600 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Faltam {formatBRL(goal.target_amount - goal.current_amount)}</span>
                <button
                  onClick={() => onAddDeposit(goal.id)}
                  className="text-xs font-semibold text-brand-600 hover:text-brand-700 hover:underline"
                >
                  + Aportar
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

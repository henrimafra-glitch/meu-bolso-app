import React from 'react';
import { LayoutDashboard, ReceiptText, Plus, PieChart, PiggyBank } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenNewTransaction: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  onOpenNewTransaction,
}) => {
  return (
    <nav className="lg:hidden print:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-3 py-2 pb-safe">
      <div className="flex items-center justify-around">
        {/* Aba 1: Início / Dashboard */}
        <button
          onClick={() => onTabChange('dashboard')}
          className={`flex flex-col items-center gap-1 transition ${
            activeTab === 'dashboard'
              ? 'text-brand-600 dark:text-brand-400 font-semibold'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-700'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px]">Início</span>
        </button>

        {/* Aba 2: Transações */}
        <button
          onClick={() => onTabChange('transactions')}
          className={`flex flex-col items-center gap-1 transition ${
            activeTab === 'transactions'
              ? 'text-brand-600 dark:text-brand-400 font-semibold'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-700'
          }`}
        >
          <ReceiptText className="w-5 h-5" />
          <span className="text-[10px]">Transações</span>
        </button>

        {/* FAB Central: Novo Lançamento */}
        <div className="-mt-5">
          <button
            onClick={onOpenNewTransaction}
            className="w-12 h-12 rounded-full bg-brand-600 hover:bg-brand-700 text-white shadow-lg flex items-center justify-center transition-transform active:scale-95 border-2 border-white dark:border-slate-900"
            title="Adicionar Lançamento"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {/* Aba 3: Orçamentos */}
        <button
          onClick={() => onTabChange('budgets')}
          className={`flex flex-col items-center gap-1 transition ${
            activeTab === 'budgets'
              ? 'text-brand-600 dark:text-brand-400 font-semibold'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-700'
          }`}
        >
          <PieChart className="w-5 h-5" />
          <span className="text-[10px]">Orçamentos</span>
        </button>

        {/* Aba 4: Metas / Cofres */}
        <button
          onClick={() => onTabChange('goals')}
          className={`flex flex-col items-center gap-1 transition ${
            activeTab === 'goals'
              ? 'text-brand-600 dark:text-brand-400 font-semibold'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-700'
          }`}
        >
          <PiggyBank className="w-5 h-5" />
          <span className="text-[10px]">Cofres</span>
        </button>
      </div>
    </nav>
  );
};

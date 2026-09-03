import React from 'react';
import { LayoutDashboard, ReceiptText, PieChart, PiggyBank, Users, Moon, Sun, Wallet, ShieldCheck } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  darkMode,
  onToggleDarkMode,
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transações', icon: ReceiptText },
    { id: 'budgets', label: 'Orçamentos', icon: PieChart },
    { id: 'goals', label: 'Cofres da Família', icon: PiggyBank },
    { id: 'members', label: 'Integrantes', icon: Users },
    { id: 'audit', label: 'Auditoria & QA', icon: ShieldCheck },
  ];

  return (
    <aside className="hidden lg:flex print:hidden w-64 flex-col justify-between bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 sticky top-0 h-screen transition-colors">
      <div>
        {/* Marca Meu Bolso */}
        <div className="flex items-center gap-2.5 px-3 py-4 mb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold shadow-sm">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-base text-slate-900 dark:text-white tracking-tight leading-none block">
              MEU BOLSO
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wide">
              Finanças Familiares
            </span>
          </div>
        </div>

        {/* Itens de Menu */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition ${
                  isActive
                    ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border-l-4 border-brand-600'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Rodapé da Barra Lateral: Alternador de Tema */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <button
          onClick={onToggleDarkMode}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
        >
          <span className="flex items-center gap-2">
            {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-500" />}
            <span>{darkMode ? 'Tema Claro' : 'Tema Escuro'}</span>
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
            {darkMode ? 'Escuro' : 'Claro'}
          </span>
        </button>
      </div>
    </aside>
  );
};

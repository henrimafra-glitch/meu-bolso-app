import React from 'react';
import { Family, FamilyMember } from '../types';
import { ChevronLeft, ChevronRight, UserPlus, Users } from 'lucide-react';

interface HeaderProps {
  family: Family;
  members: FamilyMember[];
  currentMember: FamilyMember;
  onSelectMember: (member: FamilyMember) => void;
  selectedMonth: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onOpenInvite: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  family,
  members,
  currentMember,
  onSelectMember,
  selectedMonth,
  onPrevMonth,
  onNextMonth,
  onOpenInvite,
}) => {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Lado Esquerdo: Identificação do Núcleo Familiar */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold shadow-sm">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-slate-900 dark:text-white text-base tracking-tight leading-none">
                  {family.name}
                </h1>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                  {members.length} membros
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Finanças Compartilhadas
              </p>
            </div>
          </div>

          <button
            onClick={onOpenInvite}
            className="sm:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
            title="Convidar Integrante"
          >
            <UserPlus className="w-4 h-4" />
          </button>
        </div>

        {/* Centro / Direita: Seletor de Mês e Membros */}
        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3">
          {/* Seletor de Período Mensal */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
            <button
              onClick={onPrevMonth}
              className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded hover:bg-white dark:hover:bg-slate-700 transition"
              title="Mês Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold px-3 text-slate-800 dark:text-slate-200 select-none min-w-[95px] text-center">
              {selectedMonth}
            </span>
            <button
              onClick={onNextMonth}
              className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded hover:bg-white dark:hover:bg-slate-700 transition"
              title="Próximo Mês"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Seletor de Membros da Família */}
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-1.5 overflow-hidden">
              {members.map((m) => {
                const isSelected = m.user_id === currentMember.user_id;
                return (
                  <button
                    key={m.id}
                    onClick={() => onSelectMember(m)}
                    className={`relative inline-block w-8 h-8 rounded-full ring-2 transition-all ${
                      isSelected
                        ? 'ring-brand-600 scale-110 z-10 shadow-sm'
                        : 'ring-white dark:ring-slate-900 opacity-70 hover:opacity-100'
                    }`}
                    title={`${m.profile.full_name} (${m.role === 'admin' ? 'Administrador' : m.role === 'member' ? 'Membro' : 'Dependente'})`}
                  >
                    <img
                      src={m.profile.avatar_url}
                      alt={m.profile.full_name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </button>
                );
              })}
            </div>

            <button
              onClick={onOpenInvite}
              className="hidden sm:flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              <UserPlus className="w-3.5 h-3.5 text-brand-600" />
              <span>Convidar</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

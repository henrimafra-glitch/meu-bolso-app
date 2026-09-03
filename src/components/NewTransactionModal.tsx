import React, { useState, useEffect } from 'react';
import { Category, FamilyMember, SplitType, TransactionType } from '../types';
import { X, ArrowDownRight, ArrowUpRight, Scale } from 'lucide-react';

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  members: FamilyMember[];
  currentMember: FamilyMember;
  defaultDate?: string;
  onSave: (data: {
    type: TransactionType;
    description: string;
    amount: number;
    category_id: string;
    paid_by: string;
    split_type: SplitType;
    date: string;
  }) => void;
}

export const NewTransactionModal: React.FC<NewTransactionModalProps> = ({
  isOpen,
  onClose,
  categories,
  members,
  currentMember,
  defaultDate,
  onSave,
}) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [description, setDescription] = useState('');
  const [amountStr, setAmountStr] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
  const [paidBy, setPaidBy] = useState(currentMember.user_id);
  const [splitType, setSplitType] = useState<SplitType>('split_50_50');
  const [date, setDate] = useState(defaultDate || '2026-03-03');

  useEffect(() => {
    if (isOpen && defaultDate) {
      setDate(defaultDate);
    }
  }, [isOpen, defaultDate]);

  // Acessibilidade: Fechar no ESC e travar scroll do body
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanAmount = parseFloat(amountStr.replace(',', '.'));
    if (isNaN(cleanAmount) || cleanAmount <= 0) {
      alert('Por favor, insira um valor válido.');
      return;
    }
    if (!description.trim()) {
      alert('Por favor, informe a descrição do lançamento.');
      return;
    }

    onSave({
      type,
      description: description.trim(),
      amount: cleanAmount,
      category_id: categoryId,
      paid_by: paidBy,
      split_type: type === 'income' ? 'personal' : splitType,
      date: date || '2026-03-03',
    });

    setDescription('');
    setAmountStr('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-tx-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn"
    >
      {/* Container: Bottom sheet em mobile (<640px) e Modal centralizado em desktop */}
      <div className="bg-white dark:bg-slate-900 w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden animate-slideUp">
        {/* Cabeçalho */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-600" />
            <h3 id="new-tx-title" className="font-semibold text-slate-900 dark:text-white text-base">
              Novo Lançamento
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar modal"
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Seletor Tipo (Receita / Despesa) */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-md transition ${
                type === 'expense'
                  ? 'bg-white dark:bg-slate-900 text-rose-600 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <ArrowDownRight className="w-4 h-4" />
              <span>Despesa</span>
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-md transition ${
                type === 'income'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Receita</span>
            </button>
          </div>

          {/* Valor */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Valor (R$)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-sm font-mono">R$</span>
              <input
                type="text"
                placeholder="0,00"
                value={amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-lg font-bold font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-600 focus:outline-none"
                autoFocus
              />
            </div>
          </div>

          {/* Descrição e Data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Descrição
              </label>
              <input
                type="text"
                placeholder="Ex: Supermercado..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Data do Lançamento
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Categoria & Membro Pagador */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {type === 'expense' ? 'Categoria' : 'Origem'}
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-2.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-600 focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {type === 'expense' ? 'Quem Pagou' : 'Quem Recebeu'}
              </label>
              <select
                value={paidBy}
                onChange={(e) => setPaidBy(e.target.value)}
                className="w-full px-2.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-600 focus:outline-none"
              >
                {members.map((m) => (
                  <option key={m.id} value={m.user_id}>
                    {m.profile.full_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Opção de Rateio (Exclusiva para despesas) */}
          {type === 'expense' && (
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Scale className="w-3.5 h-3.5 text-brand-600" />
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Regra de Rateio Familiar
                </label>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSplitType('split_50_50')}
                  className={`py-2 px-1 text-center rounded-lg border text-[11px] font-semibold transition ${
                    splitType === 'split_50_50'
                      ? 'bg-brand-50 border-brand-600 text-brand-700 dark:bg-brand-950/70 dark:text-brand-300'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  Divide 50/50
                </button>

                <button
                  type="button"
                  onClick={() => setSplitType('house_fixed')}
                  className={`py-2 px-1 text-center rounded-lg border text-[11px] font-semibold transition ${
                    splitType === 'house_fixed'
                      ? 'bg-slate-100 border-slate-600 text-slate-800 dark:bg-slate-800 dark:text-white'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  Fixo da Casa
                </button>

                <button
                  type="button"
                  onClick={() => setSplitType('personal')}
                  className={`py-2 px-1 text-center rounded-lg border text-[11px] font-semibold transition ${
                    splitType === 'personal'
                      ? 'bg-purple-50 border-purple-600 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  100% Pessoal
                </button>
              </div>
            </div>
          )}

          {/* Botões de Ação */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-2/3 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-xs font-semibold text-white shadow-sm transition"
            >
              Salvar Lançamento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

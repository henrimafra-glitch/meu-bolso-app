import React, { useState, useEffect } from 'react';
import { X, PiggyBank, Target } from 'lucide-react';
import { Goal } from '../types';

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'deposit' | 'create';
  selectedGoal?: Goal | null;
  onConfirmDeposit: (goalId: string, amount: number) => void;
  onConfirmCreate: (title: string, targetAmount: number) => void;
}

export const GoalModal: React.FC<GoalModalProps> = ({
  isOpen,
  onClose,
  mode,
  selectedGoal,
  onConfirmDeposit,
  onConfirmCreate,
}) => {
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');

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
    if (mode === 'deposit' && selectedGoal) {
      const val = parseFloat(amount.replace(',', '.'));
      if (isNaN(val) || val <= 0) return;
      onConfirmDeposit(selectedGoal.id, val);
    } else if (mode === 'create') {
      const target = parseFloat(amount.replace(',', '.'));
      if (!title.trim() || isNaN(target) || target <= 0) return;
      onConfirmCreate(title.trim(), target);
    }
    setAmount('');
    setTitle('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
    >
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 flex items-center justify-center">
            {mode === 'deposit' ? <PiggyBank className="w-5 h-5" /> : <Target className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              {mode === 'deposit' ? `Aportar em ${selectedGoal?.title}` : 'Novo Cofre Familiar'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {mode === 'deposit' ? 'Injete recursos de economia no cofre da casa' : 'Defina um objetivo financeiro compartilhado'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'create' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Nome do Cofre
              </label>
              <input
                type="text"
                placeholder="Ex: Reforma da Cozinha, Férias de Verão"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-600"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              {mode === 'deposit' ? 'Valor do Aporte (R$)' : 'Meta Financeira Total (R$)'}
            </label>
            <input
              type="text"
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-600 font-mono text-base font-bold"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white rounded-lg shadow-sm transition"
            >
              {mode === 'deposit' ? 'Confirmar Aporte' : 'Criar Cofre'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

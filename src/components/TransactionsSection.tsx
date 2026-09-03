import React, { useState } from 'react';
import { Transaction } from '../types';
import { Search, GraduationCap, HeartPulse, Home, ShoppingCart, Utensils, Tag, Download } from 'lucide-react';

interface TransactionsSectionProps {
  transactions: Transaction[];
  onOpenNewTransaction: () => void;
}

export const TransactionsSection: React.FC<TransactionsSectionProps> = ({ transactions, onOpenNewTransaction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSplit, setFilterSplit] = useState<string>('all');

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const formatDate = (dateStr: string) => {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  const getCategoryIcon = (iconName?: string) => {
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
        return <Tag className="w-4 h-4" />;
    }
  };

  const getSplitBadge = (split: string) => {
    switch (split) {
      case 'split_50_50':
        return (
          <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
            50/50
          </span>
        );
      case 'house_fixed':
        return (
          <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            Fixo Casa
          </span>
        );
      case 'personal':
        return (
          <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            Pessoal
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            {split}
          </span>
        );
    }
  };

  const filtered = transactions.filter((t) => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.payer_name && t.payer_name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSplit = filterSplit === 'all' || t.split_type === filterSplit;
    return matchesSearch && matchesSplit;
  });

  const handleExportCSV = () => {
    const headers = ['Data', 'Descrição', 'Categoria', 'Quem Pagou', 'Divisão', 'Tipo', 'Valor (R$)'];
    const rows = filtered.map((t) => [
      formatDate(t.date),
      `"${t.description.replace(/"/g, '""')}"`,
      `"${t.category_name || ''}"`,
      `"${t.payer_name || ''}"`,
      t.split_type === 'split_50_50' ? '50/50' : t.split_type === 'house_fixed' ? 'Fixo Casa' : 'Pessoal',
      t.type === 'income' ? 'Receita' : 'Despesa',
      t.amount.toFixed(2).replace('.', ',')
    ]);

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `extrato_familiar_meu_bolso_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      {/* Cabeçalho da Seção de Transações */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="font-semibold text-slate-900 dark:text-white text-base">
            Transações & Divisão de Contas
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Registro detalhado dos gastos da casa e classificação do rateio
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Busca Rápida */}
          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar despesa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-600"
            />
          </div>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold shadow-sm transition"
            title="Exportar extrato das transações em formato CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Exportar CSV</span>
          </button>

          <button
            onClick={onOpenNewTransaction}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
          >
            Novo Lançamento
          </button>
        </div>
      </div>

      {/* Filtros de Rateio */}
      <div className="flex items-center gap-1.5 mb-4 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setFilterSplit('all')}
          className={`px-2.5 py-1 rounded-lg font-medium transition ${
            filterSplit === 'all'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilterSplit('split_50_50')}
          className={`px-2.5 py-1 rounded-lg font-medium transition ${
            filterSplit === 'split_50_50'
              ? 'bg-brand-600 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
          }`}
        >
          Compartilhado 50/50
        </button>
        <button
          onClick={() => setFilterSplit('house_fixed')}
          className={`px-2.5 py-1 rounded-lg font-medium transition ${
            filterSplit === 'house_fixed'
              ? 'bg-slate-700 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
          }`}
        >
          Fixo da Casa
        </button>
        <button
          onClick={() => setFilterSplit('personal')}
          className={`px-2.5 py-1 rounded-lg font-medium transition ${
            filterSplit === 'personal'
              ? 'bg-purple-600 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
          }`}
        >
          Pessoal
        </button>
      </div>

      {/* 1. Visão Desktop (>= 1024px): Tabela Executiva */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
              <th className="py-2.5 px-3">Data</th>
              <th className="py-2.5 px-3">Descrição</th>
              <th className="py-2.5 px-3">Categoria</th>
              <th className="py-2.5 px-3">Quem Pagou</th>
              <th className="py-2.5 px-3">Divisão</th>
              <th className="py-2.5 px-3 text-right">Valor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition">
                <td className="py-3 px-3 text-slate-500 dark:text-slate-400 whitespace-nowrap font-mono">
                  {formatDate(t.date)}
                </td>
                <td className="py-3 px-3 font-medium text-slate-900 dark:text-white">
                  {t.description}
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <span className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {getCategoryIcon(t.category_icon)}
                    </span>
                    <span>{t.category_name}</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-slate-700 dark:text-slate-300">
                  {t.payer_name}
                </td>
                <td className="py-3 px-3">
                  {getSplitBadge(t.split_type)}
                </td>
                <td className={`py-3 px-3 text-right font-bold font-mono ${
                  t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'
                }`}>
                  {t.type === 'income' ? '+' : '-'} {formatBRL(t.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 2. Visão Mobile (< 1024px): Cards Verticais Ergonômicos */}
      <div className="lg:hidden space-y-2.5">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0">
                {getCategoryIcon(t.category_icon)}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                  {t.description}
                </p>
                <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>{t.payer_name?.split(' ')[0]}</span>
                  <span>•</span>
                  <span>{formatDate(t.date)}</span>
                </div>
              </div>
            </div>

            <div className="text-right shrink-0">
              <p className={`text-xs font-bold font-mono ${
                t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'
              }`}>
                {t.type === 'income' ? '+' : '-'} {formatBRL(t.amount)}
              </p>
              <div className="mt-1">
                {getSplitBadge(t.split_type)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

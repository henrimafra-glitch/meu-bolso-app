import { useState, useEffect } from 'react';
import {
  initialFamily,
  initialMembers,
  initialCategories,
  initialTransactions,
  initialGoals,
  calculateSummary,
} from './lib/mockData';
import { Goal, FamilyMember, Transaction, SplitType, TransactionType } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { DashboardHero } from './components/DashboardHero';
import { BudgetSection } from './components/BudgetSection';
import { TransactionsSection } from './components/TransactionsSection';
import { GoalsSection } from './components/GoalsSection';
import { NewTransactionModal } from './components/NewTransactionModal';
import { InviteModal } from './components/InviteModal';
import { AuditSection } from './components/AuditSection';
import { Toast, ToastData } from './components/Toast';
import { GoalModal } from './components/GoalModal';

export function App() {
  const [family] = useState(initialFamily);
  const [members] = useState(initialMembers);
  const [currentMember, setCurrentMember] = useState<FamilyMember>(initialMembers[0]);
  const [categories, setCategories] = useState(initialCategories);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [goals, setGoals] = useState(initialGoals);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedMonth, setSelectedMonth] = useState('Março 2026');
  const [isNewTxOpen, setIsNewTxOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);
  const [goalModalState, setGoalModalState] = useState<{
    isOpen: boolean;
    mode: 'deposit' | 'create';
    selectedGoal?: Goal | null;
  }>({ isOpen: false, mode: 'deposit' });

  // Sincronização do tema escuro
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const summary = calculateSummary(transactions, members);

  const handlePrevMonth = () => {
    setSelectedMonth('Fevereiro 2026');
  };

  const handleNextMonth = () => {
    setSelectedMonth('Abril 2026');
  };

  const handleSaveTransaction = (data: {
    type: TransactionType;
    description: string;
    amount: number;
    category_id: string;
    paid_by: string;
    split_type: SplitType;
  }) => {
    const category = categories.find((c) => c.id === data.category_id);
    const payer = members.find((m) => m.user_id === data.paid_by);

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      family_id: family.id,
      paid_by: data.paid_by,
      payer_name: payer?.profile.full_name || 'Membro',
      category_id: data.category_id,
      category_name: category?.name || 'Geral',
      category_icon: category?.icon || 'Tag',
      type: data.type,
      amount: data.amount,
      description: data.description,
      split_type: data.split_type,
      date: new Date().toISOString().split('T')[0],
    };

    setTransactions([newTx, ...transactions]);

    // Atualiza o gasto da categoria se for despesa
    if (data.type === 'expense') {
      setCategories(
        categories.map((c) =>
          c.id === data.category_id ? { ...c, spent: c.spent + data.amount } : c
        )
      );
    }

    setToast({ message: 'Lançamento registrado com sucesso!', type: 'success' });
  };

  const handleSettleDebt = () => {
    setToast({
      message: 'Acerto de contas realizado! Saldos compartilhados conciliados com sucesso.',
      type: 'success',
    });
  };

  const handleAddDepositToGoal = (goalId: string) => {
    const goal = goals.find((g) => g.id === goalId);
    setGoalModalState({ isOpen: true, mode: 'deposit', selectedGoal: goal });
  };

  const handleNewGoal = () => {
    setGoalModalState({ isOpen: true, mode: 'create' });
  };

  const handleConfirmDeposit = (goalId: string, amount: number) => {
    setGoals(
      goals.map((g) =>
        g.id === goalId ? { ...g, current_amount: g.current_amount + amount } : g
      )
    );
    setToast({
      message: `Aporte de R$ ${amount.toFixed(2).replace('.', ',')} confirmado no cofre!`,
      type: 'success',
    });
  };

  const handleConfirmCreateGoal = (title: string, targetAmount: number) => {
    const newGoal: Goal = {
      id: `goal_${Date.now()}`,
      family_id: family.id,
      title,
      target_amount: targetAmount,
      current_amount: 0,
      target_date: '2026-12-31',
    };
    setGoals([...goals, newGoal]);
    setToast({
      message: `Novo cofre "${title}" criado com sucesso!`,
      type: 'success',
    });
  };

  const handleSimulateInversion = () => {
    const newTx: Transaction = {
      id: `tx_sim_${Date.now()}`,
      family_id: family.id,
      paid_by: 'usr_juliana',
      payer_name: 'Juliana Mafra',
      category_id: 'cat_moradia',
      category_name: 'Moradia & Contas',
      type: 'expense',
      amount: 600.0,
      description: 'Manutenção Hidráulica da Cozinha (Simulação Auditoria)',
      split_type: 'split_50_50',
      date: '2026-03-03',
    };

    setTransactions([newTx, ...transactions]);

    setCategories(
      categories.map((c) =>
        c.id === 'cat_moradia' ? { ...c, spent: c.spent + 600 } : c
      )
    );
  };

  const handleResetData = () => {
    setTransactions(initialTransactions);
    setCategories(initialCategories);
    setGoals(initialGoals);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* 1. Barra Lateral Executiva (Desktop >= 1024px) */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* 2. Área Principal de Conteúdo */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-8">
        {/* Header com Seletor Familiar e Período */}
        <Header
          family={family}
          members={members}
          currentMember={currentMember}
          onSelectMember={setCurrentMember}
          selectedMonth={selectedMonth}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onOpenInvite={() => setIsInviteOpen(true)}
          onOpenAudit={() => setActiveTab('audit')}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          isAuditActive={activeTab === 'audit'}
        />

        {/* Conteúdo Dinâmico por Aba */}
        <main className="max-w-7xl mx-auto w-full p-4 lg:p-8 space-y-6">
          {activeTab === 'dashboard' && (
            <>
              {/* Painel Consolidado da Casa */}
              <DashboardHero summary={summary} onSettleDebt={handleSettleDebt} />

              {/* Orçamentos por Categoria (Budget Caps) */}
              <BudgetSection categories={categories} />

              {/* Transações Recentes & Divisão de Contas */}
              <TransactionsSection
                transactions={transactions}
                onOpenNewTransaction={() => setIsNewTxOpen(true)}
              />

              {/* Cofres / Metas da Família */}
              <GoalsSection
                goals={goals}
                onAddDeposit={handleAddDepositToGoal}
                onNewGoal={handleNewGoal}
              />
            </>
          )}

          {activeTab === 'transactions' && (
            <TransactionsSection
              transactions={transactions}
              onOpenNewTransaction={() => setIsNewTxOpen(true)}
            />
          )}

          {activeTab === 'budgets' && (
            <div className="space-y-4">
              <BudgetSection categories={categories} />
            </div>
          )}

          {activeTab === 'goals' && (
            <div className="space-y-4">
              <GoalsSection
                goals={goals}
                onAddDeposit={handleAddDepositToGoal}
                onNewGoal={handleNewGoal}
              />
            </div>
          )}

          {activeTab === 'members' && (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                    Integrantes da {family.name}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Membros ativos e papéis no gerenciamento financeiro compartilhado
                  </p>
                </div>
                <button
                  onClick={() => setIsInviteOpen(true)}
                  className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-lg transition"
                >
                  Convidar Novo Membro
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {members.map((m) => (
                  <div
                    key={m.id}
                    className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex items-center gap-3"
                  >
                    <img
                      src={m.profile.avatar_url}
                      alt={m.profile.full_name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-600"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {m.profile.full_name}
                      </h4>
                      <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 inline-block mt-1">
                        {m.role === 'admin'
                          ? 'Administrador da Casa'
                          : m.role === 'member'
                          ? 'Membro Padrão'
                          : 'Dependente'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <AuditSection
              transactions={transactions}
              categories={categories}
              goals={goals}
              summary={summary}
              onSimulateInversion={handleSimulateInversion}
              onResetData={handleResetData}
            />
          )}
        </main>
      </div>

      {/* 3. Navegação Inferior Fixa (Mobile < 1024px) */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenNewTransaction={() => setIsNewTxOpen(true)}
      />

      {/* 4. Modais */}
      <NewTransactionModal
        isOpen={isNewTxOpen}
        onClose={() => setIsNewTxOpen(false)}
        categories={categories}
        members={members}
        currentMember={currentMember}
        onSave={handleSaveTransaction}
      />

      <InviteModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        family={family}
      />

      <GoalModal
        isOpen={goalModalState.isOpen}
        onClose={() => setGoalModalState({ ...goalModalState, isOpen: false })}
        mode={goalModalState.mode}
        selectedGoal={goalModalState.selectedGoal}
        onConfirmDeposit={handleConfirmDeposit}
        onConfirmCreate={handleConfirmCreateGoal}
      />

      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
    </div>
  );
}

export default App;

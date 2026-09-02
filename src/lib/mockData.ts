import { Family, FamilyMember, Category, Transaction, Goal, BalanceSummary } from '../types';

export const initialFamily: Family = {
  id: 'fam_mafra_001',
  name: 'Família Mafra',
  invite_code: 'MF7892K1',
};

export const initialMembers: FamilyMember[] = [
  {
    id: 'mem_1',
    family_id: 'fam_mafra_001',
    user_id: 'usr_henrique',
    role: 'admin',
    color_tag: '#0D9488', // Teal da marca
    profile: {
      id: 'usr_henrique',
      full_name: 'Henrique Mafra',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
  },
  {
    id: 'mem_2',
    family_id: 'fam_mafra_001',
    user_id: 'usr_juliana',
    role: 'member',
    color_tag: '#6366F1', // Indigo suave
    profile: {
      id: 'usr_juliana',
      full_name: 'Juliana Mafra',
      avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    },
  },
  {
    id: 'mem_3',
    family_id: 'fam_mafra_001',
    user_id: 'usr_lucas',
    role: 'dependent',
    color_tag: '#F59E0B', // Amber
    profile: {
      id: 'usr_lucas',
      full_name: 'Lucas Mafra',
      avatar_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    },
  },
];

export const initialCategories: Category[] = [
  { id: 'cat_moradia', name: 'Moradia & Contas', icon: 'Home', monthly_budget: 3500.0, spent: 2850.0 },
  { id: 'cat_supermercado', name: 'Supermercado & Feira', icon: 'ShoppingCart', monthly_budget: 2200.0, spent: 1840.5 },
  { id: 'cat_saude', name: 'Saúde & Farmácia', icon: 'HeartPulse', monthly_budget: 800.0, spent: 420.0 },
  { id: 'cat_lazer', name: 'Lazer & Restaurantes', icon: 'Utensils', monthly_budget: 600.0, spent: 580.0 },
  { id: 'cat_educacao', name: 'Educação & Cursos', icon: 'GraduationCap', monthly_budget: 1100.0, spent: 1100.0 },
];

export const initialTransactions: Transaction[] = [
  {
    id: 'tx_1',
    family_id: 'fam_mafra_001',
    paid_by: 'usr_henrique',
    payer_name: 'Henrique Mafra',
    category_id: 'cat_moradia',
    category_name: 'Moradia & Contas',
    category_icon: 'Home',
    type: 'expense',
    amount: 2100.0,
    description: 'Aluguel do Mês',
    split_type: 'house_fixed',
    date: '2026-03-01',
  },
  {
    id: 'tx_2',
    family_id: 'fam_mafra_001',
    paid_by: 'usr_juliana',
    payer_name: 'Juliana Mafra',
    category_id: 'cat_supermercado',
    category_name: 'Supermercado & Feira',
    category_icon: 'ShoppingCart',
    type: 'expense',
    amount: 720.5,
    description: 'Compras Quinzenais Pão de Açúcar',
    split_type: 'split_50_50',
    date: '2026-03-02',
  },
  {
    id: 'tx_3',
    family_id: 'fam_mafra_001',
    paid_by: 'usr_henrique',
    payer_name: 'Henrique Mafra',
    category_id: 'cat_lazer',
    category_name: 'Lazer & Restaurantes',
    category_icon: 'Utensils',
    type: 'expense',
    amount: 240.0,
    description: 'Jantar em Família - Trattoria',
    split_type: 'split_50_50',
    date: '2026-03-02',
  },
  {
    id: 'tx_4',
    family_id: 'fam_mafra_001',
    paid_by: 'usr_juliana',
    payer_name: 'Juliana Mafra',
    category_id: 'cat_educacao',
    category_name: 'Educação & Cursos',
    category_icon: 'GraduationCap',
    type: 'expense',
    amount: 1100.0,
    description: 'Mensalidade Escolar Lucas',
    split_type: 'house_fixed',
    date: '2026-03-01',
  },
  {
    id: 'tx_5',
    family_id: 'fam_mafra_001',
    paid_by: 'usr_henrique',
    payer_name: 'Henrique Mafra',
    category_id: 'cat_saude',
    category_name: 'Saúde & Farmácia',
    category_icon: 'HeartPulse',
    type: 'expense',
    amount: 145.0,
    description: 'Farmácia - Medicamentos de Uso Contínuo',
    split_type: 'personal',
    date: '2026-02-28',
  },
];

export const initialGoals: Goal[] = [
  {
    id: 'goal_1',
    family_id: 'fam_mafra_001',
    title: 'Reserva de Emergência da Casa',
    target_amount: 20000.0,
    current_amount: 12450.0,
    target_date: '2026-12-31',
  },
  {
    id: 'goal_2',
    family_id: 'fam_mafra_001',
    title: 'Férias de Julho no Nordeste',
    target_amount: 8000.0,
    current_amount: 5200.0,
    target_date: '2026-07-10',
  },
  {
    id: 'goal_3',
    family_id: 'fam_mafra_001',
    title: 'Troca do Automóvel Familiar',
    target_amount: 35000.0,
    current_amount: 8500.0,
    target_date: '2027-04-30',
  },
];

export function calculateSummary(transactions: Transaction[], members: FamilyMember[]): BalanceSummary {
  const totalIncome = 14500.0; // Soma das rendas declaradas do mês
  let totalExpense = 0;
  const spentByMember: Record<string, number> = {};

  members.forEach(m => {
    spentByMember[m.user_id] = 0;
  });

  transactions.forEach(t => {
    if (t.type === 'expense') {
      totalExpense += t.amount;
      spentByMember[t.paid_by] = (spentByMember[t.paid_by] || 0) + t.amount;
    }
  });

  const totalAvailable = totalIncome - totalExpense;
  const commitmentPct = totalIncome > 0 ? Math.round((totalExpense / totalIncome) * 100) : 0;

  const splitsByMember = members.map(m => {
    const spent = spentByMember[m.user_id] || 0;
    const pct = totalExpense > 0 ? Math.round((spent / totalExpense) * 100) : 0;
    return {
      memberId: m.user_id,
      memberName: m.profile.full_name,
      color: m.color_tag,
      spentAmount: spent,
      percentage: pct,
    };
  });

  // Cálculo de acerto de contas 50/50 entre Henrique e Juliana
  let henriqueSharedPaid = 0;
  let julianaSharedPaid = 0;

  transactions.forEach(t => {
    if (t.type === 'expense' && (t.split_type === 'split_50_50' || t.split_type === 'house_fixed')) {
      if (t.paid_by === 'usr_henrique') henriqueSharedPaid += t.amount;
      if (t.paid_by === 'usr_juliana') julianaSharedPaid += t.amount;
    }
  });

  const debtSettlements = [];
  const diff = (henriqueSharedPaid - julianaSharedPaid) / 2;
  if (diff > 0) {
    debtSettlements.push({
      debtorName: 'Juliana Mafra',
      creditorName: 'Henrique Mafra',
      amount: Math.round(diff * 100) / 100,
    });
  } else if (diff < 0) {
    debtSettlements.push({
      debtorName: 'Henrique Mafra',
      creditorName: 'Juliana Mafra',
      amount: Math.round(Math.abs(diff) * 100) / 100,
    });
  }

  return {
    totalAvailable,
    monthlyIncome: totalIncome,
    monthlyExpense: totalExpense,
    incomeCommitmentPct: commitmentPct,
    splitsByMember,
    debtSettlements,
  };
}

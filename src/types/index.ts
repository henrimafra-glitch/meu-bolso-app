export type Role = 'admin' | 'member' | 'dependent';
export type SplitType = 'house_fixed' | 'split_50_50' | 'personal' | 'custom';
export type TransactionType = 'income' | 'expense';

export interface Profile {
  id: string;
  full_name: string;
  avatar_url?: string;
}

export interface Family {
  id: string;
  name: string;
  invite_code: string;
}

export interface FamilyMember {
  id: string;
  family_id: string;
  user_id: string;
  role: Role;
  color_tag: string;
  profile: Profile;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  monthly_budget: number;
  spent: number;
}

export interface Transaction {
  id: string;
  family_id: string;
  paid_by: string; // user_id
  category_id: string;
  type: TransactionType;
  amount: number;
  description: string;
  split_type: SplitType;
  date: string;
  payer_name?: string;
  category_name?: string;
  category_icon?: string;
}

export interface Goal {
  id: string;
  family_id: string;
  title: string;
  target_amount: number;
  current_amount: number;
  target_date?: string;
}

export interface BalanceSummary {
  totalAvailable: number;
  monthlyIncome: number;
  monthlyExpense: number;
  incomeCommitmentPct: number;
  splitsByMember: {
    memberId: string;
    memberName: string;
    color: string;
    spentAmount: number;
    percentage: number;
  }[];
  debtSettlements: {
    debtorName: string;
    creditorName: string;
    amount: number;
  }[];
}

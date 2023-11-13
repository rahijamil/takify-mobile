import { Category } from "../AddEditTransactionModal/categories";
  
  export interface Budget {
    id: string;
    profile_id: string;
    category: Category | null;
    date: string;
    budget: number;
    spent: number;
    created_at?: string;
  }
  
  export interface BudgetState extends Omit<Budget, 'id'> {}
  
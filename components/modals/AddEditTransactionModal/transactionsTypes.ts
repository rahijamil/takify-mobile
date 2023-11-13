import { Category } from "./categories";

export enum TransactionType {
    Expense = 'Expense',
    Income = 'Income',
    Debt = 'Debt',
  }
  
  export interface Transaction {
    id: string;
    type: TransactionType;
    category: Category | null;
    date: string;
    note: string;
    amount: number;
    isRecurring?: boolean;
    created_at?: string;
  }
  
  export interface TransactionState extends Omit<Transaction, 'id'> {}
  
import { Category } from "../AddEditTransactionModal/categories";

export enum BudgetActionTypes {
    SET_DATE = 'SET_DATE',
    SET_BUDGET = 'SET_BUDGET',
    SET_SPENT = 'SET_SPENT',
    SET_CATEGORY = 'SET_CATEGORY',
}

export type BudgetAction =
    | { type: typeof BudgetActionTypes.SET_DATE; payload: string }
    | { type: typeof BudgetActionTypes.SET_BUDGET; payload: number }
    | { type: typeof BudgetActionTypes.SET_BUDGET; payload: number }
    | { type: typeof BudgetActionTypes.SET_SPENT; payload: number }
    | { type: typeof BudgetActionTypes.SET_CATEGORY; payload: Category | null };

import { Category } from './categories';
import { TransactionType } from './transactionsTypes';

export enum TransactionActionTypes {
    SET_TYPE = 'SET_TYPE',
    SET_NOTE = 'SET_NOTE',
    SET_DATE = 'SET_DATE',
    SET_AMOUNT = 'SET_AMOUNT',
    SET_CATEGORY = 'SET_CATEGORY',
}

export type TransactionAction =
    | { type: typeof TransactionActionTypes.SET_TYPE; payload: TransactionType }
    | { type: typeof TransactionActionTypes.SET_NOTE; payload: string }
    | { type: typeof TransactionActionTypes.SET_DATE; payload: string }
    | { type: typeof TransactionActionTypes.SET_AMOUNT; payload: number }
    | { type: typeof TransactionActionTypes.SET_CATEGORY; payload: Category | null };

import { useReducer, useCallback } from 'react';
import { TransactionState, TransactionType } from '../components/modals/AddEditTransactionModal/transactionsTypes';
import { transactionReducer } from '../components/modals/AddEditTransactionModal/transactionReducer';
import { TransactionActionTypes } from '../components/modals/AddEditTransactionModal/transactionActions';
import { Category } from '../components/modals/AddEditTransactionModal/categories';

function useTransactionForm(initialState: TransactionState) {
    const [state, dispatch] = useReducer(transactionReducer, initialState);

    const setType = useCallback((type: TransactionType) => {
        dispatch({ type: TransactionActionTypes.SET_TYPE, payload: type });
    }, []);

    const setNote = useCallback((note: string) => {
        dispatch({ type: TransactionActionTypes.SET_NOTE, payload: note });
    }, []);

    const setDate = useCallback((date: string) => {
        dispatch({ type: TransactionActionTypes.SET_DATE, payload: date });
    }, []);

    const setAmount = useCallback((amount: number) => {
        dispatch({ type: TransactionActionTypes.SET_AMOUNT, payload: amount });
    }, []);

    const toggleCategory = useCallback((category: Category | null) => {
        dispatch({ type: TransactionActionTypes.SET_CATEGORY, payload: category });
    }, []);

    return { state, setType, setNote, setDate, setAmount, toggleCategory };
}

export default useTransactionForm;
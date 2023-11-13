import { useReducer, useCallback } from 'react';
import { Category } from '../components/modals/AddEditTransactionModal/categories';
import { BudgetState } from '../components/modals/AddBudgetModal/budgetTypes';
import { budgetReducer } from '../components/modals/AddBudgetModal/budgetReducer';
import { BudgetActionTypes } from '../components/modals/AddBudgetModal/budgetAction';

function useBudgetForm(initialState: BudgetState) {
    const [state, dispatch] = useReducer(budgetReducer, initialState);

    const setDate = useCallback((date: string) => {
        dispatch({ type: BudgetActionTypes.SET_DATE, payload: date });
    }, []);

    const setBudget = useCallback((amount: number) => {
        dispatch({ type: BudgetActionTypes.SET_BUDGET, payload: amount });
    }, []);

    const setSpent = useCallback((amount: number) => {
        dispatch({ type: BudgetActionTypes.SET_SPENT, payload: amount });
    }, []);

    const toggleCategory = useCallback((category: Category | null) => {
        dispatch({ type: BudgetActionTypes.SET_CATEGORY, payload: category });
    }, []);

    return { state, setDate, setBudget, setSpent, toggleCategory };
}

export default useBudgetForm;
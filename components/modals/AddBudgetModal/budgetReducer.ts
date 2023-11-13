import { BudgetAction, BudgetActionTypes } from "./budgetAction";
import { BudgetState } from "./budgetTypes";

export function budgetReducer(state: BudgetState, action: BudgetAction) {
    switch (action.type) {
        case BudgetActionTypes.SET_DATE:
            return { ...state, date: action.payload };
        case BudgetActionTypes.SET_BUDGET:
            return { ...state, amount: action.payload };
        case BudgetActionTypes.SET_SPENT:
            return { ...state, note: action.payload };
        case BudgetActionTypes.SET_CATEGORY:
            return {
                ...state,
                category: action.payload,
            };
        default:
            throw new Error();
    }
}

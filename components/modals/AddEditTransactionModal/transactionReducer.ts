import { TransactionState } from './transactionsTypes';
import { TransactionAction, TransactionActionTypes } from './transactionActions';

export function transactionReducer(state: TransactionState, action: TransactionAction) {
    switch (action.type) {
        case TransactionActionTypes.SET_TYPE:
            return { ...state, type: action.payload };
        case TransactionActionTypes.SET_NOTE:
            return { ...state, note: action.payload };
        case TransactionActionTypes.SET_DATE:
            return { ...state, date: action.payload };
        case TransactionActionTypes.SET_AMOUNT:
            return { ...state, amount: action.payload };
        case TransactionActionTypes.SET_CATEGORY:
            return {
                ...state,
                category: action.payload,
            };
        default:
            throw new Error();
    }
}

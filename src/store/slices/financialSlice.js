import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
  selectedTransaction: null,
  income: [],
  expenses: [],
  loading: false,
  error: null
};

const financialSlice = createSlice({
  name: 'financial',
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
      state.income = action.payload.filter(transaction => transaction.type === 'income');
      state.expenses = action.payload.filter(transaction => transaction.type === 'expense');
      state.loading = false;
      state.error = null;
    },
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
      if (action.payload.type === 'income') {
        state.income.push(action.payload);
      } else {
        state.expenses.push(action.payload);
      }
    },
    updateTransaction: (state, action) => {
      const index = state.transactions.findIndex(transaction => transaction.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
        state.income = state.transactions.filter(transaction => transaction.type === 'income');
        state.expenses = state.transactions.filter(transaction => transaction.type === 'expense');
      }
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(transaction => transaction.id !== action.payload);
      state.income = state.transactions.filter(transaction => transaction.type === 'income');
      state.expenses = state.transactions.filter(transaction => transaction.type === 'expense');
    },
    setSelectedTransaction: (state, action) => {
      state.selectedTransaction = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {
  setTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  setSelectedTransaction,
  setLoading,
  setError,
  clearError
} = financialSlice.actions;

export default financialSlice.reducer;

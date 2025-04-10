import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  selectedItem: null,
  categories: [],
  loading: false,
  error: null
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    updateCategory: (state, action) => {
      const index = state.categories.findIndex(category => category.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(category => category.id !== action.payload);
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
  setItems,
  addItem,
  updateItem,
  deleteItem,
  setSelectedItem,
  setCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  setLoading,
  setError,
  clearError
} = inventorySlice.actions;

export default inventorySlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

// Auth Slice
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: true,
    error: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
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

// Clients Slice
export const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    clients: [],
    selectedClient: null,
    loading: false,
    error: null
  },
  reducers: {
    setClients: (state, action) => {
      state.clients = action.payload;
      state.loading = false;
    },
    setSelectedClient: (state, action) => {
      state.selectedClient = action.payload;
    },
    addClient: (state, action) => {
      state.clients.push(action.payload);
    },
    updateClient: (state, action) => {
      const index = state.clients.findIndex(client => client.id === action.payload.id);
      if (index !== -1) {
        state.clients[index] = action.payload;
      }
    },
    deleteClient: (state, action) => {
      state.clients = state.clients.filter(client => client.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

// Appointments Slice
export const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    selectedDate: new Date(),
    loading: false,
    error: null
  },
  reducers: {
    setAppointments: (state, action) => {
      state.appointments = action.payload;
      state.loading = false;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    addAppointment: (state, action) => {
      state.appointments.push(action.payload);
    },
    updateAppointment: (state, action) => {
      const index = state.appointments.findIndex(apt => apt.id === action.payload.id);
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    },
    deleteAppointment: (state, action) => {
      state.appointments = state.appointments.filter(apt => apt.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

// Inventory Slice
export const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    products: [],
    categories: [],
    selectedProduct: null,
    loading: false,
    error: null
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

// Financial Slice
export const financialSlice = createSlice({
  name: 'financial',
  initialState: {
    transactions: [],
    summary: {
      dailyIncome: 0,
      dailyExpenses: 0,
      weeklyIncome: 0,
      weeklyExpenses: 0
    },
    loading: false,
    error: null
  },
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
      state.loading = false;
    },
    setSummary: (state, action) => {
      state.summary = action.payload;
    },
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

// Notes Slice
export const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    selectedPriority: 'all',
    loading: false,
    error: null
  },
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
      state.loading = false;
    },
    setSelectedPriority: (state, action) => {
      state.selectedPriority = action.payload;
    },
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },
    updateNote: (state, action) => {
      const index = state.notes.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

// Export actions
export const { setUser, setLoading: setAuthLoading, setError: setAuthError, clearError } = authSlice.actions;
export const { setClients, setSelectedClient, addClient, updateClient, deleteClient } = clientsSlice.actions;
export const { setAppointments, setSelectedDate, addAppointment, updateAppointment, deleteAppointment } = appointmentsSlice.actions;
export const { setProducts, setCategories, setSelectedProduct, addProduct, updateProduct, deleteProduct } = inventorySlice.actions;
export const { setTransactions, setSummary, addTransaction } = financialSlice.actions;
export const { setNotes, setSelectedPriority, addNote, updateNote, deleteNote } = notesSlice.actions;

// Export reducers
export const reducers = {
  auth: authSlice.reducer,
  clients: clientsSlice.reducer,
  appointments: appointmentsSlice.reducer,
  inventory: inventorySlice.reducer,
  financial: financialSlice.reducer,
  notes: notesSlice.reducer
};

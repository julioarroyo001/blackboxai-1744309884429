import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clients: [],
  selectedClient: null,
  loading: false,
  error: null
};

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setClients: (state, action) => {
      state.clients = action.payload;
      state.loading = false;
      state.error = null;
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
    setSelectedClient: (state, action) => {
      state.selectedClient = action.payload;
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
  setClients,
  addClient,
  updateClient,
  deleteClient,
  setSelectedClient,
  setLoading,
  setError,
  clearError
} = clientsSlice.actions;

export default clientsSlice.reducer;

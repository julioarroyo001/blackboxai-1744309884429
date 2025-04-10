import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import clientsReducer from './slices/clientsSlice';
import inventoryReducer from './slices/inventorySlice';
import appointmentsReducer from './slices/appointmentsSlice';
import financialReducer from './slices/financialSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    clients: clientsReducer,
    inventory: inventoryReducer,
    appointments: appointmentsReducer,
    financial: financialReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import { reducers } from './slices';
import { errorMiddleware } from './middleware/errorMiddleware';

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['auth/setUser'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.createdAt', 'payload.updatedAt'],
        // Ignore these paths in the state
        ignoredPaths: ['auth.user', 'appointments.selectedDate']
      }
    }).concat(errorMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
});

// Export the store
export default store;

import { createAsyncThunk } from '@reduxjs/toolkit';
import * as firebaseService from '../../services/firebaseService';

// Clients thunks
export const fetchClients = createAsyncThunk(
  'clients/fetchClients',
  async (_, { rejectWithValue }) => {
    try {
      return await firebaseService.clientsService.getAll();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createClient = createAsyncThunk(
  'clients/createClient',
  async (clientData, { rejectWithValue }) => {
    try {
      return await firebaseService.clientsService.create(clientData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Appointments thunks
export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async (date, { rejectWithValue }) => {
    try {
      return await firebaseService.appointmentsService.getByDate(date);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createAppointment = createAsyncThunk(
  'appointments/createAppointment',
  async (appointmentData, { rejectWithValue }) => {
    try {
      return await firebaseService.appointmentsService.create(appointmentData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Inventory thunks
export const fetchProducts = createAsyncThunk(
  'inventory/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await firebaseService.inventoryService.getAll();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  'inventory/createProduct',
  async ({ productData, imageFile }, { rejectWithValue }) => {
    try {
      return await firebaseService.inventoryService.create(productData, imageFile);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Financial thunks
export const fetchTransactions = createAsyncThunk(
  'financial/fetchTransactions',
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      return await firebaseService.financialService.getTransactions(startDate, endDate);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTransaction = createAsyncThunk(
  'financial/addTransaction',
  async (transactionData, { rejectWithValue }) => {
    try {
      return await firebaseService.financialService.addTransaction(transactionData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Notes thunks
export const fetchNotes = createAsyncThunk(
  'notes/fetchNotes',
  async (_, { rejectWithValue }) => {
    try {
      return await firebaseService.notesService.getAll();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createNote = createAsyncThunk(
  'notes/createNote',
  async (noteData, { rejectWithValue }) => {
    try {
      return await firebaseService.notesService.create(noteData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Coupons thunks
export const fetchCoupons = createAsyncThunk(
  'coupons/fetchCoupons',
  async (_, { rejectWithValue }) => {
    try {
      return await firebaseService.couponsService.getAll();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createCoupon = createAsyncThunk(
  'coupons/createCoupon',
  async (couponData, { rejectWithValue }) => {
    try {
      return await firebaseService.couponsService.create(couponData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const validateCoupon = createAsyncThunk(
  'coupons/validateCoupon',
  async (code, { rejectWithValue }) => {
    try {
      return await firebaseService.couponsService.validateCoupon(code);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Settings thunks
export const fetchUserSettings = createAsyncThunk(
  'settings/fetchUserSettings',
  async (userId, { rejectWithValue }) => {
    try {
      return await firebaseService.settingsService.getUserSettings(userId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserSettings = createAsyncThunk(
  'settings/updateUserSettings',
  async ({ userId, settingsData }, { rejectWithValue }) => {
    try {
      return await firebaseService.settingsService.updateSettings(userId, settingsData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

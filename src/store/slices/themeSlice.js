import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
  primaryColor: '#1a73e8',
  secondaryColor: '#f50057',
  fontSize: 'medium'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setPrimaryColor: (state, action) => {
      state.primaryColor = action.payload;
    },
    setSecondaryColor: (state, action) => {
      state.secondaryColor = action.payload;
    },
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
    resetTheme: (state) => {
      return initialState;
    }
  }
});

export const {
  toggleDarkMode,
  setPrimaryColor,
  setSecondaryColor,
  setFontSize,
  resetTheme
} = themeSlice.actions;

export default themeSlice.reducer;

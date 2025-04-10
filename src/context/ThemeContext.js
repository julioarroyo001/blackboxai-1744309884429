import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSettings } from '../services/settingsService';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#3B82F6'); // Default blue
  const [accentColor, setAccentColor] = useState('#10B981'); // Default green

  // Load theme preferences from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      const { darkMode: savedDarkMode, primaryColor: savedPrimary, accentColor: savedAccent } = JSON.parse(savedTheme);
      setDarkMode(savedDarkMode);
      setPrimaryColor(savedPrimary);
      setAccentColor(savedAccent);
    }
  }, []);

  // Log settings to console
  useEffect(() => {
    const settings = getSettings();
    console.log('Current settings:', settings);
  }, []);
  
  // Save theme preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify({
      darkMode,
      primaryColor,
      accentColor
    }));

    // Apply theme to document
    document.documentElement.classList.toggle('dark', darkMode);
    
    // Apply custom colors to CSS variables
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--accent-color', accentColor);
  }, [darkMode, primaryColor, accentColor]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const updateColors = (primary, accent) => {
    if (primary) setPrimaryColor(primary);
    if (accent) setAccentColor(accent);
  };

  const value = {
    darkMode,
    primaryColor,
    accentColor,
    toggleDarkMode,
    updateColors
  };

  return (
    <ThemeContext.Provider value={value}>
      <div className={`${darkMode ? 'dark' : ''}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

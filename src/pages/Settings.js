import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Settings() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className={`p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>
      <h1 className="text-2xl font-bold mb-6">Configuración</h1>
      
      <div className={`max-w-2xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg p-6`}>
        <div className="flex items-center justify-between mb-4">
          <span className="font-medium">Modo Oscuro</span>
          <button 
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg ${
              darkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}
          >
            {darkMode ? (
              <i className="fas fa-sun text-yellow-400"></i>
            ) : (
              <i className="fas fa-moon"></i>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function LoadingSpinner({ size = 'default' }) {
  const { darkMode } = useTheme();

  const sizeClasses = {
    small: 'h-6 w-6',
    default: 'h-12 w-12',
    large: 'h-16 w-16'
  };

  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div 
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 ${
          darkMode ? 'border-gray-600 border-t-blue-400' : 'border-gray-200 border-t-blue-500'
        }`}
      >
        <span className="sr-only">Cargando...</span>
      </div>
      <div className={`ml-4 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
        Cargando...
      </div>
    </div>
  );
}

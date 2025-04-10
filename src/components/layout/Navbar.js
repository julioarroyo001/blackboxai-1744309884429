import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${
      darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
    } shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold">
                BusinessApp
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? (
                <i className="fas fa-sun text-yellow-400"></i>
              ) : (
                <i className="fas fa-moon"></i>
              )}
            </button>

            {/* Notifications */}
            <button className="p-2 mx-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 relative">
              <i className="fas fa-bell"></i>
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
            </button>

            {/* User Menu */}
            <div className="ml-3 relative">
              <div className="flex items-center">
                <button className="flex text-sm rounded-full focus:outline-none">
                  <span className="sr-only">Abrir menú de usuario</span>
                  <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <i className="fas fa-user text-gray-600"></i>
                  </div>
                </button>
                <span className="ml-2">{currentUser?.email}</span>
                <button
                  onClick={handleLogout}
                  className="ml-4 px-3 py-1 rounded-md text-sm bg-red-500 text-white hover:bg-red-600"
                >
                  Salir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

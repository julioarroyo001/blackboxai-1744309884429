import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const menuItems = [
  { path: '/', icon: 'fa-home', label: 'Dashboard' },
  { path: '/calendar', icon: 'fa-calendar', label: 'Agenda' },
  { path: '/clients', icon: 'fa-users', label: 'Clientes' },
  { path: '/inventory', icon: 'fa-box', label: 'Inventario' },
  { path: '/financial', icon: 'fa-chart-line', label: 'Finanzas' },
  { path: '/coupons', icon: 'fa-ticket', label: 'Cupones' },
  { path: '/settings', icon: 'fa-cog', label: 'Configuración' }
];

export default function Sidebar() {
  const { darkMode } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={`${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      } fixed left-0 h-screen shadow-lg transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      } pt-16`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`absolute -right-3 top-20 bg-blue-500 text-white rounded-full p-1 
        hover:bg-blue-600 transition-colors duration-200`}
      >
        <i className={`fas fa-chevron-${isCollapsed ? 'right' : 'left'} text-sm`}></i>
      </button>

      {/* Navigation Menu */}
      <nav className="mt-8">
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `
                  flex items-center p-3 rounded-lg transition-colors duration-200
                  ${isActive 
                    ? 'bg-blue-500 text-white' 
                    : darkMode 
                      ? 'hover:bg-gray-700' 
                      : 'hover:bg-gray-100'
                  }
                `}
              >
                <i className={`fas ${item.icon} ${isCollapsed ? 'text-xl' : ''}`}></i>
                {!isCollapsed && (
                  <span className="ml-3 font-medium">{item.label}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Section */}
      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className={`p-4 rounded-lg ${
            darkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <h3 className="font-semibold mb-2">Ayuda Rápida</h3>
            <p className="text-sm">
              Presiona <kbd className="px-2 py-1 rounded bg-gray-200 text-gray-700">?</kbd> 
              para ver los atajos de teclado
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}

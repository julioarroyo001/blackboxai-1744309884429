import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Financial() {
  const { darkMode } = useTheme();

  return (
    <div className={`p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>
      <h1 className="text-2xl font-bold mb-6">Finanzas</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Summary Card */}
        <div className={`p-4 rounded-lg ${
          darkMode ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <h2 className="text-lg font-semibold mb-2">Resumen del Día</h2>
          <div className="space-y-2">
            <p>Ingresos: $500</p>
            <p>Gastos: $200</p>
            <p className="font-bold">Balance: $300</p>
          </div>
        </div>

        {/* Weekly Stats */}
        <div className={`p-4 rounded-lg ${
          darkMode ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <h2 className="text-lg font-semibold mb-2">Estadísticas Semanales</h2>
          <div className="space-y-2">
            <p>Total Ventas: $2,500</p>
            <p>Promedio Diario: $357</p>
            <p>Transacciones: 45</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`p-4 rounded-lg ${
          darkMode ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <h2 className="text-lg font-semibold mb-2">Acciones Rápidas</h2>
          <div className="space-y-2">
            <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Registrar Venta
            </button>
            <button className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600">
              Registrar Gasto
            </button>
            <button className="w-full p-2 bg-purple-500 text-white rounded hover:bg-purple-600">
              Ver Reportes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

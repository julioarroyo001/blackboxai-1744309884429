import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Clients() {
  const { darkMode } = useTheme();
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock clients data
  const [clients] = useState([
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan@email.com',
      phone: '123-456-7890',
      totalSpent: 500,
      lastVisit: '2023-07-20'
    },
    {
      id: 2,
      name: 'María López',
      email: 'maria@email.com',
      phone: '098-765-4321',
      totalSpent: 750,
      lastVisit: '2023-07-15'
    }
  ]);

  return (
    <div className={`p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
        >
          <i className="fas fa-plus mr-2"></i>
          Nuevo Cliente
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full p-3 pl-10 rounded-lg border ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-300'
            }`}
          />
          <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
        </div>
      </div>

      {/* Clients Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={darkMode ? 'bg-gray-800' : 'bg-gray-50'}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Contacto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Total Gastado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Última Visita
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {clients.map((client) => (
              <tr key={client.id} className={darkMode ? 'bg-gray-800' : 'bg-white'}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <i className="fas fa-user text-gray-600"></i>
                    </div>
                    <div className="ml-4">
                      <div className="font-medium">{client.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>{client.email}</div>
                  <div className="text-sm text-gray-500">{client.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${client.totalSpent}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(client.lastVisit).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-500 hover:text-blue-700 mr-3">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Client Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className={`w-full max-w-md p-6 rounded-lg shadow-xl ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h2 className="text-xl font-bold mb-4">Agregar Nuevo Cliente</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                  type="text"
                  className={`w-full p-2 rounded border ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
                  }`}
                  placeholder="Nombre completo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className={`w-full p-2 rounded border ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
                  }`}
                  placeholder="correo@ejemplo.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Teléfono</label>
                <input
                  type="tel"
                  className={`w-full p-2 rounded border ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
                  }`}
                  placeholder="123-456-7890"
                />
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 rounded text-gray-600 hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Inventory() {
  const { darkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock inventory data
  const [products] = useState([
    {
      id: 1,
      name: 'Shampoo Profesional',
      category: 'Cuidado del Cabello',
      price: 25.99,
      stock: 50,
      sku: 'SHAM001'
    },
    {
      id: 2,
      name: 'Acondicionador',
      category: 'Cuidado del Cabello',
      price: 22.99,
      stock: 45,
      sku: 'COND001'
    }
  ]);

  return (
    <div className={`p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventario</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
        >
          <i className="fas fa-plus mr-2"></i>
          Nuevo Producto
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar productos..."
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

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div 
            key={product.id}
            className={`p-4 rounded-lg border ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">{product.name}</h3>
              <div className="flex space-x-2">
                <button className="text-blue-500 hover:text-blue-700">
                  <i className="fas fa-edit"></i>
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-gray-500">SKU: {product.sku}</p>
              <p>Categoría: {product.category}</p>
              <p className="font-medium">Precio: ${product.price}</p>
              <p className={`${
                product.stock < 10 ? 'text-red-500' : 'text-green-500'
              }`}>
                Stock: {product.stock} unidades
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

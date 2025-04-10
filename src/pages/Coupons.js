import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Coupons() {
  const { darkMode } = useTheme();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount: '',
    validUntil: '',
    applicableProducts: []
  });

  // Mock coupons data
  const [coupons] = useState([
    {
      id: 1,
      code: 'VERANO25',
      discount: 25,
      validUntil: '2023-12-31',
      status: 'active',
      usageCount: 15
    },
    {
      id: 2,
      code: '2X1FACIAL',
      discount: 50,
      validUntil: '2023-09-30',
      status: 'active',
      usageCount: 8
    }
  ]);

  return (
    <div className={`p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Cupones y Descuentos</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
        >
          <i className="fas fa-plus mr-2"></i>
          Nuevo Cupón
        </button>
      </div>

      {/* Active Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map(coupon => (
          <div 
            key={coupon.id}
            className={`p-4 rounded-lg ${
              darkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{coupon.code}</h3>
                <p className="text-sm text-gray-500">{coupon.discount}% de descuento</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                coupon.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {coupon.status === 'active' ? 'Activo' : 'Inactivo'}
              </span>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm">
                <i className="far fa-calendar-alt mr-2"></i>
                Válido hasta: {new Date(coupon.validUntil).toLocaleDateString()}
              </p>
              <p className="text-sm">
                <i className="fas fa-tag mr-2"></i>
                Usado {coupon.usageCount} veces
              </p>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button className="text-blue-500 hover:text-blue-700">
                <i className="fas fa-edit"></i>
              </button>
              <button className="text-red-500 hover:text-red-700">
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Coupon Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className={`w-full max-w-md p-6 rounded-lg shadow-xl ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h2 className="text-xl font-bold mb-4">Crear Nuevo Cupón</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Código del Cupón</label>
                <input
                  type="text"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value})}
                  className={`w-full p-2 rounded border ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
                  }`}
                  placeholder="Ej: VERANO25"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Descuento (%)</label>
                <input
                  type="number"
                  value={newCoupon.discount}
                  onChange={(e) => setNewCoupon({...newCoupon, discount: e.target.value})}
                  className={`w-full p-2 rounded border ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
                  }`}
                  placeholder="25"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Válido Hasta</label>
                <input
                  type="date"
                  value={newCoupon.validUntil}
                  onChange={(e) => setNewCoupon({...newCoupon, validUntil: e.target.value})}
                  className={`w-full p-2 rounded border ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
                  }`}
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
                  Crear Cupón
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Dashboard() {
  const { darkMode } = useTheme();

  return (
    <div className={`p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <h1 className="text-3xl font-bold mb-4">Bienvenido a tu Panel de Control</h1>
      <p className="mb-4">Aquí puedes ver un resumen de tus actividades y gestionar tu negocio de manera eficiente.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example Widget: Upcoming Appointments */}
        <div className="bg-gray-100 rounded-lg p-4 shadow-md">
          <h2 className="font-semibold text-lg">Próximas Citas</h2>
          <ul className="mt-2">
            <li className="border-b py-2">Cita con Juan Pérez - 10:00 AM</li>
            <li className="border-b py-2">Cita con María López - 2:00 PM</li>
            <li className="border-b py-2">Cita con Carlos García - 4:00 PM</li>
          </ul>
        </div>

        {/* Example Widget: Daily Income */}
        <div className="bg-gray-100 rounded-lg p-4 shadow-md">
          <h2 className="font-semibold text-lg">Ingresos del Día</h2>
          <p className="text-2xl font-bold">$500</p>
        </div>

        {/* Example Widget: Important Notes */}
        <div className="bg-gray-100 rounded-lg p-4 shadow-md">
          <h2 className="font-semibold text-lg">Notas Importantes</h2>
          <ul className="mt-2">
            <li className="border-b py-2">Reunión con el equipo a las 3 PM</li>
            <li className="border-b py-2">Enviar informes a la gerencia</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

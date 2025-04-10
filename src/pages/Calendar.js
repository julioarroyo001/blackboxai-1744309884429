import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const HOURS = Array.from({ length: 15 }, (_, i) => i + 8); // 8:00 AM to 22:00 PM

const MOCK_EVENTS = [
  {
    id: 1,
    title: 'Corte de cabello',
    client: 'Juan Pérez',
    date: new Date(new Date().setDate(new Date().getDate())), // Today
    start: '10:00',
    duration: 60,
    importance: 2,
  },
  {
    id: 2,
    title: 'Manicure',
    client: 'María López',
    date: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
    start: '14:00',
    duration: 45,
    importance: 1,
  },
];









export default function Calendar() {
  const { darkMode } = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleTimeClick = (hour) => {
    setSelectedTime(hour);
    setShowEventForm(true);
  };

  const renderCalendarGrid = () => {
    const today = new Date();
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    
    const days = [];
    const firstDayWeekday = firstDayOfMonth.getDay();
    
    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 border border-gray-200"></div>);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const isToday = day === today.getDate() && 
                     selectedDate.getMonth() === today.getMonth() && 
                     selectedDate.getFullYear() === today.getFullYear();
      
      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
          className={`p-2 border border-gray-200 cursor-pointer hover:bg-blue-50 
            ${isToday ? 'bg-blue-100' : ''} 
            ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-50'}`}
        >
          <span className={`${isToday ? 'font-bold text-blue-600' : ''}`}>{day}</span>
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className={`flex h-full ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>
      {/* Main Calendar View */}
      <div className="flex-1 p-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Calendario</h1>
          <div className="flex items-center space-x-4 mt-2">
            <button className="px-3 py-1 rounded bg-blue-500 text-white">
              <i className="fas fa-chevron-left"></i>
            </button>
            <span className="text-lg font-medium">
              {selectedDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
            </span>
            <button className="px-3 py-1 rounded bg-blue-500 text-white">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-0">
          {/* Weekday headers */}
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
            <div key={day} className="p-2 text-center font-medium border border-gray-200">
              {day}
            </div>
          ))}
          {/* Calendar days */}
          {renderCalendarGrid()}
        </div>
      </div>

      {/* Right Panel - Time Slots */}
      <div className={`w-64 border-l ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-4`}>
        <h2 className="text-lg font-semibold mb-4">
          {selectedDate.toLocaleDateString('es-ES', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long',
            year: 'numeric'
          })}
        </h2>
        
        <div className="space-y-2">
          {HOURS.map(hour => {
            const timeString = `${hour}:00`;
            const event = MOCK_EVENTS.find(e => 
              e.start === timeString && 
              e.date.toDateString() === selectedDate.toDateString()
            );
            
            return (
              <div
                key={hour}
                onClick={() => handleTimeClick(hour)}
                className={`p-2 rounded cursor-pointer ${
                  event 
                    ? 'bg-blue-100 text-blue-800' 
                    : darkMode 
                      ? 'hover:bg-gray-700' 
                      : 'hover:bg-gray-100'
                }`}
              >
                <div className="font-medium">{timeString}</div>
                {event && (
                  <div className="mt-1 text-sm">
                    <div className="font-medium">{event.title}</div>
                    <div>{event.client}</div>
                    <div className="text-xs">
                      {'⭐'.repeat(event.importance)}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Form Modal */}
      {showEventForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className={`w-full max-w-md p-6 rounded-lg shadow-xl ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h2 className="text-xl font-bold mb-4">Agregar Evento</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Cliente</label>
                <input
                  type="text"
                  className={`w-full p-2 rounded border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'border-gray-300'
                  }`}
                  placeholder="Nombre del cliente"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Servicio</label>
                <select
                  className={`w-full p-2 rounded border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'border-gray-300'
                  }`}
                >
                  <option>Seleccionar servicio</option>
                  <option>Corte de cabello</option>
                  <option>Manicure</option>
                  <option>Pedicure</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Duración (minutos)</label>
                <input
                  type="number"
                  className={`w-full p-2 rounded border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'border-gray-300'
                  }`}
                  placeholder="60"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Importancia</label>
                <div className="flex space-x-2">
                  {[1, 2, 3].map(level => (
                    <button
                      key={level}
                      type="button"
                      className={`p-2 rounded ${
                        darkMode 
                          ? 'hover:bg-gray-600' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {'⭐'.repeat(level)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowEventForm(false)}
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

import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function CalendarGrid({ selectedDate, onDateSelect }) {
  const { darkMode } = useTheme();

  const renderDays = () => {
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
          onClick={() => onDateSelect(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
          className={`p-2 border border-gray-200 cursor-pointer 
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
    <div className="grid grid-cols-7 gap-0">
      {/* Weekday headers */}
      {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
        <div key={day} className="p-2 text-center font-medium border border-gray-200">
          {day}
        </div>
      ))}
      {/* Calendar days */}
      {renderDays()}
    </div>
  );
}

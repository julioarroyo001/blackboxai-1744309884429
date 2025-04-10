import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Notes() {
  const { darkMode } = useTheme();
  const [showAddNote, setShowAddNote] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    priority: 1,
    linkedClient: '',
    linkedAppointment: ''
  });

  // Mock notes data
  const [notes] = useState([
    {
      id: 1,
      title: 'Pedido de productos',
      content: 'Realizar pedido de shampoo y acondicionador',
      priority: 3,
      createdAt: '2023-07-25T10:00:00',
      linkedClient: 'Juan Pérez'
    },
    {
      id: 2,
      title: 'Recordatorio',
      content: 'Llamar a proveedores para cotización',
      priority: 2,
      createdAt: '2023-07-24T15:30:00'
    }
  ]);

  const getPriorityStars = (priority) => '⭐'.repeat(priority);

  const filteredNotes = selectedPriority === 'all' 
    ? notes 
    : notes.filter(note => note.priority === parseInt(selectedPriority));

  return (
    <div className={`p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Notas Rápidas</h1>
        <button
          onClick={() => setShowAddNote(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
        >
          <i className="fas fa-plus mr-2"></i>
          Nueva Nota
        </button>
      </div>

      {/* Priority Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Filtrar por Prioridad:</label>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedPriority('all')}
            className={`px-4 py-2 rounded ${
              selectedPriority === 'all'
                ? 'bg-blue-500 text-white'
                : darkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}
          >
            Todas
          </button>
          {[1, 2, 3].map(priority => (
            <button
              key={priority}
              onClick={() => setSelectedPriority(priority.toString())}
              className={`px-4 py-2 rounded ${
                selectedPriority === priority.toString()
                  ? 'bg-blue-500 text-white'
                  : darkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}
            >
              {getPriorityStars(priority)}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.map(note => (
          <div
            key={note.id}
            className={`p-4 rounded-lg ${
              darkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold">{note.title}</h3>
              <span>{getPriorityStars(note.priority)}</span>
            </div>
            <p className="text-sm mb-4">{note.content}</p>
            <div className="text-sm text-gray-500">
              {note.linkedClient && (
                <p className="mb-1">
                  <i className="fas fa-user mr-2"></i>
                  {note.linkedClient}
                </p>
              )}
              <p>
                <i className="far fa-clock mr-2"></i>
                {new Date(note.createdAt).toLocaleString()}
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

      {/* Add Note Modal */}
      {showAddNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className={`w-full max-w-md p-6 rounded-lg shadow-xl ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h2 className="text-xl font-bold mb-4">Nueva Nota</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Título</label>
                <input
                  type="text"
                  value={newNote.title}
                  onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                  className={`w-full p-2 rounded border ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
                  }`}
                  placeholder="Título de la nota"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contenido</label>
                <textarea
                  value={newNote.content}
                  onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                  className={`w-full p-2 rounded border ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
                  }`}
                  rows="4"
                  placeholder="Contenido de la nota"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Prioridad</label>
                <div className="flex space-x-2">
                  {[1, 2, 3].map(priority => (
                    <button
                      key={priority}
                      type="button"
                      onClick={() => setNewNote({...newNote, priority})}
                      className={`p-2 rounded ${
                        newNote.priority === priority
                          ? 'bg-blue-500 text-white'
                          : darkMode ? 'bg-gray-700' : 'bg-gray-200'
                      }`}
                    >
                      {getPriorityStars(priority)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Vincular a Cliente (opcional)</label>
                <input
                  type="text"
                  value={newNote.linkedClient}
                  onChange={(e) => setNewNote({...newNote, linkedClient: e.target.value})}
                  className={`w-full p-2 rounded border ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
                  }`}
                  placeholder="Nombre del cliente"
                />
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddNote(false)}
                  className="px-4 py-2 rounded text-gray-600 hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  Guardar Nota
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

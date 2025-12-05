import { useState } from 'react';
import { X } from 'lucide-react';

export default function AddProgramModal({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      id: Date.now(),
      name,
      description,
      duration: parseInt(duration),
      status: 'Ongoing',
      startDate: new Date().toISOString().split('T')[0]
    });
    setName(''); setDescription(''); setDuration('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 w-96 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Add New Program</h2>
          <button onClick={onClose}><X className="h-6 w-6" /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <input required placeholder="Program Name (e.g. Malaria Campaign)" value={name} onChange={e => setName(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4" />
          <textarea required placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4 h-24" />
          <input required type="number" placeholder="Duration (days)" value={duration} onChange={e => setDuration(e.target.value)}
            className="w-full p-3 border rounded-lg mb-6" />
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
            Add Program
          </button>
        </form>
      </div>
    </div>
  );
}
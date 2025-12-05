import React, { useState } from 'react';

function ProgramForm({ onAdd }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && description && duration) {
      onAdd({ name, description, duration: parseInt(duration) });
      setName('');
      setDescription('');
      setDuration('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96 mb-8">
      <input
        type="text"
        placeholder="Program Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <input
        type="number"
        placeholder="Duration (days)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">Add Program</button>
    </form>
  );
}

export default ProgramForm;
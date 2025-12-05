import React from 'react';

function ProgramItem({ program, onToggleComplete, onDelete }) {
  return (
    <div className={`bg-white p-4 rounded shadow-md mb-4 ${program.completed ? 'bg-green-100' : ''}`}>
      <h2 className="text-xl font-semibold">{program.name}</h2>
      <p>{program.description}</p>
      <p>Duration: {program.duration} days</p>
      <button
        onClick={() => onToggleComplete(program.id)}
        className="bg-green-500 text-white p-1 mr-2 rounded"
      >
        {program.completed ? 'Unmark' : 'Mark Complete'}
      </button>
      <button
        onClick={() => onDelete(program.id)}
        className="bg-red-500 text-white p-1 rounded"
      >
        Delete
      </button>
    </div>
  );
}

export default ProgramItem;
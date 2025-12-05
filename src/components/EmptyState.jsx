import React from 'react';

function EmptyState({ onAdd }) {
  return (
    <div className="text-center py-20">
      <div className="text-6xl mb-6">No programs yet</div>
      <p className="text-xl text-gray-600 mb-8">
        Start tracking your first health program today!
      </p>
      <button
        onClick={onAdd}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-xl text-lg shadow-lg transform hover:scale-105 transition"
      >
        + Add Your First Program
      </button>
    </div>
  );
}

export default EmptyState;
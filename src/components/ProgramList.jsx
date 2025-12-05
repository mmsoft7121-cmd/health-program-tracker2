import React from 'react';
import ProgramItem from './ProgramItem.jsx';

function ProgramList({ programs, onToggleComplete, onDelete }) {
  return (
    <div className="w-96">
      {programs.length === 0 ? (
        <p className="text-gray-500">No programs added yet.</p>
      ) : (
        programs.map(program => (
          <ProgramItem
            key={program.id}
            program={program}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}

export default ProgramList;
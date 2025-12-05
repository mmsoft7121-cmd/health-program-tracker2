import React from 'react';

function DashboardStats({ programs }) {
  const total = programs.length;
  const ongoing = programs.filter(p => p.status === 'Ongoing').length;
  const completed = programs.filter(p => p.status === 'Completed').length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
      <div className="bg-blue-600 text-white p-6 rounded-xl text-center">
        <p className="text-4xl font-bold">{total}</p>
        <p className="text-blue-100">Total Programs</p>
      </div>
      <div className="bg-amber-500 text-white p-6 rounded-xl text-center">
        <p className="text-4xl font-bold">{ongoing}</p>
        <p className="text-amber-100">Ongoing</p>
      </div>
      <div className="bg-green-600 text-white p-6 rounded-xl text-center">
        <p className="text-4xl font-bold">{completed}</p>
        <p className="text-green-100">Completed</p>
      </div>
      <div className="bg-purple-600 text-white p-6 rounded-xl text-center relative overflow-hidden">
        <p className="text-4xl font-bold">{percentage}%</p>
        <p className="text-purple-100">Completion Rate</p>
      </div>
    </div>
  );
}

export default DashboardStats;
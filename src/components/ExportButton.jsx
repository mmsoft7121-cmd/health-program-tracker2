import React from 'react';

function ExportButton({ programs }) {
  const exportToCSV = () => {
    const headers = ['Name', 'Location', 'Start Date', 'End Date', 'Status', 'Notes'];
    const rows = programs.map(p => [
      p.name,
      p.location,
      p.startDate,
      p.endDate,
      p.status,
      `"${p.notes.replace(/"/g, '""')}"`
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'health-programs-export.csv';
    a.click();
  };

  return (
    <button
      onClick={exportToCSV}
      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition flex items-center gap-2"
    >
      Export to Excel/CSV
    </button>
  );
}

export default ExportButton;
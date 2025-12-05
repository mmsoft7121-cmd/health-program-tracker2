export default function ProgramCard({ program, onToggleStatus, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-yellow-400">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold">{program.name}</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{program.description}</p>
          <p className="text-sm text-gray-500 mt-2">Duration: {program.duration} days • Started: {program.startDate}</p>
        </div>
        <span className={`px-4 py-2 rounded-full text-sm font-medium ${
          program.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {program.status}
        </span>
      </div>
      <div className="mt-4 flex gap-3">
        <button onClick={() => onToggleStatus(program.id)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Mark as {program.status === 'Completed' ? 'Ongoing' : 'Completed'}
        </button>
        <button onClick={() => onDelete(program.id)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
          Delete
        </button>
      </div>
    </div>
  );
}
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export default function ProgramChart({ programs }) {
  const completed = programs.filter(p => p.status === 'Completed').length;
  const ongoing = programs.length - completed;

  const data = [
    { name: 'Ongoing', value: ongoing, color: '#f97316' },
    { name: 'Completed', value: completed, color: '#10b981' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4">Program Status Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
export default function StatsCards({ programs }) {
  const total = programs.length;
  const completed = programs.filter(p => p.status === 'Completed').length;
  const ongoing = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    { label: "Total Programs", value: total, color: "bg-blue-500" },
    { label: "Ongoing", value: ongoing, color: "bg-orange-500" },
    { label: "Completed", value: completed, color: "bg-green-500" },
    { label: "Completion Rate", value: `${completionRate}%`, color: "bg-purple-500" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <div key={i} className={`${stat.color} text-white p-6 rounded-2xl shadow-lg`}>
          <h3 className="text-4xl font-bold">{stat.value}</h3>
          <p className="text-sm opacity-90">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
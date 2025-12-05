// src/App.jsx
import { useState, useEffect } from 'react';
import { Search, Sun, Moon, Download, Plus, Trash2, Check, X } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Papa from 'papaparse';

const STORAGE_KEY = 'eha_health_programs_v2';

export default function App() {
  const [programs, setPrograms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize data on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        const savedTheme = localStorage.getItem('eha_theme') === 'dark';
        
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setPrograms(Array.isArray(parsedData) ? parsedData : []);
        }
        setDarkMode(savedTheme);
      } catch (error) {
        console.error('Error loading data:', error);
        setPrograms([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(programs));
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }
  }, [programs, loading]);

  // Update theme
  useEffect(() => {
    localStorage.setItem('eha_theme', darkMode ? 'dark' : 'light');
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const filteredPrograms = programs.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: programs.length,
    completed: programs.filter(p => p.status === 'Completed').length,
    ongoing: programs.filter(p => p.status === 'Ongoing').length,
    rate: programs.length > 0 ? Math.round((programs.filter(p => p.status === 'Completed').length / programs.length) * 100) : 0,
  };

  const chartData = [
    { name: 'Ongoing', value: stats.ongoing, color: '#f97316' },
    { name: 'Completed', value: stats.completed, color: '#10b981' },
  ];

  const addProgram = (newProgram) => {
    setPrograms([...programs, newProgram]);
  };

  const toggleStatus = (id) => {
    setPrograms(programs.map(p =>
      p.id === id ? { ...p, status: p.status === 'Completed' ? 'Ongoing' : 'Completed' } : p
    ));
  };

  const deleteProgram = (id) => {
    setPrograms(programs.filter(p => p.id !== id));
  };

  const exportToCSV = () => {
    if (programs.length === 0) {
      alert('No programs to export');
      return;
    }
    const csv = Papa.unparse(programs);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(blob));
    link.setAttribute('download', 'health-programs.csv');
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading your programs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-50'}`}>
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold">Health Program Tracker</h1>
              <p className="text-blue-100 text-sm mt-1">eHA Academy • Capstone Project 2025</p>
              <p className="text-blue-100 text-sm mt-1">Develop by Muhammad Abdullahi Muhammad</p>

            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none md:w-64">
                <Search className="absolute left-3 top-3 h-5 w-5 text-blue-300" />
                <input
                  type="text"
                  placeholder="Search programs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-blue-500 bg-opacity-20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white transition"
                />
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-3 bg-blue-500 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <div className="flex gap-4">
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition transform hover:scale-105"
            >
              <Download className="h-5 w-5" /> Export CSV
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition transform hover:scale-105"
            >
              <Plus className="h-5 w-5" /> New Program
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard label="Total Programs" value={stats.total} color="blue" />
          <StatCard label="Ongoing" value={stats.ongoing} color="orange" />
          <StatCard label="Completed" value={stats.completed} color="green" />
          <StatCard label="Completion Rate" value={`${stats.rate}%`} color="purple" />
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Programs List */}
          <div className="lg:col-span-2">
            {filteredPrograms.length > 0 ? (
              <div className="space-y-4">
                {filteredPrograms.map((program) => (
                  <ProgramCard
                    key={program.id}
                    program={program}
                    onToggleStatus={toggleStatus}
                    onDelete={deleteProgram}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center shadow-md">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  {programs.length === 0 ? 'No programs yet. Create one to get started!' : 'No programs match your search.'}
                </p>
              </div>
            )}
          </div>

          {/* Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md h-fit">
            <h3 className="text-lg font-bold mb-4">Status Distribution</h3>
            {programs.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={4} dataKey="value">
                    {chartData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                <p>No data to display</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal */}
      <AddProgramModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onAdd={addProgram} />
    </div>
  );
}

function StatCard({ label, value, color }) {
  const colorMap = {
    blue: 'from-blue-500 to-blue-600',
    orange: 'from-orange-500 to-orange-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
  };

  return (
    <div className={`bg-gradient-to-br ${colorMap[color]} text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105`}>
      <p className="text-sm opacity-90 mb-2">{label}</p>
      <h3 className="text-3xl font-bold">{value}</h3>
    </div>
  );
}

function ProgramCard({ program, onToggleStatus, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition border-l-4 border-blue-500">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold">{program.name}</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{program.description}</p>
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
            <span>📅 {program.startDate}</span>
            <span>⏱️ {program.duration} days</span>
          </div>
        </div>
        <span className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
          program.status === 'Completed'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
            : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100'
        }`}>
          {program.status}
        </span>
      </div>
      <div className="flex gap-3 mt-5">
        <button
          onClick={() => onToggleStatus(program.id)}
          className="flex items-center gap-2 flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
        >
          <Check className="h-4 w-4" />
          Mark {program.status === 'Completed' ? 'Ongoing' : 'Completed'}
        </button>
        <button
          onClick={() => onDelete(program.id)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function AddProgramModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({ name: '', description: '', duration: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Program name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.duration || formData.duration <= 0) newErrors.duration = 'Duration must be greater than 0';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAdd({
      id: Date.now(),
      name: formData.name,
      description: formData.description,
      duration: parseInt(formData.duration),
      status: 'Ongoing',
      startDate: new Date().toISOString().split('T')[0],
    });

    setFormData({ name: '', description: '', duration: '' });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Add New Program</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Program Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Malaria Campaign"
              className={`w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Program details and goals..."
              rows="3"
              className={`w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Duration (days)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="30"
              min="1"
              className={`w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.duration ? 'border-red-500' : ''}`}
            />
            {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Add Program
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-3 rounded-lg font-semibold transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

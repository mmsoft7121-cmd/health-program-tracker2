import { Search, Sun, Moon } from 'lucide-react';

export default function Header({ searchTerm, setSearchTerm, darkMode, setDarkMode }) {
  return (
    <header className="bg-blue-400 text-white p-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold">Health Program Tracker</h1>
          <p className="text-blue-10">eHealth Africa Academy  Capstone Project 2025</p>

          <p className="text-blue-20 text-sm mt-3 font-medium opacity-90">
            Developed by Muhammad Abdullahi Muhammad @ EHA Academy 2025 </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-blue-30" />
            <input
              type="text"
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 rounded-full bg-blue-300 text-white placeholder-blue-5 focus:outline-none focus:ring-4 focus:ring-blue-500 w-64"
            />
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 bg-blue-700 rounded-full hover:bg-blue-800 transition"
          >
            {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </header>
  );
}
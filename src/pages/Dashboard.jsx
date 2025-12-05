/*import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <p>Welcome to your dashboard.</p>
    </div>
  );
} */


import ThemeToggle from "../components/ThemeToggle";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-all">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Dashboard
        </h1>
        <ThemeToggle />
      </nav>

      {/* Content */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow dark:border dark:border-gray-700">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">Stats</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Here is your daily summary.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow dark:border dark:border-gray-700">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">Activity</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Your recent activity logs will appear here.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow dark:border dark:border-gray-700">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">Notifications</h2>
          <p className="text-gray-600 dark:text-gray-300">
            No new notifications.
          </p>
        </div>
      </div>
    </div>
  );
}


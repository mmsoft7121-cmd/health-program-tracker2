import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // mock credentials
    const mockEmail = "admin@example.com";
    const mockPassword = "123456";

    if (email === mockEmail && password === mockPassword) {
      localStorage.setItem("loggedIn", "true");
      navigate("/");
    } else {
      setError("Invalid login details");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Login
        </h1>

        {error && (
          <div className="text-red-500 text-center mb-3">{error}</div>
        )}

        <form onSubmit={handleLogin}>
          <input
            className="w-full p-3 mb-3 border rounded"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full p-3 mb-4 border rounded"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

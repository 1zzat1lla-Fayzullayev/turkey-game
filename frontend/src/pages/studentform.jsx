/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password) {
      setError("Iltimos, barcha maydonlarni to'ldiring.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role: "student" }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Ro'yxatdan o'tish muvaffaqiyatli:", data);
        localStorage.setItem("username", username);
        localStorage.setItem("role", "student");
        setUsername(username);
        navigate("/");
        window.location.reload()
      } else {
        console.error("Ro'yxatdan o'tish muvaffaqiyatsiz:", data.error);
        setError(data.error || "Ro'yxatdan o'tish muvaffaqiyatsiz. Iltimos, qayta urinib ko'ring.");
      }
    } catch (error) {
      console.error("Xato:", error);
      setError("Kutilmagan xato yuz berdi. Iltimos, qayta urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      console.log(`Logging in as ${role} with username: ${username}`);
      const response = await fetch(`http://localhost:5000/login-${role}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        localStorage.setItem("username", username);
        localStorage.setItem("role", role);
        setUsername(username);
        navigate("/");
        window.location.reload()
      } else {
        console.error("Login failed:", data.error);
        setError(data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="O'quvchi Foydalanuvchi nomi"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-3 border rounded-md dark:bg-[#1b1e2b] dark:border-gray-700 dark:text-white"
        aria-label="Username"
      />
      <input
        type="password"
        placeholder="Parol"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 border rounded-md dark:bg-[#1b1e2b] dark:border-gray-700 dark:text-white"
        aria-label="Password"
      />
      <div className="flex items-center gap-2">
        <button
          onClick={handleRegister}
          className="bg-green-500 w-full text-white px-6 py-2 rounded-md"
        >
          Register
        </button>
        <button
          onClick={handleLogin}
          className="bg-blue-500 w-full text-white px-6 py-2 rounded-md"
        >
          Login
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
    </div>
  );
}

export default StudentForm;

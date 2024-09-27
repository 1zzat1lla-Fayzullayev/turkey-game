import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
        navigate("/student-dashboard");
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
      <button
        onClick={handleRegister}
        className={`bg-[#2ecc71] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#27ae60] transition duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        disabled={loading}
        aria-label="Register as student"
      >
        {loading ? "Ro'yxatdan o'tish..." : "Ro'yxatdan o'tish"}
      </button>
      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
    </div>
  );
}

export default StudentForm;

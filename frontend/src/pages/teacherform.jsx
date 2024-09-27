import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TeacherForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("teacher");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Registration successful:", data);
        localStorage.setItem("username", username);
        localStorage.setItem("role", role);
        navigate("/" + role + "-dashboard"); 
      } else {
        console.error("Registration failed:", data.error);
        setError(data.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred. Please try again.");
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
      console.log(`Logging in as ${role} with username: ${username}`); // Log the login attempt
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
        navigate("/"); 
      } else {
        console.error("Login failed:", data.error);
        setError(data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred. Please try again."); // Update this for more clarity
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-3 border rounded-md"
        aria-label="Username"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 border rounded-md"
        aria-label="Password"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-6 py-2 rounded-md"
      >
        Login
      </button>
      <button
        onClick={handleRegister}
        className="bg-green-500 text-white px-6 py-2 rounded-md"
      >
        Register
      </button>
      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
    </div>
  );
}

export default TeacherForm;

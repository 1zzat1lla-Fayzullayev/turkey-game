import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Register from "./pages/register";
import Home from "./pages/home";
import { useEffect, useState } from "react";

function App() {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");  

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username"); 
    setUsername(""); 
  };
  
  return (
    <>
      <BrowserRouter>
        <Navbar username={username} onLogout={handleLogout}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={<Register setUsername={setUsername} onLogout={handleLogout}  />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

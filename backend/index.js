const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

app.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const { data: existingUser, error: fetchError } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    return res.status(500).json({ error: fetchError.message });
  }

  if (existingUser) {
    return res.status(400).json({ error: "Foydalanuvchi nomi allaqachon mavjud" });
  }

  const { error: insertError } = await supabase
    .from("users")
    .insert([{ username, password, role }]);

  if (insertError) {
    return res.status(500).json({ error: insertError.message });
  }

  res.status(201).json({ message: "User registered successfully" });
});


app.post("/login-teacher", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const { data: existingUser, error: fetchError } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .eq("role", "teacher") 
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    return res.status(500).json({ error: fetchError.message });
  }

  if (existingUser) {
    if (existingUser.password === password) {
      return res.status(200).json({ message: "Teacher login successful", user: existingUser });
    } else {
      return res.status(401).json({ error: "Invalid password" });
    }
  }

  return res.status(404).json({ error: "Teacher not found. Please register." });
});

// Student login endpoint
app.post("/login-student", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const { data: existingUser, error: fetchError } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .eq("role", "student")
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    return res.status(500).json({ error: fetchError.message });
  }

  if (existingUser) {
    if (existingUser.password === password) {
      return res.status(200).json({ message: "Student login successful", user: existingUser });
    } else {
      return res.status(401).json({ error: "Invalid password" });
    }
  }

  return res.status(404).json({ error: "Student not found. Please register." });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/form.css";

export default function Login() {
  const API = "http://localhost:5000/api";
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [status, setStatus] = useState("");

  async function loginUser() {
    setStatus("");

    try {
      const res = await fetch(API + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("bd_token", data.token);
        setStatus("Login successful! Redirecting...");
        setTimeout(() => navigate("/admin"), 1200);
      } else {
        const e = await res.json();
        setStatus(e.error || "Invalid credentials");
      }
    } catch (err) {
      setStatus("Network error");
    }
  }

  return (
    <div className="container">
      <div className="form-container">

        <h2 className="form-title">Admin Login</h2>

        <input
          className="form-input"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          className="form-input"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="form-btn" onClick={loginUser}>
          Login
        </button>

        {status && <div className="form-status">{status}</div>}
      </div>
    </div>
  );
}

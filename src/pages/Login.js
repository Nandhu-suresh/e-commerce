import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!email || !password) {
      setError("All fields are required!");
      return;
    }

   
    if (email === "admin@example.com" && password === "admin123") {
      localStorage.setItem("user", JSON.stringify({ role: "admin", email }));
      navigate("/admin");
    } else if (email === "user@example.com" && password === "user123") {
      localStorage.setItem("user", JSON.stringify({ role: "user", email }));
      navigate("/home");
    } else {
      setError("Invalid credentials!");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
      <div className="mt-3 text-muted small">
        <p>****Demo Credentials:****</p>
        <p>User → user@example.com / user123</p>
        <p>Admin → admin@example.com / admin123</p>
      </div>
    </div>
  );
}

export default Login;

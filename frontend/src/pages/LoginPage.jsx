import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API, getErrorMessage } from "../services/api";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError(await getErrorMessage(response));
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem(
  "user",
  JSON.stringify({
    id: data.id,
    name: data.name,
    email: data.email,
    role: data.role,
  })
);
      localStorage.setItem("userId", data.id);
      localStorage.setItem("userName", data.name);
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("role", data.role);

      navigate(data.role === "DOCTOR" ? "/doctor/dashboard" : "/patient/dashboard");
    } catch {
      setError("Unable to reach the server. Please try again shortly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <Link className="brand auth-brand" to="/"><span className="brand-mark">+</span>HealthCare<strong>+</strong></Link>
      <section className="auth-card">
        <p className="eyebrow">WELCOME BACK</p>
        <h1>Sign in to your account</h1>
        <p className="auth-intro">Manage your healthcare journey from one secure place.</p>
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="email">Email address</label>
          <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" required />
          {error && <p className="form-message error-message" role="alert">{error}</p>}
          <button className="button form-button" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
        <p className="auth-switch">New to HealthCare+? <Link to="/register">Create a patient account</Link></p>
      </section>
    </main>
  );
}

export default LoginPage;

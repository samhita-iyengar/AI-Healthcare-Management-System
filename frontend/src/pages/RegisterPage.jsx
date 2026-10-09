import { useState } from "react";
import { Link } from "react-router-dom";
import { API, getErrorMessage } from "../services/api";

function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError("Please complete all required fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
          role: "PATIENT",
        }),
      });

      if (!response.ok) {
        setError(await getErrorMessage(response));
        return;
      }

      setSuccess("Your patient account was created successfully. You can now sign in.");
      setForm({ name: "", email: "", password: "", confirmPassword: "" });
    } catch {
      setError("Unable to reach the server. Please try again shortly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <Link className="brand auth-brand" to="/"><span className="brand-mark">+</span>HealthCare<strong>+</strong></Link>
      <section className="auth-card register-card">
        <p className="eyebrow">PATIENT REGISTRATION</p>
        <h1>Create your account</h1>
        <p className="auth-intro">Start managing appointments with HealthCare+.</p>
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" value={form.name} onChange={updateField} placeholder="Your full name" required />
          <label htmlFor="register-email">Email address</label>
          <input id="register-email" name="email" type="email" value={form.email} onChange={updateField} placeholder="you@example.com" required />
          <label htmlFor="register-password">Password</label>
          <input id="register-password" name="password" type="password" value={form.password} onChange={updateField} placeholder="Create a password" required />
          <label htmlFor="confirm-password">Confirm password</label>
          <input id="confirm-password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={updateField} placeholder="Re-enter your password" required />
          {error && <p className="form-message error-message" role="alert">{error}</p>}
          {success && <p className="form-message success-message" role="status">{success}</p>}
          <button className="button form-button" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Create patient account"}
          </button>
        </form>
        <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
      </section>
    </main>
  );
}

export default RegisterPage;

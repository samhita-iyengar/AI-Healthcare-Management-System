import { useNavigate } from "react-router-dom";

function DashboardPlaceholder({ role }) {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "there";

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("role");
    navigate("/login");
  }

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <span className="brand"><span className="brand-mark">+</span>HealthCare<strong>+</strong></span>
        <button className="button button-secondary button-small" onClick={logout}>Logout</button>
      </header>
      <section className="dashboard-placeholder">
        <p className="eyebrow">{role} PORTAL</p>
        <h1>Welcome, {userName}</h1>
        <p>Your dashboard is ready. More healthcare tools will be added in the next steps.</p>
      </section>
    </main>
  );
}

export default DashboardPlaceholder;

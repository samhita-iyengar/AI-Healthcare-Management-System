import { Link } from "react-router-dom";

function PatientDashboard() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const patientName = user?.name || "Patient";

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">

        <section className="dashboard-welcome">
          <div>
            <span className="eyebrow">PATIENT PORTAL</span>

            <h1>
              Welcome back,{" "}
              <span>{patientName}</span>
            </h1>

            <p>
              Manage your healthcare, find doctors and keep track of your
              appointments from one place.
            </p>
          </div>

          <div className="welcome-icon">
            +
          </div>
        </section>

        <section className="dashboard-stats">

          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div>
              <span>Upcoming</span>
              <strong>0</strong>
              <small>Appointments</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✓</div>
            <div>
              <span>Completed</span>
              <strong>0</strong>
              <small>Appointments</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">👨‍⚕️</div>
            <div>
              <span>Available</span>
              <strong>6</strong>
              <small>Doctors</small>
            </div>
          </div>

        </section>

        <section className="dashboard-section">

          <div className="section-heading">
            <div>
              <span className="eyebrow">QUICK ACTIONS</span>
              <h2>What would you like to do?</h2>
            </div>
          </div>

          <div className="action-grid">

            <Link to="/patient/doctors" className="action-card">
              <div className="action-icon">👨‍⚕️</div>
              <div>
                <h3>Find a Doctor</h3>
                <p>
                  Browse specialists and check their availability.
                </p>
              </div>
              <span className="action-arrow">→</span>
            </Link>

            <Link to="/patient/appointments" className="action-card">
              <div className="action-icon">📅</div>
              <div>
                <h3>My Appointments</h3>
                <p>
                  View and manage your upcoming appointments.
                </p>
              </div>
              <span className="action-arrow">→</span>
            </Link>

            <Link to="/patient/symptoms" className="action-card">
              <div className="action-icon">🤖</div>
              <div>
                <h3>AI Symptom Checker</h3>
                <p>
                  Describe your symptoms and get a department suggestion.
                </p>
              </div>
              <span className="action-arrow">→</span>
            </Link>

            <Link to="/patient/profile" className="action-card">
              <div className="action-icon">👤</div>
              <div>
                <h3>My Profile</h3>
                <p>
                  View and update your personal information.
                </p>
              </div>
              <span className="action-arrow">→</span>
            </Link>

          </div>
        </section>

        <section className="dashboard-info-card">

          <div className="info-card-icon">
            🤖
          </div>

          <div>
            <span className="eyebrow">AI HEALTH ASSISTANT</span>
            <h2>Not sure which specialist to visit?</h2>
            <p>
              Our AI-powered symptom assistant can analyze your symptoms and
              suggest the most relevant medical department.
            </p>
          </div>

          <Link to="/patient/symptoms" className="button">
            Check Symptoms →
          </Link>

        </section>

      </div>
    </div>
  );
}

export default PatientDashboard;
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const features = [
  ["◷", "Easy Appointment Booking", "Choose a doctor and request a time that works for you."],
  ["⌕", "Doctor Discovery", "Find the right specialist with clear profile and availability details."],
  ["✓", "Appointment Management", "Keep upcoming visits and appointment status in one simple place."],
  ["✦", "AI Symptom Assistance", "Get preliminary department guidance before choosing a doctor."],
];

function LandingPage() {
  return (
    <div className="landing-page">
      <Navbar />
      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">SMARTER CARE, SIMPLER VISITS</p>
            <h1>Healthcare that fits into your day.</h1>
            <p className="hero-text">
              HealthCare+ brings appointments, doctor discovery, and patient information together in one calm, easy-to-use space.
            </p>
            <div className="hero-actions">
              <Link className="button" to="/register">Register as patient</Link>
              <Link className="button button-secondary" to="/login">Patient login</Link>
            </div>
            <Link className="doctor-login" to="/login">Are you a doctor? Sign in here →</Link>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="pulse-ring ring-one" />
            <div className="pulse-ring ring-two" />
            <div className="care-card">
              <span className="care-icon">✚</span>
              <span>Care made clearer</span>
            </div>
            <div className="appointment-preview">
              <div className="preview-avatar">DR</div>
              <div>
                <strong>Find your specialist</strong>
                <small>Book with confidence</small>
              </div>
              <span className="preview-check">✓</span>
            </div>
          </div>
        </section>

        <section className="features-section" id="features">
          <div className="section-heading">
            <p className="eyebrow">ONE PLACE FOR BETTER CARE</p>
            <h2>Designed for a smoother healthcare experience.</h2>
          </div>
          <div className="feature-grid">
            {features.map(([icon, title, description]) => (
              <article className="feature-card" key={title}>
                <span className="feature-icon">{icon}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default LandingPage;

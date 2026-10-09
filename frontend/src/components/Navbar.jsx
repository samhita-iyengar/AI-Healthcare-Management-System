import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="site-header">
      <Link className="brand" to="/">
        <span className="brand-mark">+</span>
        <span>HealthCare</span><strong>+</strong>
      </Link>
      <nav className="site-nav" aria-label="Main navigation">
        <a href="#features">Features</a>
        <Link to="/login">Login</Link>
        <Link className="button button-small" to="/register">Create account</Link>
      </nav>
    </header>
  );
}

export default Navbar;

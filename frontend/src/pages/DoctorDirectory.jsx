import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API, getErrorMessage } from "../services/api";

function DoctorDirectory() {
    const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDoctors() {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API}/api/doctors`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(await getErrorMessage(response));
        }

        const data = await response.json();
        setDoctors(data);
      } catch (err) {
        setError(err.message || "Unable to load doctors.");
      } finally {
        setLoading(false);
      }
    }

    loadDoctors();
  }, []);

  const specializations = useMemo(() => {
    return [
      "All",
      ...new Set(doctors.map((doctor) => doctor.specialization)),
    ];
  }, [doctors]);

  const filteredDoctors = doctors.filter((doctor) => {
    const name = doctor.user?.name || "";
    const matchesSearch =
      name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(search.toLowerCase());

    const matchesSpecialization =
      specialization === "All" ||
      doctor.specialization === specialization;

    return matchesSearch && matchesSpecialization;
  });

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">

        <div className="page-heading">
          <div>
            <span className="eyebrow">HEALTHCARE+ DIRECTORY</span>
            <h1>Find a Doctor</h1>
            <p>
              Browse our doctors and find the right specialist for your needs.
            </p>
          </div>

          <Link to="/patient/dashboard" className="button button-secondary">
            ← Dashboard
          </Link>
        </div>

        <div className="doctor-filters">
          <div className="search-box">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search doctor or specialization..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          >
            {specializations.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <div className="dashboard-card loading-card">
            <div className="loading-spinner"></div>
            <p>Loading doctors...</p>
          </div>
        )}

        {error && !loading && (
          <div className="error-card">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="results-count">
              {filteredDoctors.length} doctor
              {filteredDoctors.length !== 1 ? "s" : ""} available
            </div>

            <div className="doctor-grid">
              {filteredDoctors.map((doctor) => (
                <article className="doctor-card" key={doctor.id}>
                  <div className="doctor-card-top">
                    <div className="doctor-avatar">
                      {doctor.user?.name?.charAt(0) || "D"}
                    </div>

                    <div>
                      <h2>{doctor.user?.name}</h2>
                      <span className="specialization-badge">
                        {doctor.specialization}
                      </span>
                    </div>
                  </div>

                  <div className="doctor-info">
                    <div>
                      <span className="info-label">Experience</span>
                      <strong>{doctor.experience} years</strong>
                    </div>

                    <div>
                      <span className="info-label">Qualification</span>
                      <strong>{doctor.qualification}</strong>
                    </div>
                  </div>

                  <div className="availability">
                    <span>Available</span>
                    <p>{doctor.availableDays}</p>
                    <p>{doctor.availableTime}</p>
                  </div>

                  <button
                    className="button doctor-book-button"
                    onClick={() =>
                        navigate("/patient/appointments/book", {
                        state: { doctor },
                        })
                    }
                    >
  Book Appointment →
</button>
                </article>
              ))}
            </div>

            {filteredDoctors.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">⌕</div>
                <h2>No doctors found</h2>
                <p>Try another name or specialization.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default DoctorDirectory;
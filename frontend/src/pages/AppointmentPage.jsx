import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API, getErrorMessage } from "../services/api";

function AppointmentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedDoctor = location.state?.doctor || null;

  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState(selectedDoctor?.id || "");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [reason, setReason] = useState("");

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  function handleDoctorChange(event) {
    setDoctorId(event.target.value);
    setSuccess("");
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!doctorId || !appointmentDate || !appointmentTime || !reason.trim()) {
      setError("Please fill in all appointment details.");
      return;
    }

    try {
      setBooking(true);

      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        throw new Error("Patient session not found. Please login again.");
      }

      const user = JSON.parse(storedUser);

      /*
       * The backend appointment API expects the patient's
       * Patient entity ID, not the User ID.
       */
      const patientResponse = await fetch(
        `${API}/api/patients/user/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!patientResponse.ok) {
        throw new Error(
          "Patient profile not found. Please complete your profile first."
        );
      }

      const patient = await patientResponse.json();

      const response = await fetch(`${API}/api/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          patientId: patient.id,
          doctorId: Number(doctorId),
          appointmentDate,
          appointmentTime,
          reason: reason.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(await getErrorMessage(response));
      }

      setSuccess(
        "Appointment request submitted successfully. You can track its status from My Appointments."
      );

      setReason("");
      setAppointmentDate("");
      setAppointmentTime("");

      setTimeout(() => {
        navigate("/patient/dashboard");
      }, 1800);
    } catch (err) {
      setError(err.message || "Unable to book appointment.");
    } finally {
      setBooking(false);
    }
  }

  const doctor = doctors.find((item) => item.id === Number(doctorId));

  return (
    <div className="dashboard-page">
      <div className="dashboard-container appointment-container">

        <div className="page-heading">
          <div>
            <span className="eyebrow">PATIENT PORTAL</span>
            <h1>Book an Appointment</h1>
            <p>
              Choose a doctor, select a convenient time and tell us why
              you need an appointment.
            </p>
          </div>

          <Link
            to="/patient/doctors"
            className="button button-secondary"
          >
            ← Doctors
          </Link>
        </div>

        <div className="appointment-layout">

          <form className="appointment-form" onSubmit={handleSubmit}>

            <div className="form-section">
              <span className="form-section-number">01</span>

              <div className="form-section-content">
                <h2>Select Doctor</h2>
                <p>Choose the specialist you would like to visit.</p>

                {loading ? (
                  <div className="form-loading">
                    Loading doctors...
                  </div>
                ) : (
                  <select
                    value={doctorId}
                    onChange={handleDoctorChange}
                    className="appointment-select"
                  >
                    <option value="">Select a doctor</option>

                    {doctors.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.user?.name} — {item.specialization}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            <div className="form-section">
              <span className="form-section-number">02</span>

              <div className="form-section-content">
                <h2>Date & Time</h2>
                <p>Select when you would like to visit.</p>

                <div className="appointment-date-time">

                  <div className="field-group">
                    <label htmlFor="appointment-date">
                      Appointment Date
                    </label>

                    <input
                      id="appointment-date"
                      type="date"
                      value={appointmentDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                    />
                  </div>

                  <div className="field-group">
                    <label htmlFor="appointment-time">
                      Appointment Time
                    </label>

                    <input
                      id="appointment-time"
                      type="time"
                      value={appointmentTime}
                      onChange={(e) => setAppointmentTime(e.target.value)}
                    />
                  </div>

                </div>
              </div>
            </div>

            <div className="form-section">
              <span className="form-section-number">03</span>

              <div className="form-section-content">
                <h2>Reason for Visit</h2>
                <p>
                  Briefly describe why you are booking this appointment.
                </p>

                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Example: I have been experiencing headaches for the past few days..."
                  rows="5"
                />
              </div>
            </div>

            {error && (
              <div className="form-error">
                {error}
              </div>
            )}

            {success && (
              <div className="form-success">
                ✓ {success}
              </div>
            )}

            <button
              type="submit"
              className="button appointment-submit"
              disabled={booking || loading}
            >
              {booking ? "Submitting Request..." : "Confirm Appointment →"}
            </button>

          </form>

          <aside className="appointment-sidebar">

            {doctor ? (
              <div className="selected-doctor-card">

                <span className="eyebrow">SELECTED DOCTOR</span>

                <div className="selected-doctor-avatar">
                  {doctor.user?.name?.charAt(0) || "D"}
                </div>

                <h2>{doctor.user?.name}</h2>

                <span className="specialization-badge">
                  {doctor.specialization}
                </span>

                <div className="selected-doctor-details">
                  <div>
                    <span>Experience</span>
                    <strong>{doctor.experience} years</strong>
                  </div>

                  <div>
                    <span>Qualification</span>
                    <strong>{doctor.qualification}</strong>
                  </div>

                  <div>
                    <span>Available Days</span>
                    <strong>{doctor.availableDays}</strong>
                  </div>

                  <div>
                    <span>Available Time</span>
                    <strong>{doctor.availableTime}</strong>
                  </div>
                </div>

              </div>
            ) : (
              <div className="appointment-tip">
                <div className="appointment-tip-icon">📅</div>

                <h3>How it works</h3>

                <ol>
                  <li>Select your preferred doctor.</li>
                  <li>Choose a date and time.</li>
                  <li>Tell the doctor about your visit.</li>
                  <li>Submit your appointment request.</li>
                </ol>
              </div>
            )}

            <div className="appointment-note">
              <strong>Appointment requests</strong>
              <p>
                Your appointment will initially be marked as
                <b> PENDING</b>. The doctor can then confirm or reject
                the request.
              </p>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}

export default AppointmentPage;
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import DoctorDashboard from "./pages/DoctorDashboard";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import PatientDashboard from "./pages/PatientDashboard";
import RegisterPage from "./pages/RegisterPage";
import DoctorDirectory from "./pages/DoctorDirectory";
import AppointmentPage from "./pages/AppointmentPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/patient/dashboard"
        element={
          <ProtectedRoute allowedRole="PATIENT">
            <PatientDashboard />
          </ProtectedRoute>
        }
      />
      <Route
  path="/patient/doctors"
  element={
    <ProtectedRoute allowedRole="PATIENT">
      <DoctorDirectory />
    </ProtectedRoute>
  }
/>
<Route
  path="/patient/appointments/book"
  element={
    <ProtectedRoute allowedRole="PATIENT">
      <AppointmentPage />
    </ProtectedRoute>
  }
/>
      <Route
        path="/doctor/dashboard"
        element={
          <ProtectedRoute allowedRole="DOCTOR">
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}

export default App;

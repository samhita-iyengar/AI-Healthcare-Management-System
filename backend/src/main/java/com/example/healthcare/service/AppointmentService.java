package com.example.healthcare.service;

import com.example.healthcare.entity.Appointment;
import com.example.healthcare.entity.AppointmentStatus;
import com.example.healthcare.entity.Doctor;
import com.example.healthcare.entity.Patient;
import com.example.healthcare.repository.AppointmentRepository;
import com.example.healthcare.repository.DoctorRepository;
import com.example.healthcare.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public AppointmentService(
            AppointmentRepository appointmentRepository,
            PatientRepository patientRepository,
            DoctorRepository doctorRepository
    ) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    public Appointment createAppointment(
            Long patientId,
            Long doctorId,
            java.time.LocalDate appointmentDate,
            java.time.LocalTime appointmentTime,
            String reason
    ) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found."));
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found."));

        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentDate(appointmentDate);
        appointment.setAppointmentTime(appointmentTime);
        appointment.setReason(reason);
        appointment.setStatus(AppointmentStatus.PENDING);

        return createAppointment(appointment);
    }

    public Appointment createAppointment(Appointment appointment) {
        boolean slotOccupied = appointmentRepository
                .existsByDoctor_IdAndAppointmentDateAndAppointmentTimeAndStatusNot(
                        appointment.getDoctor().getId(),
                        appointment.getAppointmentDate(),
                        appointment.getAppointmentTime(),
                        AppointmentStatus.CANCELLED
                );

        if (slotOccupied) {
            throw new RuntimeException("This doctor already has an appointment at the selected date and time.");
        }

        return appointmentRepository.save(appointment);
    }

    public Optional<Appointment> findById(Long id) {
        return appointmentRepository.findById(id);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public List<Appointment> getAppointmentsByPatientId(Long patientId) {
        return appointmentRepository.findByPatient_Id(patientId);
    }

    public List<Appointment> getAppointmentsByDoctorId(Long doctorId) {
        return appointmentRepository.findByDoctor_Id(doctorId);
    }

    public Appointment updateAppointmentStatus(Long appointmentId, AppointmentStatus status) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found."));

        appointment.setStatus(status);
        return appointmentRepository.save(appointment);
    }

    public Appointment cancelAppointment(Long appointmentId) {
        return updateAppointmentStatus(appointmentId, AppointmentStatus.CANCELLED);
    }
}

package com.example.healthcare.repository;

import com.example.healthcare.entity.Appointment;
import com.example.healthcare.entity.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByPatient_Id(Long patientId);

    List<Appointment> findByDoctor_Id(Long doctorId);

    List<Appointment> findByDoctor_IdAndAppointmentDate(Long doctorId, LocalDate appointmentDate);

    List<Appointment> findByPatient_IdAndStatus(Long patientId, AppointmentStatus status);

    boolean existsByDoctor_IdAndAppointmentDateAndAppointmentTimeAndStatusNot(
            Long doctorId,
            LocalDate appointmentDate,
            LocalTime appointmentTime,
            AppointmentStatus status
    );
}

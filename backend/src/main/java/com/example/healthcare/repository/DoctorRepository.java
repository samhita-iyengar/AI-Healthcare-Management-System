package com.example.healthcare.repository;

import com.example.healthcare.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    List<Doctor> findBySpecialization(String specialization);

    Optional<Doctor> findByUser_Id(Long userId);
}

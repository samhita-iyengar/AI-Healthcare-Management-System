package com.example.healthcare.service;

import com.example.healthcare.entity.Patient;
import com.example.healthcare.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public Patient createPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public Optional<Patient> findById(Long id) {
        return patientRepository.findById(id);
    }

    public Optional<Patient> findByUserId(Long userId) {
        return patientRepository.findByUser_Id(userId);
    }

    public Patient updatePatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }
}

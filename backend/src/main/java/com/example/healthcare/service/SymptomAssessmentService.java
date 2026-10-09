package com.example.healthcare.service;

import com.example.healthcare.entity.SymptomAssessment;
import com.example.healthcare.repository.SymptomAssessmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SymptomAssessmentService {

    private final SymptomAssessmentRepository symptomAssessmentRepository;

    public SymptomAssessmentService(SymptomAssessmentRepository symptomAssessmentRepository) {
        this.symptomAssessmentRepository = symptomAssessmentRepository;
    }

    public SymptomAssessment saveAssessment(SymptomAssessment symptomAssessment) {
        return symptomAssessmentRepository.save(symptomAssessment);
    }

    public Optional<SymptomAssessment> findById(Long id) {
        return symptomAssessmentRepository.findById(id);
    }

    public List<SymptomAssessment> getAssessmentsByPatientId(Long patientId) {
        return symptomAssessmentRepository.findByPatient_Id(patientId);
    }
}

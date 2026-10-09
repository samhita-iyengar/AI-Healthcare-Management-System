package com.example.healthcare.repository;

import com.example.healthcare.entity.SymptomAssessment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SymptomAssessmentRepository extends JpaRepository<SymptomAssessment, Long> {

    List<SymptomAssessment> findByPatient_Id(Long patientId);
}

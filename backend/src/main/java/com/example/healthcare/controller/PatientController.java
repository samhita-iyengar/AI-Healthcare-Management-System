package com.example.healthcare.controller;

import com.example.healthcare.dto.PatientRequest;
import com.example.healthcare.entity.Patient;
import com.example.healthcare.entity.User;
import com.example.healthcare.service.PatientService;
import com.example.healthcare.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientService patientService;
    private final UserService userService;

    public PatientController(PatientService patientService, UserService userService) {
        this.patientService = patientService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<?> createPatient(@Valid @RequestBody PatientRequest request) {
        User user = userService.findById(request.getUserId()).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "User not found."));
        }

        Patient patient = new Patient();
        copyRequestToPatient(request, patient);
        patient.setUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(patientService.createPatient(patient));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPatientById(@PathVariable Long id) {
        return patientService.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "Patient not found.")));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getPatientByUserId(@PathVariable Long userId) {
        return patientService.findByUserId(userId)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "Patient not found.")));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePatient(@PathVariable Long id, @Valid @RequestBody PatientRequest request) {
        Patient patient = patientService.findById(id).orElse(null);
        if (patient == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Patient not found."));
        }

        User user = userService.findById(request.getUserId()).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "User not found."));
        }

        copyRequestToPatient(request, patient);
        patient.setUser(user);
        return ResponseEntity.ok(patientService.updatePatient(patient));
    }

    private void copyRequestToPatient(PatientRequest request, Patient patient) {
        patient.setPhone(request.getPhone());
        patient.setDateOfBirth(request.getDateOfBirth());
        patient.setGender(request.getGender());
        patient.setAddress(request.getAddress());
    }
}

package com.example.healthcare.controller;

import com.example.healthcare.dto.DoctorRequest;
import com.example.healthcare.entity.Doctor;
import com.example.healthcare.entity.User;
import com.example.healthcare.service.DoctorService;
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

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorService doctorService;
    private final UserService userService;

    public DoctorController(DoctorService doctorService, UserService userService) {
        this.doctorService = doctorService;
        this.userService = userService;
    }

    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDoctorById(@PathVariable Long id) {
        return doctorService.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "Doctor not found.")));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getDoctorByUserId(@PathVariable Long userId) {
        return doctorService.findByUserId(userId)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "Doctor not found.")));
    }

    @GetMapping("/specialization/{specialization}")
    public List<Doctor> getDoctorsBySpecialization(@PathVariable String specialization) {
        return doctorService.findBySpecialization(specialization);
    }

    @PostMapping
    public ResponseEntity<?> createDoctor(@Valid @RequestBody DoctorRequest request) {
        User user = userService.findById(request.getUserId()).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "User not found."));
        }

        Doctor doctor = new Doctor();
        copyRequestToDoctor(request, doctor);
        doctor.setUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(doctorService.createDoctor(doctor));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDoctor(@PathVariable Long id, @Valid @RequestBody DoctorRequest request) {
        Doctor doctor = doctorService.findById(id).orElse(null);
        if (doctor == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Doctor not found."));
        }

        User user = userService.findById(request.getUserId()).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "User not found."));
        }

        copyRequestToDoctor(request, doctor);
        doctor.setUser(user);
        return ResponseEntity.ok(doctorService.updateDoctor(doctor));
    }

    private void copyRequestToDoctor(DoctorRequest request, Doctor doctor) {
        doctor.setSpecialization(request.getSpecialization());
        doctor.setExperience(request.getExperience());
        doctor.setQualification(request.getQualification());
        doctor.setPhone(request.getPhone());
        doctor.setAvailableDays(request.getAvailableDays());
        doctor.setAvailableTime(request.getAvailableTime());
    }
}

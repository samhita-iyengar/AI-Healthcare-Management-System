package com.example.healthcare.controller;

import com.example.healthcare.dto.SymptomCheckRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    @PostMapping("/symptom-check")
    public ResponseEntity<Map<String, String>> checkSymptoms(@Valid @RequestBody SymptomCheckRequest request) {
        return ResponseEntity.ok(Map.of(
                "message", "AI symptom assessment will be connected in the next step.",
                "symptoms", request.getSymptoms()
        ));
    }
}

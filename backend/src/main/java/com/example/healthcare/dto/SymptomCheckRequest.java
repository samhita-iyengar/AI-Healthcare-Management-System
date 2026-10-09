package com.example.healthcare.dto;

import jakarta.validation.constraints.NotBlank;

public class SymptomCheckRequest {

    @NotBlank(message = "Symptoms are required.")
    private String symptoms;

    public String getSymptoms() { return symptoms; }
    public void setSymptoms(String symptoms) { this.symptoms = symptoms; }
}

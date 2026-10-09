package com.example.healthcare.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class PatientRequest {

    @NotNull(message = "User ID is required.")
    private Long userId;
    private String phone;
    private LocalDate dateOfBirth;
    private String gender;
    private String address;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
}

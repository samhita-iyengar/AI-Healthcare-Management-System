package com.example.healthcare.dto;

import com.example.healthcare.entity.AppointmentStatus;
import jakarta.validation.constraints.NotNull;

public class AppointmentStatusRequest {

    @NotNull(message = "Appointment status is required.")
    private AppointmentStatus status;

    public AppointmentStatus getStatus() { return status; }
    public void setStatus(AppointmentStatus status) { this.status = status; }
}

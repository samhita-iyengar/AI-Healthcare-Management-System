# AI Healthcare Management System

A full-stack healthcare appointment and patient management application built with **Spring Boot**, **React**, and **MySQL**. The project includes patient registration and login, doctor discovery, appointment management, and an initial endpoint for AI-assisted symptom guidance.

> **Project status:** This is a work in progress. The AI symptom-check endpoint currently returns a placeholder response; the Gemini-powered assessment still needs to be connected. Do not use this project for real patient data or medical decisions.

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, React Router, Vite, JavaScript, CSS, Fetch API |
| Backend | Java 17, Spring Boot, Maven, Spring Web, Spring Data JPA, Spring Security, Bean Validation |
| Database | MySQL |
| AI integration | Spring AI with Google Gemini (integration in progress) |
| Authentication | Registration/login endpoints and JWT token generation |

## Current Features

- Patient and doctor registration/login flows
- Role-aware patient and doctor pages
- Doctor directory
- Appointment creation, listing, status updates, and cancellation endpoints
- MySQL persistence through Spring Data JPA
- Initial symptom-check API endpoint

Some features are still under development. In particular, the AI symptom-check controller is currently a placeholder and does not yet generate a Gemini assessment.

## Repository Structure

```text
AI-Healthcare-Management-System/
├── backend/
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/example/healthcare/
│       │   ├── config/
│       │   ├── controller/
│       │   ├── dto/
│       │   ├── entity/
│       │   ├── repository/
│       │   ├── security/
│       │   └── service/
│       └── resources/application.properties
├── frontend/
│   ├── package.json
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── styles/
├── .env.example
├── .gitignore
└── README.md
```

## Prerequisites

Install the following before running the project:

- Java 17 or a compatible JDK
- Maven (or use the Maven wrapper if one is added later)
- MySQL Server
- Node.js and npm
- A Google Gemini API key for the planned AI integration

## Setup and Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/samhita-iyengar/AI-Healthcare-Management-System.git
cd AI-Healthcare-Management-System
```

### 2. Create the MySQL database

Start MySQL and run:

```sql
CREATE DATABASE healthcare_management;
```

The backend currently connects to `localhost:3306` with the MySQL username `root`. If your local MySQL setup uses a different username, update `backend/src/main/resources/application.properties` accordingly.

### 3. Configure environment variables

Set the database password and Gemini API key in your terminal before starting the backend. Replace the example values with your own; never commit real credentials.

```bash
export DB_PASSWORD='your_mysql_password'
export GEMINI_API_KEY='your_gemini_api_key'
```

The repository includes `.env.example` as a reference. Spring Boot does not automatically load a root `.env` file by default, so exporting these variables (or configuring them in your IDE's run configuration) is the simplest local setup with the current configuration.

### 4. Start the backend

Open a terminal in the project root and run:

```bash
cd backend
mvn spring-boot:run
```

Backend base URL: `http://localhost:8080`

### 5. Start the frontend

Open a second terminal from the project root and run:

```bash
cd frontend
npm install
npm run dev
```

Vite will print the local frontend URL, normally `http://localhost:5173`.

## API Overview

The current backend includes these route groups:

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/auth/register` | Register a user |
| `POST` | `/api/auth/login` | Authenticate and return a JWT |
| `GET/POST` | `/api/appointments` | List or create appointments |
| `GET` | `/api/appointments/{id}` | Get an appointment by ID |
| `GET` | `/api/appointments/patient/{patientId}` | List appointments for a patient |
| `GET` | `/api/appointments/doctor/{doctorId}` | List appointments for a doctor |
| `PUT` | `/api/appointments/{id}/status` | Update appointment status |
| `DELETE` | `/api/appointments/{id}` | Cancel an appointment |
| `POST` | `/api/ai/symptom-check` | Placeholder symptom-check endpoint |

Check the controller classes for request bodies and response details.

## Security and Privacy Notes

- Keep API keys, database passwords, and other secrets out of Git history.
- Do not upload real patient records, personal health information, or production database dumps.
- This project is for learning and demonstration only. It is not a certified medical device and must not be used for diagnosis or treatment.
- Review and strengthen authentication, authorization, password handling, and deployment configuration before exposing the application publicly.

## Development Status

This project is being developed incrementally. Planned improvements include completing the Gemini integration, expanding validation and tests, and refining the patient and doctor workflows.

## License

No license has been added yet. Unless a license is added to this repository, others should not assume they have permission to reuse or redistribute the code.

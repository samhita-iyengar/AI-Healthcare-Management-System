# AI-Powered Healthcare Appointment & Patient Management System

A college project for managing patient appointments, doctor availability, and a Gemini-powered symptom guidance assistant.

## Technology

- Backend: Java 17, Spring Boot, Maven, Spring Web, Spring Data JPA, Spring Security, JWT, Spring AI
- Database: MySQL (`healthcare_management`)
- Frontend: React, Vite, JavaScript, CSS, Fetch API

## Project layout

```text
.
├── backend/
│   └── src/
│       ├── main/
│       │   ├── java/com/example/healthcare/
│       │   │   ├── config/
│       │   │   ├── controller/
│       │   │   ├── entity/
│       │   │   ├── repository/
│       │   │   ├── security/
│       │   │   └── service/
│       │   └── resources/
│       └── test/java/com/example/healthcare/
└── frontend/
    ├── public/
    └── src/
        ├── components/
        ├── pages/
        ├── services/
        └── styles/
```

## Planned modules

1. Authentication and JWT security
2. Patient profiles
3. Doctor directory and availability
4. Appointment booking and status management
5. Doctor workspace
6. Gemini symptom guidance assistant
7. Demo data and UI polish

## Local addresses

- Backend: `http://localhost:8080`
- Frontend: `http://localhost:5173`

## Development approach

The application will remain a simple modular monolith. Backend code belongs in the controller, service, repository, entity, config, and security packages. The frontend uses React state, `fetch`, and normal CSS only.

The next incremental step is to initialise the Spring Boot Maven backend and add its dependencies and MySQL configuration.

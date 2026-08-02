# Web Courses Application

A full-stack web application for managing online courses, built with **Spring Boot** and **Angular**.

---

## Project Architecture

This repository contains two main applications:

* **Backend:** Spring Boot REST API using Java 21, Spring Security (JWT), MySQL.
* **Frontend:** Angular single-page application (SPA).

```text
.
├── backend/            # Spring Boot Backend Application
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── .env.example
│   └── src/
└── frontend/           # Angular Frontend Application
    ├── src/
    └── package.json
```

---

## Prerequisites

Before running the application, ensure you have the following installed on your machine:

* [Docker](https://www.docker.com/) & Docker Compose
* [Node.js](https://nodejs.org/) (v18 or higher)
* [npm](https://www.npmjs.com/)

---

## Getting Started

### 1. Running the Backend (Docker)

The backend service runs alongside a **MySQL** database and a **Mailpit** mock email server using Docker Compose.

1. **Start Docker Service**

2. **Navigate to the Backend directory**:
   ```bash
   cd backend
   ```

3. **Configure Environment Variables**:
   Copy the `.env.example` file to create your local `.env` file:
   ```bash
   cp .env.example .env
   ```
   *(Ensure `DB_PASSWORD` is defined in `.env`).*

4. **Launch Backend Services**:
   ```bash
   docker compose up --build
   ```

Once started, the backend services will be available at:
* **Spring Boot API:** `http://localhost:8080`
* **Mailpit (Fake Email Inbox UI):** `http://localhost:8025`
* **MySQL Database:** `localhost:3306`

---

### 2. Running the Frontend (Local Node.js)

1. **Open a new terminal window** and navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Angular Development Server**:
   ```bash
   npm start
   ```

4. **Access the Frontend**:
   Open your browser and navigate to **`http://localhost:4200`**.

---

## Admin Setup & Role Management

By design, **only an Admin** is allowed to register new `STUDENT` and `TEACHER` accounts. Because of this, you must first create an initial Admin account using a tool like **Postman**.

### 1. Create the Initial Admin
Open Postman and send a `POST` request to `http://localhost:8080/api/v1/auth/register` with the following JSON body (No Auth required):
```json
{
  "firstname": "System",
  "lastname": "Admin",
  "email": "admin@example.com",
  "password": "password123",
  "accountType": "ADMIN"
}
```

### 2. Login as Admin
Now you can login on page as admin using the registered credentials

### 3. Register Students and Teachers
After logging in successfully, navigate to admin panel and register new users from there.

---

## Default API Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Register a new user (`STUDENT`, `TEACHER`, `ADMIN`) | No |
| `POST` | `/api/v1/auth/authenticate` | Authenticate user & receive JWT | No |

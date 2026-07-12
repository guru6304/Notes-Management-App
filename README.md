# Notes Management Application

A full-stack Notes Management Application that allows users to securely register, log in, and manage their personal notes. The application uses JWT-based authentication to ensure each user can access only their own notes.

---

## Features

### Authentication

- User Registration
- User Login
- User Logout
- JWT Authentication
- Password Hashing using bcrypt

### Notes Management

- Create Note
- View All Notes
- Edit Note
- Delete Note
- User-specific notes (users can only access their own notes)

### Validation

#### Backend

- Required field validation
- Email format validation
- Minimum password length validation
- JWT authentication middleware
- Global error handling

#### Frontend

- Required field validation
- Email format validation
- Password length validation
- Confirm password validation
- Bootstrap validation styling
- Dynamic validation while typing

---

# Technology Stack

## Frontend

- React.js
- React Router DOM
- Axios
- Bootstrap 5
- Bootstrap Icons

## Backend

- Node.js
- Express.js
- JWT (jsonwebtoken)
- bcrypt
- CORS
- dotenv

## Database

- MySQL

---

# Project Structure

```
Notes-Management-App

│

├── frontend

│   ├── src

│   ├── public

│   └── package.json

│   └── .env

│

├── backend

│   ├── src

│   ├── package.json

│   └── .env

│

└── README.md
```

---

# Project Setup Instructions

## Clone Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Go into project

```bash
cd Notes-Management-App
```

---

# Backend Setup

Navigate to backend

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=4444

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=notes_management

JWT_SECRET=your_secret_key
```

Start backend

```bash
npm run dev
```

Backend runs on

```
http://localhost:4444
```

---

# Frontend Setup

Open another terminal

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Start React application

```bash
npm start
```

Frontend runs on

```
http://localhost:3000
```

---

# Database Setup

Create database

```sql
CREATE DATABASE notes_management;
```

Use database

```sql
USE notes_management;
```

### Users Table

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Notes Table

```sql
CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);
```

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |

---

## Notes

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/notes | Get All Notes |
| POST | /api/notes | Create Note |
| PATCH | /api/notes/:id | Update Note |
| DELETE | /api/notes/:id | Delete Note |

---

# Authentication Flow

1. User registers.
2. Password is hashed using bcrypt.
3. User logs in.
4. Server generates JWT Token.
5. Token is stored in Local Storage.
6. Axios interceptor automatically attaches the JWT to protected requests.
7. Backend verifies the JWT before allowing access to Notes APIs.

---

# Security Features

- Password hashing using bcrypt
- JWT Authentication
- Protected Routes
- User-specific authorization
- SQL Injection prevention using parameterized queries
- Global error handling
- Input validation
- Environment variables for sensitive configuration

---

# Additional Features Implemented

- Connection Pool using mysql2/promise
- Global Error Handling Middleware
- JWT Authentication Middleware
- Axios Interceptors
- Protected React Routes
- Responsive Bootstrap UI
- Bootstrap Icons
- Client-side Form Validation
- Loading States
- Dynamic Validation Feedback
- Clean MVC Architecture
- RESTful API Design

---

# Live Application

**https://notes-management-app-git-master-guruswamy.vercel.app/**

```
__________________________________________
```

# GitHub Repository

**https://github.com/guru6304/Notes-Management-App**

```
__________________________________________
```

---

# Assumptions

- Each registered email address is unique.
- Every note belongs to exactly one user.
- Authentication is required for all Notes APIs.
- JWT tokens are stored in browser Local Storage.
- Users cannot access, edit, or delete notes belonging to other users.

---

---

# Author

**Guru Swamy Lanka**

Full Stack Developer Assignment
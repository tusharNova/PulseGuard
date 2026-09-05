# PulseGuard Authentication API Specification

## Overview
PulseGuard uses JSON Web Tokens (JWT) powered by `djangorestframework-simplejwt` for stateless, secure API authentication.

Base URL: `/api/auth/`

---

## Endpoints

### 1. User Registration
* **URL:** `/api/auth/register/`
* **Method:** `POST`
* **Access:** Public (AllowAny)
* **Request Body:**
  ```json
  {
    "email": "user@pulseguard.io",
    "password": "StrongPassword123!",
    "first_name": "Jane",
    "last_name": "Doe"
  }
  ```
* **Success Response (201 Created):**
  ```json
  {
    "id": "c9bf9e57-1685-4c89-bafb-ff5af830be8a",
    "email": "user@pulseguard.io",
    "first_name": "Jane",
    "last_name": "Doe"
  }
  ```

---

### 2. User Login (Obtain JWT Pair)
* **URL:** `/api/auth/login/`
* **Method:** `POST`
* **Access:** Public
* **Request Body:**
  ```json
  {
    "email": "user@pulseguard.io",
    "password": "StrongPassword123!"
  }
  ```
* **Success Response (200 OK):**
  ```json
  {
    "refresh": "<refresh_token_string>",
    "access": "<access_token_string>"
  }
  ```

---

### 3. Refresh Access Token
* **URL:** `/api/auth/login/refresh/`
* **Method:** `POST`
* **Access:** Public
* **Request Body:**
  ```json
  {
    "refresh": "<refresh_token_string>"
  }
  ```
* **Success Response (200 OK):**
  ```json
  {
    "access": "<new_access_token_string>"
  }
  ```

---

### 4. Current User Profile
* **URL:** `/api/auth/me/`
* **Method:** `GET`, `PATCH`, `PUT`
* **Access:** Authenticated (`Authorization: Bearer <access_token>`)
* **Success Response (200 OK):**
  ```json
  {
    "id": "c9bf9e57-1685-4c89-bafb-ff5af830be8a",
    "email": "user@pulseguard.io",
    "first_name": "Jane",
    "last_name": "Doe",
    "created_at": "2026-09-05T11:00:00Z",
    "update_at": "2026-09-05T11:00:00Z"
  }
  ```

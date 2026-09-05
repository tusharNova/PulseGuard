# PulseGuard Monitoring API Specification

## Overview
PulseGuard provides a RESTful API for managing monitors and viewing health check results.

Base URL: `/api/`

All endpoints require JWT Bearer Authentication (`Authorization: Bearer <access_token>`).

---

## Endpoints

### 1. List All User Monitors
* **URL:** `/api/monitors/`
* **Method:** `GET`
* **Access:** Authenticated (scoped to authenticated user)
* **Success Response (200 OK):**
  ```json
  [
    {
      "id": "7b09be18-b0a6-42bb-a7ad-cf2b08331d25",
      "name": "Production API",
      "url": "https://api.pulseguard.io",
      "monitor_type": "HTTPS",
      "interval": 60,
      "is_active": true,
      "created_at": "2026-09-05T12:00:00Z",
      "updated_at": "2026-09-05T12:00:00Z"
    }
  ]
  ```

---

### 2. Create a Monitor
* **URL:** `/api/monitors/`
* **Method:** `POST`
* **Request Body:**
  ```json
  {
    "name": "Production API",
    "url": "https://api.pulseguard.io",
    "monitor_type": "HTTPS",
    "interval": 60,
    "is_active": true
  }
  ```
* **Success Response (201 Created):**
  Returns created monitor object.

---

### 3. Retrieve / Update / Delete a Monitor
* **URL:** `/api/monitors/<id>/`
* **Methods:** `GET`, `PUT`, `PATCH`, `DELETE`
* **Access:** Authenticated (Owner only; 404 if accessed by other users)

---

### 4. Fetch Recent Check History
* **URL:** `/api/monitors/<id>/history/`
* **Method:** `GET`
* **Access:** Authenticated (Owner only)
* **Success Response (200 OK):**
  ```json
  [
    {
      "id": "e4c9f131-92be-497b-83c9-d2b5ff88258b",
      "monitor": "7b09be18-b0a6-42bb-a7ad-cf2b08331d25",
      "timestamp": "2026-09-05T12:05:00Z",
      "status_code": 200,
      "response_time_ms": 124.5,
      "is_up": true,
      "error_message": ""
    }
  ]
  ```

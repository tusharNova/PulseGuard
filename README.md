# PulseGuard 🛡️

PulseGuard is a production-grade, automated uptime monitoring and health check platform. It allows users to continuously monitor the availability, response latency, and reliability of APIs, websites, and microservices with distributed Celery & Redis background workers, time-series indexing, and a modern React + TypeScript dashboard.

---

## 🌟 Key Features

* **JWT Authentication:** Stateless, cryptographic authentication with access & refresh token rotation (`djangorestframework-simplejwt`).
* **Multi-Tenant Monitor Management:** Monitor HTTP/HTTPS endpoints with customizable ping intervals (≥10s) and strict tenant isolation.
* **Distributed Pinger Engine:** Asynchronous, high-precision health checks executed by Celery workers measuring sub-millisecond response latency with resilient timeout and DNS exception handling.
* **Periodic Scheduling:** Automated Celery Beat scheduler querying active monitors and fanning out health checks every 60 seconds.
* **Time-Series Analytics:** Composite indexed check results (`[monitor, -timestamp]`) providing instant 24-hour uptime percentage calculations, latency charts, and incident tracking.
* **Modern Frontend:** Built with React 19, TypeScript, Vite, TailwindCSS v4, React Router, and Axios with silent JWT token refresh interceptors.

---

## 🛠️ Architecture & Tech Stack

```
                     ┌──────────────────────────────────────┐
                     │     React + TypeScript (Vite)        │
                     │   TailwindCSS v4 & Lucide Icons      │
                     └──────────────────┬───────────────────┘
                                        │ HTTP / REST (JWT Bearer)
                                        ▼
                     ┌──────────────────────────────────────┐
                     │    Django REST Framework API         │
                     │    (account, monitoring, common)     │
                     └─────────┬──────────────────┬─────────┘
                               │                  │
               Database Queries│                  │ Dispatch Tasks
                               ▼                  ▼
                    ┌──────────────────┐   ┌──────────────┐
                    │ SQLite / Postgres│   │ Redis Broker │
                    └──────────────────┘   └──────┬───────┘
                                                  │
                                                  ▼
                                       ┌──────────────────────┐
                                       │ Celery Worker Pool   │
                                       │ (Pinger Tasks)       │
                                       └──────────┬───────────┘
                                                  │ HTTP GET
                                                  ▼
                                       ┌──────────────────────┐
                                       │ Target Web Services  │
                                       └──────────────────────┘
```

* **Backend:** Python 3.12+, Django 6, Django REST Framework, SimpleJWT, Celery 5.6, Redis 8, django-cors-headers, Requests.
* **Package Management:** [uv](https://github.com/astral-sh/uv) (ultra-fast Python package & project manager).
* **Frontend:** React 19, TypeScript 5.8, Vite 8, TailwindCSS 4, React Router 7, Axios, Lucide React.
* **DevOps:** Docker Compose (Redis broker), Ruff (linting & formatting).

---

## 🚀 Quickstart: Step-by-Step Setup

### 1. Prerequisites
Ensure you have the following installed on your machine:
* [Python 3.12+](https://www.python.org/downloads/)
* [uv](https://docs.astral.sh/uv/getting-started/installation/) (`curl -LsSf https://astral.sh/uv/install.sh` or `powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"`)
* [Node.js 20+](https://nodejs.org/) & `npm`
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for Redis)
* [Git](https://git-scm.com/)

---

### 2. Clone the Repository
```bash
git clone https://github.com/tusharNova/PulseGuard.git
cd PulseGuard
```

---

### 3. Start Redis Broker
From the repository root:
```bash
docker compose up -d redis
```
Verify Redis is running on port `6379`:
```bash
docker compose ps
```

---

### 4. Backend Setup & Run

Navigate to `backend/config`:
```bash
cd backend/config
```

#### Run Database Migrations
```bash
uv run python manage.py migrate
```

#### Run Automated Test Suite
```bash
uv run python manage.py test
```
*(All 28 unit tests should pass with 100% success rate)*

#### Start Django Development Server
```bash
uv run python manage.py runserver
```
The REST API will be live at `http://127.0.0.1:8000/`.

#### Start Celery Worker (In a separate terminal)
Navigate to `backend/config`:
```bash
# Windows:
uv run celery -A config worker -l info -P solo

# Linux / macOS:
uv run celery -A config worker -l info
```

#### Start Celery Beat Scheduler (In a separate terminal)
Navigate to `backend/config`:
```bash
uv run celery -A config beat -l info
```

---

### 5. Frontend Setup & Run

Open a new terminal and navigate to `frontend`:
```bash
cd frontend
```

#### Install Dependencies
```bash
npm install
```

#### Start Frontend Dev Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser to view the PulseGuard application!

#### Build for Production
```bash
npm run build
```

---

## 📖 API Documentation & Specifications

Detailed documentation for all endpoints is available in the [`docs/`](docs/) directory:

* 🔐 **Authentication API:** [`docs/auth_api.md`](docs/auth_api.md)
  * `POST /api/auth/register/` - Create a new user account
  * `POST /api/auth/login/` - Authenticate and obtain JWT access + refresh tokens
  * `POST /api/auth/login/refresh/` - Refresh an expired access token
  * `GET, PATCH /api/auth/me/` - Retrieve or update current user profile
* 📡 **Monitoring API:** [`docs/monitoring_api.md`](docs/monitoring_api.md)
  * `GET, POST /api/monitors/` - List or create monitors (scoped to authenticated user)
  * `GET, PUT, PATCH, DELETE /api/monitors/<id>/` - Retrieve, edit, or delete a monitor
  * `GET /api/monitors/<id>/history/` - Fetch recent 50 check results for graphing
  * `GET /api/monitors/<id>/uptime-stats/` - 24-hour uptime percentage & average latency statistics
  * `GET /api/check-results/` - Paginated check result history (`?monitor=<id>`)

---

## 🎯 Project Roadmap & Challenge Progress

PulseGuard is being built across a structured 28-day engineering sprint:

* ✅ **Phase 1: Backend Foundation & Auth (Days 1–7)** - Complete! (Models, JWT, Celery, Redis, Pinger, Beat, Uptime Stats, 28/28 tests passing).
* 🔄 **Phase 2: Frontend Foundation (Days 8–14)** - In Progress (React + TypeScript scaffold, Tailwind v4, AuthContext, Protected Routes, Dashboard integration).
* ⏳ **Phase 3: Advanced Visualizations & Real-Time (Days 15–21)** - Upcoming.
* ⏳ **Phase 4: Dockerization & Deployment (Days 22–28)** - Upcoming.

Track day-to-day progress and conventional commits in [`TASK.md`](TASK.md).

---

## 📄 License
This project is licensed under the MIT License.
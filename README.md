<div align="center">

# 🛡️ PulseGuard

### **Your 24/7 Digital Watchdog. Never Let Downtime Catch You Off Guard.**

PulseGuard is a production-ready, self-hosted, open-source uptime monitoring platform built for everyone—founders, creators, developers, and teams. It continuously monitors your websites, APIs, and microservices, measuring latency, charting SLAs, and dispatching instant alerts the second something goes down.

[![Python](https://img.shields.io/badge/Python-3.12+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![Django](https://img.shields.io/badge/Django-6.0-092E20?style=for-the-badge&logo=django&logoColor=white)](https://djangoproject.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Celery](https://img.shields.io/badge/Celery-5.6-37814A?style=for-the-badge&logo=celery&logoColor=white)](https://docs.celeryq.dev/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)
[![Tests](https://img.shields.io/badge/Tests-45%20Passed%20(96%25%20Coverage)-brightgreen?style=for-the-badge)](docs/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

[**1-Minute Docker Launch**](#-quick-start-1-the-docker-way-recommended) • [**How It Works**](#-how-it-works) • [**Features**](#-what-can-pulseguard-do) • [**Architecture**](#-architecture-overview) • [**API Docs**](docs/)

</div>

---

## 💡 Why PulseGuard?

> *"You wouldn't run a physical store without locking the front door. Why run a website without knowing if it's open?"*

Every minute of downtime damages your reputation, hurts customer trust, and bleeds revenue. Commercial uptime tools charge aggressive monthly fees for basic ping checks and gatekeep your historical telemetry.

**PulseGuard is free, open-source, and self-hosted.**
- You own 100% of your telemetry data.
- Run as many monitors as you need without tier limits.
- Zero vendor lock-in with clean Docker Compose orchestration.

---

## ⚙️ How It Works

```
 ┌────────────────┐         ┌───────────────────────────┐         ┌─────────────────┐
 │   1. You Add   │         │    2. PulseGuard Checks   │         │   3. See It All │
 │   Your Website │ ──────> │    Every 60 Seconds       │ ──────> │   In Real Time  │
 │ (e.g. mysite)  │         │ (Sends a lightweight ping)│         │ (Live Dashboard)│
 └────────────────┘         └─────────────┬─────────────┘         └─────────────────┘
                                          │
                     ┌────────────────────┴────────────────────┐
                     ▼                                         ▼
         ✅ Healthy (200 OK, 85ms)                🚨 Server Down (500 / Timeout)
         - Renders green status block             - Renders red downtime block
         - Updates 24h SLA uptime %               - Logs incident with error reason
         - Auto-resolves past issues              - Sends instant Alert Email!
```

1. **Add Your URL:** Register your website, e-commerce store, or JSON API endpoint in the dashboard.
2. **Automated Celery Beat Scheduler:** Every 60 seconds, asynchronous workers dispatch non-blocking HTTP health probes.
3. **Response & Latency Telemetry:** PulseGuard records the exact response time (ms), HTTP status code, and error trace.
4. **State Transition Alerts:** When a monitor switches from `UP` ➡️ `DOWN`, an incident is recorded and an email alert is sent immediately. When it recovers (`DOWN` ➡️ `UP`), a resolution notification is sent automatically.

---

## ✨ What Can PulseGuard Do?

| Feature | Description |
| :--- | :--- |
| ⏱️ **60-Second Automated Pings** | Continuous background health checks ensure you detect outages before your users do. |
| 📊 **GitHub-Style Status Bars** | Visual 30-day green and red block status bar showing check history with interactive hover details. |
| 📈 **Interactive Response Charts** | High-resolution latency time-series graphs powered by Recharts with custom tooltips. |
| 🚨 **Incident & Recovery Alerts** | State-transition detection with instant email alerts on downtime and automatic recovery notifications. |
| ⚙️ **User Alert Preferences** | Toggle email alerts on or off per account from the Settings page. |
| 🛡️ **Tenant Privacy & JWT Auth** | Multi-tenant database isolation. Only you can view, edit, or delete your own monitors. |
| ⚡ **Sub-Millisecond Queries** | Optimized database composite indexes with `Prefetch` to eliminate N+1 query overhead. |
| 🐳 **Single-Command Docker Stack** | Complete 6-service orchestration: PostgreSQL 16, Redis 7, Django Gunicorn, Celery Worker, Celery Beat, and Nginx. |
| 🔄 **Automated CI/CD** | GitHub Actions pipeline running Pytest, coverage reports, ESLint, and Vitest on every commit. |

---

## 🏗️ Architecture Overview

```
                      [ Internet / User Browser ]
                                   │
                                   ▼
                      ┌─────────────────────────┐
                      │    Nginx Reverse Proxy  │ (Port 80)
                      │ (Serves React 19 SPA)   │
                      └────────────┬────────────┘
                                   │
                     Proxy /api/ & /admin/
                                   │
                                   ▼
                      ┌─────────────────────────┐
                      │   Django Gunicorn WSGI  │ (Port 8000)
                      │  (REST API + Auth)      │
                      └────────────┬────────────┘
                                   │
           ┌───────────────────────┼───────────────────────┐
           ▼                       ▼                       ▼
┌────────────────────┐   ┌───────────────────┐   ┌───────────────────┐
│   PostgreSQL 16    │   │   Redis 7 Cache   │   │   Celery Worker   │
│ (Persistent DB)    │   │ (Message Broker)  │   │   & Celery Beat   │
└────────────────────┘   └───────────────────┘   └───────────────────┘
```

---

## 🚀 Quick Start #1: The Docker Way (Recommended)

The easiest way to run PulseGuard in production or locally:

### 1. Clone the repository:
```bash
git clone https://github.com/tusharNova/PulseGuard.git
cd PulseGuard
```

### 2. Copy the environment configuration:
```bash
cp .env.example .env
```

### 3. Launch the full 6-service stack:
```bash
docker compose up --build -d
```

### 4. Access the application:
* 🌐 **Web Dashboard:** Open [http://localhost](http://localhost) in your browser.
* 🛠️ **Django Admin:** Open [http://localhost/admin/](http://localhost/admin/) to manage backend models.
* 📋 **View Logs:** `docker compose logs -f`

---

## 💻 Quick Start #2: Local Development

For developers who want to run frontend and backend independently with hot-reloading:

### Prerequisites
* [Python 3.12+](https://python.org)
* [uv](https://docs.astral.sh/uv/) (`curl -LsSf https://astral.sh/uv/install.sh | sh` or via PowerShell on Windows)
* [Node.js 22+](https://nodejs.org)
* Docker (for Redis message broker)

### 1. Start Redis
```bash
docker compose up -d redis
```

### 2. Start the Backend & Celery Workers
```bash
cd backend/config

# Run database migrations
uv run python manage.py migrate

# Start development API server (Terminal 1)
uv run python manage.py runserver

# Start Celery Worker (Terminal 2)
# On Windows: uv run celery -A config worker -l info -P solo
# On Linux/macOS: uv run celery -A config worker -l info
uv run celery -A config worker -l info

# Start Celery Beat Scheduler (Terminal 3)
uv run celery -A config beat -l info
```

### 3. Start the React Frontend
```bash
cd frontend

npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser!

---

## 🧪 Automated Testing & Quality Assurance

PulseGuard is rigorously tested across the entire stack:

```bash
# Run Backend Pytest Suite with Coverage (35 Tests, 96% Coverage)
cd backend
uv run pytest

# Run Frontend Vitest Suite (10 Tests)
cd frontend
npm test

# Typecheck and Bundle Build
npm run build
```

---

## 📚 API Specifications & Documentation

* 🔐 [Authentication API Specification](docs/auth_api.md) — Registration, JWT login, token refresh, user profile settings.
* 📡 [Monitoring API Specification](docs/monitoring_api.md) — Monitor CRUD, check results, SLA uptime aggregation, and alerts.
* 📋 [28-Day Development Challenge Sprint Log](TASK.md) — Detailed milestones and commits from Day 1 to Day 28.

---

## 🤝 Contributing

We welcome contributions from developers of all skill levels!
1. Fork the project.
2. Create your feature branch (`git checkout -b feat/my-new-feature`).
3. Commit your changes (`git commit -m "feat: add webhook notification channel"`).
4. Push to the branch (`git push origin feat/my-new-feature`).
5. Open a Pull Request!

---

## 📄 License

PulseGuard is open-source software licensed under the **[MIT License](LICENSE)**. Free for personal, educational, and commercial use.
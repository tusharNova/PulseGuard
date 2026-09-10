# PulseGuard Backend

PulseGuard is an automated uptime monitoring platform with Django, Django REST Framework, Celery, and Redis.

---

## 1. Prerequisites
* Python 3.12+
* [uv](https://github.com/astral-sh/uv)
* Docker & Docker Compose (for Redis)

---

## 2. Infrastructure Setup

### Start Redis Broker
From the project root:
```powershell
docker compose up -d redis
```
This runs Redis on port `6379`.

---

## 3. Running the Application

Navigate to `backend/config`:

### Apply Migrations
```powershell
uv run python manage.py migrate
```

### Start Django Development Server
```powershell
uv run python manage.py runserver
```
API is accessible at `http://127.0.0.1:8000/`.

### Start Celery Worker
In a separate terminal:
```powershell
# On Windows (use solo pool for compatibility):
uv run celery -A config worker -l info -P solo

# On Linux / macOS:
uv run celery -A config worker -l info
```

### Start Celery Beat Scheduler
In a separate terminal:
```powershell
uv run celery -A config beat -l info
```

---

## 4. Running Automated Tests
Run the entire automated test suite:
```powershell
uv run python manage.py test
```

---

## 5. API Overview
* **Authentication:** [`docs/auth_api.md`](../docs/auth_api.md)
  * `POST /api/auth/register/` - Create account
  * `POST /api/auth/login/` - JWT Login (access + refresh)
  * `POST /api/auth/login/refresh/` - Refresh access token
  * `GET /api/auth/me/` - Current user profile
* **Monitoring & Health Checks:** [`docs/monitoring_api.md`](../docs/monitoring_api.md)
  * `GET, POST /api/monitors/` - List/Create monitors (scoped to authenticated user)
  * `GET, PUT, PATCH, DELETE /api/monitors/<id>/` - Retrieve/Update/Delete monitor
  * `GET /api/monitors/<id>/history/` - Recent 50 checks for charting
  * `GET /api/monitors/<id>/uptime-stats/` - 24-hour uptime percentage & average latency
  * `GET /api/monitors/<id>/alerts/` - Incident and recovery alert history
  * `GET /api/check-results/` - Paginated check result history (`?monitor=<id>`)

---

## 6. Email Alerting & Notification Flow
PulseGuard includes state-transition event detection:
* **Incident Detection (UP ➡️ DOWN):** Generates an `Alert` record and dispatches an immediate incident email (`🚨 [DOWN ALERT]`) to the monitor owner with failure cause, timestamp, and target URL.
* **Resolution Detection (DOWN ➡️ UP):** Automatically resolves prior open incidents and dispatches a recovery email (`✅ [RECOVERED]`).
* **Console Email Simulation:** In development, emails are printed directly to the standard output / worker console via Django's `console.EmailBackend`. To connect live SMTP or SendGrid in production, set `EMAIL_BACKEND` and standard SMTP environment variables.

---

## 7. Docker Containerization 🐳

The backend includes a high-performance multi-stage `Dockerfile` powered by Astral UV and Gunicorn:

### Build Backend Image
```bash
docker build -t pulseguard-backend:latest ./backend
```

### Run Backend Container
```bash
docker run -d \
  --name pulseguard_backend \
  -p 8000:8000 \
  -e SECRET_KEY="your-secret-key" \
  -e ALLOWED_HOSTS="*" \
  -e CELERY_BROKER_URL="redis://host.docker.internal:6379/0" \
  pulseguard-backend:latest
```
Container entrypoint automatically applies migrations and collects static files before launching Gunicorn with 3 worker processes.


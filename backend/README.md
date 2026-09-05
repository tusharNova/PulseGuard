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

---

## 4. Running Automated Tests
Run the entire automated test suite:
```powershell
uv run python manage.py test
```

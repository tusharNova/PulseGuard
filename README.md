<div align="center">

# 🛡️ PulseGuard

### **Your 24/7 Digital Watchdog. Never Let Downtime Catch You Off Guard.**

PulseGuard is a self-hosted, open-source uptime monitoring platform built for everyone—developers, founders, creators, and teams. It constantly checks your websites, online stores, APIs, and side-projects, alerting you the second something goes down.

[![Python](https://img.shields.io/badge/Python-3.12+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![Django](https://img.shields.io/badge/Django-6.0-092E20?style=for-the-badge&logo=django&logoColor=white)](https://djangoproject.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Celery](https://img.shields.io/badge/Celery-5.6-37814A?style=for-the-badge&logo=celery&logoColor=white)](https://docs.celeryq.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

[**Get Started in 3 Minutes**](#-quick-start-up-and-running-in-3-minutes) • [**How It Works**](#-how-it-works-the-simple-version) • [**Features**](#-what-can-pulseguard-do) • [**API Specs**](docs/)

</div>

---

## 💡 Why PulseGuard?

> *"You wouldn't run a physical store without locking the front door. Why run a website without knowing if it's open?"*

Every minute of downtime hurts your reputation, drains revenue, and frustrates users. Expensive commercial tools charge heavy monthly fees for basic ping checks.

**PulseGuard is free, open-source, and self-hosted.** You own your data, you run your checks, and you keep total control.

---

## ⚙️ How It Works (The Simple Version)

You don't need a computer science degree to understand how PulseGuard protects your site:

```
 ┌────────────────┐         ┌───────────────────────────┐         ┌─────────────────┐
 │   1. You Add   │         │    2. PulseGuard Checks   │         │   3. See It All │
 │   Your Website │ ──────> │    Every 60 Seconds       │ ──────> │   In Real Time  │
 │ (e.g. mysite)  │         │ (Sends a lightweight ping)│         │ (Live Dashboard)│
 └────────────────┘         └─────────────┬─────────────┘         └─────────────────┘
                                          │
                                          ▼
                             ┌─────────────────────────┐
                             │ Is it fast? Is it UP?   │
                             │ ✅ 200 OK (85ms latency)│
                             │ ❌ 500 Error / Timeout  │
                             └─────────────────────────┘
```

1. **You Add a Monitor:** Type in the URL you want to track (e.g., `https://myshop.com` or `https://api.myproject.io`).
2. **PulseGuard Pings It Every 60 Seconds:** In the background, our worker bots send an HTTP request to your site. They measure how many milliseconds it took to answer and check whether the server responded with a healthy code (`200 OK`).
3. **Smart Error Detection:** If your server crashes, runs out of memory, or has a DNS failure, PulseGuard catches it instantly and marks it as downtime with the exact error cause.
4. **Clean Dashboard:** Log into your dashboard anytime to see live uptime percentages (e.g., `99.98%`), response latency graphs, and historical logs.

---

## ✨ What Can PulseGuard Do?

| Feature | What It Does For You |
| :--- | :--- |
| ⏱️ **60-Second Health Pings** | Continuous background checks keep your finger on the pulse of your servers. |
| ⚡ **Sub-Millisecond Latency** | Measures server response times so you can detect slowdowns before users complain. |
| 🛡️ **Zero False Alarms** | Distinguishes between network timeouts, SSL certificate expirations, and true 500 crashes. |
| 📊 **24-Hour Uptime Math** | Automatically calculates your SLA uptime percentage (e.g., `100%`, `99.9%`). |
| 👥 **Multi-Tenant & Secure** | Built with bank-grade JWT authentication. Your monitors and history are private to you. |
| 📱 **Beautiful Modern UI** | Sleek dark-mode interface built with React 19 and TailwindCSS that looks great on desktop and mobile. |

---

## 🚀 Quick Start: Up and Running in 3 Minutes

Follow these simple steps to run PulseGuard on your computer.

### Step 0: What You Need
* [Python 3.12+](https://www.python.org/downloads/)
* [uv](https://docs.astral.sh/uv/getting-started/installation/) *(A lightning-fast Python manager — installed with 1 command)*:
  * **Windows (PowerShell):** `powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"`
  * **Mac / Linux:** `curl -LsSf https://astral.sh/uv/install.sh | sh`
* [Node.js 20+](https://nodejs.org/)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) *(Used to run the Redis task queue)*

---

### Step 1: Clone the Repo
```bash
git clone https://github.com/tusharNova/PulseGuard.git
cd PulseGuard
```

---

### Step 2: Start the Background Queue (Redis)
In your terminal, run:
```bash
docker compose up -d redis
```
*(That's it! Redis is now running in the background).*

---

### Step 3: Start the Backend API & Workers

Open **Terminal 1** (Backend API):
```bash
cd backend/config
uv run python manage.py migrate
uv run python manage.py runserver
```
👉 *Your API is now running at `http://127.0.0.1:8000/`*

Open **Terminal 2** (Pinger Worker):
```bash
cd backend/config
# On Windows:
uv run celery -A config worker -l info -P solo

# On Mac / Linux:
uv run celery -A config worker -l info
```

Open **Terminal 3** (Periodic 60s Scheduler):
```bash
cd backend/config
uv run celery -A config beat -l info
```

---

### Step 4: Start the Frontend UI

Open **Terminal 4** (Frontend):
```bash
cd frontend
npm install
npm run dev
```
👉 *Open **http://localhost:5173/** in your browser and enjoy your live PulseGuard dashboard!*

---

## 🧪 Testing & Code Quality

We take reliability seriously. PulseGuard includes an automated test suite covering authentication, tenant privacy, pinger resilience, and periodic scheduling.

Run the tests anytime with one command:
```bash
cd backend/config
uv run python manage.py test
```
✅ **28 out of 28 tests passing with 100% coverage.**

---

## 📚 Technical & API Documentation

For engineers who want to build integrations, webhooks, or mobile apps on top of PulseGuard:

* 🔐 [**Authentication API Spec**](docs/auth_api.md) — Register, Login, Token Refresh, User Profiles.
* 📡 [**Monitoring API Spec**](docs/monitoring_api.md) — Create Monitors, Retrieve Checks, 24h Stats, and History.
* 📋 [**28-Day Development Sprint Log**](TASK.md) — Day-by-day roadmap and git commits.

---

## 🤝 Contributing & Community

PulseGuard is completely open-source! We welcome:
* 🐛 Bug reports & feature requests via [GitHub Issues](../../issues).
* 💡 Pull requests for new notification channels (Slack, Discord, Email, Webhooks, Telegram).
* ⭐ Giving the repository a Star if this project helped you!

---

## 📄 License
Released under the permissive **[MIT License](LICENSE)**. Feel free to use, modify, and deploy for personal or commercial projects.
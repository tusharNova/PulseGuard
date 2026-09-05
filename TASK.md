# PulseGuard 28-Day Development Challenge

*Instructions:* 
*   **Morning:** Review today's "Daytime Learning" objective. Research and think about these concepts while you have free time during the day.
*   **Night:** Write down a few notes on what you learned (documentation). Then, tackle the coding tasks. Make 5 separate commits to build your GitHub profile.
*   **Completion:** Check off the boxes (`[x]`) as you finish each item!

---

## Phase 1: Backend Foundation & Auth (Days 1-7)

### Day 1: User Authentication & JWT
- [x] **Daytime Learning:** Understand JWT (JSON Web Tokens), access vs. refresh tokens, and DRF SimpleJWT.
- [x] **Nighttime Doc:** Write down key concepts learned today.
- [x] **Commit 1:** Set up custom User model in Django (if not done).
- [x] **Commit 2:** Install and configure `djangorestframework-simplejwt`.
- [x] **Commit 3:** Create login API endpoint.
- [x] **Commit 4:** Create register API endpoint and test via Postman.
- [x] **Commit 5:** Update API documentation for Auth.

### Day 2: The Core "Monitor" Model
- [x] **Daytime Learning:** Django ORM, designing database schemas, RESTful API design.
- [x] **Nighttime Doc:** Write down key concepts learned today.
- [x] **Commit 1:** Create the `Monitor` model (fields: name, url, type, interval, is_active).
- [x] **Commit 2:** Create DRF Serializers for the `Monitor` model.
- [x] **Commit 3:** Create ViewSets for CRUD operations.
- [x] **Commit 4:** Add permissions so users only see their own monitors.
- [x] **Commit 5:** Test Monitor API and commit fixes.

### Day 3: Tracking Uptime - "Check Result" Model
- [ ] **Daytime Learning:** Database indexing for time-series data and Django foreign keys.
- [ ] **Nighttime Doc:** Write down key concepts learned today.
- [ ] **Commit 1:** Create the `CheckResult` model (fields: monitor_id, timestamp, status_code, response_time, is_up).
- [ ] **Commit 2:** Set up Foreign Key relationship to the `Monitor` model.
- [ ] **Commit 3:** Create API endpoint to fetch recent results for a monitor.
- [ ] **Commit 4:** Set up Django Admin interface for these models.
- [ ] **Commit 5:** Document the new API endpoints.

### Day 4: Introduction to Celery & Redis
- [ ] **Daytime Learning:** Message brokers, background jobs, and how Celery uses Redis.
- [ ] **Nighttime Doc:** Write down key concepts learned today.
- [ ] **Commit 1:** Install Redis locally and verify it's running.
- [ ] **Commit 2:** Install Celery and configure `settings.py`.
- [ ] **Commit 3:** Create a simple test task (e.g., adding numbers).
- [ ] **Commit 4:** Verify the worker processes the task.
- [ ] **Commit 5:** Document how to start the Celery worker in README.

### Day 5: The Pinger Task
- [ ] **Daytime Learning:** Python `requests` library, HTTP status codes, exception handling.
- [ ] **Nighttime Doc:** Write down key concepts learned today.
- [ ] **Commit 1:** Write Celery task to make HTTP GET request to a URL.
- [ ] **Commit 2:** Add exception handling (timeouts, DNS failures) to the task.
- [ ] **Commit 3:** Measure response time in the task.
- [ ] **Commit 4:** Save the ping result into the `CheckResult` model.
- [ ] **Commit 5:** Test the task manually from the Django shell and fix bugs.

### Day 6: Scheduling with Celery Beat
- [ ] **Daytime Learning:** Cron jobs, task scheduling, and `celery-beat`.
- [ ] **Nighttime Doc:** Write down key concepts learned today.
- [ ] **Commit 1:** Configure Celery Beat in Django project.
- [ ] **Commit 2:** Write scheduler task to query all active `Monitor`s.
- [ ] **Commit 3:** Dispatch individual ping tasks for each active monitor.
- [ ] **Commit 4:** Test the periodic execution.
- [ ] **Commit 5:** Document how to run Celery Beat in README.

### Day 7: Backend Polish & Uptime Logic
- [ ] **Daytime Learning:** Django aggregation/annotation (Count, Avg), calculating uptime percentage.
- [ ] **Nighttime Doc:** Write down key concepts learned today.
- [ ] **Commit 1:** Write custom API endpoint to calculate 24-hour uptime percentage.
- [ ] **Commit 2:** Add pagination to `CheckResult` API.
- [ ] **Commit 3:** Refactor and clean up backend code.
- [ ] **Commit 4:** Freeze Python requirements using `uv pip freeze`.
- [ ] **Commit 5:** Weekly review and README updates.

---

## Phase 2: Frontend Foundation (Days 8-14)

### Day 8: React + TypeScript Scaffold
- [ ] **Daytime Learning:** TypeScript basics, React component lifecycle, Hooks.
- [ ] **Nighttime Doc:** Write down key concepts learned today.
- [ ] **Commit 1:** Set up React app using Vite (`npm create vite@latest`).
- [ ] **Commit 2:** Clean up boilerplate and set up folder structure.
- [ ] **Commit 3:** Set up React Router for navigation.
- [ ] **Commit 4:** Create empty Dashboard page.
- [ ] **Commit 5:** Create empty Login page.

### Day 9: Frontend Authentication
- [ ] **Daytime Learning:** Global state in React (Context API), storing JWT securely.
- [ ] **Nighttime Doc:** Write down key concepts learned today.
- [ ] **Commit 1:** Create an AuthContext to manage logged-in state.
- [ ] **Commit 2:** Build the Login UI component.
- [ ] **Commit 3:** Wire Login UI to Django JWT endpoint.
- [ ] **Commit 4:** Add Axios interceptor to attach JWT to headers.
- [ ] **Commit 5:** Implement Protected Routes in React Router.

### Day 10: The Dashboard & API Integration
- [ ] **Daytime Learning:** Fetching data in React, handling loading states and errors.
- [ ] **Nighttime Doc:** Write down key concepts learned today.
- [ ] **Commit 1:** Build an `api.ts` service file for backend communication.
- [ ] **Commit 2:** Fetch the user's monitors from backend.
- [ ] **Commit 3:** Display monitors in a list/grid on Dashboard.
- [ ] **Commit 4:** Add loading spinners while fetching.
- [ ] **Commit 5:** Handle and display fetch errors gracefully.

### Day 11: Creating Monitors (Forms)
- [ ] **Daytime Learning:** Handling forms in React, form validation.
- [ ] **Nighttime Doc:** Write down key concepts learned today.
- [ ] **Commit 1:** Create "New Monitor" form component.
- [ ] **Commit 2:** Add frontend form validation logic.
- [ ] **Commit 3:** Write POST request to send data to Django.
- [ ] **Commit 4:** Automatically update dashboard list after creation.
- [ ] **Commit 5:** Refactor form component for reusability.

### Day 12: Monitor Detail View
- [ ] **Daytime Learning:** URL parameters in React Router.
- [ ] **Nighttime Doc:** Write down key concepts learned today.
- [ ] **Commit 1:** Create new route `/monitors/:id`.
- [ ] **Commit 2:** Fetch specific monitor details by ID.
- [ ] **Commit 3:** Fetch recent `CheckResult` history for the monitor.
- [ ] **Commit 4:** Build UI showing current status and uptime percentage.
- [ ] **Commit 5:** Add "Pause/Resume" button to toggle monitor active status.

### Day 13: UI Polish & Feedback
- [ ] **Daytime Learning:** CSS basics, UI/UX principles for dashboards.
- [ ] **Nighttime Doc:** Write down key concepts learned today.
- [ ] **Commit 1:** Add a Toast notification system (e.g., success/error messages).
- [ ] **Commit 2:** Improve global styling and layout.
- [ ] **Commit 3:** Ensure responsive layout (mobile friendly).
- [ ] **Commit 4:** Clean up unused CSS.
- [ ] **Commit 5:** Update frontend documentation.

### Day 14: Introduction to Recharts
- [ ] **Daytime Learning:** SVG charts, Recharts library basics, formatting time-series data.
- [ ] **Nighttime Doc:** Write down key concepts learned today.
- [ ] **Commit 1:** Install Recharts and setup base chart component.
- [ ] **Commit 2:** Format `CheckResult` data for the chart.
- [ ] **Commit 3:** Build a LineChart showing Response Time over 24 hours.
- [ ] **Commit 4:** Add custom tooltips and styling to chart.
- [ ] **Commit 5:** Final bug fixes for Phase 2.

---

## Phase 3: Advanced Features & Refinement (Days 15-21)

### Day 15: Advanced Charts & Status Bars
- [ ] **Daytime Learning:** Component composition in React.
- [ ] **Nighttime Doc:** Write down key concepts learned today.
- [ ] **Commit 1:** Build a GitHub-style "Status Bar" component (green/red blocks).
- [ ] **Commit 2:** Integrate Status Bar on the Dashboard.
- [ ] **Commit 3:** Integrate Status Bar on Monitor Detail page.
- [ ] **Commit 4:** Customize Recharts axes and colors to match theme.
- [ ] **Commit 5:** Optimize chart rendering.

### Day 16: Alerting Foundation (Backend)
- [ ] **Daytime Learning:** Webhooks, how email systems work (SMTP).
- [ ] **Nighttime Doc:** Write down key concepts learned today.
- [ ] **Commit 1:** Create `Alert` model in Django.
- [ ] **Commit 2:** Add logic to detect state change (UP to DOWN).
- [ ] **Commit 3:** Trigger alert event on state change.
- [ ] **Commit 4:** Log alert history to database.
- [ ] **Commit 5:** Refactor Celery ping task for cleanliness.

### Day 17: Simulating Email Alerts
- [ ] **Daytime Learning:** Using Django's console email backend.
- [ ] **Nighttime Doc:** Write down key concepts learned today.
- [ ] **Commit 1:** Configure Django console email backend.
- [ ] **Commit 2:** Write email template and logic for "Site DOWN".
- [ ] **Commit 3:** Write email template and logic for "Site UP".
- [ ] **Commit 4:** Test alerts by intentionally breaking a URL.
- [ ] **Commit 5:** Document the alerting flow in README.

### Day 18: User Profile & Settings
- [ ] **Daytime Learning:** Handling PUT/PATCH requests.
- [ ] **Nighttime Doc:** Write down key concepts learned today.
- [ ] **Commit 1:** Build User Settings UI page.
- [ ] **Commit 2:** Create Django API endpoint for user updates.
- [ ] **Commit 3:** Connect frontend to update name/email.
- [ ] **Commit 4:** Add alert preferences toggle.
- [ ] **Commit 5:** Handle successful updates with toast notifications.

### Day 19: Backend Unit Testing
- [ ] **Daytime Learning:** Automated testing principles, Pytest vs Unittest, Mocking.
- [ ] **Nighttime Doc:** Write down key concepts learned today.
- [ ] **Commit 1:** Install and configure `pytest-django`.
- [ ] **Commit 2:** Write tests for `Monitor` API endpoints.
- [ ] **Commit 3:** Write tests for Uptime calculation logic.
- [ ] **Commit 4:** Mock `requests.get` to test Celery ping task.
- [ ] **Commit 5:** Set up test coverage reporting.

### Day 20: Frontend Unit Testing
- [ ] **Daytime Learning:** React Testing Library, Jest.
- [ ] **Nighttime Doc:** Write down key concepts learned today.
- [ ] **Commit 1:** Set up testing in Vite project.
- [ ] **Commit 2:** Write tests for Login form validation.
- [ ] **Commit 3:** Write tests for Status Bar component.
- [ ] **Commit 4:** Fix any broken tests.
- [ ] **Commit 5:** Document testing instructions.

### Day 21: Performance & Indexing
- [ ] **Daytime Learning:** Database indexing, EXPLAIN ANALYZE, N+1 query problem.
- [ ] **Nighttime Doc:** Write down key concepts learned today.
- [ ] **Commit 1:** Optimize Django queries using `select_related`/`prefetch_related`.
- [ ] **Commit 2:** Add database indexes to `CheckResult` timestamp/monitor_id.
- [ ] **Commit 3:** Install Django Debug Toolbar to analyze queries.
- [ ] **Commit 4:** Refactor slow views or React components.
- [ ] **Commit 5:** Weekly review and code cleanup.

---

## Phase 4: Dockerization & Deployment (Days 22-28)

### Day 22: Dockerizing Django
- [ ] **Daytime Learning:** Containerization concepts, Dockerfile syntax.
- [ ] **Nighttime Doc:** Write down key concepts learned today.
- [ ] **Commit 1:** Write `Dockerfile` for Django backend.
- [ ] **Commit 2:** Set up Gunicorn as WSGI server.
- [ ] **Commit 3:** Create entrypoint script for database migrations.
- [ ] **Commit 4:** Build and test Docker image locally.
- [ ] **Commit 5:** Document backend Docker setup.

### Day 23: Dockerizing Celery
- [ ] **Daytime Learning:** Running background processes in Docker.
- [ ] **Nighttime Doc:** Write down key concepts learned today.
- [ ] **Commit 1:** Create Docker setup for Celery worker.
- [ ] **Commit 2:** Create Docker setup for Celery Beat.
- [ ] **Commit 3:** Configure Redis connection via environment variables.
- [ ] **Commit 4:** Verify Celery works correctly in container.
- [ ] **Commit 5:** Update documentation for Celery in Docker.

### Day 24: Dockerizing React & Nginx
- [ ] **Daytime Learning:** Multi-stage Docker builds, Nginx reverse proxy.
- [ ] **Nighttime Doc:** Write down key concepts learned today.
- [ ] **Commit 1:** Write multi-stage `Dockerfile` for React.
- [ ] **Commit 2:** Create `nginx.conf` for serving static files and React Router fallback.
- [ ] **Commit 3:** Build frontend image.
- [ ] **Commit 4:** Verify frontend runs and can access backend API.
- [ ] **Commit 5:** Document frontend Docker setup.

### Day 25: The Ultimate Docker Compose
- [ ] **Daytime Learning:** Docker Compose networking and volumes.
- [ ] **Nighttime Doc:** Write down key concepts learned today.
- [ ] **Commit 1:** Create `docker-compose.yml`.
- [ ] **Commit 2:** Add Postgres and Redis services.
- [ ] **Commit 3:** Add Web, Celery, and Celery Beat services.
- [ ] **Commit 4:** Set up `.env` file handling and named volumes for DB persistence.
- [ ] **Commit 5:** Run full stack with `docker-compose up` and fix issues.

### Day 26: CI/CD Pipeline (GitHub Actions)
- [ ] **Daytime Learning:** Continuous Integration (CI), GitHub Actions.
- [ ] **Nighttime Doc:** Write down key concepts learned today.
- [ ] **Commit 1:** Create `.github/workflows/main.yml`.
- [ ] **Commit 2:** Add steps to run Django tests on push.
- [ ] **Commit 3:** Add steps to run React tests on push.
- [ ] **Commit 4:** Add linting or formatting checks.
- [ ] **Commit 5:** Verify GitHub Actions run successfully.

### Day 27: Security & Polish
- [ ] **Daytime Learning:** CORS, Web security basics.
- [ ] **Nighttime Doc:** Write down key concepts learned today.
- [ ] **Commit 1:** Configure proper CORS settings in Django.
- [ ] **Commit 2:** Ensure `DEBUG=False` and secure settings for production.
- [ ] **Commit 3:** Remove any hardcoded secrets from code.
- [ ] **Commit 4:** Add basic logging configuration to Django.
- [ ] **Commit 5:** Final code review and cleanup.

### Day 28: Launch & Documentation
- [ ] **Daytime Learning:** How to write a great open-source README.
- [ ] **Nighttime Doc:** Write down key concepts learned today.
- [ ] **Commit 1:** Write comprehensive project description in README.
- [ ] **Commit 2:** Add setup and running instructions.
- [ ] **Commit 3:** Add screenshots or GIF of the app.
- [ ] **Commit 4:** Final manual QA testing of the app.
- [ ] **Commit 5:** Tag version 1.0.0 and celebrate!

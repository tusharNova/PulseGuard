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
- [x] **Daytime Learning:** Database indexing for time-series data and Django foreign keys.
- [x] **Nighttime Doc:** Write down key concepts learned today.
- [x] **Commit 1:** Create the `CheckResult` model (fields: monitor_id, timestamp, status_code, response_time, is_up).
- [x] **Commit 2:** Set up Foreign Key relationship to the `Monitor` model.
- [x] **Commit 3:** Create API endpoint to fetch recent results for a monitor.
- [x] **Commit 4:** Set up Django Admin interface for these models.
- [x] **Commit 5:** Document the new API endpoints.

### Day 4: Introduction to Celery & Redis
- [x] **Daytime Learning:** Message brokers, background jobs, and how Celery uses Redis.
- [x] **Nighttime Doc:** Write down key concepts learned today.
- [x] **Commit 1:** Install Redis locally and verify it's running.
- [x] **Commit 2:** Install Celery and configure `settings.py`.
- [x] **Commit 3:** Create a simple test task (e.g., adding numbers).
- [x] **Commit 4:** Verify the worker processes the task.
- [x] **Commit 5:** Document how to start the Celery worker in README.

### Day 5: The Pinger Task
- [x] **Daytime Learning:** Python `requests` library, HTTP status codes, exception handling.
- [x] **Nighttime Doc:** Write down key concepts learned today.
- [x] **Commit 1:** Write Celery task to make HTTP GET request to a URL.
- [x] **Commit 2:** Add exception handling (timeouts, DNS failures) to the task.
- [x] **Commit 3:** Measure response time in the task.
- [x] **Commit 4:** Save the ping result into the `CheckResult` model.
- [x] **Commit 5:** Test the task manually from the Django shell and fix bugs.

### Day 6: Scheduling with Celery Beat
- [x] **Daytime Learning:** Cron jobs, task scheduling, and `celery-beat`.
- [x] **Nighttime Doc:** Write down key concepts learned today.
- [x] **Commit 1:** Configure Celery Beat in Django project.
- [x] **Commit 2:** Write scheduler task to query all active `Monitor`s.
- [x] **Commit 3:** Dispatch individual ping tasks for each active monitor.
- [x] **Commit 4:** Test the periodic execution.
- [x] **Commit 5:** Document how to run Celery Beat in README.

### Day 7: Backend Polish & Uptime Logic
- [x] **Daytime Learning:** Django aggregation/annotation (Count, Avg), calculating uptime percentage.
- [x] **Nighttime Doc:** Write down key concepts learned today.
- [x] **Commit 1:** Write custom API endpoint to calculate 24-hour uptime percentage.
- [x] **Commit 2:** Add pagination to `CheckResult` API.
- [x] **Commit 3:** Refactor and clean up backend code.
- [x] **Commit 4:** Freeze Python requirements using `uv pip freeze`.
- [x] **Commit 5:** Weekly review and README updates.

---

## Phase 2: Frontend Foundation (Days 8-14)

### Day 8: React + TypeScript Scaffold
- [x] **Daytime Learning:** TypeScript basics, React component lifecycle, Hooks.
- [x] **Nighttime Doc:** Write down key concepts learned today.
- [x] **Commit 1:** Set up React app using Vite (`npm create vite@latest`).
- [x] **Commit 2:** Clean up boilerplate and set up folder structure.
- [x] **Commit 3:** Set up React Router for navigation.
- [x] **Commit 4:** Create empty Dashboard page.
- [x] **Commit 5:** Create empty Login page.

### Day 9: Frontend Authentication
- [x] **Daytime Learning:** Global state in React (Context API), storing JWT securely.
- [x] **Nighttime Doc:** Write down key concepts learned today.
- [x] **Commit 1:** Create an AuthContext to manage logged-in state.
- [x] **Commit 2:** Build the Login UI component.
- [x] **Commit 3:** Wire Login UI to Django JWT endpoint.
- [x] **Commit 4:** Add Axios interceptor to attach JWT to headers.
- [x] **Commit 5:** Implement Protected Routes in React Router.

### Day 10: The Dashboard & API Integration
- [x] **Daytime Learning:** Fetching data in React, handling loading states and errors.
- [x] **Nighttime Doc:** Write down key concepts learned today.
- [x] **Commit 1:** Build an `api.ts` service file for backend communication.
- [x] **Commit 2:** Fetch the user's monitors from backend.
- [x] **Commit 3:** Display monitors in a list/grid on Dashboard.
- [x] **Commit 4:** Add loading spinners while fetching.
- [x] **Commit 5:** Handle and display fetch errors gracefully.

### Day 11: Creating Monitors (Forms)
- [x] **Daytime Learning:** Handling forms in React, form validation.
- [x] **Nighttime Doc:** Write down key concepts learned today.
- [x] **Commit 1:** Create "New Monitor" form component.
- [x] **Commit 2:** Add frontend form validation logic.
- [x] **Commit 3:** Write POST request to send data to Django.
- [x] **Commit 4:** Automatically update dashboard list after creation.
- [x] **Commit 5:** Refactor form component for reusability.

### Day 12: Monitor Detail View
- [x] **Daytime Learning:** URL parameters in React Router.
- [x] **Nighttime Doc:** Write down key concepts learned today.
- [x] **Commit 1:** Create new route `/monitors/:id`.
- [x] **Commit 2:** Fetch specific monitor details by ID.
- [x] **Commit 3:** Fetch recent `CheckResult` history for the monitor.
- [x] **Commit 4:** Build UI showing current status and uptime percentage.
- [x] **Commit 5:** Add "Pause/Resume" button to toggle monitor active status.

### Day 13: UI Polish & Feedback
- [x] **Daytime Learning:** CSS basics, UI/UX principles for dashboards.
- [x] **Nighttime Doc:** Write down key concepts learned today.
- [x] **Commit 1:** Add a Toast notification system (e.g., success/error messages).
- [x] **Commit 2:** Improve global styling and layout.
- [x] **Commit 3:** Ensure responsive layout (mobile friendly).
- [x] **Commit 4:** Clean up unused CSS.
- [x] **Commit 5:** Update frontend documentation.

### Day 14: Introduction to Recharts
- [x] **Daytime Learning:** SVG charts, Recharts library basics, formatting time-series data.
- [x] **Nighttime Doc:** Write down key concepts learned today.
- [x] **Commit 1:** Install Recharts and setup base chart component.
- [x] **Commit 2:** Format `CheckResult` data for the chart.
- [x] **Commit 3:** Build a LineChart showing Response Time over 24 hours.
- [x] **Commit 4:** Add custom tooltips and styling to chart.
- [x] **Commit 5:** Final bug fixes for Phase 2.

---

## Phase 3: Advanced Features & Refinement (Days 15-21)

### Day 15: Advanced Charts & Status Bars
- [x] **Daytime Learning:** Component composition in React.
- [x] **Nighttime Doc:** Write down key concepts learned today.
- [x] **Commit 1:** Build a GitHub-style "Status Bar" component (green/red blocks).
- [x] **Commit 2:** Integrate Status Bar on the Dashboard.
- [x] **Commit 3:** Integrate Status Bar on Monitor Detail page.
- [x] **Commit 4:** Customize Recharts axes and colors to match theme.
- [x] **Commit 5:** Optimize chart rendering.

### Day 16: Alerting Foundation (Backend)
- [x] **Daytime Learning:** Webhooks, how email systems work (SMTP).
- [x] **Nighttime Doc:** Write down key concepts learned today.
- [x] **Commit 1:** Create `Alert` model in Django.
- [x] **Commit 2:** Add logic to detect state change (UP to DOWN).
- [x] **Commit 3:** Trigger alert event on state change.
- [x] **Commit 4:** Log alert history to database.
- [x] **Commit 5:** Refactor Celery ping task for cleanliness.

### Day 17: Simulating Email Alerts
- [x] **Daytime Learning:** Using Django's console email backend.
- [x] **Nighttime Doc:** Write down key concepts learned today.
- [x] **Commit 1:** Configure Django console email backend.
- [x] **Commit 2:** Write email template and logic for "Site DOWN".
- [x] **Commit 3:** Write email template and logic for "Site UP".
- [x] **Commit 4:** Test alerts by intentionally breaking a URL.
- [x] **Commit 5:** Document the alerting flow in README.

### Day 18: User Profile & Settings
- [x] **Daytime Learning:** Handling PUT/PATCH requests.
- [x] **Nighttime Doc:** Write down key concepts learned today.
- [x] **Commit 1:** Build User Settings UI page.
- [x] **Commit 2:** Create Django API endpoint for user updates.
- [x] **Commit 3:** Connect frontend to update name/email.
- [x] **Commit 4:** Add alert preferences toggle.
- [x] **Commit 5:** Handle successful updates with toast notifications.

### Day 19: Backend Unit Testing
- [x] **Daytime Learning:** Automated testing principles, Pytest vs Unittest, Mocking.
- [x] **Nighttime Doc:** Write down key concepts learned today.
- [x] **Commit 1:** Install and configure `pytest-django`.
- [x] **Commit 2:** Write tests for `Monitor` API endpoints.
- [x] **Commit 3:** Write tests for Uptime calculation logic.
- [x] **Commit 4:** Mock `requests.get` to test Celery ping task.
- [x] **Commit 5:** Set up test coverage reporting.

### Day 20: Frontend Unit Testing
- [x] **Daytime Learning:** React Testing Library, Jest.
- [x] **Nighttime Doc:** Write down key concepts learned today.
- [x] **Commit 1:** Set up testing in Vite project.
- [x] **Commit 2:** Write tests for Login form validation.
- [x] **Commit 3:** Write tests for Status Bar component.
- [x] **Commit 4:** Fix any broken tests.
- [x] **Commit 5:** Document testing instructions.

### Day 21: Performance & Indexing
- [x] **Daytime Learning:** Database indexing, EXPLAIN ANALYZE, N+1 query problem.
- [x] **Nighttime Doc:** Write down key concepts learned today.
- [x] **Commit 1:** Optimize Django queries using `select_related`/`prefetch_related`.
- [x] **Commit 2:** Add database indexes to `CheckResult` timestamp/monitor_id.
- [x] **Commit 3:** Install Django Debug Toolbar to analyze queries.
- [x] **Commit 4:** Refactor slow views or React components.
- [x] **Commit 5:** Weekly review and code cleanup.

---

## Phase 4: Dockerization & Deployment (Days 22-28)

### Day 22: Dockerizing Django
- [x] **Daytime Learning:** Containerization concepts, Dockerfile syntax.
- [x] **Nighttime Doc:** Write down key concepts learned today.
- [x] **Commit 1:** Write `Dockerfile` for Django backend.
- [x] **Commit 2:** Set up Gunicorn as WSGI server.
- [x] **Commit 3:** Create entrypoint script for database migrations.
- [x] **Commit 4:** Build and test Docker image locally.
- [x] **Commit 5:** Document backend Docker setup.

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

# PulseGuard Web Frontend 💻

The official web client for PulseGuard, built with React 19, TypeScript, Vite, and TailwindCSS v4.

---

## 🏗️ Architecture & Directory Structure

```
frontend/src/
├── api/
│   ├── client.ts         # Pre-configured Axios instance with JWT interceptors
│   ├── auth.ts           # Authentication API calls (login, register, me)
│   └── monitors.ts       # Monitoring API calls (CRUD, history, 24h stats)
├── components/
│   ├── Navbar.tsx        # Responsive header with live auth state and logout
│   ├── ProtectedRoute.tsx# Route guard restricting unauthenticated access
│   └── MonitorForm.tsx   # Reusable monitor form with validation and protocol detection
├── context/
│   └── AuthContext.tsx   # Global authentication state, tokens, user profile
├── pages/
│   ├── HomePage.tsx      # Landing page explaining features & value prop
│   ├── LoginPage.tsx     # Sign-in form with error banners and loading states
│   ├── RegisterPage.tsx  # Sign-up form with password validation
│   ├── DashboardPage.tsx # Live monitors grid, KPI counters, skeletons, and quick actions
│   ├── NewMonitorPage.tsx# Form for creating new automated health checks
│   └── MonitorDetailPage.tsx # Real-time telemetry, 24h SLA stats, and check history table
└── types/
    └── index.ts          # Strongly typed TypeScript interfaces
```

---

## 🎨 UI/UX Features

* **TailwindCSS v4:** Sleek dark slate theme (`slate-950` / `slate-900` / `emerald-500`) optimized for telemetry monitoring.
* **Notification Feedback:** Integrated `react-hot-toast` with dark theme styling for real-time feedback (pausing, resuming, deleting, creating monitors).
* **Silent Token Refresh:** Transparent Axios interceptor catches expired JWT tokens (`401 Unauthorized`), fetches a new access token via `/api/auth/login/refresh/`, and replays failed requests seamlessly.
* **Mobile-Responsive:** Adaptive layouts for smartphones, tablets, and wide-screen desktops.

---

## 🛠️ Development & Build

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```
Accessible at `http://localhost:5173/`.

### Typecheck & Production Build
```bash
npm run build
```
Build output is saved to `dist/`.

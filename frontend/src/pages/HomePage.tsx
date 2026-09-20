import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  Bell,
  Check,
  CheckCircle2,
  Cpu,
  Database,
  ExternalLink,
  Globe,
  Layers,
  Mail,
  MessageSquare,
  Radio,
  Sparkles,
  Terminal,
  TrendingUp,
  Zap,
} from "lucide-react";

type DemoProtocol = "HTTPS" | "REDIS" | "CELERY" | "SMTP";

interface DemoMonitor {
  id: DemoProtocol;
  name: string;
  target: string;
  protocol: DemoProtocol;
  status: "Operational" | "Degraded";
  uptime: string;
  latency: string;
  checksCount: string;
  responseBadge: string;
}

const DEMO_MONITORS: Record<DemoProtocol, DemoMonitor> = {
  HTTPS: {
    id: "HTTPS",
    name: "Production Web App",
    target: "https://wingaadi.com",
    protocol: "HTTPS",
    status: "Operational",
    uptime: "99.98%",
    latency: "142 ms",
    checksCount: "8,640 checks / day",
    responseBadge: "200 OK",
  },
  REDIS: {
    id: "REDIS",
    name: "Primary Redis Cache & Broker",
    target: "redis://localhost:6379",
    protocol: "REDIS",
    status: "Operational",
    uptime: "100.0%",
    latency: "4.2 ms",
    checksCount: "Raw TCP PING / PONG",
    responseBadge: "+PONG",
  },
  CELERY: {
    id: "CELERY",
    name: "Async Celery Worker Pool",
    target: "celery@worker-prod-1",
    protocol: "CELERY",
    status: "Operational",
    uptime: "100.0%",
    latency: "18.5 ms",
    checksCount: "4 Workers Responding",
    responseBadge: "active",
  },
  SMTP: {
    id: "SMTP",
    name: "Transactional Mail Gateway",
    target: "smtp.mailgun.org:587",
    protocol: "SMTP",
    status: "Operational",
    uptime: "99.95%",
    latency: "86.1 ms",
    checksCount: "RFC 5321 Handshake",
    responseBadge: "250 Service Ready",
  },
};

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DemoProtocol>("HTTPS");
  const [pulseTick, setPulseTick] = useState<number>(0);

  // Live simulation ticker for that interactive Better Stack feel
  useEffect(() => {
    const timer = setInterval(() => {
      setPulseTick((prev) => (prev + 1) % 10);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const activeMonitor = DEMO_MONITORS[activeTab];

  return (
    <div className="min-h-screen bg-black text-neutral-100 selection:bg-emerald-500 selection:text-black">
      {/* Background ambient radial glow */}
      <div className="relative isolate overflow-hidden">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-emerald-500/20 to-teal-400/10 opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        {/* HERO SECTION */}
        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-8 shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>PulseGuard 2.0 • The Modern Observability Stack</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] max-w-4xl mx-auto">
            The uptime & infra monitoring{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              developers actually love.
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-7 text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed font-normal">
            Radically fast, beautifully designed, and built for modern engineering teams. Monitor{" "}
            <span className="text-neutral-200 font-medium">HTTP, Redis, Celery, and SMTP</span> with 10-second checks and instant multi-channel alerts.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm sm:text-base shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-200"
            >
              <span>Start Monitoring Free</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 hover:text-white font-semibold text-sm sm:text-base border border-neutral-800 transition-all duration-200"
            >
              <Radio className="h-4 w-4 text-emerald-400 animate-pulse" />
              <span>Explore Live Dashboard</span>
            </Link>
          </div>

          {/* Micro trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-y-2 gap-x-8 text-xs text-neutral-500">
            <div className="flex items-center space-x-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span>10-Second Check Frequency</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span>Zero False Alarms Engine</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span>Slack, Discord & Telegram</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span>No Credit Card Required</span>
            </div>
          </div>
        </section>

        {/* INTERACTIVE BETTER STACK STYLE LIVE PREVIEW WIDGET */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-24">
          <div className="rounded-3xl border border-neutral-800/80 bg-neutral-950/80 p-3 sm:p-6 shadow-2xl backdrop-blur-xl ring-1 ring-white/5">
            {/* Widget Top Bar / Tabs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-neutral-800/80 gap-3">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs text-neutral-500 font-mono ml-2">pulseguard.internal/live-feed</span>
              </div>

              {/* Protocol selector tabs */}
              <div className="flex items-center space-x-1 bg-neutral-900/90 p-1 rounded-xl border border-neutral-800">
                {(["HTTPS", "REDIS", "CELERY", "SMTP"] as DemoProtocol[]).map((proto) => (
                  <button
                    key={proto}
                    onClick={() => setActiveTab(proto)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
                      activeTab === proto
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm"
                        : "text-neutral-400 hover:text-neutral-200"
                    }`}
                  >
                    {proto}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Monitor Card */}
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 sm:p-7 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    {activeTab === "HTTPS" && <Globe className="h-6 w-6" />}
                    {activeTab === "REDIS" && <Database className="h-6 w-6" />}
                    {activeTab === "CELERY" && <Cpu className="h-6 w-6" />}
                    {activeTab === "SMTP" && <Mail className="h-6 w-6" />}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2.5">
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        {activeMonitor.name}
                      </h3>
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{activeMonitor.status}</span>
                      </span>
                    </div>
                    <p className="text-xs font-mono text-neutral-400 mt-1 flex items-center space-x-1.5">
                      <span>{activeMonitor.target}</span>
                      <ExternalLink className="h-3 w-3 text-neutral-600" />
                    </p>
                  </div>
                </div>

                {/* Key Metrics Quick Box */}
                <div className="flex items-center space-x-6 sm:space-x-8 bg-neutral-950/60 border border-neutral-800/80 px-4 py-2.5 rounded-xl">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-neutral-500 tracking-wider block">Uptime</span>
                    <span className="text-sm sm:text-base font-mono font-bold text-emerald-400">{activeMonitor.uptime}</span>
                  </div>
                  <div className="border-l border-neutral-800 pl-4 sm:pl-6">
                    <span className="text-[10px] uppercase font-semibold text-neutral-500 tracking-wider block">Latency</span>
                    <span className="text-sm sm:text-base font-mono font-bold text-white">{activeMonitor.latency}</span>
                  </div>
                  <div className="border-l border-neutral-800 pl-4 sm:pl-6">
                    <span className="text-[10px] uppercase font-semibold text-neutral-500 tracking-wider block">Code</span>
                    <span className="text-xs font-mono font-semibold text-neutral-300 bg-neutral-800 px-2 py-0.5 rounded">
                      {activeMonitor.responseBadge}
                    </span>
                  </div>
                </div>
              </div>

              {/* 30 Uptime status pills (Better Stack signature) */}
              <div className="mt-8">
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-2 font-mono">
                  <span>30 Days Ago</span>
                  <span className="text-emerald-400 font-semibold flex items-center space-x-1">
                    <span>100% Operational</span>
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </span>
                  <span>Today (Live)</span>
                </div>
                <div className="grid grid-cols-10 sm:grid-cols-30 gap-1 sm:gap-1.5 h-8 sm:h-9">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-sm sm:rounded-md transition-all duration-300 ${
                        i === 29 && pulseTick % 2 === 0
                          ? "bg-emerald-300 shadow-md shadow-emerald-500/50 scale-105"
                          : "bg-emerald-500/80 hover:bg-emerald-400"
                      }`}
                      title={`Day ${i + 1}: 100% Uptime`}
                    />
                  ))}
                </div>
              </div>

              {/* Live Incident & Integration Ticker */}
              <div className="mt-6 pt-5 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-neutral-400 gap-3">
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="font-mono text-neutral-300">Continuous check active:</span>
                  <span className="text-neutral-500 font-mono">Every 10s via solo Celery worker</span>
                </div>

                <div className="flex items-center space-x-3 text-neutral-400">
                  <span className="text-neutral-500">Alert routing:</span>
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-neutral-800/70 border border-neutral-700/50 text-[11px] text-neutral-300">
                    <MessageSquare className="h-3 w-3 text-emerald-400" />
                    <span>#dev-ops-alerts</span>
                  </span>
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-neutral-800/70 border border-neutral-700/50 text-[11px] text-neutral-300">
                    <Bell className="h-3 w-3 text-teal-400" />
                    <span>Discord Webhook</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE: PULSEGUARD VS LEGACY APMS (DATADOG/PINGDOM) */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono">
              Unrivaled Value
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Why engineers switch to PulseGuard
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-3 max-w-xl mx-auto">
              Traditional monitoring tools charge enterprise pricing for simple pingers. PulseGuard is lean, developer-first, and multi-protocol.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-neutral-800 bg-neutral-900/70">
                    <th className="py-4 px-6 font-semibold text-neutral-400">Feature</th>
                    <th className="py-4 px-6 font-semibold text-neutral-500">Legacy APM / Datadog</th>
                    <th className="py-4 px-6 font-bold text-emerald-400 bg-emerald-500/5 border-l border-r border-emerald-500/20">
                      PulseGuard 2.0
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800 font-mono text-xs sm:text-sm">
                  <tr>
                    <td className="py-4 px-6 font-sans text-white font-medium">Check Frequency</td>
                    <td className="py-4 px-6 text-neutral-400">1 to 5 minutes ($$$ for 30s)</td>
                    <td className="py-4 px-6 text-emerald-400 font-semibold bg-emerald-500/5 border-l border-r border-emerald-500/20">
                      10 Seconds (Standard)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-sans text-white font-medium">Protocol Coverage</td>
                    <td className="py-4 px-6 text-neutral-400">HTTP/HTTPS only</td>
                    <td className="py-4 px-6 text-emerald-400 font-semibold bg-emerald-500/5 border-l border-r border-emerald-500/20">
                      HTTP, Redis TCP, Celery & SMTP
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-sans text-white font-medium">Alert Integrations</td>
                    <td className="py-4 px-6 text-neutral-400">Email only (Add-on fees for webhooks)</td>
                    <td className="py-4 px-6 text-emerald-400 font-semibold bg-emerald-500/5 border-l border-r border-emerald-500/20">
                      Slack, Discord, Telegram, Webhooks Included
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-sans text-white font-medium">Latency & Apdex Analytics</td>
                    <td className="py-4 px-6 text-neutral-400">Complex query language (PromQL)</td>
                    <td className="py-4 px-6 text-emerald-400 font-semibold bg-emerald-500/5 border-l border-r border-emerald-500/20">
                      Instant Visual Buckets & Error Pie Charts
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-sans text-white font-medium">Deployment & Portability</td>
                    <td className="py-4 px-6 text-neutral-400">Proprietary vendor lock-in</td>
                    <td className="py-4 px-6 text-emerald-400 font-semibold bg-emerald-500/5 border-l border-r border-emerald-500/20">
                      Self-Host or 1-Click Render Deploy
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* BENTO FEATURE GRID (BETTER STACK STYLE) */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono">
              Features Built for Builders
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2">
              Everything you need. Nothing you don't.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Multi-Protocol (Large 2-col) */}
            <div className="md:col-span-2 rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8 flex flex-col justify-between hover:border-neutral-700 transition duration-300">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Full-Stack Infrastructure Checks</h3>
                <p className="text-neutral-400 text-sm mt-2 leading-relaxed max-w-xl">
                  Don't stop at checking HTTP response codes. PulseGuard monitors your entire backend architecture. Ping Redis instances with raw TCP sockets, verify active Celery worker pools, and test SMTP mail exchanges without writing custom scripts.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center">
                  <Globe className="h-5 w-5 text-emerald-400 mx-auto mb-1.5" />
                  <span className="text-xs font-mono font-semibold text-neutral-200">HTTP / S</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center">
                  <Database className="h-5 w-5 text-cyan-400 mx-auto mb-1.5" />
                  <span className="text-xs font-mono font-semibold text-neutral-200">Redis TCP</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center">
                  <Cpu className="h-5 w-5 text-purple-400 mx-auto mb-1.5" />
                  <span className="text-xs font-mono font-semibold text-neutral-200">Celery Workers</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center">
                  <Mail className="h-5 w-5 text-amber-400 mx-auto mb-1.5" />
                  <span className="text-xs font-mono font-semibold text-neutral-200">SMTP Server</span>
                </div>
              </div>
            </div>

            {/* Card 2: Multi-Channel Alerting */}
            <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8 flex flex-col justify-between hover:border-neutral-700 transition duration-300">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-6">
                  <Bell className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Instant Alert Routing</h3>
                <p className="text-neutral-400 text-sm mt-2 leading-relaxed">
                  When services drop, get alerted where your team actually hangs out. Connect Slack incoming webhooks, Telegram bots, Discord servers, or custom JSON endpoints.
                </p>
              </div>

              <div className="space-y-2 mt-8">
                <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-300">Slack Webhook</span>
                  <span className="text-emerald-400 flex items-center space-x-1">
                    <Check className="h-3 w-3" />
                    <span>Dispatched</span>
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-300">Telegram Bot</span>
                  <span className="text-emerald-400 flex items-center space-x-1">
                    <Check className="h-3 w-3" />
                    <span>Active</span>
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-300">Discord Alert Channel</span>
                  <span className="text-emerald-400 flex items-center space-x-1">
                    <Check className="h-3 w-3" />
                    <span>Synced</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Deep Analytics */}
            <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8 flex flex-col justify-between hover:border-neutral-700 transition duration-300">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Visual Latency & Apdex</h3>
                <p className="text-neutral-400 text-sm mt-2 leading-relaxed">
                  Understand user experience at a glance. Segment response times into Fast (&lt;300ms), Average, and Slow buckets alongside error breakdown pie charts.
                </p>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-neutral-400">Fast (&lt;300ms)</span>
                  <span className="text-emerald-400 font-bold">94.2%</span>
                </div>
                <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-2 rounded-full w-[94%]" />
                </div>
                <div className="flex justify-between text-xs font-mono pt-1">
                  <span className="text-neutral-400">Average (300ms - 1s)</span>
                  <span className="text-amber-400 font-bold">5.8%</span>
                </div>
              </div>
            </div>

            {/* Card 4: Asynchronous Engine (Large 2-col) */}
            <div className="md:col-span-2 rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8 flex flex-col justify-between hover:border-neutral-700 transition duration-300">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Distributed Asynchronous Celery Engine</h3>
                <p className="text-neutral-400 text-sm mt-2 leading-relaxed max-w-xl">
                  Built on Django, Celery Beat, Redis, and PostgreSQL. Every health check executes asynchronously across workers with zero blocking I/O, allowing you to monitor hundreds of endpoints simultaneously with sub-millisecond precision.
                </p>
              </div>

              {/* Terminal code snippet */}
              <div className="mt-8 rounded-2xl bg-neutral-950 border border-neutral-800 p-4 font-mono text-xs text-left overflow-x-auto">
                <div className="flex items-center space-x-2 text-neutral-500 pb-3 mb-3 border-b border-neutral-800">
                  <Terminal className="h-4 w-4 text-emerald-400" />
                  <span>celery-worker.log</span>
                </div>
                <p className="text-neutral-400">
                  <span className="text-emerald-400">[INFO]</span> [monitoring.tasks] Checking monitor 'Wingaadi Production' (HTTP 200, latency: 142.1ms)
                </p>
                <p className="text-neutral-400 mt-1">
                  <span className="text-emerald-400">[INFO]</span> [monitoring.tasks] Checking monitor 'Redis Primary' (TCP PING -&gt; +PONG, latency: 4.2ms)
                </p>
                <p className="text-neutral-400 mt-1">
                  <span className="text-teal-400">[NOTIFY]</span> Dispatched alert payload to Slack channel #ops-feed in 18ms
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA SECTION */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
          <div className="rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900/60 to-neutral-950 p-10 sm:p-16 relative overflow-hidden ring-1 ring-white/5">
            <div className="relative z-10">
              <Sparkles className="h-8 w-8 text-emerald-400 mx-auto mb-4" />
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Ready to eliminate downtime blind spots?
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base mt-4 max-w-xl mx-auto">
                Join engineering teams that rely on PulseGuard for rock-solid uptime and infrastructure observability.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/register"
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-base shadow-xl shadow-emerald-500/25 transition"
                >
                  <span>Start Monitoring in 30 Seconds</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/login"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white font-semibold text-base border border-neutral-800 transition"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-neutral-800/80 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <div className="flex items-center space-x-2.5">
            <div className="h-6 w-6 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Activity className="h-3.5 w-3.5" />
            </div>
            <span className="font-bold text-white tracking-tight">PulseGuard</span>
            <span>— Developer Uptime & Infrastructure Monitoring</span>
          </div>

          <div className="flex items-center space-x-6 text-neutral-400">
            <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
            <Link to="/settings" className="hover:text-white transition">Integrations</Link>
            <Link to="/register" className="hover:text-white transition">Register</Link>
            <Link to="/login" className="hover:text-white transition">Login</Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

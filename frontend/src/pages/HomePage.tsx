import React from "react";
import { Link } from "react-router-dom";
import { Activity, ArrowRight, CheckCircle2, Clock, Zap } from "lucide-react";

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-20 text-center max-w-4xl mx-auto">
      <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-8">
        <Zap className="h-3.5 w-3.5" />
        <span>Continuous Cloud Health Monitoring</span>
      </div>

      <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
        Never let downtime <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
          catch you off guard.
        </span>
      </h1>

      <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed">
        PulseGuard monitors your APIs, websites, and microservices every 60 seconds with Celery & Redis background pingers. Real-time latency charts, downtime detection, and reliable uptime stats.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
        <Link
          to="/register"
          className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base shadow-xl shadow-emerald-500/25 transition w-full sm:w-auto justify-center"
        >
          <span>Start Monitoring Free</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          to="/login"
          className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-base border border-slate-800 transition w-full sm:w-auto text-center"
        >
          Live Dashboard Demo
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 text-left w-full">
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80">
          <Clock className="h-6 w-6 text-emerald-400 mb-3" />
          <h3 className="text-white font-semibold text-base">60-Second Checks</h3>
          <p className="text-slate-400 text-sm mt-1">High-frequency asynchronous health pings executing across distributed Celery workers.</p>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80">
          <Activity className="h-6 w-6 text-emerald-400 mb-3" />
          <h3 className="text-white font-semibold text-base">Latency Tracking</h3>
          <p className="text-slate-400 text-sm mt-1">Sub-millisecond latency measurements capturing DNS, network, and HTTP server response times.</p>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80">
          <CheckCircle2 className="h-6 w-6 text-emerald-400 mb-3" />
          <h3 className="text-white font-semibold text-base">24-Hour Uptime SLA</h3>
          <p className="text-slate-400 text-sm mt-1">Automated aggregation engine computing 99.9% uptime percentages and incident reports.</p>
        </div>
      </div>
    </div>
  );
};

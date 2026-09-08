import React from "react";
import { Activity, Plus, Server, ShieldCheck, Wifi, WifiOff } from "lucide-react";

export const DashboardPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Monitors Overview</h1>
          <p className="text-slate-400 text-sm mt-1">Real-time status of your connected services</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm shadow-lg shadow-emerald-500/20 transition cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>New Monitor</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 my-8">
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Monitors</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold text-white">0</span>
            <Server className="h-5 w-5 text-slate-500" />
          </div>
        </div>
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Operational</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold text-emerald-400">0</span>
            <Wifi className="h-5 w-5 text-emerald-500" />
          </div>
        </div>
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-xs font-semibold uppercase tracking-wider text-rose-400">Downtime Incidents</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold text-rose-400">0</span>
            <WifiOff className="h-5 w-5 text-rose-500" />
          </div>
        </div>
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">Avg Uptime (24h)</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold text-teal-400">100%</span>
            <ShieldCheck className="h-5 w-5 text-teal-500" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/30 p-12 text-center">
        <div className="inline-flex h-12 w-12 rounded-xl bg-slate-800/80 items-center justify-center text-slate-400 mb-3">
          <Activity className="h-6 w-6" />
        </div>
        <h3 className="text-white font-semibold text-lg">No monitors configured yet</h3>
        <p className="text-slate-400 text-sm max-w-sm mx-auto mt-1 mb-6">
          Add your first website, API endpoint, or server to begin 60-second automated health checks.
        </p>
        <button
          type="button"
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium border border-slate-700 transition cursor-pointer"
        >
          <Plus className="h-4 w-4 text-emerald-400" />
          <span>Add Monitor</span>
        </button>
      </div>
    </div>
  );
};

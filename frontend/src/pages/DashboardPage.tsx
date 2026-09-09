import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Clock,
  ExternalLink,
  Loader2,
  PauseCircle,
  PlayCircle,
  Plus,
  RefreshCw,
  Server,
  Trash2,
  Wifi,
  WifiOff,
} from "lucide-react";
import { monitorsApi } from "../api/monitors";
import type { Monitor } from "../types";

export const DashboardPage: React.FC = () => {
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchMonitors = useCallback(async (showRefreshingSpinner = false) => {
    if (showRefreshingSpinner) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const data = await monitorsApi.getMonitors();
      setMonitors(data.results);
      setTotalCount(data.count);
    } catch (err: any) {
      setError(
        err.response?.data?.detail || "Failed to load monitors. Please check your server connection."
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMonitors();
  }, [fetchMonitors]);

  const handleToggleActive = async (monitor: Monitor) => {
    setTogglingId(monitor.id);
    try {
      const updated = await monitorsApi.updateMonitor(monitor.id, {
        is_active: !monitor.is_active,
      });
      setMonitors((prev) =>
        prev.map((m) => (m.id === monitor.id ? { ...m, is_active: updated.is_active } : m))
      );
    } catch {
      alert("Failed to update monitor status. Please try again.");
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"? All historical check results will be permanently removed.`)) {
      return;
    }

    setDeletingId(id);
    try {
      await monitorsApi.deleteMonitor(id);
      setMonitors((prev) => prev.filter((m) => m.id !== id));
      setTotalCount((prev) => Math.max(0, prev - 1));
    } catch {
      alert("Failed to delete monitor. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const activeCount = monitors.filter((m) => m.is_active).length;
  const pausedCount = monitors.filter((m) => !m.is_active).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <span>Monitors Overview</span>
            {isRefreshing && <Loader2 className="h-5 w-5 text-emerald-400 animate-spin" />}
          </h1>
          <p className="text-slate-400 text-sm mt-1">Real-time health and uptime of your web endpoints</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => fetchMonitors(true)}
            disabled={isLoading || isRefreshing}
            className="inline-flex items-center space-x-2 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-sm font-medium transition cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin text-emerald-400" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <Link
            to="/monitors/new"
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm shadow-lg shadow-emerald-500/20 transition cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>New Monitor</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 my-8">
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Configured</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold text-white">{totalCount}</span>
            <Server className="h-5 w-5 text-slate-500" />
          </div>
        </div>
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Active Pinging</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold text-emerald-400">{activeCount}</span>
            <Wifi className="h-5 w-5 text-emerald-500" />
          </div>
        </div>
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Paused</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold text-amber-400">{pausedCount}</span>
            <WifiOff className="h-5 w-5 text-amber-500" />
          </div>
        </div>
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">Check Frequency</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold text-teal-400">60s</span>
            <Clock className="h-5 w-5 text-teal-500" />
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-8 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
          <button
            onClick={() => fetchMonitors()}
            className="px-3 py-1 text-xs font-semibold bg-rose-500/20 hover:bg-rose-500/30 rounded-lg transition"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading Skeletons */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 rounded-2xl bg-slate-900/40 border border-slate-800 p-6 animate-pulse flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="h-5 bg-slate-800 rounded w-2/3" />
                <div className="h-4 bg-slate-800/60 rounded w-1/2" />
              </div>
              <div className="h-4 bg-slate-800/40 rounded w-1/3" />
            </div>
          ))}
        </div>
      ) : monitors.length === 0 ? (
        /* Empty State */
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/30 p-12 text-center">
          <div className="inline-flex h-12 w-12 rounded-xl bg-slate-800/80 items-center justify-center text-slate-400 mb-3">
            <Activity className="h-6 w-6" />
          </div>
          <h3 className="text-white font-semibold text-lg">No monitors configured yet</h3>
          <p className="text-slate-400 text-sm max-w-sm mx-auto mt-1 mb-6">
            Add your first website, API endpoint, or service to start continuous 60-second health checks.
          </p>
          <Link
            to="/monitors/new"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm shadow-lg shadow-emerald-500/20 transition cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add First Monitor</span>
          </Link>
        </div>
      ) : (
        /* Monitors Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {monitors.map((monitor) => (
            <div
              key={monitor.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition p-6 flex flex-col justify-between backdrop-blur-sm group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-base truncate group-hover:text-emerald-400 transition">
                      {monitor.name}
                    </h3>
                    <a
                      href={monitor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-slate-400 hover:text-slate-200 text-xs truncate max-w-full mt-0.5"
                    >
                      <span className="truncate">{monitor.url}</span>
                      <ExternalLink className="h-3 w-3 shrink-0" />
                    </a>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${
                      monitor.is_active
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-slate-800 text-slate-400 border border-slate-700"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full mr-1.5 ${
                        monitor.is_active ? "bg-emerald-400 animate-pulse" : "bg-slate-500"
                      }`}
                    />
                    {monitor.is_active ? "Active" : "Paused"}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-4 text-xs text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-slate-800/80 font-mono text-[11px] uppercase">
                    {monitor.monitor_type}
                  </span>
                  <span>•</span>
                  <span>Every {monitor.interval}s</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <Link
                  to={`/monitors/${monitor.id}`}
                  className="inline-flex items-center space-x-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition"
                >
                  <span>View Analytics</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>

                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    onClick={() => handleToggleActive(monitor)}
                    disabled={togglingId === monitor.id}
                    title={monitor.is_active ? "Pause Monitoring" : "Resume Monitoring"}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition disabled:opacity-50 cursor-pointer"
                  >
                    {togglingId === monitor.id ? (
                      <Loader2 className="h-4 w-4 animate-spin text-emerald-400" />
                    ) : monitor.is_active ? (
                      <PauseCircle className="h-4 w-4" />
                    ) : (
                      <PlayCircle className="h-4 w-4 text-emerald-400" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(monitor.id, monitor.name)}
                    disabled={deletingId === monitor.id}
                    title="Delete Monitor"
                    className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition disabled:opacity-50 cursor-pointer"
                  >
                    {deletingId === monitor.id ? (
                      <Loader2 className="h-4 w-4 animate-spin text-rose-400" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

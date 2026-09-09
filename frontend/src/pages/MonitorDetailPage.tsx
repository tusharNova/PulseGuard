import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ExternalLink,
  Loader2,
  PauseCircle,
  PlayCircle,
  RefreshCw,
  Trash2,
  Wifi,
  WifiOff,
  XCircle,
} from "lucide-react";
import { monitorsApi } from "../api/monitors";
import type { CheckResult, Monitor, UptimeStats } from "../types";

export const MonitorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [monitor, setMonitor] = useState<Monitor | null>(null);
  const [stats, setStats] = useState<UptimeStats | null>(null);
  const [history, setHistory] = useState<CheckResult[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isToggling, setIsToggling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchMonitorData = useCallback(async (showRefreshingSpinner = false) => {
    if (!id) return;

    if (showRefreshingSpinner) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const [monitorData, statsData, historyData] = await Promise.all([
        monitorsApi.getMonitor(id),
        monitorsApi.getMonitorUptimeStats(id),
        monitorsApi.getMonitorHistory(id),
      ]);

      setMonitor(monitorData);
      setStats(statsData);
      setHistory(historyData);
    } catch (err: any) {
      setError(
        err.response?.data?.detail || "Failed to load monitor details. It may not exist or has been deleted."
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMonitorData();
  }, [fetchMonitorData]);

  const handleToggle = async () => {
    if (!monitor) return;
    setIsToggling(true);
    try {
      const updated = await monitorsApi.updateMonitor(monitor.id, {
        is_active: !monitor.is_active,
      });
      setMonitor(updated);
    } catch {
      alert("Failed to update status. Please try again.");
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    if (!monitor) return;
    if (
      !window.confirm(
        `Are you sure you want to delete "${monitor.name}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      await monitorsApi.deleteMonitor(monitor.id);
      navigate("/dashboard");
    } catch {
      alert("Failed to delete monitor. Please try again.");
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <Loader2 className="h-8 w-8 text-emerald-400 animate-spin" />
          <span className="text-slate-400 text-sm">Loading monitor telemetry...</span>
        </div>
      </div>
    );
  }

  if (error || !monitor) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="p-8 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 max-w-md mx-auto">
          <AlertCircle className="h-10 w-10 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-white mb-1">Monitor Not Found</h2>
          <p className="text-sm text-slate-400 mb-6">{error || "Unable to find the requested monitor."}</p>
          <Link
            to="/dashboard"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold transition inline-flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  const latestCheck = history.length > 0 ? history[0] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full text-left">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/dashboard"
          className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-emerald-400 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Dashboard</span>
        </Link>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => fetchMonitorData(true)}
            disabled={isRefreshing}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition cursor-pointer"
            title="Refresh Telemetry"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin text-emerald-400" : ""}`} />
          </button>
          <button
            onClick={handleToggle}
            disabled={isToggling}
            className={`inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition cursor-pointer ${
              monitor.is_active
                ? "bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20"
                : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
            }`}
          >
            {isToggling ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : monitor.is_active ? (
              <>
                <PauseCircle className="h-4 w-4" />
                <span>Pause Monitoring</span>
              </>
            ) : (
              <>
                <PlayCircle className="h-4 w-4" />
                <span>Resume Monitoring</span>
              </>
            )}
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 rounded-xl bg-slate-900 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 border border-slate-800 transition cursor-pointer"
            title="Delete Monitor"
          >
            {isDeleting ? <Loader2 className="h-4 w-4 animate-spin text-rose-400" /> : <Trash2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-xl backdrop-blur-sm mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{monitor.name}</h1>
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
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
            <a
              href={monitor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-emerald-400 hover:text-emerald-300 text-sm font-mono transition"
            >
              <span>{monitor.url}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center space-x-2">
              <Clock className="h-3.5 w-3.5 text-slate-500" />
              <span>Interval: {monitor.interval}s</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono uppercase text-slate-400">
              {monitor.monitor_type}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 mb-8">
        {/* Current State */}
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Current Status</span>
          <div className="flex items-center justify-between mt-2">
            {latestCheck ? (
              latestCheck.is_up ? (
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xl">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>OPERATIONAL</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-rose-400 font-bold text-xl">
                  <XCircle className="h-5 w-5" />
                  <span>DOWNTIME</span>
                </div>
              )
            ) : (
              <span className="text-slate-500 text-base font-medium">Pending 1st check</span>
            )}
            {latestCheck?.is_up ? (
              <Wifi className="h-5 w-5 text-emerald-500" />
            ) : (
              <WifiOff className="h-5 w-5 text-slate-500" />
            )}
          </div>
        </div>

        {/* 24-Hour Uptime */}
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">24-Hour Uptime</span>
          <div className="flex items-center justify-between mt-2">
            <span
              className={`text-2xl font-bold ${
                (stats?.uptime_percentage || 100) >= 99
                  ? "text-emerald-400"
                  : (stats?.uptime_percentage || 100) >= 95
                  ? "text-amber-400"
                  : "text-rose-400"
              }`}
            >
              {stats ? `${stats.uptime_percentage}%` : "100%"}
            </span>
            <span className="text-xs text-slate-500 font-mono">SLA Target: 99.9%</span>
          </div>
        </div>

        {/* Average Latency */}
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Avg Response Time</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold text-white">
              {stats?.avg_response_time_ms ? `${stats.avg_response_time_ms} ms` : "—"}
            </span>
            <Activity className="h-5 w-5 text-teal-400" />
          </div>
        </div>

        {/* Total / Failed Checks */}
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">24h Checks / Incidents</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold text-white">
              {stats?.total_checks || 0}
              <span className="text-sm font-normal text-slate-400"> / {stats?.failed_checks || 0} err</span>
            </span>
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                (stats?.failed_checks || 0) === 0 ? "bg-emerald-400" : "bg-rose-500"
              }`}
            />
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-base font-semibold text-white">Recent Health Check History (Last 50)</h2>
          <span className="text-xs text-slate-400 font-mono">Auto-updates on ping</span>
        </div>

        {history.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Activity className="h-8 w-8 mx-auto mb-2 text-slate-600" />
            <p className="text-sm">No health checks recorded yet. Waiting for next scheduled dispatch...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-950/60 text-slate-400 uppercase text-[11px] font-semibold border-b border-slate-800 tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Response Time</th>
                  <th className="px-6 py-3.5">HTTP Code</th>
                  <th className="px-6 py-3.5">Timestamp</th>
                  <th className="px-6 py-3.5">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                {history.map((check) => (
                  <tr key={check.id} className="hover:bg-slate-800/30 transition">
                    <td className="px-6 py-3 whitespace-nowrap">
                      {check.is_up ? (
                        <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-sans font-medium border border-emerald-500/20">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>UP</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 text-[11px] font-sans font-medium border border-rose-500/20">
                          <XCircle className="h-3 w-3" />
                          <span>DOWN</span>
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-slate-200">
                      {check.response_time_ms !== null ? `${check.response_time_ms} ms` : "—"}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded ${
                          check.status_code && check.status_code < 400
                            ? "bg-slate-800 text-slate-200"
                            : "bg-rose-500/20 text-rose-300"
                        }`}
                      >
                        {check.status_code || "ERR"}
                      </span>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-slate-400 font-sans">
                      {new Date(check.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-3 text-slate-400 max-w-xs truncate font-sans text-xs">
                      {check.error_message || "Healthy"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

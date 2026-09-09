import React, { useState, useEffect } from "react";
import { Activity, AlertCircle, Check, Globe, Loader2, Sliders } from "lucide-react";
import type { CreateMonitorPayload } from "../api/monitors";

interface MonitorFormProps {
  initialValues?: Partial<CreateMonitorPayload>;
  onSubmit: (values: CreateMonitorPayload) => Promise<void>;
  isSubmitting: boolean;
  submitLabel?: string;
  onCancel?: () => void;
}

export const MonitorForm: React.FC<MonitorFormProps> = ({
  initialValues,
  onSubmit,
  isSubmitting,
  submitLabel = "Create Monitor",
  onCancel,
}) => {
  const [name, setName] = useState(initialValues?.name || "");
  const [url, setUrl] = useState(initialValues?.url || "");
  const [monitorType, setMonitorType] = useState<"HTTP" | "HTTPS">(
    initialValues?.monitor_type || "HTTPS"
  );
  const [interval, setInterval] = useState<number>(initialValues?.interval || 60);
  const [isActive, setIsActive] = useState<boolean>(
    initialValues?.is_active !== undefined ? initialValues.is_active : true
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Automatically detect protocol when URL changes
  useEffect(() => {
    if (url.startsWith("http://") && monitorType !== "HTTP") {
      setMonitorType("HTTP");
    } else if (url.startsWith("https://") && monitorType !== "HTTPS") {
      setMonitorType("HTTPS");
    }
  }, [url, monitorType]);

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = "Monitor name is required.";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!url.trim()) {
      newErrors.url = "Endpoint URL is required.";
    } else {
      try {
        const parsed = new URL(url.trim());
        if (!["http:", "https:"].includes(parsed.protocol)) {
          newErrors.url = "URL must start with http:// or https://";
        }
      } catch {
        newErrors.url = "Please enter a valid, well-formed URL (e.g., https://api.mysite.com).";
      }
    }

    if (!interval || interval < 10) {
      newErrors.interval = "Check interval must be at least 10 seconds.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    await onSubmit({
      name: name.trim(),
      url: url.trim(),
      monitor_type: monitorType,
      interval: Number(interval),
      is_active: isActive,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Friendly Name */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
          Monitor Name
        </label>
        <div className="relative">
          <Activity className="absolute left-3.5 top-3 h-5 w-5 text-slate-500" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Production Web App"
            className={`w-full bg-slate-950 border rounded-xl px-4 py-2.5 pl-11 text-white placeholder-slate-500 text-sm focus:outline-none transition ${
              errors.name ? "border-rose-500" : "border-slate-800 focus:border-emerald-500"
            }`}
          />
        </div>
        {errors.name && (
          <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>{errors.name}</span>
          </p>
        )}
      </div>

      {/* URL Endpoint */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
          Endpoint URL
        </label>
        <div className="relative">
          <Globe className="absolute left-3.5 top-3 h-5 w-5 text-slate-500" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://api.myproject.io/health"
            className={`w-full bg-slate-950 border rounded-xl px-4 py-2.5 pl-11 text-white placeholder-slate-500 text-sm focus:outline-none transition font-mono ${
              errors.url ? "border-rose-500" : "border-slate-800 focus:border-emerald-500"
            }`}
          />
        </div>
        {errors.url ? (
          <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>{errors.url}</span>
          </p>
        ) : (
          <p className="mt-1.5 text-xs text-slate-500">
            Enter the full HTTP or HTTPS endpoint you want PulseGuard to ping every interval.
          </p>
        )}
      </div>

      {/* Protocol & Interval Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Protocol
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setMonitorType("HTTPS")}
              className={`py-2.5 rounded-xl border text-xs font-semibold transition cursor-pointer flex items-center justify-center space-x-1.5 ${
                monitorType === "HTTPS"
                  ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {monitorType === "HTTPS" && <Check className="h-3.5 w-3.5" />}
              <span>HTTPS (SSL)</span>
            </button>
            <button
              type="button"
              onClick={() => setMonitorType("HTTP")}
              className={`py-2.5 rounded-xl border text-xs font-semibold transition cursor-pointer flex items-center justify-center space-x-1.5 ${
                monitorType === "HTTP"
                  ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {monitorType === "HTTP" && <Check className="h-3.5 w-3.5" />}
              <span>HTTP</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Ping Interval
          </label>
          <div className="relative">
            <Sliders className="absolute left-3.5 top-3 h-5 w-5 text-slate-500" />
            <select
              value={interval}
              onChange={(e) => setInterval(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 pl-11 text-white text-sm focus:outline-none focus:border-emerald-500 transition cursor-pointer"
            >
              <option value={10}>Every 10 seconds (High frequency)</option>
              <option value={30}>Every 30 seconds</option>
              <option value={60}>Every 60 seconds (Standard)</option>
              <option value={120}>Every 2 minutes</option>
              <option value={300}>Every 5 minutes</option>
            </select>
          </div>
          {errors.interval && (
            <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>{errors.interval}</span>
            </p>
          )}
        </div>
      </div>

      {/* Active State Toggle */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-sm font-semibold text-white">Enable Immediate Monitoring</span>
          <p className="text-xs text-slate-400 mt-0.5">
            When enabled, background Celery workers will start checking this endpoint right away.
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500" />
        </label>
      </div>

      {/* Form Action Buttons */}
      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white text-sm font-medium transition cursor-pointer"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition cursor-pointer flex items-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <span>{submitLabel}</span>
          )}
        </button>
      </div>
    </form>
  );
};

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import { monitorsApi } from "../api/monitors";
import type { CreateMonitorPayload } from "../api/monitors";
import { MonitorForm } from "../components/MonitorForm";

export const NewMonitorPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCreate = async (payload: CreateMonitorPayload) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      await monitorsApi.createMonitor(payload);
      toast.success(`Monitor "${payload.name}" created! Background checks initiated.`);
      navigate("/dashboard");
    } catch (err: any) {
      const detail =
        err.response?.data?.url?.[0] ||
        err.response?.data?.name?.[0] ||
        err.response?.data?.interval?.[0] ||
        err.response?.data?.detail ||
        "Failed to create monitor. Please verify your information.";
      setServerError(detail);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full text-left">
      {/* Navigation Breadcrumb */}
      <Link
        to="/dashboard"
        className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-emerald-400 transition mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Dashboard</span>
      </Link>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 sm:p-10 shadow-xl backdrop-blur-sm">
        <div className="flex items-center space-x-3 mb-8 pb-6 border-b border-slate-800">
          <div className="h-11 w-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <PlusCircle className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Create New Monitor
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
              Set up automated background health checks for your website or API
            </p>
          </div>
        </div>

        {serverError && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
            {serverError}
          </div>
        )}

        <MonitorForm
          onSubmit={handleCreate}
          isSubmitting={isSubmitting}
          submitLabel="Create & Start Monitoring"
          onCancel={() => navigate("/dashboard")}
        />
      </div>
    </div>
  );
};

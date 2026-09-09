import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  CheckCircle2,
  Loader2,
  Mail,
  User as UserIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import { authApi } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAlertsEnabled, setEmailAlertsEnabled] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const profile = await authApi.getProfile();
        setFirstName(profile.first_name || "");
        setLastName(profile.last_name || "");
        setEmailAlertsEnabled(
          profile.email_alerts_enabled !== undefined ? profile.email_alerts_enabled : true
        );
      } catch {
        toast.error("Failed to load user profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await authApi.updateProfile({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email_alerts_enabled: emailAlertsEnabled,
      });
      toast.success("Profile and alert preferences updated successfully!");
    } catch {
      toast.error("Failed to save settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-emerald-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full text-left">
      {/* Breadcrumb Navigation */}
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
            <UserIcon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Account & Alert Settings</h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
              Manage your personal information and downtime email notification preferences
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Email (Read-Only) */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-5 w-5 text-slate-500" />
              <input
                type="email"
                disabled
                value={user?.email || ""}
                className="w-full bg-slate-950/60 border border-slate-800/80 rounded-xl px-4 py-2.5 pl-11 text-slate-400 text-sm cursor-not-allowed font-mono"
              />
            </div>
            <p className="mt-1.5 text-xs text-slate-500">
              Primary email used for sign-in and incident dispatch.
            </p>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Jane"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>

          {/* Alert Preferences Toggle */}
          <div className="pt-4 border-t border-slate-800">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center space-x-2">
              <Bell className="h-4 w-4 text-emerald-400" />
              <span>Notification Preferences</span>
            </h3>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold text-white">Email Incident & Recovery Alerts</span>
                <p className="text-xs text-slate-400 mt-0.5 max-w-md">
                  Receive real-time email notifications whenever any of your active monitors go DOWN or RECOVER back to healthy status.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-4">
                <input
                  type="checkbox"
                  checked={emailAlertsEnabled}
                  onChange={(e) => setEmailAlertsEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500" />
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-slate-800">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition cursor-pointer flex items-center space-x-2"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving Preferences...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

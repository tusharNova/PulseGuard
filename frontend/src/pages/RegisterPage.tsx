import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity, KeyRound, Mail, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const RegisterPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await register({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      });
      navigate("/dashboard");
    } catch (err: any) {
      if (err.response?.data?.email) {
        setError(err.response.data.email[0]);
      } else if (err.response?.data?.password) {
        setError(err.response.data.password[0]);
      } else {
        setError("Registration failed. Please check your information and try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full p-8 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-2xl backdrop-blur-sm">
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 items-center justify-center text-emerald-400 mb-4">
            <Activity className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Create Account</h2>
          <p className="text-slate-400 text-sm mt-1">Get started with free uptime monitoring</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start space-x-3 text-rose-400 text-sm">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
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
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
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

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@pulseguard.io"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 pl-10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Password (min 8 chars)
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 pl-10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition cursor-pointer flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Create Free Account</span>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6">
          Already registered?{" "}
          <Link to="/login" className="text-emerald-400 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

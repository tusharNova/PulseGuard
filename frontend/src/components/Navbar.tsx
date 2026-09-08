import React from "react";
import { Link } from "react-router-dom";
import { Activity, LogIn, LayoutDashboard, ShieldCheck } from "lucide-react";

interface NavbarProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isAuthenticated = false, onLogout }) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 text-white font-bold text-xl tracking-tight hover:opacity-90">
          <div className="h-9 w-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Activity className="h-5 w-5 animate-pulse" />
          </div>
          <span>Pulse<span className="text-emerald-400">Guard</span></span>
        </Link>

        <nav className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition"
              >
                <LayoutDashboard className="h-4 w-4 text-emerald-400" />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={onLogout}
                className="px-3.5 py-1.5 rounded-lg text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 transition border border-slate-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white transition"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold shadow-lg shadow-emerald-500/20 transition"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Get Started</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

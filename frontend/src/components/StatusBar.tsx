import React from "react";
import type { CheckResult } from "../types";

interface StatusBarProps {
  checks: CheckResult[];
  maxBars?: number;
  uptimePercentage?: number;
  showLabels?: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = React.memo(({
  checks = [],
  maxBars = 30,
  uptimePercentage,
  showLabels = true,
}) => {
  // Sort oldest to newest (left to right)
  const sortedChecks = [...checks].reverse();
  const displayChecks = sortedChecks.slice(-maxBars);

  // Fill up with empty placeholder slots if fewer checks than maxBars
  const emptyCount = Math.max(0, maxBars - displayChecks.length);
  const emptyBars = Array.from({ length: emptyCount }, (_, i) => i);

  return (
    <div className="w-full">
      {/* Bars row */}
      <div className="flex items-center gap-[3px] h-7 w-full">
        {emptyBars.map((i) => (
          <div
            key={`empty-${i}`}
            className="flex-1 h-full rounded-[3px] bg-slate-800/40 border border-slate-800/60"
            title="Pending check"
          />
        ))}

        {displayChecks.map((check) => {
          const formattedDate = new Date(check.timestamp).toLocaleString();
          const latencyText = check.response_time_ms !== null ? `${check.response_time_ms}ms` : "No response";
          const statusText = check.is_up ? "Operational" : `Downtime (${check.error_message || check.status_code || "Failed"})`;

          return (
            <div
              key={check.id}
              className={`group relative flex-1 h-full rounded-[3px] transition-all cursor-pointer ${
                check.is_up
                  ? "bg-emerald-500 hover:bg-emerald-400 hover:scale-y-110 shadow-sm shadow-emerald-500/20"
                  : "bg-rose-500 hover:bg-rose-400 hover:scale-y-110 shadow-sm shadow-rose-500/30"
              }`}
            >
              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-50 pointer-events-none">
                <div className="bg-slate-900 border border-slate-700 text-white px-2.5 py-1.5 rounded-lg shadow-xl text-[11px] whitespace-nowrap font-sans">
                  <div className="flex items-center space-x-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${check.is_up ? "bg-emerald-400" : "bg-rose-400"}`} />
                    <span className="font-semibold">{statusText}</span>
                    <span className="text-slate-400 font-mono text-[10px]">({latencyText})</span>
                  </div>
                  <div className="text-slate-400 text-[10px] mt-0.5">{formattedDate}</div>
                </div>
                <div className="w-2 h-2 bg-slate-900 border-r border-b border-slate-700 rotate-45 -mt-1" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Label row */}
      {showLabels && (
        <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 font-medium">
          <span>{displayChecks.length > 0 ? `${displayChecks.length} checks ago` : "Waiting for checks"}</span>
          {uptimePercentage !== undefined && (
            <span className="text-slate-300 font-semibold">{uptimePercentage}% uptime</span>
          )}
          <span>Today</span>
        </div>
      )}
    </div>
  );
});


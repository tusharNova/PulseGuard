import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import type { CheckResult } from "../types";

interface LatencyChartProps {
  data: CheckResult[];
}

export const LatencyChart: React.FC<LatencyChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-500 text-sm">
        No ping data recorded yet to render latency chart.
      </div>
    );
  }

  // Format and sort chronologically (oldest to newest for proper left-to-right time chart)
  const chartData = [...data]
    .reverse()
    .map((item) => {
      const date = new Date(item.timestamp);
      return {
        timestamp: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        fullDate: date.toLocaleString(),
        latency: item.response_time_ms !== null ? item.response_time_ms : 0,
        statusCode: item.status_code || "ERR",
        isUp: item.is_up,
      };
    });

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />

          <XAxis
            dataKey="timestamp"
            stroke="#64748b"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: "#1e293b" }}
          />

          <YAxis
            stroke="#64748b"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: "#1e293b" }}
            unit="ms"
          />

          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl shadow-xl text-xs space-y-1 backdrop-blur-md">
                    <p className="text-slate-400 font-sans">{item.fullDate}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-bold text-sm">{item.latency} ms</span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold ${
                          item.isUp
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-rose-500/20 text-rose-400"
                        }`}
                      >
                        {item.statusCode}
                      </span>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />

          <Area
            type="monotone"
            dataKey="latency"
            stroke="#10b981"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#latencyGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

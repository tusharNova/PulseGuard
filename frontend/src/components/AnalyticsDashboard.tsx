import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import type { MonitorAnalytics } from "../types";
import { AlertCircle, Zap } from "lucide-react";

interface AnalyticsDashboardProps {
  analytics: MonitorAnalytics | null;
}

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ analytics }) => {
  if (!analytics) {
    return null;
  }

  const { errors, latency_distribution } = analytics;

  const latencyData = [
    { name: "Fast (<300ms)", value: latency_distribution.fast, fill: "#10b981" },
    { name: "Avg (300-1s)", value: latency_distribution.average, fill: "#f59e0b" },
    { name: "Slow (>1s)", value: latency_distribution.slow, fill: "#ef4444" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Latency Distribution */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Zap className="h-5 w-5 text-amber-400" />
          <h2 className="text-base font-semibold text-white">Latency Distribution</h2>
        </div>
        
        {latencyData.every((d) => d.value === 0) ? (
          <div className="h-56 flex flex-col items-center justify-center text-neutral-500">
            <span className="text-sm">Not enough data to generate distribution.</span>
          </div>
        ) : (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={latencyData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} width={100} />
                <Tooltip
                  cursor={{ fill: "#1e293b", opacity: 0.4 }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl text-xs backdrop-blur-md">
                          <p className="text-white font-bold">{payload[0].payload.name}</p>
                          <p className="text-neutral-400 mt-1">{payload[0].value} checks</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {latencyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Error Breakdown */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm p-6">
        <div className="flex items-center space-x-2 mb-6">
          <AlertCircle className="h-5 w-5 text-rose-400" />
          <h2 className="text-base font-semibold text-white">Error Breakdown</h2>
        </div>

        {errors.length === 0 ? (
          <div className="h-56 flex flex-col items-center justify-center text-neutral-500">
            <span className="text-sm">100% Uptime! No errors recorded recently.</span>
          </div>
        ) : (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={errors}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="error_message"
                >
                  {errors.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl text-xs backdrop-blur-md max-w-[200px]">
                          <p className="text-white font-bold mb-1 break-words">{data.error_message}</p>
                          <div className="flex items-center justify-between text-neutral-400">
                            <span>Count:</span>
                            <span className="text-white">{data.count}</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  content={(props) => {
                    const { payload } = props;
                    return (
                      <ul className="flex flex-wrap justify-center gap-4 text-[11px] text-neutral-400 mt-4">
                        {payload?.map((entry, index) => (
                          <li key={`item-${index}`} className="flex items-center space-x-1.5">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                            <span className="max-w-[100px] truncate">{entry.value}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

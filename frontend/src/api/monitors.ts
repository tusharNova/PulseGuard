import { apiClient } from "./client";
import type { CheckResult, Monitor, PaginatedResponse, UptimeStats, MonitorProtocol, MonitorAnalytics } from "../types";

export interface CreateMonitorPayload {
  name: string;
  url: string;
  monitor_type: MonitorProtocol;
  interval: number;
  is_active?: boolean;
}

export const monitorsApi = {
  getMonitors: async (page = 1): Promise<PaginatedResponse<Monitor>> => {
    const res = await apiClient.get<PaginatedResponse<Monitor>>("/monitors/", {
      params: { page },
    });
    return res.data;
  },

  getMonitor: async (id: string): Promise<Monitor> => {
    const res = await apiClient.get<Monitor>(`/monitors/${id}/`);
    return res.data;
  },

  createMonitor: async (data: CreateMonitorPayload): Promise<Monitor> => {
    const res = await apiClient.post<Monitor>("/monitors/", data);
    return res.data;
  },

  updateMonitor: async (id: string, data: Partial<Monitor>): Promise<Monitor> => {
    const res = await apiClient.patch<Monitor>(`/monitors/${id}/`, data);
    return res.data;
  },

  deleteMonitor: async (id: string): Promise<void> => {
    await apiClient.delete(`/monitors/${id}/`);
  },

  getMonitorHistory: async (id: string, page = 1): Promise<PaginatedResponse<CheckResult>> => {
    const res = await apiClient.get<PaginatedResponse<CheckResult>>(`/check-results/`, {
      params: { monitor: id, page },
    });
    return res.data;
  },

  getMonitorAnalytics: async (id: string): Promise<MonitorAnalytics> => {
    const res = await apiClient.get<MonitorAnalytics>(`/monitors/${id}/analytics/`);
    return res.data;
  },

  getMonitorUptimeStats: async (id: string): Promise<UptimeStats> => {
    const res = await apiClient.get<UptimeStats>(`/monitors/${id}/uptime-stats/`);
    return res.data;
  },
};

import { apiClient } from "./client";
import type { CheckResult, Monitor, PaginatedResponse, UptimeStats } from "../types";

export interface CreateMonitorPayload {
  name: string;
  url: string;
  monitor_type: "HTTP" | "HTTPS";
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

  createMonitor: async (payload: CreateMonitorPayload): Promise<Monitor> => {
    const res = await apiClient.post<Monitor>("/monitors/", payload);
    return res.data;
  },

  updateMonitor: async (id: string, payload: Partial<CreateMonitorPayload>): Promise<Monitor> => {
    const res = await apiClient.patch<Monitor>(`/monitors/${id}/`, payload);
    return res.data;
  },

  deleteMonitor: async (id: string): Promise<void> => {
    await apiClient.delete(`/monitors/${id}/`);
  },

  getMonitorHistory: async (id: string): Promise<CheckResult[]> => {
    const res = await apiClient.get<CheckResult[]>(`/monitors/${id}/history/`);
    return res.data;
  },

  getMonitorUptimeStats: async (id: string): Promise<UptimeStats> => {
    const res = await apiClient.get<UptimeStats>(`/monitors/${id}/uptime-stats/`);
    return res.data;
  },
};

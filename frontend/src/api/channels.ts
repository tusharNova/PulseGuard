import { apiClient } from "./client";
import type { NotificationChannel, PaginatedResponse } from "../types";

export interface CreateChannelPayload {
  name: string;
  channel_type: "SLACK" | "TELEGRAM" | "DISCORD" | "WEBHOOK";
  config: Record<string, any>;
  is_active?: boolean;
}

export const channelsApi = {
  getChannels: async (page = 1): Promise<PaginatedResponse<NotificationChannel>> => {
    const res = await apiClient.get<PaginatedResponse<NotificationChannel>>("/notification-channels/", {
      params: { page },
    });
    return res.data;
  },

  createChannel: async (payload: CreateChannelPayload): Promise<NotificationChannel> => {
    const res = await apiClient.post<NotificationChannel>("/notification-channels/", payload);
    return res.data;
  },

  updateChannel: async (id: string, payload: Partial<CreateChannelPayload>): Promise<NotificationChannel> => {
    const res = await apiClient.patch<NotificationChannel>(`/notification-channels/${id}/`, payload);
    return res.data;
  },

  deleteChannel: async (id: string): Promise<void> => {
    await apiClient.delete(`/notification-channels/${id}/`);
  },
};

import { apiClient } from "./client";
import type { AuthTokens, User } from "../types";

export interface RegisterPayload {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const authApi = {
  login: async (payload: LoginPayload): Promise<AuthTokens> => {
    const res = await apiClient.post<AuthTokens>("/auth/login/", payload);
    return res.data;
  },

  register: async (payload: RegisterPayload): Promise<User> => {
    const res = await apiClient.post<User>("/auth/register/", payload);
    return res.data;
  },

  getProfile: async (): Promise<User> => {
    const res = await apiClient.get<User>("/auth/me/");
    return res.data;
  },
};

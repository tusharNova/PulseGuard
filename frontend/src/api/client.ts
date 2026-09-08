import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach JWT Access Token
apiClient.interceptors.request.use(
  (config) => {
    const tokens = localStorage.getItem("pulseguard_tokens");
    if (tokens) {
      try {
        const { access } = JSON.parse(tokens);
        if (access) {
          config.headers.Authorization = `Bearer ${access}`;
        }
      } catch {
        // invalid JSON in storage, ignore
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Auto-refresh JWT on 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const tokensStr = localStorage.getItem("pulseguard_tokens");
      if (tokensStr) {
        try {
          const { refresh } = JSON.parse(tokensStr);
          if (refresh) {
            const refreshRes = await axios.post(`${API_BASE_URL}/auth/login/refresh/`, {
              refresh,
            });
            const newAccess = refreshRes.data.access;
            localStorage.setItem(
              "pulseguard_tokens",
              JSON.stringify({ access: newAccess, refresh })
            );
            originalRequest.headers.Authorization = `Bearer ${newAccess}`;
            return apiClient(originalRequest);
          }
        } catch {
          localStorage.removeItem("pulseguard_tokens");
          localStorage.removeItem("pulseguard_user");
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

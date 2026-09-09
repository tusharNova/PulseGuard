export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  email_alerts_enabled?: boolean;
  created_at?: string;
  update_at?: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export type MonitorProtocol = "HTTP" | "HTTPS";

export interface Monitor {
  id: string;
  name: string;
  url: string;
  monitor_type: MonitorProtocol;
  interval: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  recent_checks?: CheckResult[];
}

export interface CheckResult {
  id: string;
  monitor: string;
  timestamp: string;
  status_code: number | null;
  response_time_ms: number | null;
  is_up: boolean;
  error_message: string;
}

export interface UptimeStats {
  monitor_id: string;
  monitor_name: string;
  period: string;
  total_checks: number;
  successful_checks: number;
  failed_checks: number;
  uptime_percentage: number;
  avg_response_time_ms: number | null;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

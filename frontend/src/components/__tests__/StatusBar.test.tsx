import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StatusBar } from "../StatusBar";
import type { CheckResult } from "../../types";

describe("StatusBar component", () => {
  it("renders empty placeholder bars when no checks are provided", () => {
    render(<StatusBar checks={[]} maxBars={10} />);

    expect(screen.getByText("Waiting for checks")).toBeInTheDocument();
    expect(screen.getByText("Today")).toBeInTheDocument();

    const emptySlots = screen.getAllByTitle("Pending check");
    expect(emptySlots).toHaveLength(10);
  });

  it("renders correct count of check bars and placeholder slots", () => {
    const mockChecks: CheckResult[] = [
      {
        id: "check-1",
        monitor: "m-1",
        status_code: 200,
        response_time_ms: 120,
        is_up: true,
        error_message: "",
        timestamp: new Date().toISOString(),
      },
      {
        id: "check-2",
        monitor: "m-1",
        status_code: 500,
        response_time_ms: 350,
        is_up: false,
        error_message: "Internal Server Error",
        timestamp: new Date().toISOString(),
      },
    ];

    render(<StatusBar checks={mockChecks} maxBars={5} uptimePercentage={98.5} />);

    // 5 total bars: 2 checks + 3 empty placeholders
    const emptySlots = screen.getAllByTitle("Pending check");
    expect(emptySlots).toHaveLength(3);

    // Labels
    expect(screen.getByText("2 checks ago")).toBeInTheDocument();
    expect(screen.getByText("98.5% uptime")).toBeInTheDocument();
  });

  it("renders operational and downtime indicators correctly", () => {
    const mockChecks: CheckResult[] = [
      {
        id: "check-up",
        monitor: "m-1",
        status_code: 200,
        response_time_ms: 85,
        is_up: true,
        error_message: "",
        timestamp: new Date().toISOString(),
      },
      {
        id: "check-down",
        monitor: "m-1",
        status_code: 503,
        response_time_ms: null,
        is_up: false,
        error_message: "Service Unavailable",
        timestamp: new Date().toISOString(),
      },
    ];

    render(<StatusBar checks={mockChecks} maxBars={2} />);

    expect(screen.getByText("Operational")).toBeInTheDocument();
    expect(screen.getByText(/Downtime/i)).toBeInTheDocument();
  });

  it("hides labels when showLabels is false", () => {
    render(<StatusBar checks={[]} maxBars={5} showLabels={false} />);

    expect(screen.queryByText("Today")).not.toBeInTheDocument();
    expect(screen.queryByText("Waiting for checks")).not.toBeInTheDocument();
  });
});

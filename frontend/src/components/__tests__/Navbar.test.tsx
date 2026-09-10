import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "../Navbar";
import * as authContext from "../../context/AuthContext";

describe("Navbar component", () => {
  it("renders public links (Sign In, Get Started) when unauthenticated", () => {
    vi.spyOn(authContext, "useAuth").mockReturnValue({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
    expect(screen.queryByText("Settings")).not.toBeInTheDocument();
  });

  it("renders authenticated links (Dashboard, Settings, User Email, Logout) when signed in", () => {
    const mockLogout = vi.fn();
    vi.spyOn(authContext, "useAuth").mockReturnValue({
      user: {
        id: "user-1",
        email: "alice@pulseguard.io",
        first_name: "Alice",
        last_name: "Smith",
        email_alerts_enabled: true,
      },
      tokens: { access: "access-token", refresh: "refresh-token" },
      isAuthenticated: true,
      isLoading: false,
      login: vi.fn(),
      register: vi.fn(),
      logout: mockLogout,
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("alice@pulseguard.io")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.queryByText("Sign In")).not.toBeInTheDocument();
  });
});

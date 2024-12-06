import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, Mock } from "vitest";
import { vi } from "vitest";
import { Layout } from "./Layout";
import { useAuth } from "../../lib/context/authContext";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { MockedProvider } from "@apollo/client/testing";

vi.mock("../../lib/context/authContext");
vi.mock("@/lib/hooks/useCurrentUser");

describe("Layout", () => {
  const mockSetCurrentUser = vi.fn();
  const mockRefetch = vi.fn().mockResolvedValue({ data: { user: {} } });

  beforeEach(() => {
    (useAuth as Mock).mockReturnValue({
      currentUser: null,
      setCurrentUser: mockSetCurrentUser,
      session: null,
    });

    (useCurrentUser as Mock).mockReturnValue({
      refetch: mockRefetch,
    });
  });

  it("renders Navbar, Outlet, and Footer", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </MockedProvider>,
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("calls refetch if session exists and currentUser is null", () => {
    (useAuth as Mock).mockReturnValue({
      currentUser: null,
      setCurrentUser: mockSetCurrentUser,
      session: { id: "session-id" },
    });

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </MockedProvider>,
    );

    expect(mockRefetch).toHaveBeenCalled();
  });
});

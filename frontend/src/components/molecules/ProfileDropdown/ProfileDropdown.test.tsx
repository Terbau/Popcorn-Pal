import { render, cleanup } from "@testing-library/react";
import { it, expect, vi, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { ProfileDropdown } from "./ProfileDropdown";

import { AuthContext } from "@/lib/context/authContext";
afterEach(() => {
  cleanup();
});

const mockCurrentUser = {
  id: "a09c700f-0cc7-4944-ba31-a0b592314ab7",
  email: "annabanana@gmail.com",
  firstName: "Anna",
  lastName: "Banana",
  avatarUrl: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

it("renders the user's avatar and initials", () => {
  render(
    <MockedProvider>
      <AuthContext.Provider
        value={{
          currentUser: mockCurrentUser,
          setCurrentUser: vi.fn(),
          session: undefined,
        }}
      >
        <MemoryRouter>
          <ProfileDropdown />
        </MemoryRouter>
      </AuthContext.Provider>
    </MockedProvider>,
  );
});

it("does not render anything if no current user is provided", () => {
  const { container } = render(
    <MockedProvider>
      <AuthContext.Provider
        value={{
          currentUser: undefined,
          setCurrentUser: vi.fn(),
          session: undefined,
        }}
      >
        <MemoryRouter>
          <ProfileDropdown />
        </MemoryRouter>
      </AuthContext.Provider>
    </MockedProvider>,
  );

  expect(container.firstChild).toBeNull();
});

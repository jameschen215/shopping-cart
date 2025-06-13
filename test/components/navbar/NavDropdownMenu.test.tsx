import type { UserType } from "@/lib/types";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { toast } from "sonner";
import userEvent from "@testing-library/user-event";

import NavDropdownMenu from "@/components/navbar/NavDropdownMenu";

// type UserNameOnly = Omit<
//   UserType,
//   "id" | "email" | "username" | "address" | "phone"
// >;

type UserNameOnly = {
  name: UserType["name"];
};

let mockUser: UserNameOnly | null = null;
const mockLogout = vi.fn();
const mockNavigate = vi.fn();

vi.mock("@/lib/hooks", () => ({
  useAuth: () => ({
    user: mockUser,
    logout: mockLogout,
  }),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("sonner", () => ({
  toast: {
    warning: vi.fn(),
  },
}));

const renderComponent = () => {
  render(
    <MemoryRouter>
      <NavDropdownMenu />
    </MemoryRouter>,
  );
};

describe("NavDropdownMenu", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUser = null;
  });

  it("should render user initials when logged in", () => {
    mockUser = { name: { firstname: "John", lastname: "Doe" } };

    renderComponent();

    expect(
      screen.getByRole("button", { name: /user menu/i }),
    ).toHaveTextContent("JD");
  });

  it("should render user icon when logged out", () => {
    mockUser = null;

    renderComponent();

    expect(screen.getByTestId("account-user-icon")).toBeInTheDocument();
  });
  it("should show Logout button when logged in and call logout on click", async () => {
    mockUser = { name: { firstname: "John", lastname: "Doe" } };

    renderComponent();
    const user = userEvent.setup();
    const button = screen.getByRole("button", { name: /user menu/i });

    await user.click(button);

    const logoutButton = screen.getByRole("button", { name: /sign out/i });
    expect(logoutButton).toBeInTheDocument();

    await user.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/");
    expect(toast.warning).toHaveBeenCalledWith("You are signed out.");
  });

  it("should show Sign in when signed out", async () => {
    mockUser = null;
    renderComponent();
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /user menu/i }));

    const signInLink = screen.getByRole("menuitem", { name: /sign in/i });
    expect(signInLink).toHaveAttribute("href", "/login");
  });
});

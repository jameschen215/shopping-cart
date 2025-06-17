import { AuthContext } from "@/context/auth-context";
import { useAuth } from "@/lib/hooks";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

function TestComponent() {
  const { user, token, login, logout } = useAuth();

  return (
    <div>
      <div>Username: {user?.username || "No user"}</div>
      <div>Token: {token || "No token"}</div>

      <button onClick={() => login("fake-user", "fake-password")}>Login</button>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}

const fakeUser = {
  id: 1,
  username: "fake-user",
  email: "fakeuser@example.com",
  name: { firstname: "Fake", lastname: "User" },
  address: {
    city: "Fake city",
    street: "Fake ST",
    number: 12345678,
    zipcode: "123",
  },
  phone: "123-456-7890",
};
const fakeToken = "fake-token";
const mockLogin = vi.fn();
const mockLogout = vi.fn();

const renderComponent = () => {
  render(
    <AuthContext.Provider
      value={{
        user: fakeUser,
        token: fakeToken,
        login: mockLogin,
        logout: mockLogout,
      }}
    >
      <TestComponent />
    </AuthContext.Provider>,
  );
};

describe("useAuth hook with AuthContext", () => {
  it("should render user and token from context", () => {
    renderComponent();

    expect(screen.getByText(/username: fake-user/i)).toBeInTheDocument();
    expect(screen.getByText(/token: fake-token/i)).toBeInTheDocument();
  });

  it("should call login when login button clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(mockLogin).toHaveBeenCalledWith("fake-user", "fake-password");
  });

  it("should call logout when logout button clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByRole("button", { name: /logout/i }));

    expect(mockLogout).toHaveBeenCalled();
  });

  it("should throw error if used outside AuthProvider", () => {
    // Suppress error logging for this test
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      /useAuth must be used inside AuthProvider/,
    );

    spy.mockRestore();
  });
});

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

      <button onClick={() => login("john-doe", "password")}>Login</button>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}

const fakeUser = {
  id: 1,
  username: "john-doe",
  email: "johndoe@example.com",
  name: { firstname: "John", lastname: "Doe" },
  address: {
    city: "Random City",
    street: "Random ST",
    number: 12,
    zipcode: "12345",
  },
  phone: "123-456-7890",
};
const fakeToken = "token";
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

describe("AuthProvider", () => {
  it("should render user and token from context", () => {
    renderComponent();

    expect(screen.getByText(/username: john-doe/i)).toBeInTheDocument();
    expect(screen.getByText(/token: token/i)).toBeInTheDocument();
  });

  it("should call login when login button clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(mockLogin).toHaveBeenCalledWith("john-doe", "password");
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

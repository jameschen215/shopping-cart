import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import {
  createMemoryRouter,
  RouterProvider,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "@/lib/hooks";
import LoginPage from "@/pages/LoginPage";
import userEvent from "@testing-library/user-event";
import { toast } from "sonner";

vi.mock("@/lib/hooks", () => ({
  useAuth: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
  },
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
    useLocation: vi.fn(),
  };
});

const renderWithRouter = () => {
  const router = createMemoryRouter(
    [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
    {
      initialEntries: ["/login"],
    },
  );

  return render(<RouterProvider router={router} />);
};

describe("LoginPage", () => {
  const mockLogin = vi.fn();
  const mockNavigate = vi.fn();
  const mockUseAuth = useAuth as Mock;
  const mockUseNavigate = useNavigate as Mock;
  const mockUseLocation = useLocation as Mock;

  const testUser = { username: "mor_2314", password: "83r5^_" };

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseAuth.mockReturnValue({
      login: mockLogin,
      token: null,
    });

    mockUseNavigate.mockReturnValue(mockNavigate);

    mockUseLocation.mockReturnValue({
      state: { from: { pathname: "/" } },
    });
  });

  it("should render login form correctly", () => {
    renderWithRouter();

    expect(
      screen.getByRole("heading", { name: /sign in/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  it("should show validation errors on empty submit", async () => {
    const user = userEvent.setup();
    renderWithRouter();
    const submitBtn = screen.getByRole("button", { name: /sign in/i });

    await user.click(submitBtn);

    expect(
      await screen.findByText(/username is required/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  it("should submit valid form, call login, and show success message", async () => {
    const user = userEvent.setup();
    renderWithRouter();
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitBtn = screen.getByRole("button", { name: /sign in/i });

    await user.type(usernameInput, testUser.username);
    await user.type(passwordInput, testUser.password);
    await user.click(submitBtn);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        testUser.username,
        testUser.password,
      );
      expect(toast.success).toHaveBeenCalledWith("Login successfully!");
    });
  });

  it("should display error message when login fails", async () => {
    mockLogin.mockRejectedValueOnce(new Error("Invalid Credentials"));
    const user = userEvent.setup();
    renderWithRouter();
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitBtn = screen.getByRole("button", { name: /sign in/i });

    await user.type(usernameInput, "wrong_name");
    await user.type(passwordInput, "wrong_password");
    await user.click(submitBtn);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Invalid Credentials",
    );
  });

  it("should fill in test user credentials when checkbox is checked", async () => {
    const user = userEvent.setup();
    renderWithRouter();
    const checkbox = screen.getByLabelText(/david morrison/i);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.click(checkbox);

    expect(usernameInput).toHaveValue(testUser.username);
    expect(passwordInput).toHaveValue(testUser.password);
  });

  it("should redirect if token already exists", async () => {
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      token: "fake-token",
    });

    renderWithRouter();

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
    });
  });
});

import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { MemoryRouter } from "react-router-dom";
import CartButton from "@/components/navbar/CartButton";

const mockUseAuth = vi.fn();
const mockUseCart = vi.fn();

vi.mock("@/lib/hooks", () => ({
  useAuth: () => mockUseAuth(),
  useCart: () => mockUseCart(),
}));

const renderCartButton = () => {
  render(
    <MemoryRouter>
      <CartButton />
    </MemoryRouter>,
  );
};

describe("CartButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render link with correct aria-label", () => {
    mockUseAuth.mockReturnValue({ user: null });
    mockUseCart.mockReturnValue({ cartItems: [] });

    renderCartButton();

    const link = screen.getByRole("link", {
      name: /shopping cart with 0 items/i,
    });

    expect(link).toBeInTheDocument();
  });

  it("should render badge with correct count when user logged in and cart has items", () => {
    mockUseAuth.mockReturnValue({ user: { id: 1 } });
    mockUseCart.mockReturnValue({
      cartItems: [{ quantity: 5 }, { quantity: 6 }],
    });

    renderCartButton();

    expect(screen.getByText("11")).toBeInTheDocument();
  });

  it("should render badge with correct count when user logged in and cart items' number is greater than 99", () => {
    mockUseAuth.mockReturnValue({ user: { id: 1 } });
    mockUseCart.mockReturnValue({
      cartItems: [{ quantity: 50 }, { quantity: 60 }],
    });

    renderCartButton();

    expect(screen.getByText("99+")).toBeInTheDocument();
  });

  it("should not render badge if no user is logged in", () => {
    mockUseAuth.mockReturnValue({ user: null });
    mockUseCart.mockReturnValue({ cartItems: [{ quantity: 3 }] });

    renderCartButton();

    expect(screen.queryByTestId("badge")).not.toBeInTheDocument();
  });

  it("should not render badge if cart is empty", () => {
    mockUseAuth.mockReturnValue({ user: { id: 1 } });
    mockUseCart.mockReturnValue({ cartItems: [] });

    renderCartButton();

    expect(screen.queryByTestId("badge")).not.toBeInTheDocument();
  });
});

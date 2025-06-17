import { toast } from "sonner";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, type Mock } from "vitest";

import * as hooks from "@/lib/hooks";
import CartPage from "@/pages/CartPage";

// Mock cart data
const mockCartItems = [
  {
    product: {
      id: 1,
      title: "Test Product",
      price: 100,
      image: "/test.jpg",
      description: "Test product description",
      category: "Test category",
      rating: { rate: 5, count: 10 },
    },
    quantity: 1,
  },
];

vi.mock("sonner", () => ({
  toast: {
    info: vi.fn(),
  },
}));

// Mock hooks
vi.mock("@/lib/hooks", async () => {
  const mod = await vi.importActual("@/lib/hooks");
  return {
    ...mod,
    useCart: vi.fn(),
    useStayOnRoute: vi.fn(),
  };
});

/**
 * Typed hook mocks
 * vi.mock(...) mocks the module dynamically, but TypeScript doesn’t know
 * these functions are mocks unless you explicitly cast them.
 * If you need to type the mock, import Mock from 'vitest'
 */
const mockUseCart = hooks.useCart as unknown as Mock;
const mockUseStayOnRoute = hooks.useStayOnRoute as unknown as Mock;

/* Mock relevant UI components*/
vi.mock("@/components/skeletons/CartSkeleton", () => ({
  default: () => <div data-testid="mock-cart-skeleton" />,
}));

vi.mock("@/components/cart/NoItemCartPage", () => ({
  default: () => <div data-testid="no-item-cart-page" />,
}));

vi.mock("@/components/cart/CartTable", () => ({
  default: () => <div data-testid="mock-cart-table" />,
}));

// Type-safe setup
type SetupOptionsType = {
  isLoading?: boolean;
  items?: typeof mockCartItems;
};

// Centralized test setup
const renderComponent = ({
  isLoading = false,
  items = mockCartItems,
}: SetupOptionsType = {}) => {
  mockUseStayOnRoute.mockReturnValue(isLoading);
  mockUseCart.mockReturnValue({ cartItems: items, setCartItems: vi.fn() });

  render(
    <MemoryRouter>
      <CartPage />
    </MemoryRouter>,
  );
};

describe("CartPage", () => {
  describe("isLoading", () => {
    it("should render loading skeleton if stillOnCart is true", () => {
      renderComponent({ isLoading: true });

      expect(screen.getByTestId("mock-cart-skeleton")).toBeInTheDocument();
    });
  });

  describe("Logged in and cart empty", () => {
    it("should render NoItemCartPage", () => {
      renderComponent({ items: [] });

      expect(screen.getByTestId("no-item-cart-page")).toBeInTheDocument();
    });
  });

  describe("Logged in and has items", () => {
    it("should render CartTable", () => {
      renderComponent();

      expect(screen.getByTestId("mock-cart-table")).toBeInTheDocument();
    });

    it("should render both buttons with correct text", () => {
      renderComponent();

      const checkoutButton = screen.getByRole("button", { name: /checkout/i });
      const shoppingLink = screen.getByRole("link", { name: /shopping/i });

      expect(checkoutButton).toBeInTheDocument();
      expect(shoppingLink).toBeInTheDocument();
    });

    it("should call toast.info when clicking on checkout button", async () => {
      renderComponent();
      const user = userEvent.setup();
      const checkoutButton = screen.getByRole("button", { name: /checkout/i });

      await user.click(checkoutButton);

      expect(toast.info).toHaveBeenCalledWith(
        "Sorry, checkout is coming soon.",
      );
    });

    it("should render the shopping button with correct link", () => {
      renderComponent();

      const shoppingLink = screen.getByRole("link", { name: /shopping/i });

      expect(shoppingLink).toHaveAttribute("href", "/products");
    });
  });
});

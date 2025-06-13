import { toast } from "sonner";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, type Mock } from "vitest";

import * as hooks from "@/lib/hooks";
import CartPage from "@/pages/CartPage";

// Mock user and cart data
const mockUser = {
  id: 1,
  name: { firstname: "John", lastname: "Doe" },
  email: "john.doe@example.com",
  username: "john-doe",
  address: {
    street: "123 Main St",
    city: "Any town",
    number: 1,
    zipcode: "12345",
  },
  phone: "123-456-7890",
};

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
  const actual = await vi.importActual("@/lib/hooks");
  return {
    ...actual,
    useCart: vi.fn(),
    useAuth: vi.fn(),
    useStayOnRoute: vi.fn(),
  };
});

/* Mock relevant UI components*/
vi.mock("@/components/skeletons/CartSkeleton", () => ({
  default: () => <div>Mock CartSkeleton</div>,
}));

vi.mock("@/components/cart/NoUserCartPage", () => ({
  default: () => <div>Mock NoUserCartPage</div>,
}));

vi.mock("@/components/cart/NoItemCartPage", () => ({
  default: () => <div>Mock NoItemCartPage</div>,
}));

vi.mock("@/components/cart/CartTable", () => ({
  default: () => <div>Mock CartTable</div>,
}));

// Type-safe setup
type SetupOptionsType = {
  isLoading?: boolean;
  user?: typeof mockUser | null;
  items?: typeof mockCartItems;
};

/**
 * Typed hook mocks
 * vi.mock(...) mocks the module dynamically, but TypeScript doesn’t know
 * these functions are mocks unless you explicitly cast them.
 * If you need to type the mock, import Mock from 'vitest'
 */
const mockUseCart = hooks.useCart as unknown as Mock;
const mockUseAuth = hooks.useAuth as unknown as Mock;
const mockUseStayOnRoute = hooks.useStayOnRoute as unknown as Mock;

// Centralized test setup
const renderComponent = ({
  isLoading = false,
  user = mockUser,
  items = mockCartItems,
}: SetupOptionsType = {}) => {
  mockUseStayOnRoute.mockReturnValue(isLoading);
  mockUseAuth.mockReturnValue({ user });
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

      expect(screen.getByText("Mock CartSkeleton")).toBeInTheDocument();
    });
  });

  describe("Logged out or no item", () => {
    it("should render NoUserCartPage if user is not logged in", () => {
      renderComponent({ user: null });

      expect(screen.getByText("Mock NoUserCartPage")).toBeInTheDocument();
    });

    it("should render NoItemCartPage if cart is empty", () => {
      renderComponent({ items: [] });

      expect(screen.getByText("Mock NoItemCartPage")).toBeInTheDocument();
    });
  });

  describe("Logged in and has items", () => {
    it("should render CartTable", () => {
      renderComponent();

      expect(screen.getByText("Mock CartTable")).toBeInTheDocument();
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

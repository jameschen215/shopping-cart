import { describe, expect, it, vi } from "vitest";
import * as hooks from "@/lib/hooks";
import { useContext } from "react";
import { CartContext } from "@/context/cart-context";
import CartProvider from "@/context/CartProvider";
import { render } from "@testing-library/react";
import type { CartContextType } from "@/context/cart-context";

describe("CartProvider", () => {
  it("should provide cart context to its children", () => {
    const mockCart = [
      {
        product: {
          id: 1,
          title: "Test Product",
          price: 9.99,
          description: "A test product",
          category: "Test Category",
          image: "test-image.jpg",
          rating: { rate: 4.5, count: 10 },
        },
        quantity: 2,
      },
    ];

    vi.spyOn(hooks, "useCartInitializer").mockReturnValue({
      cartItems: mockCart,
      setCartItems: vi.fn(),
    });

    let receivedContext: CartContextType | null = null;

    const TestComponent = () => {
      receivedContext = useContext(CartContext) as CartContextType;
      return <div>Test</div>;
    };

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    // ✅ Now do assertions here
    expect(receivedContext).not.toBeNull();
    expect(receivedContext!.cartItems).toHaveLength(1);
    expect(receivedContext!.cartItems[0].product.title).toBe("Test Product");
  });

  it("should throw error if used outside CartProvider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    const BrokenComponent = () => {
      const context = useContext(CartContext);
      if (!context) throw new Error("useCart must be used inside CartProvider");
      return <div />;
    };

    expect(() => render(<BrokenComponent />)).toThrow(
      /useCart must be used inside CartProvider/,
    );

    spy.mockRestore();
  });
});

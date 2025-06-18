import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import AuthProvider from "@/context/AuthProvider";
import CartProvider from "@/context/CartProvider";
import Navbar from "@/components/navbar/Navbar";

/* Mock child components */
vi.mock("@/components/navbar/BrandAndLogo", () => ({
  default: () => <div data-testid="mock-brand-and-logo" />,
}));

vi.mock("@/components/navbar/CartButton", () => ({
  default: () => <div data-testid="mock-cart-button" />,
}));

vi.mock("@/components/navbar/ModeToggle", () => ({
  default: () => <div data-testid="mock-mode-toggle" />,
}));

vi.mock("@/components/navbar/NavDropdownMenu", () => ({
  default: () => <div data-testid="mock-nav-dropdown-menu" />,
}));

describe("Navbar", () => {
  it("should render header and all child components", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <CartProvider>
            <Navbar />
          </CartProvider>
        </AuthProvider>
      </MemoryRouter>,
    );

    expect(screen.getByRole("banner")).toBeInTheDocument(); // header landmark
    expect(screen.getByTestId("mock-brand-and-logo")).toBeInTheDocument();
    expect(screen.getByTestId("mock-cart-button")).toBeInTheDocument();
    expect(screen.getByTestId("mock-mode-toggle")).toBeInTheDocument();
    expect(screen.getByTestId("mock-nav-dropdown-menu")).toBeInTheDocument();
  });
});

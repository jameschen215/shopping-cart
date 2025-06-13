import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import AuthProvider from "@/context/AuthProvider";
import CartProvider from "@/context/CartProvider";
import Navbar from "@/components/navbar/Navbar";

/* Mock child components */
vi.mock("@/components/navbar/BrandAndLogo", () => ({
  default: () => <div>Mocked BrandAndLogo</div>,
}));

vi.mock("@/components/navbar/CartButton", () => ({
  default: () => <div>Mocked CartButton</div>,
}));

vi.mock("@/components/navbar/ModeToggle", () => ({
  default: () => <div>Mocked ModeToggle</div>,
}));

vi.mock("@/components/navbar/NavDropdownMenu", () => ({
  default: () => <div>Mocked NavDropdownMenu</div>,
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
    expect(screen.getByText("Mocked BrandAndLogo")).toBeInTheDocument();
    expect(screen.getByText("Mocked CartButton")).toBeInTheDocument();
    expect(screen.getByText("Mocked ModeToggle")).toBeInTheDocument();
    expect(screen.getByText("Mocked NavDropdownMenu")).toBeInTheDocument();
  });
});

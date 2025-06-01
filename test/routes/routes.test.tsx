import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, Outlet, RouterProvider } from "react-router-dom";

import { routes } from "@/routes/routes";

vi.mock("@/App", () => ({
  default: () => (
    <div>
      Mock Layout
      <Outlet />
    </div>
  ),
}));

vi.mock("@/features/home/HomePage", () => ({
  default: () => <div>Mock Home</div>,
}));

vi.mock("@/features/products/ProductsPage", () => ({
  default: () => <div>Mock Product List</div>,
}));

vi.mock("@/features/product/ProductPage", () => ({
  default: () => <div>Mock Product Details</div>,
}));

vi.mock("@/features/cart/CartPage", () => ({
  default: () => <div>Mock Cart</div>,
}));

vi.mock("sonner", () => ({
  Toaster: () => <div data-testid="mock-toaster" />,
  toast: vi.fn(),
}));

const renderRoute = (path: string = "/") => {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(<RouterProvider router={router} />);
};

describe("Router with mocked pages", () => {
  it("renders mocked Home page", () => {
    renderRoute("/");

    expect(screen.getByText(/mock home/i)).toBeInTheDocument();
  });

  it("renders mocked Products page", () => {
    renderRoute("/products");

    expect(screen.getByText(/mock product list/i)).toBeInTheDocument();
  });

  it("renders mocked Product page", () => {
    renderRoute("/product/123");

    expect(screen.getByText(/mock product details/i)).toBeInTheDocument();
  });

  it("renders mocked Cart page", () => {
    renderRoute("/cart");

    expect(screen.getByText(/mock cart/i)).toBeInTheDocument();
  });

  it("renders layout with Toaster", () => {
    renderRoute();

    expect(screen.getByTestId("mock-toaster")).toBeInTheDocument();
  });
});

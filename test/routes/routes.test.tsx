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

vi.mock("@/features/home/home", () => ({
  default: () => <div>Mock Home</div>,
}));

vi.mock("@/features/products/products", () => ({
  default: () => <div>Mock Product List</div>,
}));

vi.mock("@/features/product/product", () => ({
  default: () => <div>Mock Product Details</div>,
}));

vi.mock("@/features/cart/cart", () => ({
  default: () => <div>Mock Cart</div>,
}));

describe("Router with mocked pages", () => {
  it("renders mocked Home page", () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });

    render(<RouterProvider router={router} />);

    expect(screen.getByText(/mock home/i)).toBeInTheDocument();
  });

  it("renders mocked Products page", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/products"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByText(/mock product list/i));
  });

  it("renders mocked Product page", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/product/123"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByText(/mock product details/i));
  });

  it("renders mocked Cart page", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/cart"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByText(/mock cart/i));
  });
});

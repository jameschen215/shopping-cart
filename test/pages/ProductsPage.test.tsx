import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import type { ProductType } from "@/lib/types";
import ProductsPage from "@/pages/products/ProductsPage";

// --- Mock children that are already tested separately ---
vi.mock("@/components/products/SearchForm", () => ({
  default: () => <div data-testid="mock-search-form" />,
}));

vi.mock("@/components/products/CategoryNavigation", () => ({
  default: () => <div data-testid="mock-category-nav" />,
}));

vi.mock("@/components/products/ProductCards", () => ({
  default: ({ products }: { products: ProductType[] }) => (
    <div data-testid="mock-product-cards">{products.length} products</div>
  ),
}));

vi.mock("@/components/skeletons/ProductsSkeleton", () => ({
  default: () => <div data-testid="mock-skeleton" />,
}));

// --- Create manual "mock return value" variables ---
let mockUseParamsReturn: Record<string, string | undefined> = {};
let mockUseStayOnRouteReturn = false;
let mockUseNavigationLocation: unknown = null;

// --- Mock the react-router-dom hooks ---
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLoaderData: () => ({
      data: [
        { id: 1, category: "men's clothing" },
        { id: 2, category: "women's clothing" },
        { id: 3, category: "electronics" },
        { id: 4, category: "men's clothing" },
      ],
    }),
    useParams: () => mockUseParamsReturn,
    useNavigation: () => ({
      location: mockUseNavigationLocation,
    }),
  };
});

// --- Also mock useStayOnRoute ---
vi.mock("@/lib/hooks", () => ({
  useStayOnRoute: () => mockUseStayOnRouteReturn,
}));

// --- Helper to render the component ---
const renderComponent = (initialEntry: string) => {
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path={initialEntry} element={<ProductsPage />} />
      </Routes>
    </MemoryRouter>,
  );
};

describe("ProductsPage", () => {
  it("should render skeleton if loading or no category", () => {
    mockUseParamsReturn = { category: "" };
    mockUseStayOnRouteReturn = true;
    mockUseNavigationLocation = null;

    renderComponent("/products");

    expect(screen.getByTestId("mock-skeleton")).toBeInTheDocument();
  });

  it("should render all products when no category is selected", () => {
    mockUseParamsReturn = {};
    mockUseStayOnRouteReturn = false;
    mockUseNavigationLocation = null;

    renderComponent("/products");

    expect(screen.getByTestId("mock-product-cards")).toHaveTextContent(
      "4 products",
    );
  });

  it("should render filtered products when a category exists", () => {
    mockUseParamsReturn = { category: "men" };
    mockUseStayOnRouteReturn = false;
    mockUseNavigationLocation = null;

    renderComponent("/products/men");

    expect(screen.getByTestId("mock-product-cards")).toHaveTextContent(
      "2 products",
    );
  });

  it("should throw error when invalid category is provided", () => {
    mockUseParamsReturn = { category: "nonexistent" };
    mockUseStayOnRouteReturn = false;
    mockUseNavigationLocation = null;

    // Temporarily disables the output of `console.error`.
    // const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => renderComponent("/products/nonexistent")).toThrow(
      "Category not found",
    );

    // Restores `console.error` after the test is finished.
    // errorSpy.mockRestore();
  });
});

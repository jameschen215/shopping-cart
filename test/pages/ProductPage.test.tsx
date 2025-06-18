/* --- @/test/pages/ProductPage.test.tsx --- */

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import ProductPage from "@/pages/product/ProductPage";

const mockUseLoaderData = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLoaderData: () => mockUseLoaderData(),
  };
});

const mockUseStayOnRoute = vi.fn();
vi.mock("@/lib/hooks", () => ({
  useStayOnRoute: () => mockUseStayOnRoute(),
}));

// Mock child components so we don’t test their internals
vi.mock("@/components/product/ImageWrapper", () => ({
  ImageWrapper: () => <div data-testid="image-wrapper" />,
}));

vi.mock("@/components/product/ProductDetails", () => ({
  ProductDetails: () => <div data-testid="product-details" />,
}));

vi.mock("@/components/skeletons/ProductSkeleton", () => ({
  default: () => <div data-testid="skeleton" />,
}));

const mockProduct = {
  product: {
    id: 1,
    title: "Test Product",
    price: 19.99,
    image: "test.jpg",
    description: "Test",
    category: "test",
    rating: { rate: 4.5, count: 100 },
  },
};

describe("ProductPage", () => {
  it("should render skeleton while loading", () => {
    mockUseStayOnRoute.mockReturnValue(true);
    mockUseLoaderData.mockReturnValue({ product: {} });

    render(<ProductPage />);

    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("should render product when not loading", () => {
    mockUseStayOnRoute.mockReturnValue(false);
    mockUseLoaderData.mockReturnValue(mockProduct);

    render(<ProductPage />);

    expect(screen.getByTestId("image-wrapper")).toBeInTheDocument();
    expect(screen.getByTestId("product-details")).toBeInTheDocument();
  });
});

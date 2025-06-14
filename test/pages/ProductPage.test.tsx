/* --- @/test/pages/ProductPage.test.tsx --- */

import { describe, expect, it, vi, type Mock } from "vitest";
import { render, screen } from "@testing-library/react";

import { useLoaderData } from "react-router-dom";
import { useStayOnRoute } from "@/lib/hooks";
import ProductPage from "@/pages/product/ProductPage";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLoaderData: vi.fn(),
  };
});

vi.mock("@/lib/hooks", () => ({
  useStayOnRoute: vi.fn(),
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

const mockedUseLoaderData = useLoaderData as unknown as Mock;
const mockedUseStayOnRoute = useStayOnRoute as unknown as Mock;

const mockedProduct = {
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
    mockedUseStayOnRoute.mockReturnValue(true);
    mockedUseLoaderData.mockReturnValue({ product: {} });

    render(<ProductPage />);

    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("should render product when not loading", () => {
    mockedUseStayOnRoute.mockReturnValue(false);
    mockedUseLoaderData.mockReturnValue(mockedProduct);

    render(<ProductPage />);

    expect(screen.getByTestId("image-wrapper")).toBeInTheDocument();
    expect(screen.getByTestId("product-details")).toBeInTheDocument();
  });
});

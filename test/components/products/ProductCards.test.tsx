import ProductCards from "@/components/products/ProductCards";
import type { ProductType } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const fakeProducts = [
  {
    id: 1,
    title: "Product 1",
    price: 10,
    description: "This is product 1.",
    category: "Category 1",
    image: "img1.jpg",
    rating: { rate: 4.5, count: 20 },
  },
  {
    id: 2,
    title: "Product 2",
    price: 50,
    description: "This is product 2.",
    category: "Category 2",
    image: "img2.jpg",
    rating: { rate: 3.5, count: 1000 },
  },
];

vi.mock("@/components/others/StarRating", () => ({
  default: () => <div data-testid="star-rating" />,
}));

const renderComponent = (products: ProductType[]) => {
  render(
    <MemoryRouter>
      <ProductCards products={products} />
    </MemoryRouter>,
  );
};

describe("ProductCards", () => {
  it("should render 'No item found.' when products is empty", () => {
    renderComponent([]);

    expect(screen.getByText(/no item found/i)).toBeInTheDocument();
  });

  it("should render cards correctly when products is not empty", () => {
    renderComponent(fakeProducts);

    expect(screen.getByText(/product 1/i)).toBeInTheDocument();
    expect(screen.getByTestId("price-1")).toHaveTextContent(formatCurrency(10));
    expect(
      screen.getByRole("img", { name: "Image of Product 1" }),
    ).toBeInTheDocument();

    expect(screen.getByText(/product 2/i)).toBeInTheDocument();
    expect(screen.getByTestId("price-2")).toHaveTextContent(formatCurrency(50));
    expect(
      screen.getByRole("img", { name: "Image of Product 2" }),
    ).toBeInTheDocument();

    screen.getAllByTestId("star-rating").forEach((star) => {
      expect(star).toBeInTheDocument();
    });
  });

  it("should navigate to product page on card click", async () => {
    const user = userEvent.setup();
    renderComponent(fakeProducts);
    const card = screen.getByRole("button", { name: /card of product 1/i });

    await user.click(card);

    expect(mockNavigate).toHaveBeenCalledWith("/products/1");
  });

  it("should navigate to product page on Enter key", async () => {
    const user = userEvent.setup();
    renderComponent(fakeProducts);
    const card = screen.getByRole("button", { name: /card of product 1/i });

    card.focus();
    await user.keyboard("{Enter}");

    expect(mockNavigate).toHaveBeenCalledWith("/products/1");
  });
});

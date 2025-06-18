import { ProductDetails } from "@/components/product/ProductDetails";
import { formatCurrency } from "@/lib/utils";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockedAddToCart = vi.fn();

vi.mock("@/lib/hooks", () => ({
  useAddToCart: () => ({
    addToCart: mockedAddToCart,
  }),
}));

vi.mock("@/components/others/ProductCount", () => ({
  default: () => <div data-testid="product-count" />,
}));

vi.mock("@/components/others/StarRating", () => ({
  default: () => <div data-testid="star-rating" />,
}));

const mockProduct = {
  id: 1,
  title: "Test Product",
  description: "This is a test product.",
  price: 19.99,
  rating: { rate: 4.5, count: 10 },
  category: "test",
  image: "product-image.jpg",
};

describe("ProductDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render product information correctly", () => {
    render(<ProductDetails product={mockProduct} />);

    const heading1 = screen.getByRole("heading", { level: 1 });
    const heading2 = screen.getByRole("heading", { level: 2 });
    const desc = screen.getByText("This is a test product.");
    const rating = screen.getByTestId("star-rating");
    const count = screen.getByTestId("product-count");

    expect(heading1).toHaveTextContent(formatCurrency(mockProduct.price));
    expect(heading2).toHaveTextContent(mockProduct.title);
    expect(desc).toBeInTheDocument();
    expect(rating).toBeInTheDocument();
    expect(count).toBeInTheDocument();
  });

  it("should call addToCart with correct arguments", async () => {
    const user = userEvent.setup();
    render(<ProductDetails product={mockProduct} />);
    const button = screen.getByRole("button", { name: /add to cart/i });

    await user.click(button);

    expect(mockedAddToCart).toHaveBeenCalledOnce();
    expect(mockedAddToCart).toHaveBeenCalledWith(mockProduct, 1);
  });
});

import { ImageWrapper } from "@/components/product/ImageWrapper";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

const mockProduct = {
  id: 1,
  title: "Test Product",
  image: "https://example.com/image.jpg",
  price: 19.99,
  description: "A cool product",
  category: "Gadgets",
  rating: { rate: 3.5, count: 200 },
};

describe("ImageWrapper", () => {
  it("should render the product image with correct alt and src", () => {
    render(<ImageWrapper product={mockProduct} />);
    const img = screen.getByRole("img", { name: /test product/i });

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("alt", mockProduct.title);
    expect(img).toHaveAttribute("src", mockProduct.image);
    expect(img).toHaveAttribute("loading", "lazy");
  });
});

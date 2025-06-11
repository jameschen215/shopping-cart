import ProductsPage from "@/pages/products";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("ProductsPage", () => {
  it("should render a category selector element", () => {
    render(<ProductsPage />);

    expect(screen.getByTestId("categories")).toBeInTheDocument();
  });
});

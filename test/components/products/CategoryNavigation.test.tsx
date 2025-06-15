import CategoryNavigation from "@/components/products/CategoryNavigation";
import { PRODUCTS_PAGE_CATEGORIES } from "@/lib/constants";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

describe("CategoryNavigation", () => {
  it("should render all category links", () => {
    render(
      <MemoryRouter>
        <CategoryNavigation />
      </MemoryRouter>,
    );

    PRODUCTS_PAGE_CATEGORIES.forEach(({ id, label, to }) => {
      const link = screen.getByTestId(`category-link-${id}`);

      expect(link).toHaveTextContent(label);
      expect(link).toHaveAttribute("href", to);
    });
  });

  it("should apply active style to the active link", () => {
    // Render with MemoryRouter initialEntries to simulate active route
    const initialCategory = PRODUCTS_PAGE_CATEGORIES[0];
    render(
      <MemoryRouter initialEntries={[initialCategory.to]}>
        <CategoryNavigation />
      </MemoryRouter>,
    );

    const activeLink = screen.getByTestId(
      `category-link-${initialCategory.id}`,
    );
    const childSpan = activeLink.querySelector("span");

    expect(childSpan).toBeTruthy();
    expect(childSpan?.className).toContain("text-foreground");
  });
});

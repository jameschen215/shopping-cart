import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import NoItemCartPage from "@/components/cart/NoItemCartPage";

describe("NoItemCartPage", () => {
  it("should render heading, paragraph, and button with link", () => {
    render(
      <MemoryRouter>
        <NoItemCartPage />
      </MemoryRouter>,
    );

    const heading = screen.getByRole("heading", { level: 1 });
    const paragraph = screen.getByTestId("paragraph");
    const shoppingLink = screen.getByRole("link", { name: /go shopping/i });

    expect(heading).toHaveTextContent("Your cart is empty");
    expect(paragraph).toHaveTextContent(
      "Looks like you haven't added anything yet.",
    );
    expect(shoppingLink).toHaveAttribute("href", "/products");
  });
});

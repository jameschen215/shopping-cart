import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import NoUserCartPage from "@/components/cart/NoUserCartPage";

describe("NoUserCartPage", () => {
  it("should render heading, paragraph, and buttons with links", () => {
    render(
      <MemoryRouter>
        <NoUserCartPage />
      </MemoryRouter>,
    );

    const heading = screen.getByRole("heading", { level: 1 });
    const paragraph = screen.getByTestId("paragraph");
    const goShoppingLink = screen.getByRole("link", {
      name: /go back shopping/i,
    });
    const signInLink = screen.getByRole("link", { name: /sign in/i });

    expect(heading).toHaveTextContent("Your cart is empty");
    expect(paragraph).toHaveTextContent(
      "Have an account? Sign in to see your cart",
    );
    expect(goShoppingLink).toHaveAttribute("href", "/products");
    expect(signInLink).toHaveAttribute("href", "/login");
  });
});

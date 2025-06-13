import ButtonGroup from "@/components/cart/ButtonGroup";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MemoryRouter } from "react-router-dom";
import { toast } from "sonner";
import { beforeEach, describe, expect, it, vi } from "vitest";

const renderComponent = () => {
  render(
    <MemoryRouter>
      <ButtonGroup />
    </MemoryRouter>,
  );
};

vi.mock("sonner", () => ({
  toast: {
    info: vi.fn(),
  },
}));

describe("ButtonGroup", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render both buttons with correct text", () => {
    renderComponent();

    const checkoutButton = screen.getByRole("button", { name: /checkout/i });
    const shoppingLink = screen.getByRole("link", { name: /shopping/i });

    expect(checkoutButton).toBeInTheDocument();
    expect(shoppingLink).toBeInTheDocument();
  });

  it("should call toast.info when clicking on checkout button", async () => {
    renderComponent();
    const user = userEvent.setup();
    const checkoutButton = screen.getByRole("button", { name: /checkout/i });

    await user.click(checkoutButton);

    expect(toast.info).toHaveBeenCalledWith("Sorry, checkout is coming soon.");
  });

  it("should render the shopping button with correct link", () => {
    renderComponent();

    const shoppingLink = screen.getByRole("link", { name: /shopping/i });

    expect(shoppingLink).toHaveAttribute("href", "/products");
  });
});

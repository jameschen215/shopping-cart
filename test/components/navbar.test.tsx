import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Navbar from "@/components/navbar/navbar";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const renderNavbar = () => {
  return render(
    <MemoryRouter initialEntries={["/products"]}>
      <Navbar />
    </MemoryRouter>,
  );
};

describe("Navbar Component", () => {
  it("renders all navigation links", () => {
    renderNavbar();

    // Main Navbar
    expect(
      screen.getByRole("navigation", { name: /main navigation/i }),
    ).toBeInTheDocument();

    // Brand Logo
    expect(
      screen.getByRole("link", { name: /odin store.*homepage/i }),
    ).toBeInTheDocument();

    // Home Link
    expect(screen.getByRole("link", { name: "HOME" })).toBeInTheDocument();

    // Shop Link exists and is active
    const shopLink = screen.getByRole("link", { name: "SHOP" });
    expect(shopLink).toBeInTheDocument();
    expect(shopLink).toHaveClass("active");

    // Cart Link
    expect(screen.getByRole("link", { name: "CART" })).toBeInTheDocument();
  });

  it("renders theme button correctly", () => {
    renderNavbar();

    expect(screen.getByTestId("mode-toggle")).toBeInTheDocument();
  });

  it("renders avatar and dropdown menu correctly", async () => {
    const user = userEvent.setup();
    renderNavbar();

    const photoTrigger = screen.getByTestId("user-photo");
    expect(photoTrigger).toBeInTheDocument();

    await user.click(photoTrigger);
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });
});

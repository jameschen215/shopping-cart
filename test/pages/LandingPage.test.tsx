import LandingPage from "@/pages/landing-page/LandingPage";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

// Mock UI
vi.mock("@/components/landing-page/AppCarousel", () => ({
  default: () => <div data-testid="mock-carousel">Mock Carousel</div>,
}));

const renderLandingPage = () => {
  render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>,
  );
};

describe("LandingPage", () => {
  it("should render the heading title", () => {
    renderLandingPage();

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Shop Smarter, Live Better",
    );
  });

  it("should render carousel", () => {
    renderLandingPage();

    expect(screen.getByTestId("mock-carousel")).toBeInTheDocument();
  });

  it("should render both buttons with correct texts and links", () => {
    renderLandingPage();
    const shopLink = screen.getByRole("link", { name: /shop/i });
    const signLink = screen.getByRole("link", { name: /sign/i });

    expect(shopLink).toHaveAttribute("href", "/products");
    expect(signLink).toHaveAttribute("href", "/login");
  });
});

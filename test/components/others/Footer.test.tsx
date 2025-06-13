import Footer from "@/components/others/Footer";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

const renderFooter = () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  );
};

describe("Footer", () => {
  it("should render with correct text content", () => {
    renderFooter();

    // Check if the copyright text is present
    expect(
      screen.getByText(/2025 © Odin Project Assignment by/i),
    ).toBeInTheDocument();
  });

  it("should render correct author link", () => {
    renderFooter();

    const link = screen.getByRole("link", {
      name: /Go to author's Github repository/i,
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://github.com/JamesChan");
    expect(link).toHaveAttribute("target", "_blank");
  });
});

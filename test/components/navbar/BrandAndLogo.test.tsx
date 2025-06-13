import BrandAndLogo from "@/components/navbar/BrandAndLogo";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

describe("BrandAndLogo", () => {
  it("should render the logo and brand name with correct link", () => {
    render(
      <MemoryRouter>
        <BrandAndLogo />
      </MemoryRouter>,
    );

    /* Check the link to homepage */
    const link = screen.getByRole("link", { name: /odin store homepage/i });
    expect(link).toHaveAttribute("href", "/");

    /* Check the logo image */
    const logo = screen.getByAltText(/odin store logo/i);
    expect(logo).toBeInTheDocument();
  });
});

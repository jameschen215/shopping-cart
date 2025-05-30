import { type ReactNode } from "react";

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import HomePage from "@/features/home/home";
import { MemoryRouter } from "react-router-dom";

// Mock the shadcn/ui components
vi.mock("@/components/typography", () => ({
  TypographyH1: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <h1 className={className} data-testid="main-heading">
      {children}
    </h1>
  ),
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({
    className,
    children,
    ...props
  }: {
    className?: string;
    children: ReactNode;
  }) => (
    <button className={className} data-testid="button" {...props}>
      {children}
    </button>
  ),
}));

vi.mock("@/components/carousel-shad/carousel-shad", () => ({
  default: ({ className }: { className?: string }) => (
    <div className={className} data-testid="carousel">
      Carousel Component
    </div>
  ),
}));

describe("HomePage", () => {
  it("renders the main heading with correct text", () => {
    render(<HomePage />, { wrapper: MemoryRouter });

    const heading = screen.getByTestId("main-heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/shop smarter.*live better/i); // exclude span
  });

  it("renders carousel component", () => {
    render(<HomePage />, { wrapper: MemoryRouter });

    const carousel = screen.getByTestId("carousel");
    expect(carousel).toBeInTheDocument();
  });

  it("renders two navigation buttons", () => {
    render(<HomePage />, { wrapper: MemoryRouter });

    const buttons = screen.getAllByTestId("button");
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent(/shop now/i);
    expect(buttons[1]).toHaveTextContent(/sign in/i);
  });
});

describe("HomePage Snapshots", () => {
  it("matches snapshots", () => {
    const { container } = render(<HomePage />, { wrapper: MemoryRouter });

    expect(container.firstChild).toMatchSnapshot();
  });
});

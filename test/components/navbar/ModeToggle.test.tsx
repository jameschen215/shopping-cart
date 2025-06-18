import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ModeToggle from "@/components/navbar/ModeToggle";

/** --- Mock Module  --- */

const mockUseTheme = vi.fn();
vi.mock("@/lib/hooks", () => ({
  // Calls the mock function and returns result - the theme context
  // When you do this line below:
  // mockUseTheme.mockReturnValue(...)
  // you actually do this line:
  // context.mockReturnValue(...)
  useTheme: () => mockUseTheme(),
}));

describe("ModeToggle", () => {
  it("renders with light theme and switches to dark", async () => {
    const user = userEvent.setup();
    const setTheme = vi.fn();
    mockUseTheme.mockReturnValue({
      theme: "light",
      setTheme,
    });

    render(<ModeToggle />);
    const button = screen.getByRole("button", {
      name: /switch to dark theme/i,
    });

    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(setTheme).toHaveBeenCalledWith("dark");
  });

  it("renders with dark theme and switches to light", async () => {
    const user = userEvent.setup();
    const setTheme = vi.fn();
    mockUseTheme.mockReturnValue({
      theme: "dark",
      setTheme,
    });

    render(<ModeToggle />);
    const button = screen.getByRole("button", {
      name: /switch to light theme/i,
    });

    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(setTheme).toHaveBeenCalledWith("light");
  });
});

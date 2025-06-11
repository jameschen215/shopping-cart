import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "@/lib/hooks";

/** --- Mock Module --- */
vi.mock("@/lib/hooks", () => ({
  useTheme: vi.fn(),
}));

const mockedUseTheme = useTheme as ReturnType<typeof vi.fn>;

describe("ModeToggle Component", () => {
  it("renders with light theme and switches to dark", async () => {
    const user = userEvent.setup();
    const setTheme = vi.fn();
    mockedUseTheme.mockReturnValue({
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
    mockedUseTheme.mockReturnValue({
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

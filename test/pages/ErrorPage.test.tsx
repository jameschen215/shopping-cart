import ErrorPage from "@/pages/ErrorPage";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useNavigate, useRouteError } from "react-router-dom";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";

// Mock react-router-dom hooks
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useRouteError: vi.fn(),
    useNavigate: vi.fn(),
  };
});

describe("ErrorPage", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();

    const mockUseNavigate = useNavigate as unknown as Mock;
    const mockUseRouteError = useRouteError as unknown as Mock;

    mockUseNavigate.mockReturnValue(mockNavigate);
    mockUseRouteError.mockReturnValue(new Error("Test error message"));
  });

  it("should set document title and display error message", () => {
    render(<ErrorPage />);

    const title = "Error - Odin Store";
    const heading = "Oops!";
    const para1 = "Sorry, an unexpected error has occurred.";
    const para2 = "Test error message";

    expect(document.title).toBe(title);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      heading,
    );
    expect(screen.getByText(para1)).toBeInTheDocument();
    expect(screen.getByText(para2)).toBeInTheDocument();
  });

  it('should call navigate(-1) when "Go back" is clicked', async () => {
    const user = userEvent.setup();
    render(<ErrorPage />);
    const button = screen.getByRole("button", { name: /go back to previous/i });

    await user.click(button);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});

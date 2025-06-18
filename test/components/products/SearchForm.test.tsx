import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import SearchForm from "@/components/products/SearchForm";

const mockUseLoaderData = vi.fn();
const mockUseNavigation = vi.fn();
const mockSubmit = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useSubmit: () => mockSubmit,
    useNavigation: () => mockUseNavigation(),
    useLoaderData: () => mockUseLoaderData(),
    Form: (props: React.ComponentPropsWithoutRef<"form">) => (
      <form {...props} />
    ),
  };
});

describe("SearchForm", () => {
  beforeEach(() => {
    mockSubmit.mockClear();
    mockUseNavigation.mockReturnValue({ location: { search: "" } });
  });

  it("renders input with initial query from loader", () => {
    mockUseLoaderData.mockReturnValue({ q: "laptop" });
    render(<SearchForm />);
    const input = screen.getByPlaceholderText(/search products/i);

    expect(input).toHaveValue("laptop");
  });

  it("should debounce submit after typing", async () => {
    const user = userEvent.setup();
    mockUseLoaderData.mockReturnValue({ q: null });

    render(<SearchForm />);
    const input = screen.getByPlaceholderText(/search products/i);

    await user.type(input, "new query");

    await waitFor(
      () => {
        expect(mockSubmit).toHaveBeenCalled();
      },
      { timeout: 500 },
    );
  });

  it("should show spinner when navigating with ?q=", () => {
    mockUseLoaderData.mockReturnValue({ q: "test" });
    mockUseNavigation.mockReturnValue({ location: { search: "?q=test" } });

    render(<SearchForm />);
    const spinner = screen.getByRole("status", { hidden: true });

    expect(spinner).toBeVisible();
  });
});

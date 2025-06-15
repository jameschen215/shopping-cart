import SearchForm from "@/components/products/SearchForm";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockedUseLoaderData = vi.fn();
const mockedUseNavigation = vi.fn();
const mockedSubmit = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useSubmit: () => mockedSubmit,
    useNavigation: () => mockedUseNavigation(),
    useLoaderData: () => mockedUseLoaderData(),
    Form: (props: React.ComponentPropsWithoutRef<"form">) => (
      <form {...props} />
    ),
  };
});

describe("SearchForm", () => {
  beforeEach(() => {
    mockedSubmit.mockClear();
    mockedUseNavigation.mockReturnValue({ location: { search: "" } });
  });

  it("renders input with initial query from loader", () => {
    mockedUseLoaderData.mockReturnValue({ q: "laptop" });
    render(<SearchForm />);
    const input = screen.getByPlaceholderText(/search products/i);

    expect(input).toHaveValue("laptop");
  });

  it("should debounce submit after typing", async () => {
    const user = userEvent.setup();
    mockedUseLoaderData.mockReturnValue({ q: null });

    render(<SearchForm />);
    const input = screen.getByPlaceholderText(/search products/i);

    await user.type(input, "new query");

    await waitFor(
      () => {
        expect(mockedSubmit).toHaveBeenCalled();
      },
      { timeout: 500 },
    );
  });

  it("should show spinner when navigating with ?q=", () => {
    mockedUseLoaderData.mockReturnValue({ q: "test" });
    mockedUseNavigation.mockReturnValue({ location: { search: "?q=test" } });

    render(<SearchForm />);
    const spinner = screen.getByRole("status", { hidden: true });

    expect(spinner).toBeVisible();
  });
});

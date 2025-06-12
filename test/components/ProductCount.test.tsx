import ProductCount from "@/components/product-count";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const onChangeMock = vi.fn();

describe("ProductCount", () => {
  beforeEach(() => {
    onChangeMock.mockClear(); // reset call history before each test
  });

  it("should render initial quantity correctly", () => {
    render(<ProductCount quantity={5} onChange={onChangeMock} />);

    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("should disable decrement button when quantity is 1", () => {
    render(<ProductCount quantity={1} onChange={onChangeMock} />);
    const decrementButton = screen.getByRole("button", {
      name: /Decrement by one/i,
    });

    expect(decrementButton).toBeDisabled();
  });

  it("should increment the quantity and call onChange correctly", async () => {
    render(<ProductCount quantity={3} onChange={onChangeMock} />);
    const user = userEvent.setup();
    const incrementButton = screen.getByRole("button", {
      name: /Increment by one/i,
    });

    await user.click(incrementButton);

    expect(screen.getByTestId("quantity")).toHaveTextContent("4");
    expect(onChangeMock).toHaveBeenCalledWith(4);
  });

  it("should decrement the quantity and call onChange correctly with productId", async () => {
    render(<ProductCount quantity={3} productId={7} onChange={onChangeMock} />);
    const user = userEvent.setup();
    const decrementButton = screen.getByRole("button", {
      name: /Decrement by one/i,
    });

    await user.click(decrementButton);

    expect(screen.getByTestId("quantity")).toHaveTextContent("2");
    expect(onChangeMock).toHaveBeenCalledWith(7, 2);
  });

  it("should not decrement or call onChange when the quantity is 1", async () => {
    render(<ProductCount quantity={1} onChange={onChangeMock} />);
    const user = userEvent.setup();
    const decrementButton = screen.getByRole("button", {
      name: /Decrement by one/i,
    });

    await user.click(decrementButton);

    expect(screen.getByTestId("quantity")).toHaveTextContent("1");
    expect(onChangeMock).not.toHaveBeenCalled();
  });
});

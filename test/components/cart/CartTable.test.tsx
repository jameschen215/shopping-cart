import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import { formatCurrency } from "@/lib/utils";
import CartTable from "@/components/cart/CartTable";

// Mocked product data
const mockCartItems = [
  {
    product: {
      id: 1,
      title: "Mock Product 1",
      price: 10,
      image: "/img1.jpg",
    },
    quantity: 2,
  },
  {
    product: {
      id: 2,
      title: "Mock Product 2",
      price: 5,
      image: "/img2.jpg",
    },
    quantity: 1,
  },
];

// Define a mock for setCartItems to use in assertions
const mockSetCartItems = vi.fn();

vi.mock("@/lib/hooks", async () => {
  const mod = await vi.importActual("@/lib/hooks");
  return {
    ...mod,
    useCart: () => ({
      cartItems: mockCartItems,
      setCartItems: mockSetCartItems,
    }),
  };
});

const renderComponent = () => {
  render(
    <MemoryRouter>
      <CartTable />
    </MemoryRouter>,
  );
};

describe("CartTable", () => {
  it("should render all cart items correctly", () => {
    renderComponent();
    const quantities = screen.getAllByTestId("quantity");

    // Product 1
    expect(screen.getByAltText("Mock Product 1")).toHaveAttribute(
      "src",
      "/img1.jpg",
    );
    expect(screen.getByText("Mock Product 1")).toBeInTheDocument();
    expect(screen.getByText(formatCurrency(10))).toBeInTheDocument();
    expect(quantities[0]).toHaveTextContent("2");

    // Product 2
    expect(screen.getByAltText("Mock Product 2")).toHaveAttribute(
      "src",
      "/img2.jpg",
    );
    expect(screen.getByText("Mock Product 2")).toBeInTheDocument();
    expect(screen.getByText(formatCurrency(5))).toBeInTheDocument();
    expect(quantities[1]).toHaveTextContent("1");
  });

  it("should select and deselect all items after clicking on the checkbox on table header", async () => {
    const user = userEvent.setup();
    renderComponent();
    const selectAllCheckbox = screen.getAllByRole("checkbox")[0];

    await user.click(selectAllCheckbox);

    screen.getAllByRole("checkbox").forEach((cb) => {
      expect(cb).not.toBeChecked();
    });

    await user.click(selectAllCheckbox);

    screen.getAllByRole("checkbox").forEach((cb) => {
      expect(cb).toBeChecked();
    });
  });

  it("should delete an item when trash icon is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();
    const deleteButtons = screen.getAllByRole("button", { name: "" });

    await user.click(deleteButtons[0]);

    /** Deletion is mocked; real removal won’t happen — you'd need to check
     *  if `setCartItems` was called, if you want to verify behavior
     * */
    expect(mockSetCartItems).toHaveBeenCalled();
  });

  it("should display correct total price", async () => {
    const user = userEvent.setup();
    renderComponent();
    const checkbox = screen.getAllByRole("checkbox")[1];

    let mockTotal = 2 * 10 + 1 * 5;
    expect(screen.getByTestId("total-price")).toHaveTextContent(
      formatCurrency(mockTotal),
    );

    await user.click(checkbox);

    mockTotal = 0 * 10 + 1 * 5;
    expect(screen.getByTestId("total-price")).toHaveTextContent(
      formatCurrency(mockTotal),
    );
  });
});

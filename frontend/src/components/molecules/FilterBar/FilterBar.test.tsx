import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FilterBar } from "./FilterBar";

describe("FilterBar Component", () => {
  const defaultProps = {
    items: [
      { label: "Item 1", value: "item1", isSelected: false },
      { label: "Item 2", value: "item2", isSelected: true },
      { label: "Item 3", value: "item3", isSelected: false },
    ],
    onItemClick: vi.fn(),
  };

  it("calls onItemClick when an item is clicked", () => {
    const { getAllByText } = render(<FilterBar {...defaultProps} />);
    const items = getAllByText("Item 1");
    fireEvent.click(items[0]);
    expect(defaultProps.onItemClick).toHaveBeenCalledWith({
      label: "Item 1",
      value: "item1",
      isSelected: false,
    });
  });

  it("applies selected styles to selected items", () => {
    const { getAllByText } = render(<FilterBar {...defaultProps} />);
    const selectedItem = getAllByText("Item 2")[0];
    expect(selectedItem).toHaveClass("outline outline-brand-9");
  });

  it("does not apply selected styles to non-selected items", () => {
    const { getAllByText } = render(<FilterBar {...defaultProps} />);
    const nonSelectedItem = getAllByText("Item 1")[0];
    expect(nonSelectedItem).not.toHaveClass("outline outline-brand-9");
  });

  it("matches snapshot with default props", () => {
    const { asFragment } = render(<FilterBar {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot(); // Captures the entire DOM
  });
});

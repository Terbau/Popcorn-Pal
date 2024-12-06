import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import {
  SidebarCheckboxFilter,
  SidebarCheckboxFilterProps,
} from "./SidebarCheckboxFilter";
import { describe, afterEach, it, expect, vi } from "vitest";

describe("SidebarCheckboxFilter", () => {
  afterEach(cleanup);

  const defaultProps: SidebarCheckboxFilterProps = {
    title: "Filter",
    items: [
      { label: "Item 1", value: "item1", isChecked: false },
      { label: "Item 2", value: "item2", isChecked: true },
    ],
    isAllChecked: false,
    onItemClick: vi.fn(),
    onAllCheckedChange: vi.fn(),
    isLoading: false,
  };

  it("renders correctly", () => {
    const { asFragment } = render(<SidebarCheckboxFilter {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders title", () => {
    render(<SidebarCheckboxFilter {...defaultProps} />);
    expect(screen.getByText("Filter")).toBeInTheDocument();
  });

  it("renders items", () => {
    render(<SidebarCheckboxFilter {...defaultProps} />);
    expect(screen.getByLabelText("Item 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Item 2")).toBeInTheDocument();
  });

  it("calls onItemClick when an item is clicked", () => {
    render(<SidebarCheckboxFilter {...defaultProps} />);
    fireEvent.click(screen.getByLabelText("Item 1"));
    expect(defaultProps.onItemClick).toHaveBeenCalledWith({
      label: "Item 1",
      value: "item1",
      isChecked: false,
    });
  });

  it("calls onAllCheckedChange when 'Select all' is clicked", () => {
    render(<SidebarCheckboxFilter {...defaultProps} />);
    fireEvent.click(screen.getByLabelText("Select all"));
    expect(defaultProps.onAllCheckedChange).toHaveBeenCalled();
  });
});

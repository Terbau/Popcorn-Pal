import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { SearchInput, type SearchInputSelectOption } from "./SearchInput";

const mockSelectOptions: SearchInputSelectOption[] = [
  { label: "Option 1", value: "option1", icon: <span>🔍</span> },
  { label: "Option 2", value: "option2", icon: <span>📂</span>, inputPlaceholder: "Search in Option 2" },
];

describe("SearchInput Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders with default props", () => {
    const { asFragment } = render(<SearchInput query="" onQueryChange={vi.fn()} />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue("");
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders with select options", () => {
    const { asFragment } = render(
      <SearchInput
        query=""
        selectOptions={mockSelectOptions}
        selectValue="option1"
        onQueryChange={vi.fn()}
        onSelectValueChange={vi.fn()}
      />
    );
    expect(screen.getByText("🔍")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("updates query on input change", () => {
    const handleQueryChange = vi.fn();
    render(<SearchInput query="" onQueryChange={handleQueryChange} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "test query" } });
    expect(handleQueryChange).toHaveBeenCalledWith("test query");
  });

  it("renders the clear button when query is non-empty", () => {
    const handleQueryChange = vi.fn();
    render(<SearchInput query="test" onQueryChange={handleQueryChange} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("clears query when clear button is clicked", () => {
    const handleQueryChange = vi.fn();
    render(<SearchInput query="test" onQueryChange={handleQueryChange} />);
    const clearButton = screen.getByRole("button");

    fireEvent.click(clearButton);
    expect(handleQueryChange).toHaveBeenCalledWith("");
  });

  it("shows placeholder from selected option when available", () => {
    render(
      <SearchInput
        query=""
        selectOptions={mockSelectOptions}
        selectValue="option2"
        onQueryChange={vi.fn()}
        onSelectValueChange={vi.fn()}
      />
    );
    expect(screen.getByRole("textbox")).toHaveAttribute("placeholder", "Search in Option 2");
  });

  it("handles select value changes", () => {
    const handleSelectValueChange = vi.fn();
    render(
      <SearchInput
        query=""
        selectOptions={mockSelectOptions}
        selectValue="option1"
        onQueryChange={vi.fn()}
        onSelectValueChange={handleSelectValueChange}
      />
    );

    const selectTrigger = screen.getByRole("combobox");
    fireEvent.click(selectTrigger);

    const option2 = screen.getByText("Option 2");
    fireEvent.click(option2);

    expect(handleSelectValueChange).toHaveBeenCalledWith("option2");
  });

  it("applies custom class names", () => {
    const { asFragment } = render(
      <SearchInput query="" className="custom-class" onQueryChange={vi.fn()} />
    );
    expect(screen.getByRole("textbox").parentElement?.parentElement).toHaveClass("custom-class");
    expect(asFragment()).toMatchSnapshot();
  });
});

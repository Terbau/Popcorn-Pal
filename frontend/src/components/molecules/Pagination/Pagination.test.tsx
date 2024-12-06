import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi, beforeEach } from "vitest";
import { Pagination } from "./Pagination";

describe("Pagination Component", () => {
  const defaultProps = {
    totalPages: 10,
    currentPage: 5,
    onPageChange: vi.fn(),
  };

  beforeEach(() => {
    window.scrollTo = vi.fn(); // Mock scrollTo
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("displays ellipses when needed", () => {
    const { asFragment } = render(<Pagination {...defaultProps} />);
    const ellipsisElements = screen.getAllByText("More pages", {
      exact: false,
    });
    expect(ellipsisElements).toHaveLength(2); // Left and right ellipses
    expect(asFragment()).toMatchSnapshot();
  });

  it("calls `onPageChange` when a page is clicked", () => {
    render(<Pagination {...defaultProps} />);
    const pageButton = screen.getByRole("button", { name: "4" });
    fireEvent.click(pageButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(4);
  });

  it("disables 'Previous' button on the first page", () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    expect(screen.getByLabelText("Previous page")).toBeDisabled();
  });

  it("disables 'Next' button on the last page", () => {
    render(<Pagination {...defaultProps} currentPage={10} />);
    expect(screen.getByLabelText("Next page")).toBeDisabled();
  });

  it("renders all page numbers when range covers all pages", () => {
    render(
      <Pagination
        {...defaultProps}
        totalPages={5}
        currentPage={3}
        amountShowOnLeft={2}
        amountShowOnRight={2}
      />,
    );
    const pageButtons = screen.getAllByRole("button", { name: /^\d+$/ });
    expect(pageButtons).toHaveLength(5); // All 5 pages are displayed
  });

  it("renders without ellipses when `includeEllipsis` is false", () => {
    render(<Pagination {...defaultProps} includeEllipsis={false} />);
    expect(screen.queryByText("More pages")).not.toBeInTheDocument();
  });

  it("renders without min/max page buttons when disabled", () => {
    render(
      <Pagination
        {...defaultProps}
        hasMinPageButton={false}
        hasMaxPageButton={false}
      />,
    );
    expect(screen.queryByRole("button", { name: "1" })).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "10" }),
    ).not.toBeInTheDocument();
  });

  it("scrolls to top when a page is changed and `scrollToTopOnPageChange` is true", () => {
    window.scrollTo = vi.fn();
    render(<Pagination {...defaultProps} scrollToTopOnPageChange />);
    const pageButton = screen.getByRole("button", { name: "6" });
    fireEvent.click(pageButton);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  it("does not scroll to top when `scrollToTopOnPageChange` is false", () => {
    window.scrollTo = vi.fn();
    render(<Pagination {...defaultProps} scrollToTopOnPageChange={false} />);
    const pageButton = screen.getByRole("button", { name: "6" });
    fireEvent.click(pageButton);
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it("applies `aria-current` to the active page", () => {
    render(<Pagination {...defaultProps} />);
    const activePage = screen.getByRole("button", { name: "5" });
    expect(activePage).toHaveAttribute("aria-current", "page");
  });
});

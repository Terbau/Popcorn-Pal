import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { ScrollArea } from "./ScrollArea";

describe("ScrollArea Component", () => {
  const defaultProps = {
    orientation: "vertical" as const,
    children: <div>Scrollable Content</div>,
  };

  afterEach(() => {
    cleanup();
  });

  it("renders correctly with vertical orientation", () => {
    const { asFragment } = render(<ScrollArea {...defaultProps} />);
    const viewport = screen
      .getByText("Scrollable Content")
      .closest("[data-radix-scroll-area-viewport]");
    expect(viewport).toHaveClass("h-full w-full rounded-[inherit]");
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly with horizontal orientation", () => {
    const { asFragment } = render(
      <ScrollArea {...defaultProps} orientation="horizontal" />,
    );
    const viewport = screen
      .getByText("Scrollable Content")
      .closest("[data-radix-scroll-area-viewport]");
    expect(viewport).toHaveStyle("overflow-x: scroll; overflow-y: hidden;");
    expect(asFragment()).toMatchSnapshot();
  });

  it("passes viewportRef correctly", () => {
    const viewportRef = {
      current: null,
    } as React.MutableRefObject<HTMLDivElement | null>;
    render(<ScrollArea {...defaultProps} viewportRef={viewportRef} />);
    expect(viewportRef.current).not.toBeNull(); // Ensure viewportRef gets attached
  });

  it("applies orientation-specific classes", () => {
    const { rerender } = render(<ScrollArea {...defaultProps} />);
    const scrollbar = screen
      .getByText("Scrollable Content")
      .closest("[data-radix-scroll-area-viewport]");

    expect(scrollbar).toHaveStyle("overflow-y: scroll; overflow-x: hidden;");

    rerender(<ScrollArea {...defaultProps} orientation="horizontal" />);
    expect(scrollbar).toHaveStyle("overflow-x: scroll; overflow-y: hidden;");
  });
});

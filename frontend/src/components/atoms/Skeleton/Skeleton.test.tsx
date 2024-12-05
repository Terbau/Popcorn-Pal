import { render } from "@testing-library/react";
import { Skeleton } from "./Skeleton";
import { describe, it, expect } from "vitest";

describe("Skeleton component", () => {
  it("renders without crashing", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies default classes", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass("block h-3 md:h-4 w-32 bg-brand-5 rounded-full animate-pulse");
  });

  it("applies additional classes passed via className prop", () => {
    const { container } = render(<Skeleton className="extra-class" />);
    expect(container.firstChild).toHaveClass("extra-class");
  });

  it("passes additional props to the span element", () => {
    const { container } = render(<Skeleton data-testid="skeleton" />);
    expect(container.firstChild).toHaveAttribute("data-testid", "skeleton");
  });
});
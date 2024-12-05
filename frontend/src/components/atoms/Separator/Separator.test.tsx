import { render } from "@testing-library/react";
import { Separator } from "./Separator";
import { describe, it, expect } from "vitest";

describe("Separator", () => {
  it("renders without crashing", () => {
    const { container } = render(<Separator />);
    expect(container).toBeInTheDocument();
  });

  it("applies full stretch styles when includeFullStretch is true", () => {
    const { container } = render(<Separator includeFullStretch />);
    const separator = container.firstChild;
    expect(separator).toHaveClass("data-[orientation='horizontal']:w-full");
    expect(separator).toHaveClass("data-[orientation='vertical']:h-full");
  });

  it("does not apply full stretch styles when includeFullStretch is false", () => {
    const { container } = render(<Separator includeFullStretch={false} />);
    const separator = container.firstChild;
    expect(separator).not.toHaveClass("data-[orientation='horizontal']:w-full");
    expect(separator).not.toHaveClass("data-[orientation='vertical']:h-full");
  });

  it("applies margin styles when includeMargin is true", () => {
    const { container } = render(<Separator includeMargin />);
    const separator = container.firstChild;
    expect(separator).toHaveClass("data-[orientation='horizontal']:my-2");
    expect(separator).toHaveClass("data-[orientation='vertical']:mx-2");
  });

  it("does not apply margin styles when includeMargin is false", () => {
    const { container } = render(<Separator includeMargin={false} />);
    const separator = container.firstChild;
    expect(separator).not.toHaveClass("data-[orientation='horizontal']:my-2");
    expect(separator).not.toHaveClass("data-[orientation='vertical']:mx-2");
  });

  it("applies custom className", () => {
    const { container } = render(<Separator className="custom-class" />);
    const separator = container.firstChild;
    expect(separator).toHaveClass("custom-class");
  });
});
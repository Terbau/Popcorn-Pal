import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, afterEach, expect } from "vitest";
import { Sheet } from "./Sheet";

describe("Sheet Component", () => {
  afterEach(cleanup);

  it("renders with a title and description", () => {
    render(<Sheet title="Test Title" description="Test Description" open />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders a close button if `hasCloseButton` is true", () => {
    render(<Sheet title="Test Title" hasCloseButton open />);
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  it("does not render a close button if `hasCloseButton` is false", () => {
    render(<Sheet title="Test Title" hasCloseButton={false} open />);
    expect(
      screen.queryByRole("button", { name: /close/i }),
    ).not.toBeInTheDocument();
  });

  it("renders content passed as children", () => {
    render(
      <Sheet title="Test Title" open>
        <p>Child Content</p>
      </Sheet>,
    );
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });
});

import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button component", () => {
  it("renders correctly", () => {
    const { container } = render(<Button>Click me</Button>);
    expect(container.firstChild).toHaveClass("bg-brand-9");
  });

  it("handles click events", async () => {
    const handleClick = vi.fn();
    const { container } = render(
      <Button onClick={handleClick}>Click me</Button>,
    );
    const button = container.firstChild as HTMLButtonElement;
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders with a custom color", () => {
    const { container } = render(<Button color="red">Click me</Button>);
    const button = container.firstChild as HTMLButtonElement;
    expect(button).toHaveClass("bg-red-9");
  });

  it("renders with a custom size", () => {
    const { container } = render(<Button size="lg">Click me</Button>);
    const button = container.firstChild as HTMLButtonElement;
    expect(button).toHaveClass("px-6 py-3 text-lg");
  });

  it("renders as disabled", () => {
    const { container } = render(<Button disabled>Click me</Button>);
    const button = container.firstChild as HTMLButtonElement;
    expect(button).toBeDisabled();
  });

  it("renders as a different component when asChild is true", () => {
    const { container } = render(
      <Button asChild>
        <a href="/test">Click me</a>
      </Button>,
    );
    const link = container.querySelector("a");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
  });
});

import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button component", () => {
  it("renders correctly", () => {
    const { container, asFragment } = render(<Button>Click me</Button>);
    expect(container.firstChild).toHaveClass("bg-brand-9");
    expect(asFragment()).toMatchSnapshot(); // Snapshot of default button
  });

  it("handles click events", async () => {
    const handleClick = vi.fn();
    const { container, asFragment } = render(
      <Button onClick={handleClick}>Click me</Button>,
    );
    const button = container.firstChild as HTMLButtonElement;
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(asFragment()).toMatchSnapshot(); // Snapshot of button with click event
  });

  it("renders with a custom color", () => {
    const { container, asFragment } = render(
      <Button color="red">Click me</Button>,
    );
    const button = container.firstChild as HTMLButtonElement;
    expect(button).toHaveClass("bg-red-9");
    expect(asFragment()).toMatchSnapshot(); // Snapshot of button with custom color
  });

  it("renders with a custom size", () => {
    const { container, asFragment } = render(
      <Button size="lg">Click me</Button>,
    );
    const button = container.firstChild as HTMLButtonElement;
    expect(button).toHaveClass("px-6 py-3 text-lg");
    expect(asFragment()).toMatchSnapshot(); // Snapshot of button with custom size
  });

  it("renders as disabled", () => {
    const { container, asFragment } = render(
      <Button disabled>Click me</Button>,
    );
    const button = container.firstChild as HTMLButtonElement;
    expect(button).toBeDisabled();
    expect(asFragment()).toMatchSnapshot(); // Snapshot of disabled button
  });

  it("renders as a different component when asChild is true", () => {
    const { container, asFragment } = render(
      <Button asChild>
        <a href="/test">Click me</a>
      </Button>,
    );
    const link = container.querySelector("a");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
    expect(asFragment()).toMatchSnapshot(); // Snapshot of button rendered as a link
  });
});

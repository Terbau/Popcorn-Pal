import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "./Checkbox";

describe("Checkbox component", () => {
  it("renders correctly", () => {
    const { container } = render(<Checkbox />);
    const checkbox = container.querySelector("button");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveClass("dark:bg-brand-3 bg-cream h-6 w-6 rounded-md");
  });

  it("handles change events", async () => {
    const handleChange = vi.fn();
    const { container } = render(<Checkbox onCheckedChange={handleChange} />);
    const checkbox = container.querySelector("button") as HTMLButtonElement;
    await userEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("renders as checked", () => {
    const { container } = render(<Checkbox checked />);
    const indicator = container.querySelector(".text-brand-9");
    expect(indicator).toBeInTheDocument();
  });

  it("renders as disabled", () => {
    const { container } = render(<Checkbox disabled />);
    const checkbox = container.querySelector("button") as HTMLButtonElement;
    expect(checkbox).toBeDisabled();
  });

  it("renders with a custom class", () => {
    const { container } = render(<Checkbox className="custom-class" />);
    const checkbox = container.querySelector("button");
    expect(checkbox).toHaveClass("custom-class");
  });
});

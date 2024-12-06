import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { ScrollButton } from "./ScrollButton";

describe("ScrollButton Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders correctly for left direction", () => {
    const { asFragment } = render(
      <ScrollButton direction="left" aria-label="Scroll Left" />,
    );
    const button = screen.getByRole("button", { name: "Scroll Left" });

    expect(button).toHaveClass(
      "text-white z-10 h-10 w-10 sm:h-14 sm:w-14 rounded-full text-5xl bg-black/80 shrink-0 flex items-center justify-center hover:bg-black/90",
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly for right direction", () => {
    const { asFragment } = render(
      <ScrollButton direction="right" aria-label="Scroll Right" />,
    );
    const button = screen.getByRole("button", { name: "Scroll Right" });

    expect(button).toHaveClass(
      "text-white z-10 h-10 w-10 sm:h-14 sm:w-14 rounded-full text-5xl bg-black/80 shrink-0 flex items-center justify-center hover:bg-black/90",
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("handles custom class names correctly", () => {
    const { asFragment } = render(
      <ScrollButton
        direction="left"
        className="custom-class"
        aria-label="Scroll Left"
      />,
    );
    const button = screen.getByRole("button", { name: "Scroll Left" });

    expect(button).toHaveClass("custom-class");
    expect(asFragment()).toMatchSnapshot();
  });

  it("handles click events correctly", () => {
    const handleClick = vi.fn();
    render(
      <ScrollButton
        direction="right"
        aria-label="Scroll Right"
        onClick={handleClick}
      />,
    );
    const button = screen.getByRole("button", { name: "Scroll Right" });

    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

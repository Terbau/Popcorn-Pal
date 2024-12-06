import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { ToggleBadge } from "./ToggleBadge";

describe("ToggleBadge Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the ToggleBadge with children", () => {
    const { asFragment } = render(<ToggleBadge>Toggle Me</ToggleBadge>);
    expect(screen.getByText("Toggle Me")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("applies custom classes", () => {
    render(<ToggleBadge className="custom-class">Toggle Me</ToggleBadge>);
    const toggle = screen.getByText("Toggle Me").parentElement;
    expect(toggle).toHaveClass("custom-class");
  });

  it("toggles state on click", () => {
    const handleChange = vi.fn();
    render(
      <ToggleBadge
        onClick={handleChange}
        aria-pressed="false"
      >
        Toggle Me
      </ToggleBadge>
    );
    const toggle = screen.getByText("Toggle Me").parentElement;
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(toggle!);
    expect(handleChange).toHaveBeenCalled();
  });

  it("renders with the correct Badge properties", () => {
    const { asFragment } = render(
      <ToggleBadge size="lg" color="blue">
        Badge Content
      </ToggleBadge>
    );
    const badge = screen.getByText("Badge Content");
    expect(badge).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});

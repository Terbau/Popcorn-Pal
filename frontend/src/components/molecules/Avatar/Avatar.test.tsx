import { render} from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Avatar } from "./Avatar";

describe("Avatar component", () => {
  it("renders fallback text when src is not provided", () => {
    const { asFragment } = render(
      <div data-testid="avatar-wrapper-1">
        <Avatar fallback="A" size="md" />
      </div>,
    );

    expect(asFragment()).toMatchSnapshot(); // Captures the entire DOM
  });

  it("applies correct size classes", () => {
    const { asFragment } = render(
      <div data-testid="avatar-wrapper-2">
        <Avatar fallback="D" size="lg" />
      </div>,
    );

    expect(asFragment()).toMatchSnapshot(); // Ensures size-related changes are tracked
  });

  it("applies overrideSizeChange correctly", () => {
    const { asFragment } = render(
      <div data-testid="avatar-wrapper-3">
        <Avatar fallback="C" size="lg" overrideSizeChange />
      </div>,
    );

    expect(asFragment()).toMatchSnapshot(); // Captures DOM including overridden size
  });

  it("renders children correctly", () => {
    const { asFragment } = render(
      <div data-testid="avatar-wrapper-4">
        <Avatar fallback="B" size="md">
          <span>Child</span>
        </Avatar>
      </div>,
    );

    expect(asFragment()).toMatchSnapshot(); // Verifies the DOM with children
  });
});

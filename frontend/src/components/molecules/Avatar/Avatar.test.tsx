import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Avatar } from "./Avatar";

describe("Avatar component", () => {
  it("renders fallback text when src is not provided", () => {
    render(
      <div data-testid="avatar-wrapper-1">
        <Avatar fallback="A" size="md" />
      </div>,
    );

    const wrapper = screen.getByTestId("avatar-wrapper-1");
    const fallback = within(wrapper).getByText("A"); // Scoped query to avoid multiple matches
    expect(fallback).toBeInTheDocument();
  });

  it("applies correct size classes", () => {
    render(
      <div data-testid="avatar-wrapper-2">
        <Avatar fallback="D" size="lg" />
      </div>,
    );

    const wrapper = screen.getByTestId("avatar-wrapper-2");
    const avatarElement = wrapper.querySelector("span"); // Query the Avatar root
    expect(avatarElement).toHaveClass("h-8 w-8 md:h-12 md:w-12");
  });

  it("applies overrideSizeChange correctly", () => {
    render(
      <div data-testid="avatar-wrapper-3">
        <Avatar fallback="C" size="lg" overrideSizeChange />
      </div>,
    );

    const wrapper = screen.getByTestId("avatar-wrapper-3");
    const avatarElement = wrapper.querySelector("span"); // Query the Avatar root
    expect(avatarElement).toHaveClass("h-12 w-12");
  });

  it("renders children correctly", () => {
    render(
      <div data-testid="avatar-wrapper-4">
        <Avatar fallback="B" size="md">
          <span>Child</span>
        </Avatar>
      </div>,
    );

    const wrapper = screen.getByTestId("avatar-wrapper-4");
    const child = within(wrapper).getByText("Child"); // Scoped query
    expect(child).toBeInTheDocument();
  });
});

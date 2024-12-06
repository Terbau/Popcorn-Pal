import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AvatarInput } from "./AvatarInput";

describe("AvatarInput component", () => {
  it("renders fallback avatar", () => {
    const { asFragment } = render(<AvatarInput fallback="A" label="Upload Avatar" />);
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot(); // Captures the entire DOM
  });

  it("shows error message", () => {
    const { asFragment } = render(
      <AvatarInput fallback="A" errorMessage="Error" label="Upload Avatar" />,
    );
    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot(); // Captures the entire DOM with error message
  });
});

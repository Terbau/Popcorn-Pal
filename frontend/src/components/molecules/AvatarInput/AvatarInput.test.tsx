import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AvatarInput } from "./AvatarInput";

describe("AvatarInput component", () => {
  it("renders fallback avatar", () => {
    render(<AvatarInput fallback="A" label="Upload Avatar" />);
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("shows error message", () => {
    render(
      <AvatarInput fallback="A" errorMessage="Error" label="Upload Avatar" />,
    );
    expect(screen.getByText("Error")).toBeInTheDocument();
  });
});

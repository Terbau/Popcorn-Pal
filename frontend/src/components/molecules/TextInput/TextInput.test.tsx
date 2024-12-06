import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TextInput } from "./TextInput";

describe("TextInput Component", () => {
  it("renders the input with a label", () => {
    const { asFragment } = render(<TextInput label="Username" />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the input without a label", () => {
    const { asFragment } = render(<TextInput placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders an error message", () => {
    const { asFragment } = render(
      <TextInput label="Email" errorMessage="Invalid email address" />
    );
    expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("applies custom classes", () => {
    const { asFragment } = render(
      <TextInput label="Password" className="custom-class" />
    );
    const input = screen.getByLabelText("Password");
    expect(input).toHaveClass("custom-class");
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders with default type 'text'", () => {
    const { asFragment } = render(<TextInput label="First Name" />);
    const input = screen.getByLabelText("First Name");
    expect(input).toHaveAttribute("type", "text");
    expect(asFragment()).toMatchSnapshot();
  });

  it("handles user input value", () => {
    const { asFragment } = render(
      <TextInput label="Full Name" value="John Doe" readOnly />
    );
    const input = screen.getByLabelText("Full Name");
    expect(input).toHaveValue("John Doe");
    expect(asFragment()).toMatchSnapshot();
  });
});

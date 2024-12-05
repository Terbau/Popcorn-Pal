import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TextInput } from "./TextInput";

describe("TextInput Component", () => {
  it("renders the input with a label", () => {
    render(<TextInput label="Username" />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
  });

  it("renders the input without a label", () => {
    render(<TextInput placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("renders an error message", () => {
    render(<TextInput label="Email" errorMessage="Invalid email address" />);
    expect(screen.getByText("Invalid email address")).toBeInTheDocument();
  });

  it("applies custom classes", () => {
    render(<TextInput label="Password" className="custom-class" />);
    const input = screen.getByLabelText("Password");
    expect(input).toHaveClass("custom-class");
  });

  it("renders with default type 'text'", () => {
    render(<TextInput label="First Name" />);
    const input = screen.getByLabelText("First Name");
    expect(input).toHaveAttribute("type", "text");
  });

  it("handles user input value", () => {
    render(<TextInput label="Full Name" value="John Doe" readOnly />);
    const input = screen.getByLabelText("Full Name");
    expect(input).toHaveValue("John Doe");
  });
});

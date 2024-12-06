import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextAreaInput } from "./TextAreaInput";
import { afterEach, describe, it, expect } from "vitest";

afterEach(cleanup);

describe("TextAreaInput Component", () => {
  it("renders correctly and matches snapshot", () => {
    const { asFragment } = render(<TextAreaInput label="Test Label" />);
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("displays an error message", () => {
    const { asFragment } = render(
      <TextAreaInput errorMessage="Error occurred" />
    );
    expect(screen.getByText("Error occurred")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("handles user input", async () => {
    const { asFragment } = render(<TextAreaInput label="Test Label" />);
    const textarea = screen.getByLabelText("Test Label");
    await userEvent.type(textarea, "Hello, World!");
    expect(textarea).toHaveValue("Hello, World!");
    expect(asFragment()).toMatchSnapshot();
  });
});

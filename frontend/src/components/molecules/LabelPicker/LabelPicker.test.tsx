import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, afterEach } from "vitest";
import { LabelPicker, LabelPickerOption } from "./LabelPicker";

const options: LabelPickerOption[] = [
  { label: "Option 1", value: "option1", color: "red" },
  { label: "Option 2", value: "option2", color: "blue" },
  { label: "Option 3", value: "option3", color: "green" },
];

describe("LabelPicker", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders correctly", () => {
    const { asFragment } = render(<LabelPicker options={options} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("displays all options", () => {
    render(<LabelPicker options={options} />);
    options.forEach((option) => {
      const radio = screen.getByRole("radio", { name: option.label });
      expect(radio).toBeInTheDocument();
    });
  });

  it("allows selecting an option", async () => {
    render(<LabelPicker options={options} />);
    const option1 = screen.getByRole("radio", { name: "Option 1" });
    await userEvent.click(option1);
    expect(option1).toHaveAttribute("aria-checked", "true");
  });

  it("changes selection when a different option is clicked", async () => {
    render(<LabelPicker options={options} />);
    const option1 = screen.getByRole("radio", { name: "Option 1" });
    const option2 = screen.getByRole("radio", { name: "Option 2" });

    await userEvent.click(option1);
    expect(option1).toHaveAttribute("aria-checked", "true");

    await userEvent.click(option2);
    expect(option2).toHaveAttribute("aria-checked", "true");
    expect(option1).toHaveAttribute("aria-checked", "false");
  });
});

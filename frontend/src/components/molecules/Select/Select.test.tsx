import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Select } from "./Select";
import { describe, afterEach, it, expect, vi } from "vitest";

describe("Select Component", () => {
  afterEach(cleanup);

  const defaultOptions = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
  ];

  const groupedOptions = [
    { label: "Group 1", options: defaultOptions },
    { label: "Group 2", options: [{ label: "Option 3", value: "3" }] },
  ];

  it("renders with a placeholder", () => {
    const { asFragment } = render(
      <Select placeholder="Select an option" options={defaultOptions} />,
    );
    expect(
      screen.getByRole("combobox", { name: "Select an option" }),
    ).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("displays options when clicked", () => {
    render(<Select placeholder="Select an option" options={defaultOptions} />);
    fireEvent.click(screen.getByRole("combobox", { name: "Select an option" }));
    defaultOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("handles option selection", () => {
    const handleValueChange = vi.fn();
    render(
      <Select
        placeholder="Select an option"
        options={defaultOptions}
        onValueChange={handleValueChange}
      />,
    );
    fireEvent.click(screen.getByRole("combobox", { name: "Select an option" }));
    fireEvent.click(screen.getByText("Option 2"));
    expect(handleValueChange).toHaveBeenCalledWith("2");
  });

  it("displays grouped options correctly", () => {
    render(<Select placeholder="Select an option" options={groupedOptions} />);
    fireEvent.click(screen.getByRole("combobox", { name: "Select an option" }));
    groupedOptions.forEach((group) => {
      if (group.label) {
        expect(screen.getByText(group.label)).toBeInTheDocument();
      }
      group.options.forEach((option) => {
        expect(screen.getByText(option.label)).toBeInTheDocument();
      });
    });
  });

  it("applies custom button props", () => {
    render(
      <Select
        placeholder="Select an option"
        options={defaultOptions}
        buttonProps={{ className: "variant-primary size-lg" }}
      />,
    );
    const triggerButton = screen.getByRole("combobox", {
      name: "Select an option",
    });
    expect(triggerButton).toHaveClass("variant-primary size-lg");
  });

  it("matches snapshot with grouped options", () => {
    const { asFragment } = render(
      <Select placeholder="Select an option" options={groupedOptions} />,
    );
    fireEvent.click(screen.getByRole("combobox", { name: "Select an option" }));
    expect(asFragment()).toMatchSnapshot();
  });
});

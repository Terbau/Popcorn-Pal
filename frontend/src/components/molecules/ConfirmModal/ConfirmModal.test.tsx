import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ConfirmModal } from "./ConfirmModal";

describe("ConfirmModal Component", () => {
  const defaultProps = {
    onConfirm: vi.fn(),
    onCancel: vi.fn(),
  };

  it("renders with default title and description", async () => {
    const { asFragment } = render(<ConfirmModal {...defaultProps} open />);
    expect(await screen.findByText("Are you sure?")).toBeInTheDocument();
    expect(
      await screen.findByText("This action cannot be undone."),
    ).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot(); // Captures the entire DOM
  });

  it("renders with custom title and description", async () => {
    const { asFragment } = render(
      <ConfirmModal
        {...defaultProps}
        open
        title="Custom Title"
        description="Custom Description"
      />,
    );
    expect(await screen.findByText("Custom Title")).toBeInTheDocument();
    expect(await screen.findByText("Custom Description")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot(); // Captures the entire DOM with custom title and description
  });

  it("renders confirm action by default", async () => {
    const { asFragment } = render(<ConfirmModal {...defaultProps} open />);
    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    expect(confirmButton).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot(); // Captures the entire DOM with confirm action
  });

  it("renders delete action when type is delete", async () => {
    const { asFragment } = render(<ConfirmModal {...defaultProps} type="delete" open />);
    const deleteButton = await screen.findByRole("button", { name: "Delete" });
    expect(deleteButton).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot(); // Captures the entire DOM with delete action
  });

  it("calls onConfirm when confirm button is clicked", async () => {
    render(<ConfirmModal {...defaultProps} open />);
    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    fireEvent.click(confirmButton);
    expect(defaultProps.onConfirm).toHaveBeenCalled();
  });

  it("calls onCancel when cancel button is clicked", async () => {
    render(<ConfirmModal {...defaultProps} open />);
    const cancelButton = await screen.findByRole("button", { name: "Cancel" });
    fireEvent.click(cancelButton);
    expect(defaultProps.onCancel).toHaveBeenCalled();
  });
});

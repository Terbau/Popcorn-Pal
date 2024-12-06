import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, afterEach, vi } from "vitest";
import { Modal } from "./Modal";

describe("Modal Component", () => {
  afterEach(() => {
    cleanup();
  });

  const onOpenChangeMock = vi.fn();

  it("renders correctly with default props and matches snapshot", () => {
    const { asFragment } = render(
      <Modal open={true} onOpenChange={onOpenChangeMock}>
        <p>Modal Content</p>
      </Modal>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders with a title and description and matches snapshot", () => {
    const { asFragment } = render(
      <Modal
        open={true}
        onOpenChange={onOpenChangeMock}
        title="Test Title"
        description="Test Description"
      >
        <p>Modal Content</p>
      </Modal>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders without a close button and matches snapshot", () => {
    const { asFragment } = render(
      <Modal open={true} onOpenChange={onOpenChangeMock} hasCloseButton={false}>
        <p>Modal Content</p>
      </Modal>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders with different maxWidth values and matches snapshot", () => {
    const { asFragment: smFragment } = render(
      <Modal open={true} onOpenChange={onOpenChangeMock} maxWidth="sm">
        <p>Modal Content</p>
      </Modal>
    );
    expect(smFragment()).toMatchSnapshot();

    const { asFragment: xlFragment } = render(
      <Modal open={true} onOpenChange={onOpenChangeMock} maxWidth="xl">
        <p>Modal Content</p>
      </Modal>
    );
    expect(xlFragment()).toMatchSnapshot();
  });

  it("calls `onOpenChange` when the close button is clicked", async () => {
    render(
      <Modal open={true} onOpenChange={onOpenChangeMock}>
        <p>Modal Content</p>
      </Modal>
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    await userEvent.click(closeButton);

    expect(onOpenChangeMock).toHaveBeenCalledTimes(1);
    expect(onOpenChangeMock).toHaveBeenCalledWith(false);
  });

  it("renders children correctly", () => {
    render(
      <Modal open={true} onOpenChange={onOpenChangeMock}>
        <p>Modal Content</p>
      </Modal>
    );

    const content = screen.getByText("Modal Content");
    expect(content).toBeInTheDocument();
  });
});

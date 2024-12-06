import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AlertDialog } from "./AlertDialog";

describe("AlertDialog Component", () => {
  const defaultProps = {
    title: "Test Title",
    description: "Test Description",
    actions: [
      {
        label: "Confirm",
        onClick: vi.fn(),
      },
      {
        label: "Cancel",
        onClick: vi.fn(),
      },
    ],
  };

  it("matches snapshot with default props", () => {
    const { asFragment } = render(<AlertDialog {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot with loading state", () => {
    const loadingProps = {
      ...defaultProps,
      actions: [
        {
          label: "Confirm",
          onClick: vi.fn(),
          disabled: true,
        },
        {
          label: "Cancel",
          onClick: vi.fn(),
        },
      ],
    };
    const { asFragment } = render(<AlertDialog {...loadingProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

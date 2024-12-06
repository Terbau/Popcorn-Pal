import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, afterEach, vi } from "vitest";
import { LoadingButton } from "./LoadingButton";

describe("LoadingButton Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders correctly and matches snapshot when not loading", () => {
    const { asFragment } = render(<LoadingButton isLoading={false}>Click Me</LoadingButton>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly and matches snapshot when loading", () => {
    const { asFragment } = render(<LoadingButton isLoading={true}>Click Me</LoadingButton>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders children correctly", () => {
    render(<LoadingButton isLoading={false}>Click Me</LoadingButton>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it("disables the button when `isLoading` is true and `shouldDisableWhenLoading` is true", () => {
    render(
      <LoadingButton isLoading={true} shouldDisableWhenLoading={true}>
        Click Me
      </LoadingButton>
    );
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeDisabled();
  });

  it("does not disable the button when `isLoading` is true but `shouldDisableWhenLoading` is false", () => {
    render(
      <LoadingButton isLoading={true} shouldDisableWhenLoading={false}>
        Click Me
      </LoadingButton>
    );
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).not.toBeDisabled();
  });

  it("respects the `disabled` prop even when `shouldDisableWhenLoading` is false", () => {
    render(
      <LoadingButton isLoading={false} shouldDisableWhenLoading={false} disabled>
        Click Me
      </LoadingButton>
    );
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeDisabled();
  });

  it("handles click events when not disabled", async () => {
    const handleClick = vi.fn();
    render(
      <LoadingButton isLoading={false} onClick={handleClick}>
        Click Me
      </LoadingButton>
    );

    const button = screen.getByRole("button", { name: /click me/i });
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not trigger click events when disabled", async () => {
    const handleClick = vi.fn();
    render(
      <LoadingButton isLoading={true} shouldDisableWhenLoading={true} onClick={handleClick}>
        Click Me
      </LoadingButton>
    );

    const button = screen.getByRole("button", { name: /click me/i });
    await userEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});

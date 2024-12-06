import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { Badge } from "./Badge";

it("renders correctly on default", () => {
  const { container } = render(<Badge />);
  expect(container.firstChild).toHaveClass("bg-brand-9"); // default color
  expect(container.firstChild).toHaveClass("px-3 py-1.5 text-sm"); // default size
});

it("renders correctly with asChild", () => {
  const { container } = render(
    <Badge asChild>
      <button type="button">Test</button>
    </Badge>,
  );
  expect(container.firstChild).toBeInstanceOf(HTMLButtonElement);
});

it("renders secondary variant correctly", () => {
  const { container } = render(<Badge variant="secondary" />);
  expect(container.firstChild).toHaveClass(
    "text-brand-11 bg-brand-8 dark:bg-brand-3",
  );
});

it("renders with size xs correctly", () => {
  const { container } = render(<Badge size="xs" />);
  expect(container.firstChild).toHaveClass("px-2 py-0.5 text-xs");
});

it("renders with size sm correctly", () => {
  const { container } = render(<Badge size="sm" />);
  expect(container.firstChild).toHaveClass("px-3 py-1 text-xs");
});

it("renders with size md correctly", () => {
  const { container } = render(<Badge size="md" />);
  expect(container.firstChild).toHaveClass("px-3 py-1.5 text-sm");
});

it("renders with size lg correctly", () => {
  const { container } = render(<Badge size="lg" />);
  expect(container.firstChild).toHaveClass("px-4 py-2 text-base");
});

import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, afterEach, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Footer } from "./Footer";

describe("Footer Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders correctly and matches the snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("displays the 'Resources provided by' text", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Resources provided by/i)).toBeInTheDocument();
  });

  it("contains a link to Iconify with the correct icon", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    const iconifyLink = screen.getByRole("link", { name: /iconify/i });
    expect(iconifyLink).toHaveAttribute("href", "https://iconify.design/");
  });
});

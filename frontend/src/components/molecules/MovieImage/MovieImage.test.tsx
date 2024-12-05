import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MovieImage } from "./MovieImage";

describe("MovieImage Component", () => {
  const defaultProps = {
    src: "https://m.media-amazon.com/images/M/MV5BYTViYTE3ZGQtNDBlMC00ZTAyLTkyODMtZGRiZDg0MjA2YThkXkEyXkFqcGc@._V1_QL75_UX1055_CR0,0,1055,1536_.jpg",
  };

  it("renders with default size (md)", () => {
    render(<MovieImage {...defaultProps} alt="Default Size Image" />);
    const container = screen.getByRole("img", { name: "Default Size Image" })
      .parentElement?.parentElement;
    expect(container).toHaveClass("h-32 xs:h-[10.5rem] md:h-60");
  });

  it("renders with small size", () => {
    render(<MovieImage {...defaultProps} alt="Small Size Image" size="sm" />);
    const container = screen.getByRole("img", { name: "Small Size Image" })
      .parentElement?.parentElement;
    expect(container).toHaveClass("h-28 xs:h-[9rem] md:h-52");
  });

  it("renders with large size", () => {
    render(<MovieImage {...defaultProps} alt="Large Size Image" size="lg" />);
    const container = screen.getByRole("img", { name: "Large Size Image" })
      .parentElement?.parentElement;
    expect(container).toHaveClass("h-40 xs:h-48 md:h-72");
  });

  it("applies hover effect by default", () => {
    render(<MovieImage {...defaultProps} alt="Hover Effect Image" />);
    const container = screen.getByRole("img", { name: "Hover Effect Image" })
      .parentElement?.parentElement;
    expect(container).toHaveClass("hover:scale-105");
  });

  it("does not apply hover effect when `hasHoverEffect` is false", () => {
    render(
      <MovieImage
        {...defaultProps}
        alt="No Hover Effect Image"
        hasHoverEffect={false}
      />
    );
    const container = screen.getByRole("img", { name: "No Hover Effect Image" })
      .parentElement?.parentElement;
    expect(container).not.toHaveClass("hover:scale-105");
  });
});

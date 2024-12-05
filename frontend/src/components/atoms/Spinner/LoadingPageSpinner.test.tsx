import { render} from "@testing-library/react";
import { LoadingPageSpinner } from "./LoadingPageSpinner";
import { describe, it, expect } from "vitest";

describe("LoadingPageSpinner", () => {
  it("renders without crashing", () => {
    const { container } = render(<LoadingPageSpinner />);
    expect(container).toBeInTheDocument();
  });
});

import { render, cleanup } from "@testing-library/react";
import { describe, it, afterEach, expect } from "vitest";
import { SearchResultDropdown } from "./SearchResultDropdown";
import * as RadixPopover from "@radix-ui/react-popover";

describe("SearchResultDropdown Component", () => {
  afterEach(() => {
    cleanup();
  });

  const defaultProps = {
    amountSearchResults: 10,
    totalSearchResults: 100,
    isLoading: false,
    canFetchMore: true,
    isMobile: false,
    showAmountText: true,
    hasCloseButton: true,
    onClose: () => {},
    onFetchMore: () => {},
  };

  it("renders correctly with default props", () => {
    const { asFragment } = render(
      <RadixPopover.Root>
        <RadixPopover.Trigger />
        <SearchResultDropdown {...defaultProps} />
      </RadixPopover.Root>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly when loading", () => {
    const { asFragment } = render(
      <RadixPopover.Root>
        <RadixPopover.Trigger />
        <SearchResultDropdown {...defaultProps} isLoading={true} />
      </RadixPopover.Root>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly with mobile view", () => {
    const { asFragment } = render(
      <RadixPopover.Root>
        <RadixPopover.Trigger />
        <SearchResultDropdown {...defaultProps} isMobile={true} />
      </RadixPopover.Root>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly without close button", () => {
    const { asFragment } = render(
      <RadixPopover.Root>
        <RadixPopover.Trigger />
        <SearchResultDropdown {...defaultProps} hasCloseButton={false} />
      </RadixPopover.Root>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
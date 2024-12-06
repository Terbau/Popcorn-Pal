import { render, cleanup } from "@testing-library/react";
import { SidebarItem, SidebarItemLabel, SidebarItemIcon, SidebarItemBadge } from "./SidebarItem";
import { describe, it, expect, afterEach } from "vitest";

describe("SidebarItem", () => {
  afterEach(cleanup);

  it("renders correctly", () => {
    const { asFragment } = render(<SidebarItem>Test Item</SidebarItem>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("applies selected styles when isSelected is true", () => {
    const { asFragment } = render(<SidebarItem isSelected>Selected Item</SidebarItem>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("applies disabled styles when disabled is true", () => {
    const { asFragment } = render(<SidebarItem disabled>Disabled Item</SidebarItem>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders SidebarItemLabel correctly", () => {
    const { asFragment } = render(<SidebarItemLabel>Label</SidebarItemLabel>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders SidebarItemIcon correctly", () => {
    const { asFragment } = render(<SidebarItemIcon icon="mdi:home" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders SidebarItemBadge correctly", () => {
    const { asFragment } = render(<SidebarItemBadge>Badge</SidebarItemBadge>);
    expect(asFragment()).toMatchSnapshot();
  });
});
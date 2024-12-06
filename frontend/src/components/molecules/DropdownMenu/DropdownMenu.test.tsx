import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIcon,
  DropdownMenuSeparator,
} from "./DropdownMenu";

describe("DropdownMenu", () => {
  const defaultProps = {
    triggerText: "Open Menu",
    items: [
      { text: "Item 1", onClick: vi.fn() },
      { text: "Item 2", onClick: vi.fn() },
    ],
  };

  it("matches snapshot with default props", () => {
    const { asFragment } = render(
      <DropdownMenuRoot>
        <DropdownMenuTrigger>{defaultProps.triggerText}</DropdownMenuTrigger>
        <DropdownMenuContent>
          {defaultProps.items.map((item, index) => (
            <DropdownMenuItem key={index} onClick={item.onClick}>
              {item.text}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItemIcon icon="mdi:menu" />
        </DropdownMenuContent>
      </DropdownMenuRoot>
    );
    expect(asFragment()).toMatchSnapshot(); // Captures the entire DOM
  });

  it("opens the menu when trigger is clicked and closes when item is clicked", async () => {
    render(
      <DropdownMenuRoot>
        <DropdownMenuTrigger>{defaultProps.triggerText}</DropdownMenuTrigger>
        <DropdownMenuContent>
          {defaultProps.items.map((item, index) => (
            <DropdownMenuItem key={index} onClick={item.onClick}>
              {item.text}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItemIcon icon="mdi:menu" />
        </DropdownMenuContent>
      </DropdownMenuRoot>
    );

    const triggers = screen.getAllByText("Open Menu");
    await userEvent.click(triggers[0]);
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();

    const item1 = screen.getByText("Item 1");
    await userEvent.click(item1);

    await waitFor(() => {
      expect(item1).not.toBeInTheDocument();
    });
  });
});

import type { Meta, StoryObj } from "@storybook/react";
import {
  SimpleDropdownMenu,
  type SimpleDropdownMenuProps,
} from "./SimpleDropdownMenu";
import { useState } from "react";
import { Button } from "@/components/atoms/Button/Button";

const meta: Meta<typeof SimpleDropdownMenu> = {
  title: "Components/SimpleDropdownMenu",
  component: SimpleDropdownMenu,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SimpleDropdownMenu>;

export default meta;
type Story = StoryObj<typeof SimpleDropdownMenu>;

const DefaultRender = (args: SimpleDropdownMenuProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SimpleDropdownMenu open={open} onOpenChange={setOpen} {...args}>
        <Button onClick={() => setOpen(true)}>Open dropdown</Button>
      </SimpleDropdownMenu>
    </>
  );
};

export const Default: Story = {
  render: DefaultRender,
  args: {
    groups: [
      [
        {
          label: "Copy share link",
          icon: "carbon:link",
          onClick: () => alert("Copy share link"),
        },
      ],
      [
        {
          label: "Edit comment",
          icon: "carbon:edit",
          onClick: () => alert("Edit comment"),
        },
        {
          label: "Delete comment",
          icon: "carbon:delete",
          onClick: () => alert("Delete comment"),
        },
      ],
    ],
  },
};

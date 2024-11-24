import type { Meta, StoryObj } from "@storybook/react";
import { Sheet, type SheetProps } from "./Sheet";
import { Button } from "../../atoms/Button/Button";
import { useState } from "react";

const meta: Meta<typeof Sheet> = {
  title: "Components/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof Sheet>;

const LeftRender = (args: SheetProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open sheet</Button>
      <Sheet {...args} open={open} onOpenChange={setOpen}>
        <p>Sheet content</p>
      </Sheet>
    </>
  );
};

const RightRender = (args: SheetProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open sheet</Button>
      <Sheet {...args} open={open} onOpenChange={setOpen}>
        <p>Sheet content</p>
      </Sheet>
    </>
  );
};

export const Left: Story = {
  args: {
    title: "Sheet Title",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime maiores consectetur illum amet? Corrupti est beatae ducimus, aperiam consequatur incidunt magni temporibus voluptas a aspernatur accusamus! Maxime laboriosam inventore debitis.",
    side: "left",
  },
  render: LeftRender,
};

export const Right: Story = {
  args: {
    title: "Sheet Title",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime maiores consectetur illum amet? Corrupti est beatae ducimus, aperiam consequatur incidunt magni temporibus voluptas a aspernatur accusamus! Maxime laboriosam inventore debitis.",
    side: "right",
  },
  render: RightRender,
};

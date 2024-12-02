import type { Meta, StoryObj } from "@storybook/react";
import { ConfirmModal, type ConfirmModalProps } from "./ConfirmModal";
import { useState } from "react";
import { Button } from "@/components/atoms/Button/Button";

const meta: Meta<typeof ConfirmModal> = {
  title: "Components/ConfirmModal",
  component: ConfirmModal,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ConfirmModal>;

export default meta;
type Story = StoryObj<typeof ConfirmModal>;

const Render = (args: ConfirmModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Do action</Button>
      <ConfirmModal open={open} onOpenChange={setOpen} {...args} />
    </>
  );
};

export const Confirm: Story = {
  render: Render,
  args: {},
};

export const Delete: Story = {
  render: Render,
  args: {
    type: "delete",
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import { Modal, type ModalProps } from "./Modal";
import { Button } from "../../atoms/Button/Button";
import { useState } from "react";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

const DefaultRender = (args: ModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        title="Edit your profile avatar here!"
        description="This is where you can edit your profile avatar. If you don't want to change it, you can close this dialog."
        open={open}
        onOpenChange={setOpen}
        {...args}
      >
        <div className="rounded-full h-48 w-48 bg-slate-7" />
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: DefaultRender,
};

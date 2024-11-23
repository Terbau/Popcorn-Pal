import type { Meta, StoryObj } from "@storybook/react";
import { AlertDialog } from "./AlertDialog";
import { Button } from "../../atoms/Button/Button";
import { useState } from "react";

const meta: Meta<typeof AlertDialog> = {
  title: "Components/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof AlertDialog>;

const DefaultRender = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <AlertDialog
        title="Are you sure?"
        description="This action cannot be undone."
        open={open}
        onOpenChange={setOpen}
        actions={[
          {
            label: "Cancel",
            color: "brand",
            onClick: () => setOpen(false),
          },
          {
            label: "Delete",
            variant: "primary",
            color: "red",
            onClick: () => setOpen(false),
          },
        ]}
      />
    </>
  );
};

export const Default: Story = {
  render: DefaultRender,
};

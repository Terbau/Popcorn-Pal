import type { Meta, StoryObj } from "@storybook/react";
import { ToggleBadge, type ToggleBadgeProps } from "./ToggleBadge";
import { useState } from "react";

const meta: Meta<typeof ToggleBadge> = {
  title: "Components/ToggleBadge",
  component: ToggleBadge,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ToggleBadge>;

export default meta;
type Story = StoryObj<typeof ToggleBadge>;

const DefaultRender = ({
  pressed: initialIsPressed = false,
  ...args
}: ToggleBadgeProps) => {
  const [pressed, setPressed] = useState(initialIsPressed);
  return (
    <ToggleBadge pressed={pressed} onPressedChange={setPressed} {...args}>
      {pressed ? "Liked" : "Like"}
    </ToggleBadge>
  );
};

export const Default: Story = {
  render: DefaultRender,
  args: {
    color: "red",
    size: "md",
  },
};

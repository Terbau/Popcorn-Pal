import type { Meta, StoryObj } from "@storybook/react";
import { ToggleIcon, type ToggleIconProps } from "./ToggleIcon";
import { useState } from "react";

const meta: Meta<typeof ToggleIcon> = {
  title: "Components/ToggleIcon",
  component: ToggleIcon,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ToggleIcon>;

export default meta;
type Story = StoryObj<typeof ToggleIcon>;

const DefaultRender = ({
  pressed: initialIsPressed = false,
  ...args
}: ToggleIconProps) => {
  const [pressed, setPressed] = useState(initialIsPressed);
  return (
    <ToggleIcon pressed={pressed} onPressedChange={setPressed} {...args} />
  );
};

export const Default: Story = {
  render: DefaultRender,
  args: {
    toggledIcon: "mdi:heart",
    untoggledIcon: "mdi:heart-outline",
  },
};

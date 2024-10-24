import type { Meta, StoryObj } from "@storybook/react";
import { ScrollButton } from "./ScrollButton";

const meta: Meta<typeof ScrollButton> = {
  title: "Components/ScrollButton",
  component: ScrollButton,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ScrollButton>;

export default meta;
type Story = StoryObj<typeof ScrollButton>;

export const Left: Story = {
  args: {
    direction: "left",
    onClick: () => alert("Left button clicked"),
  },
};

export const Right: Story = {
  args: {
    direction: "right",
    onClick: () => alert("Right button clicked"),
  },
};

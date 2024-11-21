import { Badge } from "./Badge";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  args: {
    children: "IMDb",
  },
};

export const Seconday: Story = {
  args: {
    children: "IMDb",
    variant: "secondary",
  },
};

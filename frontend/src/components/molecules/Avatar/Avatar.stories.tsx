import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: "https://cdn-icons-png.flaticon.com/512/6858/6858504.png",
    alt: "Avatar",
    fallback: "AA",
  },
};

export const FallbackOnly: Story = {
  args: {
    fallback: "BB",
  },
};

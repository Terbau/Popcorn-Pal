import type { Meta, StoryObj } from "@storybook/react";
import { AvatarInput } from "./AvatarInput";

const meta: Meta<typeof AvatarInput> = {
  title: "Components/AvatarInput",
  component: AvatarInput,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof AvatarInput>;

export default meta;
type Story = StoryObj<typeof AvatarInput>;

export const Default: Story = {
  args: {
    fallback: "BB",
    currentAvatarUrl: "https://cdn-icons-png.flaticon.com/512/6858/6858504.png",
  },
};

export const WithLabel: Story = {
  args: {
    fallback: "BB",
    currentAvatarUrl: "https://cdn-icons-png.flaticon.com/512/6858/6858504.png",
    label: "Avatar",
  },
};

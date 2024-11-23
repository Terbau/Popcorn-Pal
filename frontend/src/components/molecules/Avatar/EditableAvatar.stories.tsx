import type { Meta, StoryObj } from "@storybook/react";
import { EditableAvatar } from "./EditableAvatar";

const meta: Meta<typeof EditableAvatar> = {
  title: "Components/EditableAvatar",
  component: EditableAvatar,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof EditableAvatar>;

export default meta;
type Story = StoryObj<typeof EditableAvatar>;

export const Default: Story = {
  args: {
    src: "https://cdn-icons-png.flaticon.com/512/6858/6858504.png",
    alt: "EditableAvatar",
    fallback: "AA",
  },
};

export const FallbackOnly: Story = {
  args: {
    fallback: "BB",
  },
};

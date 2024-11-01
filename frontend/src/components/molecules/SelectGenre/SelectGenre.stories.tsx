import type { Meta, StoryObj } from "@storybook/react";
import { SelectGenre } from "./SelectGenre";

const meta: Meta<typeof SelectGenre> = {
  title: "Components/SelectGenre",
  component: SelectGenre,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SelectGenre>;

export default meta;
type Story = StoryObj<typeof SelectGenre>;

export const Default: Story = {
  args: {},
};

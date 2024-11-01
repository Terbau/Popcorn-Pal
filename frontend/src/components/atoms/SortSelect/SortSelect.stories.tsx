import type { Meta, StoryObj } from "@storybook/react";
import { SortSelect } from "./SortSelect";

const meta: Meta<typeof SortSelect> = {
  title: "Components/SortSelect",
  component: SortSelect,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SortSelect>;

export default meta;
type Story = StoryObj<typeof SortSelect>;

export const Default: Story = {
  args: {},
};

import type { Meta, StoryObj } from "@storybook/react";
import { LabelPicker } from "./LabelPicker";

const meta: Meta<typeof LabelPicker> = {
  title: "Components/LabelPicker",
  component: LabelPicker,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof LabelPicker>;

export default meta;
type Story = StoryObj<typeof LabelPicker>;

export const DefaultRender = () => {
  return (
    <LabelPicker
      options={[
        { label: "Red", value: "red", color: "red" },
        { label: "Blue", value: "blue", color: "blue" },
        { label: "Orange", value: "orange", color: "orange" },
      ]}
    />
  );
};

export const Default: Story = {
  render: DefaultRender,
};

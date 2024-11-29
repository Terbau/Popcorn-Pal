import { useState } from "react";
import { Checkbox } from "./Checkbox";
import type { Meta, StoryObj } from "@storybook/react";
import type { CheckboxProps } from "@radix-ui/react-checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof Checkbox>;

const DefaultRender = ({ checked: inputChecked, ...args }: CheckboxProps) => {
  const [checked, setChecked] = useState(inputChecked);

  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={() => setChecked(!checked)}
    />
  );
};

export const Default: Story = {
  render: DefaultRender,
};

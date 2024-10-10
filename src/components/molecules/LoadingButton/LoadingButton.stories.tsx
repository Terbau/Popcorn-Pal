import type { Meta, StoryObj } from "@storybook/react";
import { LoadingButton, type LoadingButtonProps } from "./LoadingButton";
import { useState } from "react";

const meta: Meta<typeof LoadingButton> = {
  title: "Components/LoadingButton",
  component: LoadingButton,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof LoadingButton>;

export default meta;
type Story = StoryObj<typeof LoadingButton>;

export const Default: Story = {
  render: (props: LoadingButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    };

    return (
      <LoadingButton {...props} isLoading={isLoading} onClick={handleClick}>
        Click me
      </LoadingButton>
    );
  },
};

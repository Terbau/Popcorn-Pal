import { Separator } from "./Separator";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus assumenda
        iste culpa dicta. Ipsam ratione, saepe quos ex odit enim nam. Ipsam id
        asperiores nemo, sapiente incidunt maiores minus expedita?
      </p>
      <Separator orientation="horizontal" />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus assumenda
        iste culpa dicta. Ipsam ratione, saepe quos ex odit enim nam. Ipsam id
        asperiores nemo, sapiente incidunt maiores minus expedita?
      </p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex flex-row">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus assumenda
        iste culpa dicta. Ipsam ratione, saepe quos ex odit enim nam. Ipsam id
        asperiores nemo, sapiente incidunt maiores minus expedita?
      </p>
      <Separator orientation="vertical" />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus assumenda
        iste culpa dicta. Ipsam ratione, saepe quos ex odit enim nam. Ipsam id
        asperiores nemo, sapiente incidunt maiores minus expedita?
      </p>
    </div>
  ),
};

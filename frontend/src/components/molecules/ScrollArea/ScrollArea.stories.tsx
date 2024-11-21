import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "./ScrollArea";

const meta: Meta<typeof ScrollArea> = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const Vertical: Story = {
  render: () => (
    <ScrollArea
      orientation="vertical"
      className="h-64 w-48 border border-brand-10 rounded-lg"
    >
      <p>Scroll me vertically</p>
      <p>Scroll me vertically</p>
      <p>Scroll me vertically</p>
      <p>Scroll me vertically</p>
      <p>Scroll me vertically</p>
      <p>Scroll me vertically</p>
      <p>Scroll me vertically</p>
      <p>Scroll me vertically</p>
      <p>Scroll me vertically</p>
      <p>Scroll me vertically</p>
      <p>Scroll me vertically</p>
      <p>Scroll me vertically</p>
      <p>Scroll me vertically</p>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea
      orientation="horizontal"
      className="h-48 w-64 border border-brand-10 rounded-lg [&>p]:whitespace-nowrap"
    >
      <div className="w-96" />
    </ScrollArea>
  ),
};

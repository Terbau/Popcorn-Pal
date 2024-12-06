import type { Meta, StoryObj } from "@storybook/react";
import { StyledLink } from "./StyledLink";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof StyledLink> = {
  title: "Components/StyledLink",
  component: StyledLink,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StyledLink>;

export default meta;
type Story = StoryObj<typeof StyledLink>;

const DefaultRender = () => (
  <MemoryRouter>
    <StyledLink to="/test">Test</StyledLink>
  </MemoryRouter>
);

export const Default: Story = {
  render: DefaultRender,
  args: {},
};

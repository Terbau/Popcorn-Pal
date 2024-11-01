import type { Meta, StoryObj } from "@storybook/react";
import { MovieImageSkeleton } from "./MovieImageSkeleton";

const meta: Meta<typeof MovieImageSkeleton> = {
  title: "Components/MovieImageSkeleton",
  component: MovieImageSkeleton,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MovieImageSkeleton>;

export default meta;
type Story = StoryObj<typeof MovieImageSkeleton>;

export const DefaultRender = () => {
  return <MovieImageSkeleton />;
};

export const Default: Story = {
  render: DefaultRender,
};

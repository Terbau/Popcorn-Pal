import type { Meta, StoryObj } from "@storybook/react";
import { SkeletonMovieImage } from "./SkeletonMovieImage";

const meta: Meta<typeof SkeletonMovieImage> = {
  title: "Components/SkeletonMovieImage",
  component: SkeletonMovieImage,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SkeletonMovieImage>;

export default meta;
type Story = StoryObj<typeof SkeletonMovieImage>;

export const DefaultRender = () => {
  return <SkeletonMovieImage />;
};

export const Default: Story = {
  render: DefaultRender,
};

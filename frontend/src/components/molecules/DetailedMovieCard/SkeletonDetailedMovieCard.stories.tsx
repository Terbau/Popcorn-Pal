import type { Meta, StoryObj } from "@storybook/react";
import { SkeletonDetailedMovieCard } from "./SkeletonDetailedMovieCard";

const meta: Meta<typeof SkeletonDetailedMovieCard> = {
  title: "Components/SkeletonDetailedMovieCard",
  component: SkeletonDetailedMovieCard,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SkeletonDetailedMovieCard>;

export default meta;
type Story = StoryObj<typeof SkeletonDetailedMovieCard>;

export const Default: Story = {};

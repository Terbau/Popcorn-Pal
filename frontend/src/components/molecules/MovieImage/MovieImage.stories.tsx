import type { Meta, StoryObj } from "@storybook/react";
import { MovieImage } from "./MovieImage";

const meta: Meta<typeof MovieImage> = {
  title: "Components/MovieImage",
  component: MovieImage,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MovieImage>;

export default meta;
type Story = StoryObj<typeof MovieImage>;

export const DefaultRender = () => {
  return (
    <MovieImage
      src="https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_QL75_UX700_CR0,0,700,1037_.jpg"
      alt="Movie poster"
    />
  );
};

export const Default: Story = {
  render: DefaultRender,
};

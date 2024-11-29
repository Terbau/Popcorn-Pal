import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";
import { useState } from "react";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof Pagination>;

const DefaultRender = () => {
  const [page, setPage] = useState(3);

  return (
    <Pagination
      totalPages={10}
      currentPage={page}
      onPageChange={(page: number) => setPage(page)}
    />
  );
};

export const Default: Story = {
  render: DefaultRender,
};

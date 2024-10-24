import type { Meta, StoryObj } from "@storybook/react";
import { FilterBar, type FilterBarItem } from "./FilterBar";
import { useState } from "react";

const meta: Meta<typeof FilterBar> = {
  title: "Components/FilterBar",
  component: FilterBar,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof FilterBar>;

export const WithSingleSelectRender = () => {
  const [filters, setFilters] = useState([
    { label: "Spesielt utvalgte filmer", value: "chosen", isSelected: true },
    { label: "Action", value: "action", isSelected: false },
    { label: "Komedie", value: "comedy", isSelected: false },
    { label: "Drama", value: "drama", isSelected: false },
    { label: "Thriller", value: "thriller", isSelected: false },
  ]);

  const handleItemClick = (item: FilterBarItem) => {
    const updatedFilters = filters.map((filter) => ({
      ...filter,
      isSelected: filter.value === item.value,
    }));

    setFilters(updatedFilters);
  };

  return <FilterBar items={filters} onItemClick={handleItemClick} />;
};

export const WithSingleSelect: Story = {
  render: WithSingleSelectRender,
};

export const WithMultipleSelectRender = () => {
  const [filters, setFilters] = useState([
    { label: "Spesielt utvalgte filmer", value: "chosen", isSelected: true },
    { label: "Action", value: "action", isSelected: false },
    { label: "Komedie", value: "comedy", isSelected: false },
    { label: "Drama", value: "drama", isSelected: false },
    { label: "Thriller", value: "thriller", isSelected: false },
  ]);

  const handleItemClick = (item: FilterBarItem) => {
    const updatedFilters = filters.map((filter) => {
      if (filter.value === item.value) {
        return {
          ...filter,
          isSelected: !filter.isSelected,
        };
      }

      return filter;
    });

    setFilters(updatedFilters);
  };

  return <FilterBar items={filters} onItemClick={handleItemClick} />;
};

export const WithMultipleSelect: Story = {
  render: WithMultipleSelectRender,
};

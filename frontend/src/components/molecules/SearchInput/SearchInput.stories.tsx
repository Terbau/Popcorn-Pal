import type { Meta, StoryObj } from "@storybook/react";
import { SearchInput, type SearchInputSelectOption } from "./SearchInput";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const meta: Meta<typeof SearchInput> = {
  title: "Components/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof SearchInput>;

const DefaultRender = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  let timeout: NodeJS.Timeout | undefined = undefined;

  const handleChange = (query: string) => {
    setQuery(query);

    if (timeout) {
      clearTimeout(timeout);
    }

    setIsLoading(true);
    timeout = setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <SearchInput
      isLoading={isLoading}
      query={query}
      onQueryChange={handleChange}
    />
  );
};

export const Default: Story = {
  render: DefaultRender,
};

const selectOptions: SearchInputSelectOption[] = [
  {
    label: "Movies",
    value: "movies",
    icon: <Icon icon="mdi:film-open-outline" />,
    inputPlaceholder: "Search movies...",
  },
  {
    label: "Users",
    value: "users",
    icon: <Icon icon="mdi:user" />,
    inputPlaceholder: "Search users...",
  },
];

const WithSelectRender = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedValue, setSelectedValue] = useState("movies");
  let timeout: NodeJS.Timeout | undefined = undefined;

  const handleChange = (query: string) => {
    setQuery(query);

    if (timeout) {
      clearTimeout(timeout);
    }

    setIsLoading(true);
    timeout = setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <SearchInput
      isLoading={isLoading}
      query={query}
      onQueryChange={handleChange}
      selectOptions={selectOptions}
      selectValue={selectedValue}
      onSelectValueChange={setSelectedValue}
    />
  );
};

export const WithSelect: Story = {
  render: WithSelectRender,
};

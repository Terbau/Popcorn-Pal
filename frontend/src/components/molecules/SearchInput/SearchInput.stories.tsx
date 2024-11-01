import type { Meta, StoryObj } from "@storybook/react";
import { SearchInput } from "./SearchInput";
import { useState } from "react";

const meta: Meta<typeof SearchInput> = {
  title: "Components/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const DefaultRender = () => {
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

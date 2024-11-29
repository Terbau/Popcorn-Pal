import type { Meta, StoryObj } from "@storybook/react";
import { Select, type SelectOption } from "./Select";
import { useState } from "react";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

const OPTIONS: SelectOption[] = [
  { label: "Adventure", value: "Adventure" },
  { label: "Action", value: "Action" },
  { label: "Sci-Fi", value: "Sci-Fi" },
  { label: "Drama", value: "Drama" },
  { label: "Thriller", value: "Thriller" },
] as const;

export const DefaultRender = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<SelectOption["value"] | undefined>(
    undefined,
  );

  return (
    <>
      <Select
        placeholder="Select a genre..."
        open={open}
        onOpenChange={setOpen}
        options={OPTIONS}
        onValueChange={setSelected}
        value={selected}
      />
    </>
  );
};

export const Default: Story = {
  render: DefaultRender,
};

export const GroupedRender = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<SelectOption["value"] | undefined>(
    undefined,
  );

  const GROUPED_OPTIONS = [
    {
      label: "Genres",
      options: OPTIONS,
    },
    {
      label: "Other",
      options: [
        { label: "Comedy", value: "Comedy" },
        { label: "Romance", value: "Romance" },
        { label: "Horror", value: "Horror" },
      ],
    },
  ];

  return (
    <>
      <Select
        placeholder="Select a genre..."
        open={open}
        onOpenChange={setOpen}
        options={GROUPED_OPTIONS}
        onValueChange={setSelected}
        value={selected}
      />
    </>
  );
};

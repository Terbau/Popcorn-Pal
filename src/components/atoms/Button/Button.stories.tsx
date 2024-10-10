import { Button, type ButtonProps, type ButtonColor } from "./Button";
import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "@iconify/react";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Click me",
  },
};

export const Seconday: Story = {
  args: {
    children: "Click me",
    variant: "secondary",
  },
};

export const Tertiary: Story = {
  args: {
    children: "Click me",
    variant: "tertiary",
  },
};

export const AllPrimary: Story = {
  render: (props: ButtonProps) => (
    <div className="flex flex-col gap-4">
      {["brand", "slate", "red", "blue", "green"].map((color) => (
        <Button
          key={color}
          className="w-fit"
          {...props}
          color={color as ButtonColor}
        >
          {color}
        </Button>
      ))}
    </div>
  ),
};

export const AllSecondary: Story = {
  render: (props: ButtonProps) => (
    <div className="flex flex-col gap-4">
      {["brand", "slate", "red", "blue", "green"].map((color) => (
        <Button
          key={color}
          className="w-fit"
          {...props}
          color={color as ButtonColor}
          variant="secondary"
        >
          {color}
        </Button>
      ))}
    </div>
  ),
};

export const AllTertiary: Story = {
  render: (props: ButtonProps) => (
    <div className="flex flex-col gap-4">
      {["brand", "slate", "red", "blue", "green"].map((color) => (
        <Button
          key={color}
          className="w-fit"
          {...props}
          color={color as ButtonColor}
          variant="tertiary"
        >
          {color}
        </Button>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: (props: ButtonProps) => (
    <div className="flex flex-col gap-4">
      {["sm", "md", "lg"].map((size) => (
        <Button
          key={size}
          {...props}
          className="w-fit"
          size={size as "sm" | "md" | "lg"}
        >
          Click me
        </Button>
      ))}
    </div>
  ),
};

export const AllVariantsDisabled: Story = {
  render: (props: ButtonProps) => (
    <div className="flex flex-col gap-4">
      {["primary", "secondary", "tertiary"].map((variant) => (
        <Button
          key={variant}
          {...props}
          className="w-fit"
          disabled
          variant={variant as "primary" | "secondary" | "tertiary"}
        >
          Click me
        </Button>
      ))}
    </div>
  ),
};

export const WithLeftIcon: Story = {
  render: (props: ButtonProps) => (
    <Button {...props} leftIcon={<Icon icon="fluent:settings-48-regular" />}>
      Click me
    </Button>
  ),
};

export const WithRightIcon: Story = {
  render: (props: ButtonProps) => (
    <Button {...props} rightIcon={<Icon icon="fluent:settings-48-regular" />}>
      Click me
    </Button>
  ),
};

export const WithBothIcons: Story = {
  render: (props: ButtonProps) => (
    <Button
      {...props}
      leftIcon={<Icon icon="fluent:settings-48-regular" />}
      rightIcon={<Icon icon="fluent:settings-48-regular" />}
    >
      Click me
    </Button>
  ),
};

export const WithRightButtonAllSizes: Story = {
  render: (props: ButtonProps) => (
    <div className="flex flex-col gap-4">
      {["sm", "md", "lg"].map((size) => (
        <Button
          key={size}
          {...props}
          size={size as "sm" | "md" | "lg"}
          className="w-fit"
          leftIcon={<Icon icon="fluent:settings-48-regular" />}
        >
          Click me
        </Button>
      ))}
    </div>
  ),
};

export const AsLink: Story = {
  render: (props: ButtonProps) => (
    <Button {...props} asChild>
      <a href="https://vg.no" target="_blank" rel="noreferrer">
        Click me to open a link
      </a>
    </Button>
  ),
};

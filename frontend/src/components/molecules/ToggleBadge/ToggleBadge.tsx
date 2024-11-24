import * as RadixToggle from "@radix-ui/react-toggle";
import { Badge, type BadgeProps } from "../../atoms/Badge/Badge";

export type ToggleBadgeProps = RadixToggle.ToggleProps & BadgeProps;

export const ToggleBadge = ({
  pressed,
  size,
  color,
  variant,
  className,
  children,
  ...props
}: ToggleBadgeProps) => {
  return (
    <RadixToggle.Root className="inline-flex items-center" {...props}>
      <Badge size={size} color={color} variant={variant}>
        {children}
      </Badge>
    </RadixToggle.Root>
  );
};

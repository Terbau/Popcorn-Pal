import { forwardRef, useId } from "react";
import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils/classUtils";
import { Badge, type BadgeColor } from "@/components/atoms/Badge/Badge";

// Allow all badge colors to be used as label picker item colors.
export type LabelPickerItemColor = BadgeColor;

export interface LabelPickerOption {
  label: string;
  value: string;
  color: LabelPickerItemColor;
}

interface LabelPickerProps extends RadixRadioGroup.RadioGroupProps {
  options: LabelPickerOption[];
}

export const LabelPicker = forwardRef<HTMLDivElement, LabelPickerProps>(
  ({ options, className, ...props }, ref) => {
    return (
      <RadixRadioGroup.Root
        className={cn("flex flex-col gap-3", className)}
        ref={ref}
        {...props}
      >
        {options.map((option) => (
          <LabelPickerItem key={option.value} {...option} />
        ))}
      </RadixRadioGroup.Root>
    );
  },
);

interface LabelPickerItemProps extends RadixRadioGroup.RadioGroupItemProps {
  label: string;
  value: string;
  color: LabelPickerItemColor;
}

export const LabelPickerItem = forwardRef<
  HTMLLabelElement,
  LabelPickerItemProps
>(({ label, value, color, className, ...props }, ref) => {
  const id = useId();

  return (
    <label className="" htmlFor={id} ref={ref}>
      <Badge
        variant="secondary"
        color={color}
        size="sm"
        className="flex flex-row gap-2 items-center cursor-pointer w-fit"
      >
        <RadixRadioGroup.Item
          id={id}
          value={value}
          aria-label={label}
          className={cn(
            "rounded-full h-3 w-3 shadow-lg border flex items-center justify-center",
            `border-${color}-8`,
            className,
          )}
          {...props}
        >
          <RadixRadioGroup.Indicator
            className={cn(
              "after:content-[''] block w-2 h-2 rounded-[50%]",
              `bg-${color}-8`,
            )}
          />
        </RadixRadioGroup.Item>
        {label}
      </Badge>
    </label>
  );
});

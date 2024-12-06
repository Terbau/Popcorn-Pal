import { Icon } from "@iconify/react/dist/iconify.js";
import * as RadixSelect from "@radix-ui/react-select";
import { forwardRef, Fragment, type ReactNode } from "react";
import { cn } from "../../../lib/utils";
import {
  Button,
  type ButtonProps,
  ButtonRightIcon,
} from "../../atoms/Button/Button";

export interface SelectOption {
  label: string | ReactNode;
  value: string;
}

export interface SelectGroup {
  label?: string;
  options: SelectOption[];
}

interface SelectProps extends RadixSelect.SelectProps {
  placeholder: string;
  options: SelectOption[] | SelectGroup[];
  buttonProps?: ButtonProps;
}

export const Select = ({
  placeholder,
  options,
  buttonProps,
  ...props
}: SelectProps) => {
  return (
    <RadixSelect.Root {...props}>
      <RadixSelect.Trigger asChild>
        <Button {...buttonProps}>
          <RadixSelect.Value placeholder={placeholder} />
          <ButtonRightIcon icon="lucide:chevron-down" />
        </Button>
      </RadixSelect.Trigger>
      <SelectContent options={options} />
    </RadixSelect.Root>
  );
};

interface SelectContentProps extends RadixSelect.SelectContentProps {
  options: SelectOption[] | SelectGroup[];
}

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  ({ options, position = "popper", className, ...props }, ref) => {
    const isGrouped = options.some((option) => "options" in option);
    const groups: SelectGroup[] = (
      isGrouped ? options : [{ options }]
    ) as SelectGroup[];

    const getOptions = (group: SelectGroup) => {
      return group.options.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ));
    };

    return (
      <RadixSelect.Portal>
        <RadixSelect.Content
          ref={ref}
          className={cn(
            "mt-1 overflow-hidden bg-cream dark:bg-brand-3 rounded-md shadow-2xl border border-purple-border dark:border-brand-6 z-50",
            className,
          )}
          position={position}
          {...props}
        >
          <ScrollButton direction="up" />
          <RadixSelect.Viewport>
            {groups.map((group, index) => (
              <Fragment key={`${group.label}-${index}`}>
                <RadixSelect.Group>
                  {group.label && (
                    <RadixSelect.Label className="px-6 text-xs text-brand-11 mt-2">
                      {group.label}
                    </RadixSelect.Label>
                  )}
                  {getOptions(group)}
                </RadixSelect.Group>
                {index < groups.length - 1 && (
                  <RadixSelect.Separator className="h-px bg-brand-6 m-1" />
                )}
              </Fragment>
            ))}
          </RadixSelect.Viewport>
          <ScrollButton direction="down" />
        </RadixSelect.Content>
      </RadixSelect.Portal>
    );
  },
);

const SelectItem = forwardRef<HTMLDivElement, RadixSelect.SelectItemProps>(
  ({ children, className, ...props }, ref) => (
    <RadixSelect.Item
      className={cn(
        "text-sm dark:text-brand-11 text-purple-text rounded-sm flex items-center h-8 pl-8 pr-6 relative select-none",
        "data-[disabled]:text-slate-9 data-[disabled]:pointer-events-none",
        "data-[highlighted]:outline-0 dark:data-[highlighted]:bg-brand-9 data-[highlighted]:bg-purple-lavender cursor-pointer",
        className,
      )}
      ref={ref}
      {...props}
    >
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className="absolute left-0 w-8 inline-flex items-center justify-center">
        <Icon icon="ic:round-check" />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  ),
);

type ScrollButtonProps = (
  | RadixSelect.SelectScrollUpButtonProps
  | RadixSelect.SelectScrollDownButtonProps
) & {
  direction: "up" | "down";
};

const ScrollButton = forwardRef<HTMLDivElement, ScrollButtonProps>(
  ({ direction, className, ...props }, ref) => {
    const Comp =
      direction === "up"
        ? RadixSelect.ScrollUpButton
        : RadixSelect.ScrollDownButton;

    return (
      <Comp
        className={cn(
          "flex items-center justify-center h-6 bg-brand-6 cursor-default",
          className,
        )}
        {...props}
        ref={ref}
      >
        <Icon icon={`lucide:chevron-${direction}`} className="text-brand-11" />
      </Comp>
    );
  },
);

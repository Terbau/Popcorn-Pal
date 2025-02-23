import { Icon } from "@iconify/react/dist/iconify.js";
import {
  LabelPicker,
  type LabelPickerOption,
} from "../../molecules/LabelPicker/LabelPicker";
import type { WatchlistItemLabel } from "./WatchlistItemLabelSidebarFilter";
import * as RadixPopover from "@radix-ui/react-popover";

export const watchlistItemLabelsOptions: (Omit<LabelPickerOption, "value"> & {
  value: WatchlistItemLabel;
})[] = [
  { label: "Want to watch", color: "blue", value: "WANT_TO_WATCH" },
  { label: "Have watched", color: "red", value: "HAVE_WATCHED" },
  { label: "Watching", color: "orange", value: "WATCHING" },
] as const;

interface WatchlistItemLabelPickerPopoverProps
  extends RadixPopover.PopoverProps {
  shouldUpdate?: boolean;
  label?: WatchlistItemLabel | undefined;
  onLabelChange?: (label: WatchlistItemLabel) => void;
}

export const WatchlistItemLabelPickerPopover = ({
  label,
  onLabelChange,
  children,
  ...props
}: WatchlistItemLabelPickerPopoverProps) => {
  return (
    <RadixPopover.Root {...props}>
      <RadixPopover.Trigger asChild>{children}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          className="rounded-xl dark:bg-brand-3 bg-cream shadow-xl p-4 pr-8 border border-purple-lavender dark:border-brand-6"
          sideOffset={10}
        >
          <h3 className="mb-4 dark:text-brand-12">Choose a label</h3>
          <LabelPicker
            options={watchlistItemLabelsOptions}
            value={label}
            onValueChange={onLabelChange}
            data-cy="label-picker" 
          />
          <RadixPopover.Close
            className="absolute top-4 right-3 text-brand-10"
            aria-label="Close"
          >
            <Icon
              icon="iconamoon:close"
              className="h-6 w-6 text-brand-11 hover:text-brand-12"
            />
          </RadixPopover.Close>
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
};

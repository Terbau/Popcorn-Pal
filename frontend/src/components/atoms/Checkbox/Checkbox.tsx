import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

interface CheckboxProps {
  labelText: string;
}

export const Checkbox = ({ labelText }: CheckboxProps) => (
  <div className="flex items-center pb-3 pt-3 border-white-300 pr-4 h-full">
    <RadixCheckbox.Root
      className="w-6 h-6 rounded flex items-center justify-center bg-white"
      defaultChecked
      id="c1"
    >
      <RadixCheckbox.Indicator className="text-black">
        <CheckIcon />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
    <label className="pl-2 text-base leading-4">{labelText}</label>
  </div>
);

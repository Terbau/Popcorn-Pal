import {
  type ChangeEvent,
  type MouseEvent,
  useId,
  type InputHTMLAttributes,
  useState,
  useRef,
  forwardRef,
  useEffect,
  type KeyboardEventHandler,
} from "react";
import { EditableAvatar } from "../Avatar/EditableAvatar";
import * as RadixLabel from "@radix-ui/react-label";
import type { AvatarProps } from "../Avatar/Avatar";
import { cn, useCombinedRefs } from "../../../lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";

interface AvatarInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  fallback: string;
  currentAvatarUrl?: string;
  label?: string;
  labelAlignment?: "left" | "center" | "right";
  hasRemoveButton?: boolean;
  onRemoveButtonClick?: () => void;
  size?: AvatarProps["size"];
  errorMessage?: string;
  isFormReset?: boolean;
}

export const AvatarInput = forwardRef<HTMLInputElement, AvatarInputProps>(
  (
    {
      fallback,
      currentAvatarUrl,
      label,
      labelAlignment = "left",
      hasRemoveButton = true,
      onRemoveButtonClick,
      size = "2xl",
      errorMessage,
      isFormReset = false,
      onChange,
      ...props
    },
    ref,
  ) => {
    const id = useId();
    const inputRef = useRef<HTMLInputElement>(null);
    const combinedRef = useCombinedRefs(ref, inputRef);

    const [srcToShow, setSrcToShow] = useState(currentAvatarUrl);

    const labelAlignmentClass = {
      left: "items-start",
      center: "items-center",
      right: "items-end",
    }[labelAlignment];

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);

      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSrcToShow(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleRemoveClick = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      onRemoveButtonClick?.();

      if (inputRef.current) {
        inputRef.current.value = "";
        setSrcToShow(undefined);

        const event = new Event("change", { bubbles: true });
        inputRef.current.dispatchEvent(event);
      }
    };

    const handleLabelKeyDown: KeyboardEventHandler<HTMLLabelElement> = (e) => {
      // Check that the actual focus was on the label and not on a child element
      e.stopPropagation();

      if (e.target !== e.currentTarget) {
        return;
      }

      if (e.key === "Enter" || e.key === " ") {
        inputRef.current?.click();
      }
    };

    useEffect(() => {
      // We need to reset the state whenever the form is reset in the parent
      if (isFormReset) {
        setSrcToShow(currentAvatarUrl);
      }
    }, [isFormReset, currentAvatarUrl]);

    return (
      <div className="flex flex-col gap-3">
        <RadixLabel.Root
          htmlFor={id}
          tabIndex={0}
          onKeyDown={handleLabelKeyDown}
          className={cn(
            "flex flex-col gap-2 text-brand-11 font-semibold outline-0 group",
            labelAlignmentClass,
          )}
        >
          {label}
          <div className="relative">
            <EditableAvatar
              src={srcToShow}
              fallback={fallback}
              size={size}
              component="span"
            />
            {hasRemoveButton && srcToShow && (
              <button
                type="button"
                className="absolute top-0 right-0 rounded-full z-10"
                onClick={handleRemoveClick}
              >
                <Icon
                  icon="mdi:trash-can-outline"
                  className="h-6 w-6 sm:h-8 sm:w-8 text-brand-11 hover:text-brand-12"
                />
              </button>
            )}
          </div>
        </RadixLabel.Root>
        <input
          type="file"
          accept="image/png, image/jpeg, image/webp"
          ref={combinedRef}
          id={id}
          className="hidden"
          onChange={onChangeHandler}
          {...props}
        />
        {errorMessage && (
          <span className="ml-1 text-sm text-red-11">{errorMessage}</span>
        )}
      </div>
    );
  },
);

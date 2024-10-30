import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "../../../lib/utils";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({
    label,
    errorMessage,
    className,
    type = "text",
    ...props
  }, ref) => {
    const id = useId();

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="text-brand-11 mb-1 font-semibold">
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          type={type}
          className={cn(
            "px-3 py-2 bg-brand-4 border border-brand-6 placeholder-brand-10 outline-none rounded-md text-brand-12",
            "focus:ring-1 focus:ring-brand-9",
            className,
          )}
          {...props}
        />
        {errorMessage && (
          <span className="ml-1 text-sm text-red-11">{errorMessage}</span>
        )}
      </div>
    );
  },
);

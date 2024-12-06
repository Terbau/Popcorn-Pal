import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "../../../lib/utils";

interface TextAreaInputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  errorMessage?: string;
}

export const TextAreaInput = forwardRef<
  HTMLTextAreaElement,
  TextAreaInputProps
>(({ label, errorMessage, className, ...props }, ref) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={id}
          className="dark:text-brand-11 text-purple-medium mb-1 font-semibold"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        ref={ref}
        className={cn(
          "px-3 py-2 bg-cream dark:bg-brand-3 border border-purple-lavender dark:border-brand-6 placeholder-brand-10 outline-none rounded-md text-purple-medium dark:text-brand-12",
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
});

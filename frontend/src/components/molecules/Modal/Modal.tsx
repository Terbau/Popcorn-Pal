import { Icon } from "@iconify/react/dist/iconify.js";
import * as RadixDialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useContext } from "react";
import { ThemeContext } from "@/App";
import { cn } from "@/lib/utils/classUtils";

export interface ModalProps extends RadixDialog.DialogProps {
  title?: string;
  description?: string;
  hasCloseButton?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

export const Modal = ({
  title,
  description,
  hasCloseButton = true,
  maxWidth = "lg",
  children,
  ...props
}: ModalProps) => {
  const maxWidthClass = {
    sm: "max-w-lg",
    md: "max-w-xl",
    lg: "max-w-2xl",
    xl: "max-w-3xl",
  }[maxWidth];

  // Get the theme directly from the context as the modal is portal-ed
  // to the body.
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("Modal must be used within a ThemeProvider");
  }
  const { theme } = themeContext;

  return (
    <div className={`${theme} dark`}>
      <RadixDialog.Root {...props}>
        <RadixDialog.Portal>
          <RadixDialog.Overlay className="bg-black/60 py-6 fixed top-0 bottom-0 right-0 left-0 grid place-items-center z-40 overflow-y-auto">
            <RadixDialog.Content
              className={cn(
                "flex flex-col gap-5 dark:bg-brand-3 bg-cream relative rounded-lg shadow-lg w-[90vw] p-6 z-50 border border-brand-5 focus:outline-0",
                maxWidthClass,
              )}
            >
              {hasCloseButton && (
                <RadixDialog.Close asChild>
                  <button
                    type="button"
                    className="absolute top-3 right-3 text-brand-10"
                    aria-label="Close"
                  >
                    <Icon
                      icon="iconamoon:close"
                      className="h-8 w-8 text-brand-11 hover:text-brand-12"
                    />
                  </button>
                </RadixDialog.Close>
              )}

              {title ? (
                <RadixDialog.Title className="text-xl font-semibold text-brand-11">
                  {title}
                </RadixDialog.Title>
              ) : (
                <VisuallyHidden.Root>
                  <RadixDialog.Title>Modal</RadixDialog.Title>
                </VisuallyHidden.Root>
              )}

              {description && (
                <RadixDialog.Description className="text-sm text-purple-text dark:text-brand-12 mt-2">
                  {description}
                </RadixDialog.Description>
              )}

              {children}
            </RadixDialog.Content>
          </RadixDialog.Overlay>
        </RadixDialog.Portal>
      </RadixDialog.Root>
    </div>
  );
};

import { forwardRef } from "react";
import {
  Button,
  ButtonLeftIcon,
  type ButtonProps,
} from "../../atoms/Button/Button";

export interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean;
  shouldDisableWhenLoading?: boolean;
}

export const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    {
      isLoading = false,
      shouldDisableWhenLoading = true,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Button
        {...props}
        ref={ref}
        disabled={disabled || (shouldDisableWhenLoading && isLoading)}
        aria-label="Loading icon"
      >
        {isLoading && (
          <ButtonLeftIcon icon="prime:spinner" className="animate-spin" />
        )}
        {children}
      </Button>
    );
  },
);

import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { OptionalLink, type OptionalLinkProps } from "../OptionalLink";

export const StyledLink = forwardRef<HTMLAnchorElement, OptionalLinkProps>(
  ({ className, disabled = false, ...props }, ref) => (
    <OptionalLink
      ref={ref}
      disabled={disabled}
      className={cn(
        "text-brand-11",
        { "hover:text-blue-10": !disabled },
        className,
      )}
      {...props}
    />
  ),
);

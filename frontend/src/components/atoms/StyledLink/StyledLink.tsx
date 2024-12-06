import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { Link, type LinkProps } from "react-router-dom";

export const StyledLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, ...props }, ref) => (
    <Link
      ref={ref}
      className={cn("text-brand-11 hover:text-blue-10", className)}
      {...props}
    />
  ),
);

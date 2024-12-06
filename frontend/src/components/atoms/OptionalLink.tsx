// A story wouldn't work for this component as the Link component is not
// supported by storybook.

import { forwardRef } from "react";
import { Link, type LinkProps } from "react-router-dom";

export interface OptionalLinkProps extends LinkProps {
  disabled?: boolean;
}

export const OptionalLink = forwardRef<HTMLAnchorElement, OptionalLinkProps>(
  ({ disabled, ...props }, ref) => {
    if (disabled) {
      return <span {...props} />;
    }

    return <Link {...props} ref={ref} />;
  },
);

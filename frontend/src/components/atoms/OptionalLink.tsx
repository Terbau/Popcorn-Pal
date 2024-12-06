// A story wouldn't work for this component as the Link component is not
// supported by storybook. Could have wrapped it in a router though.

import { forwardRef } from "react";
import { Link, type LinkProps } from "react-router-dom";

export interface OptionalLinkProps extends LinkProps {
  disabled?: boolean;
}

// Functions the same as a Link component, but if the disabled prop is set to
// true, it will render a span instead of a link.
export const OptionalLink = forwardRef<HTMLAnchorElement, OptionalLinkProps>(
  ({ disabled, ...props }, ref) => {
    if (disabled) {
      return <span {...props} />;
    }

    return <Link {...props} ref={ref} />;
  },
);

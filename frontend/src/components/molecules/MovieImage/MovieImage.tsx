import type { ImgHTMLAttributes } from "react";
import { Badge, type BadgeProps } from "../../atoms/Badge/Badge";
import { transformAndResizeImageUrl } from "@/lib/utils/imageUtils";
import { cn } from "@/lib/utils/classUtils";

export interface MovieImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  badgeProps?: BadgeProps;
  hasHoverEffect?: boolean;
  overrideSizeChange?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
}

export const MovieImage = ({
  src,
  alt,
  badgeProps,
  hasHoverEffect = true,
  overrideSizeChange = false,
  size = "md",
  className,
  ...props
}: MovieImageProps) => {
  // Transform and resize the image URL in order to reduce the image size.
  // This is done to improve the performance of the application as well as to
  // minimize the environmental impact of serving large images.
  const transformedSrc = transformAndResizeImageUrl(src, 264);

  const sizeClass = {
    xs: "h-16",
    sm: "h-28",
    md: "h-32",
    lg: "h-40",
  }[size];

  const responsiveSizeClass = {
    xs: "xs:h-20 md:h-24",
    sm: "xs:h-[9rem] md:h-52",
    md: "xs:h-[10.5rem] md:h-60",
    lg: "xs:h-48 md:h-72",
  }[size];

  return (
    <div
      className={cn(
        "aspect-[2/3] shrink-0 rounded-lg relative",
        { "hover:scale-105 duration-300": hasHoverEffect },
        sizeClass,
        { [responsiveSizeClass]: !overrideSizeChange },
        className,
      )}
    >
      {badgeProps && (
        <Badge {...badgeProps} className="absolute -top-3 -right-4" />
      )}
      <div className="overflow-hidden rounded-lg h-full">
        {/* biome-ignore lint/a11y/useAltText: <alt clearly defined> */}
        <img
          src={transformedSrc}
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
          {...props}
        />
      </div>
    </div>
  );
};

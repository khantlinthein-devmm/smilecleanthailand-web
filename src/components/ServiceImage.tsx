import Image from "next/image";
import type { Service } from "@/data";

/** Service picture; SVG illustrations skip the image optimizer, real photos use it. */
export default function ServiceImage({
  service,
  alt,
  sizes,
  className = "",
  priority = false,
}: {
  service: Service;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={service.image}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={service.image.endsWith(".svg")}
      className={`object-cover ${className}`}
    />
  );
}

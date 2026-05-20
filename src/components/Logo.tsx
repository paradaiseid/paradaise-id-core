import Image from "next/image";

/**
 * Logo paradaise.id — PNG recortado (sin padding extra)
 * - Aspect ratio 979:219 ≈ 4.47:1
 * - Las letras del wordmark ocupan ~70% del alto; arcos ~30%.
 */

interface LogoProps {
  size?: "nav" | "hero" | "lg";
  className?: string;
}

const HEIGHTS = { nav: 64, hero: 128, lg: 192 };
const ASPECT_RATIO = 979 / 219;

export default function Logo({ size = "nav", className = "" }: LogoProps) {
  const h = HEIGHTS[size];
  const w = Math.round(h * ASPECT_RATIO);
  return (
    <Image
      src="/paradaise-logo.png"
      alt="paradaise.id"
      width={w}
      height={h}
      priority={size !== "nav"}
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle" }}
    />
  );
}

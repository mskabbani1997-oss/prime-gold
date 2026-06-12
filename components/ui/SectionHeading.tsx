import { Reveal } from "./Reveal";
import { cn } from "@/lib/cn";

/**
 * Section heading. Eyebrow is optional and used sparingly (taste rule:
 * at most one eyebrow per few sections). Title stacks above the intro.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-4 text-[11px] uppercase tracking-luxe text-pg-text-faint">
          {eyebrow}
        </p>
      )}
      <h2 className="text-balance font-display text-3xl font-semibold leading-tight md:text-5xl">
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-5 text-pretty leading-relaxed text-pg-text-muted",
            align === "center" && "mx-auto",
            "max-w-prose"
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}

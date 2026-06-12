import { cn } from "@/lib/cn";

/**
 * The Prime Gold tree-of-life mark, drawn once and reused as a watermark,
 * footer emblem, and section ornament. Decorative by default (aria-hidden).
 * A radial branching form built from the logo, not freehand decoration.
 */
export function TreeOfLife({
  className,
  strokeWidth = 1,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("text-pg-rose", className)}
    >
      {/* trunk */}
      <path d="M100 178 V96" />
      {/* primary boughs */}
      <path d="M100 120 C82 108 70 90 64 70" />
      <path d="M100 120 C118 108 130 90 136 70" />
      <path d="M100 104 C86 92 78 76 76 56" />
      <path d="M100 104 C114 92 122 76 124 56" />
      <path d="M100 96 V44" />
      {/* secondary branches + leaf tips */}
      <path d="M64 70 C56 64 50 56 48 46" />
      <path d="M64 70 C60 80 58 90 60 100" />
      <path d="M136 70 C144 64 150 56 152 46" />
      <path d="M136 70 C140 80 142 90 140 100" />
      <path d="M76 56 C70 48 66 40 66 30" />
      <path d="M124 56 C130 48 134 40 134 30" />
      <path d="M100 44 C92 36 88 28 88 18" />
      <path d="M100 44 C108 36 112 28 112 18" />
      {/* radial crown ring */}
      <circle cx="100" cy="60" r="54" opacity="0.5" />
      {/* roots */}
      <path d="M100 178 C88 178 78 184 70 192" />
      <path d="M100 178 C112 178 122 184 130 192" />
      <path d="M100 178 V196" />
    </svg>
  );
}

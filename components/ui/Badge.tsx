import { ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

/** Small gold-hairline pill for trust signals (LBMA approved, Swiss made, etc.). */
export function Badge({
  children,
  icon = false,
  className,
}: {
  children: React.ReactNode;
  icon?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-pg-border-strong bg-pg-card/50 px-3 py-1 text-[11px] uppercase tracking-wide text-pg-text-muted",
        className
      )}
    >
      {icon && <ShieldCheck size={12} weight="fill" className="text-pg-accent" />}
      {children}
    </span>
  );
}

import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium whitespace-nowrap transition-all duration-300 ease-luxe active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pg-accent";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold-grad text-pg-ink shadow-glow hover:shadow-[0_0_0_1px_rgba(184,134,47,0.4),0_14px_60px_-8px_rgba(184,134,47,0.5)]",
  secondary:
    "border border-pg-border-strong bg-pg-card/40 text-pg-text backdrop-blur-sm hover:border-pg-rose hover:bg-pg-card-hover",
  ghost: "text-pg-text-muted hover:text-pg-text",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

function Sheen() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 -translate-x-full bg-gold-sheen opacity-70 transition-transform duration-[800ms] ease-luxe group-hover:translate-x-full motion-reduce:hidden"
    />
  );
}

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | "href"> & {
    href: string;
  };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);
  const inner = (
    <>
      {variant === "primary" && <Sheen />}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  if ("href" in rest && typeof rest.href === "string") {
    const { href, ...anchorRest } = rest;
    return (
      <Link
        href={href}
        className={classes}
        {...(anchorRest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {inner}
    </button>
  );
}

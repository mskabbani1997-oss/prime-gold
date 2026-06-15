import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import { BrandImage } from "./BrandImage";
import { Reveal } from "./Reveal";
import { TreeWatermark } from "@/components/brand/TreeWatermark";

export interface Crumb {
  name: string;
  path: string;
}

export function PageHero({
  image,
  imageLabel,
  title,
  intro,
  crumbs,
  children,
}: {
  image: string;
  imageLabel?: string;
  title: React.ReactNode;
  intro?: string;
  crumbs: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative flex min-h-[56vh] items-end overflow-hidden pt-10 md:-mt-[72px] md:pt-[120px]">
      <BrandImage
        src={image}
        alt=""
        label={imageLabel}
        sizes="100vw"
        priority
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-pg-bg via-pg-bg/75 to-pg-bg/35" />
      <TreeWatermark className="-right-24 top-0 h-[520px] w-[520px]" />
      <div className="pg-container relative pb-14 pt-10">
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-pg-text-faint">
              {crumbs.map((c, i) => {
                const last = i === crumbs.length - 1;
                return (
                  <li key={c.path} className="flex items-center gap-1.5">
                    {last ? (
                      <span className="text-pg-text-muted" aria-current="page">
                        {c.name}
                      </span>
                    ) : (
                      <>
                        <Link href={c.path} className="transition-colors hover:text-pg-text">
                          {c.name}
                        </Link>
                        <CaretRight size={11} />
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
          <h1 className="max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.05] md:text-6xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-5 max-w-prose text-pretty leading-relaxed text-pg-text-muted">
              {intro}
            </p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}

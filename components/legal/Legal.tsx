import { Reveal } from "@/components/ui/Reveal";

export function Legal({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="pg-container pt-28 lg:pt-32">
        <Reveal>
          <h1 className="max-w-2xl text-balance font-display text-4xl font-semibold leading-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-sm text-pg-text-faint">Last updated {updated}</p>
        </Reveal>
      </section>
      <section className="pg-container py-14 lg:py-20">
        <div className="mx-auto max-w-legal space-y-10">{children}</div>
      </section>
    </>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl text-pg-text">{heading}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-pg-text-muted">{children}</div>
    </div>
  );
}

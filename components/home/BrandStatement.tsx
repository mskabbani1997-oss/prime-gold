import { Button } from "@/components/ui/Button";
import { BrandImage } from "@/components/ui/BrandImage";
import { Reveal } from "@/components/ui/Reveal";
import { TreeWatermark } from "@/components/brand/TreeWatermark";

export function BrandStatement() {
  return (
    <section className="relative overflow-hidden">
      <BrandImage
        src="/images/brand-statement.webp"
        alt=""
        label="Gold without compromise"
        sizes="100vw"
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-pg-bg via-pg-bg/85 to-pg-bg/55" />
      <TreeWatermark className="-right-28 top-1/2 h-[720px] w-[720px] -translate-y-1/2" />
      <div className="pg-container relative flex min-h-[70vh] items-center py-24">
        <Reveal className="max-w-2xl">
          <h2 className="text-balance font-display text-4xl font-semibold leading-[1.05] md:text-6xl">
            Gold without <span className="text-gold-gradient italic">compromise</span>
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-pg-text-muted">
            Real metal, certified at the source, priced honestly, and protected at every
            step. The way serious wealth has always been kept.
          </p>
          <div className="mt-9">
            <Button href="/ae/store" size="lg">
              Start your holding
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

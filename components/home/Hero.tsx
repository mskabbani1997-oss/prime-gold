import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { Reveal, ClipReveal } from "@/components/ui/Reveal";
import { TreeWatermark } from "@/components/brand/TreeWatermark";
import { GoldParticles } from "./GoldParticles";
import { PriceTicker } from "./PriceTicker";
import { HeroCarousel, type CarouselItem } from "./HeroCarousel";
import { PRODUCTS } from "@/lib/data/catalog";

// Curated cross-brand mix for the depth carousel.
const CAROUSEL_SLUGS = [
  "valcambi-gold-bar-1oz",
  "sam-gold-bar-1oz",
  "armillary-gold-coin-1oz",
  "sam-silver-bar-1kg",
  "valcambi-gold-bar-1kg",
];

const carouselItems: CarouselItem[] = CAROUSEL_SLUGS.flatMap((slug) => {
  const p = PRODUCTS.find((x) => x.slug === slug);
  return p ? [{ image: p.image, name: p.name, weightLabel: p.weightLabel }] : [];
});

export function Hero() {
  return (
    <section className="relative -mt-[72px] flex min-h-[100dvh] flex-col overflow-hidden pt-[72px]">
      {/* background layers */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-pg-bg" />
        <GoldParticles className="absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_62%_38%,rgba(205,162,74,0.20),transparent_70%)]" />
        <TreeWatermark
          className="-left-40 top-1/2 h-[880px] w-[880px] -translate-y-1/2"
          opacity="opacity-[0.10]"
        />
        {/* ghost display word */}
        <span className="pointer-events-none absolute right-[-3%] top-1/2 -translate-y-1/2 select-none font-display text-[26vw] font-semibold leading-none text-pg-text opacity-[0.04]">
          999.9
        </span>
        {/* film grain */}
        <div className="pointer-events-none absolute inset-0 pg-grain opacity-[0.05] mix-blend-overlay" />
        {/* base gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-pg-bg/30 via-transparent to-pg-bg" />
      </div>

      <div className="pg-container relative flex flex-1 items-center py-14 lg:py-20">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* copy */}
          <div className="max-w-xl">
            <Reveal>
              <p className="mb-5 text-[11px] uppercase tracking-luxe text-pg-text-faint">
                Gold bullion &middot; UAE &amp; Lebanon
              </p>
            </Reveal>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
              <ClipReveal>Your trusted partner in</ClipReveal>
              <ClipReveal delay={0.08}>
                <span className="text-gold-gradient italic">gold investment</span>
              </ClipReveal>
            </h1>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md text-pretty leading-relaxed text-pg-text-muted">
                Certified Swiss and regional bullion, priced live against the global spot
                market &mdash; insured storage and safe delivery across the UAE and Lebanon.
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Button href="/ae/store" size="lg">
                  Shop gold
                  <ArrowRight size={18} weight="bold" />
                </Button>
                <Button href="/ae/about" variant="secondary" size="lg">
                  How it works
                </Button>
              </div>
            </Reveal>
          </div>

          {/* 3D depth product carousel */}
          <Reveal delay={0.2} className="w-full">
            <HeroCarousel
              items={carouselItems}
              className="mx-auto h-[420px] w-full max-w-[480px] sm:h-[480px]"
            />
          </Reveal>
        </div>
      </div>

      <PriceTicker className="relative" />
    </section>
  );
}

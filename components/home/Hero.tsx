import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { TreeWatermark } from "@/components/brand/TreeWatermark";
import { GoldParticles } from "./GoldParticles";
import { PriceTicker } from "./PriceTicker";
import { HeroCarousel, type CarouselItem } from "./HeroCarousel";
import { PRODUCTS } from "@/lib/data/catalog";

// Curated cross-brand mix for the depth carousel.
// High-res, clean cutouts only (silver omitted — its source is low-res).
const CAROUSEL_SLUGS = [
  "valcambi-gold-bar-1oz",
  "sam-gold-bar-1oz",
  "armillary-gold-coin-1oz",
  "valcambi-gold-bar-100g",
  "valcambi-gold-bar-1kg",
];

const carouselItems: CarouselItem[] = CAROUSEL_SLUGS.flatMap((slug) => {
  const p = PRODUCTS.find((x) => x.slug === slug);
  return p ? [{ image: p.image, name: p.name, weightLabel: p.weightLabel }] : [];
});

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh_-_6.75rem)] flex-col overflow-hidden bg-pg-navy text-pg-navy-text">
      {/* background layers */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-pg-navy" />
        <GoldParticles className="absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_62%_40%,rgba(184,134,47,0.18),transparent_70%)]" />
        <TreeWatermark
          className="-left-40 top-1/2 h-[880px] w-[880px] -translate-y-1/2"
          opacity="opacity-[0.08]"
        />
        {/* faint PRIME wordmark watermark, upper area */}
        <span className="pointer-events-none absolute left-1/2 top-[10%] -translate-x-1/2 select-none font-display text-[22vw] font-semibold uppercase leading-none tracking-[0.08em] text-pg-navy-text opacity-[0.05]">
          Prime
        </span>
        {/* faded edge gradient into the next (light) section */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-pg-bg/0" />
        <div className="pointer-events-none absolute inset-0 pg-grain opacity-[0.05] mix-blend-overlay" />
      </div>

      <div className="pg-container relative flex flex-1 items-start py-8 sm:py-10 lg:py-10">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* copy, anchored top-left */}
          <div className="max-w-2xl">
            <Reveal>
              <p className="text-[11px] uppercase tracking-luxe text-pg-navy-muted">
                Gold bullion &middot; UAE &amp; MENA
              </p>
            </Reveal>
            {/* Plain, always-visible headline. A scroll-reveal (ClipReveal /
                whileInView) is the wrong tool for the above-the-fold hero H1:
                its translateY(115%) initial state stayed stuck (the reveal never
                fired for the tall headline), leaving the text clipped/invisible. */}
            <h1 className="mt-4 font-display text-[3.25rem] font-bold leading-[1.0] sm:text-7xl lg:text-[6.5rem] xl:text-[7.25rem]">
              Your trusted partner in{" "}
              <span className="italic font-semibold text-pg-rose">gold investment</span>
            </h1>
            <Reveal delay={0.14}>
              <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-pg-navy-muted">
                At Prime Gold, we make gold investment simple and accessible. With a
                curated selection of minted gold bars from renowned brands like Valcambi,
                our platform lets you buy gold seamlessly.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-7 flex flex-wrap items-center gap-4 sm:mt-9">
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
              className="mx-auto h-[340px] w-full max-w-[480px] sm:h-[480px]"
            />
          </Reveal>
        </div>
      </div>

      <PriceTicker className="relative" />
    </section>
  );
}

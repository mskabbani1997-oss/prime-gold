import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { BrandImage } from "@/components/ui/BrandImage";
import { Reveal } from "@/components/ui/Reveal";
import { TreeWatermark } from "@/components/brand/TreeWatermark";
import { GoldParticles } from "./GoldParticles";
import { PriceTicker } from "./PriceTicker";
import { HeroGoldBar } from "./HeroGoldBar";

export function Hero() {
  return (
    <section className="relative -mt-[72px] flex min-h-[100dvh] flex-col overflow-hidden pt-[72px]">
      {/* background layers */}
      <div aria-hidden className="absolute inset-0">
        <BrandImage
          src="/images/hero-bg.webp"
          alt=""
          label="Vault atmosphere"
          sizes="100vw"
          priority
          className="absolute inset-0 opacity-[0.14]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pg-bg/60 via-pg-bg/35 to-pg-bg" />
        <GoldParticles className="absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_60%_35%,rgba(212,169,75,0.22),transparent_70%)]" />
        <TreeWatermark
          className="-left-32 top-1/2 h-[820px] w-[820px] -translate-y-1/2"
          opacity="opacity-[0.11]"
        />
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
            <Reveal delay={0.08}>
              <h1 className="text-balance font-display text-5xl font-semibold leading-[1.04] md:text-6xl lg:text-7xl">
                Your trusted partner in{" "}
                <span className="text-gold-gradient italic">gold investment</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-md text-pretty leading-relaxed text-pg-text-muted">
                Certified Swiss and regional bullion with transparent pricing, insured
                storage, and safe delivery across the UAE and Lebanon.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
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

          {/* Gold bar visual — lifts and rotates to reveal the assay certificate. */}
          <Reveal delay={0.2} className="justify-self-center lg:justify-self-end">
            <HeroGoldBar
              className="aspect-[4/5] w-[280px] sm:w-[340px] lg:w-[400px]"
              front={
                <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-pg-border-strong shadow-glow">
                  <BrandImage
                    src="/images/hero-gold-bar.webp"
                    alt="Certified gold bullion bar with engraved serial number"
                    label="Hero gold bar"
                    sizes="(max-width: 1024px) 340px, 400px"
                    priority
                    className="absolute inset-0"
                  />
                </div>
              }
            />
          </Reveal>
        </div>
      </div>

      <PriceTicker className="relative" />
    </section>
  );
}

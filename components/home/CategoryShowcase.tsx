import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { BrandImage } from "@/components/ui/BrandImage";
import { Reveal } from "@/components/ui/Reveal";

const CARDS = [
  {
    href: "/ae/categories/gold-bars",
    title: "Gold bullion bars",
    body: "From 1 gram to 1 kilogram, serial numbered and assay sealed.",
    image: "/images/category-gold-bars.webp",
    label: "Gold bars",
    span: "lg:col-span-7",
  },
  {
    href: "/ae/categories/gold-coins",
    title: "Gold bullion coins",
    body: "Recognised, liquid, and traded worldwide.",
    image: "/images/category-gold-coins.webp",
    label: "Gold coins",
    span: "lg:col-span-5",
  },
];

export function CategoryShowcase() {
  return (
    <section className="bg-pg-surface py-20 lg:py-28">
      <div className="pg-container">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-md text-balance font-display text-3xl font-semibold leading-tight md:text-5xl">
            Choose how you hold your wealth
          </h2>
          <Link
            href="/ae/store"
            className="group inline-flex items-center gap-2 text-sm text-pg-text-muted transition-colors hover:text-pg-text"
          >
            View the full store
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-12">
          {CARDS.map((card) => (
            <Reveal key={card.href} className={card.span}>
              <Link
                href={card.href}
                className="group relative block aspect-[16/11] overflow-hidden rounded-2xl border border-pg-border"
              >
                <BrandImage
                  src={card.image}
                  alt={card.title}
                  label={card.label}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="absolute inset-0 transition-transform duration-700 ease-luxe group-hover:scale-105"
                  imgClassName="transition-transform duration-700 ease-luxe group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pg-bg via-pg-bg/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7">
                  <div>
                    <h3 className="font-display text-2xl text-pg-text md:text-3xl">
                      {card.title}
                    </h3>
                    <p className="mt-2 max-w-xs text-sm text-pg-text-muted">{card.body}</p>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-pg-border-strong bg-pg-card/70 text-pg-text backdrop-blur-sm transition-all duration-300 group-hover:border-pg-rose group-hover:bg-gold-grad group-hover:text-pg-ink">
                    <ArrowUpRight size={18} weight="bold" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

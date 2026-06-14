import { ShieldCheck, ChartLineUp, Package } from "@phosphor-icons/react/dist/ssr";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TreeWatermark } from "@/components/brand/TreeWatermark";
import { GoldParticles } from "./GoldParticles";

const PILLARS = [
  {
    Icon: ShieldCheck,
    title: "Secure and insured",
    body: "Every holding is fully insured and held to vault-grade standards, from purchase through storage and delivery.",
  },
  {
    Icon: ChartLineUp,
    title: "Transparent pricing",
    body: "Live pricing tied to the global spot market. You see exactly what you pay, with no hidden premiums.",
  },
  {
    Icon: Package,
    title: "Buy, store, or deliver",
    body: "Keep your gold in insured storage or take physical delivery to your door. The choice stays yours.",
  },
];

export function TrustPillars() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* empty-margin brand texture (desktop-only dust for performance) */}
      <TreeWatermark
        className="-right-40 top-4 h-[560px] w-[560px]"
        opacity="opacity-[0.05]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
        <GoldParticles count={16} className="opacity-70" />
      </div>
      <div className="pg-container relative">
        <Reveal className="mb-12 max-w-xl">
          <h2 className="text-balance font-display text-3xl font-semibold leading-tight md:text-4xl">
            Built for investors who expect proof, not promises
          </h2>
        </Reveal>
        <RevealGroup className="grid gap-5 md:grid-cols-3">
        {PILLARS.map(({ Icon, title, body }) => (
          <RevealItem key={title}>
            <div className="group h-full rounded-2xl border border-pg-border bg-pg-card p-8 transition-colors duration-500 hover:border-pg-border-strong">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-pg-border-strong bg-pg-bg/50 text-pg-accent transition-colors duration-500 group-hover:border-pg-rose">
                <Icon size={22} weight="light" />
              </span>
              <h3 className="mt-6 font-display text-2xl text-pg-text">{title}</h3>
              <p className="mt-3 leading-relaxed text-pg-text-muted">{body}</p>
            </div>
          </RevealItem>
        ))}
        </RevealGroup>
      </div>
    </section>
  );
}

import { ShieldCheck, ChartLineUp, Package } from "@phosphor-icons/react/dist/ssr";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const PILLARS = [
  {
    Icon: ShieldCheck,
    title: "Secure and insured",
    body: "Every holding is fully insured and held to vault-grade standards, from purchase through storage and delivery.",
  },
  {
    Icon: ChartLineUp,
    title: "No hidden fees",
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
    <section className="pg-container py-24 lg:py-36">
      <Reveal className="mb-14 max-w-xl">
        <h2 className="text-balance font-display text-3xl font-semibold leading-tight md:text-4xl">
          Built for investors who expect proof, not promises
        </h2>
      </Reveal>
      <RevealGroup className="grid gap-6 md:grid-cols-3">
        {PILLARS.map(({ Icon, title, body }) => (
          <RevealItem key={title}>
            <div className="group h-full rounded-2xl border border-pg-border bg-pg-card p-8 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-pg-border-strong bg-pg-surface text-pg-accent transition-colors duration-500 group-hover:border-pg-rose">
                <Icon size={22} weight="light" />
              </span>
              <h3 className="mt-6 font-display text-2xl text-pg-text">{title}</h3>
              <p className="mt-3 leading-relaxed text-pg-text-muted">{body}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

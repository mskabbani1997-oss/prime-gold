import type { Metadata } from "next";
import { ShoppingBag } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Cart",
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <section className="pg-container flex min-h-[70vh] flex-col items-center justify-center py-28 text-center">
      <Reveal>
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-pg-border-strong text-pg-accent">
          <ShoppingBag size={26} weight="light" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-semibold md:text-4xl">Your cart</h1>
        <p className="mx-auto mt-4 max-w-md text-pretty text-pg-text-muted">
          Checkout connects to the platform backend. Keep browsing and add the bars and
          coins you want, or reach out and we will help you complete your order.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/ae/store" size="md">
            Continue shopping
          </Button>
          <Button href="/ae/contact" variant="secondary" size="md">
            Get help
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

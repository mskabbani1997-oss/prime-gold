import type { Metadata } from "next";
import { UserCircle } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false, follow: true },
};

export default function AccountPage() {
  return (
    <section className="pg-container flex min-h-[70vh] flex-col items-center justify-center py-28 text-center">
      <Reveal>
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-pg-border-strong text-pg-accent">
          <UserCircle size={26} weight="light" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-semibold md:text-4xl">Your account</h1>
        <p className="mx-auto mt-4 max-w-md text-pretty text-pg-text-muted">
          Accounts and order history connect to the platform backend. In the meantime, our
          team can help with any order directly.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/ae/store" size="md">
            Browse the store
          </Button>
          <Button href="/ae/contact" variant="secondary" size="md">
            Contact us
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  List,
  X,
  MagnifyingGlass,
  ShoppingBag,
  UserCircle,
} from "@phosphor-icons/react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-500 ease-luxe",
        scrolled
          ? "border-b border-pg-border bg-pg-surface/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="pg-container flex h-[72px] items-center justify-between">
        <Logo />

        <ul className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "group relative text-sm transition-colors duration-300",
                    active ? "text-pg-text" : "text-pg-text-muted hover:text-pg-text"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-px bg-gold-grad transition-all duration-300 ease-luxe",
                      active ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1.5">
          <button
            aria-label="Search"
            className="hidden h-10 w-10 place-items-center rounded-full text-pg-text-muted transition-colors hover:bg-pg-card hover:text-pg-text sm:grid"
          >
            <MagnifyingGlass size={19} />
          </button>
          <Link
            href="/ae/account"
            aria-label="Account"
            className="hidden h-10 w-10 place-items-center rounded-full text-pg-text-muted transition-colors hover:bg-pg-card hover:text-pg-text sm:grid"
          >
            <UserCircle size={20} />
          </Link>
          <Link
            href="/ae/cart"
            aria-label="Cart"
            className="relative grid h-10 w-10 place-items-center rounded-full text-pg-text-muted transition-colors hover:bg-pg-card hover:text-pg-text"
          >
            <ShoppingBag size={20} />
          </Link>

          <Button href="/ae/store" size="md" className="ml-1 hidden lg:inline-flex">
            Shop gold
          </Button>

          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full text-pg-text transition-colors hover:bg-pg-card lg:hidden"
          >
            {menuOpen ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-pg-border bg-pg-surface/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="pg-container flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-xl px-4 py-3 text-base text-pg-text-muted transition-colors hover:bg-pg-card hover:text-pg-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="px-4 pt-3">
                <Button href="/ae/store" size="lg" className="w-full">
                  Shop gold
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

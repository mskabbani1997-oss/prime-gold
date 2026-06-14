"use client";

import { useMemo, useState } from "react";
import { FunnelSimple, X } from "@phosphor-icons/react";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/Button";
import { formatAED, type Product } from "@/lib/data";

const CATEGORY_LABELS: Record<string, string> = {
  "gold-bars": "Gold bars",
  "gold-coins": "Gold coins",
  "silver-bars": "Silver bars",
};
const COLLECTION_LABELS: Record<string, string> = {
  valcambi: "Valcambi",
  "sam-precious-metals": "SAM Precious Metals",
};
const METAL_LABELS: Record<string, string> = { gold: "Gold", silver: "Silver" };

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "weight-asc", label: "Weight: low to high" },
  { id: "weight-desc", label: "Weight: high to low" },
] as const;

type SortId = (typeof SORTS)[number]["id"];

const PAGE = 8;

function toggle<T>(set: T[], value: T): T[] {
  return set.includes(value) ? set.filter((v) => v !== value) : [...set, value];
}

export function StoreView({ products }: { products: Product[] }) {
  const maxPrice = useMemo(
    () => Math.ceil(Math.max(...products.map((p) => p.priceAED)) / 100) * 100,
    [products]
  );

  const [categories, setCategories] = useState<string[]>([]);
  const [collections, setCollections] = useState<string[]>([]);
  const [metals, setMetals] = useState<string[]>([]);
  const [priceCap, setPriceCap] = useState(maxPrice);
  const [sort, setSort] = useState<SortId>("featured");
  const [visible, setVisible] = useState(PAGE);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = useMemo(() => {
    const result = products.filter(
      (p) =>
        (categories.length === 0 || categories.includes(p.category)) &&
        (collections.length === 0 || collections.includes(p.collection)) &&
        (metals.length === 0 || metals.includes(p.metal)) &&
        p.priceAED <= priceCap
    );
    const sorted = [...result];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.priceAED - b.priceAED);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.priceAED - a.priceAED);
        break;
      case "weight-asc":
        sorted.sort((a, b) => a.weightG - b.weightG);
        break;
      case "weight-desc":
        sorted.sort((a, b) => b.weightG - a.weightG);
        break;
    }
    return sorted;
  }, [products, categories, collections, metals, priceCap, sort]);

  const shown = filtered.slice(0, visible);
  const activeCount = categories.length + collections.length + metals.length + (priceCap < maxPrice ? 1 : 0);

  const clearAll = () => {
    setCategories([]);
    setCollections([]);
    setMetals([]);
    setPriceCap(maxPrice);
  };

  const FilterGroup = ({
    title,
    options,
    selected,
    onToggle,
  }: {
    title: string;
    options: { value: string; label: string }[];
    selected: string[];
    onToggle: (v: string) => void;
  }) => (
    <fieldset className="border-t border-pg-border py-5">
      <legend className="mb-3 text-[11px] uppercase tracking-luxe text-pg-text-faint">
        {title}
      </legend>
      <div className="flex flex-col gap-2.5">
        {options.map((o) => (
          <label
            key={o.value}
            className="flex cursor-pointer items-center gap-2.5 text-sm text-pg-text-muted transition-colors hover:text-pg-text"
          >
            <input
              type="checkbox"
              checked={selected.includes(o.value)}
              onChange={() => onToggle(o.value)}
              className="h-4 w-4 cursor-pointer accent-pg-rose"
            />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );

  const filterPanel = (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl text-pg-text">Filters</h2>
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-pg-accent transition-colors hover:text-pg-champagne"
          >
            Clear all
          </button>
        )}
      </div>

      <FilterGroup
        title="Category"
        options={Object.entries(CATEGORY_LABELS).map(([value, label]) => ({ value, label }))}
        selected={categories}
        onToggle={(v) => {
          setCategories((s) => toggle(s, v));
          setVisible(PAGE);
        }}
      />
      <FilterGroup
        title="Collection"
        options={Object.entries(COLLECTION_LABELS).map(([value, label]) => ({ value, label }))}
        selected={collections}
        onToggle={(v) => {
          setCollections((s) => toggle(s, v));
          setVisible(PAGE);
        }}
      />
      <FilterGroup
        title="Metal"
        options={Object.entries(METAL_LABELS).map(([value, label]) => ({ value, label }))}
        selected={metals}
        onToggle={(v) => {
          setMetals((s) => toggle(s, v));
          setVisible(PAGE);
        }}
      />

      <fieldset className="border-t border-pg-border py-5">
        <legend className="mb-3 text-[11px] uppercase tracking-luxe text-pg-text-faint">
          Max price
        </legend>
        <input
          type="range"
          min={500}
          max={maxPrice}
          step={100}
          value={priceCap}
          onChange={(e) => {
            setPriceCap(Number(e.target.value));
            setVisible(PAGE);
          }}
          className="w-full cursor-pointer accent-pg-rose"
          aria-label="Maximum price"
        />
        <p className="tabular mt-2 text-sm text-pg-text-muted">Up to {formatAED(priceCap)}</p>
      </fieldset>
    </div>
  );

  return (
    <div className="pg-container py-12 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        {/* desktop filters */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-pg-border bg-pg-card p-6">
            {filterPanel}
          </div>
        </aside>

        <div>
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="tabular text-sm text-pg-text-muted">
              {filtered.length} {filtered.length === 1 ? "product" : "products"}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDrawerOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-pg-border-strong px-4 py-2 text-sm text-pg-text lg:hidden"
              >
                <FunnelSimple size={16} />
                Filters{activeCount > 0 ? ` (${activeCount})` : ""}
              </button>
              <label className="flex items-center gap-2 text-sm">
                <span className="sr-only">Sort by</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortId)}
                  className="cursor-pointer rounded-full border border-pg-border-strong bg-pg-card px-4 py-2 text-sm text-pg-text focus:border-pg-rose focus:outline-none"
                >
                  {SORTS.map((s) => (
                    <option key={s.id} value={s.id} className="bg-pg-card">
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {shown.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
              {shown.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-pg-border bg-pg-card/50 p-12 text-center">
              <p className="text-pg-text-muted">No products match these filters.</p>
              <button
                onClick={clearAll}
                className="mt-3 text-sm text-pg-accent hover:text-pg-champagne"
              >
                Clear filters
              </button>
            </div>
          )}

          {visible < filtered.length && (
            <div className="mt-10 flex justify-center">
              <Button variant="secondary" size="md" onClick={() => setVisible((v) => v + PAGE)}>
                Load more
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-pg-bg/70 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm overflow-y-auto border-r border-pg-border bg-pg-surface p-6">
            <div className="mb-2 flex justify-end">
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Close filters"
                className="grid h-9 w-9 place-items-center rounded-full text-pg-text-muted hover:bg-pg-card"
              >
                <X size={20} />
              </button>
            </div>
            {filterPanel}
            <Button
              size="md"
              className="mt-6 w-full"
              onClick={() => setDrawerOpen(false)}
            >
              Show {filtered.length} results
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { categories, discount, products, type Category, type Gender } from "@/lib/products";

type Search = {
  category?: Category;
  gender?: Gender;
  sort?: "recommended" | "newest" | "price-asc" | "price-desc" | "rating" | "discount";
  q?: string;
};

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    category: search["category"] as Category | undefined,
    gender: search["gender"] as Gender | undefined,
    sort: search["sort"] as Search["sort"],
    q: typeof search["q"] === "string" ? search["q"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop Woollen Wear — Shawls, Sweaters & More | YOUR BRAND" },
      {
        name: "description",
        content:
          "Browse hand-loomed shawls, wool sweaters, caps, scarves, gloves and socks. Filter by size, colour, material and price. Free shipping above ₹999.",
      },
      { property: "og:title", content: "Shop Woollen Wear | YOUR BRAND" },
      {
        property: "og:description",
        content: "Hand-loomed shawls, sweaters and winter accessories made in our own unit.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

const sortOptions: { value: NonNullable<Search["sort"]>; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Customer Rating" },
  { value: "discount", label: "Discount" },
];

const priceBands = [
  { label: "Under ₹1,000", min: 0, max: 999 },
  { label: "₹1,000 – ₹2,500", min: 1000, max: 2500 },
  { label: "₹2,500 – ₹4,000", min: 2500, max: 4000 },
  { label: "Above ₹4,000", min: 4000, max: Infinity },
];

function Shop() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const [band, setBand] = useState<number | null>(null);
  const [material, setMaterial] = useState<string | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const materials = useMemo(() => [...new Set(products.map((p) => p.material))], []);

  const list = useMemo(() => {
    let out = products.filter((p) => {
      if (search.category && p.category !== search.category) return false;
      if (search.gender && p.gender !== search.gender && p.gender !== "unisex") return false;
      if (material && p.material !== material) return false;
      if (inStockOnly && p.stock === 0) return false;
      if (band !== null) {
        const b = priceBands[band]!;
        if (p.price < b.min || p.price > b.max) return false;
      }
      if (search.q) {
        const q = search.q.toLowerCase();
        const hay = `${p.name} ${p.category} ${p.material} ${p.colors.join(" ")} ${p.sku}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    out = [...out];
    switch (search.sort) {
      case "price-asc":
        out.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        out.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        out.sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        out.sort((a, b) => discount(b) - discount(a));
        break;
      default:
        break;
    }
    return out;
  }, [search, band, material, inStockOnly]);

  const setSearch = (next: Partial<Search>) =>
    navigate({ search: (prev) => ({ ...prev, ...next }) });

  const filters = (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Category</p>
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <button
              type="button"
              onClick={() => setSearch({ category: undefined })}
              className={!search.category ? "text-accent" : "text-muted-foreground hover:text-foreground"}
            >
              All products
            </button>
          </li>
          {categories.map((c) => (
            <li key={c.slug}>
              <button
                type="button"
                onClick={() => setSearch({ category: c.slug })}
                className={
                  search.category === c.slug ? "text-accent" : "text-muted-foreground hover:text-foreground"
                }
              >
                {c.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Gender</p>
        <ul className="mt-3 space-y-2 text-sm">
          {(["men", "women", "kids"] as Gender[]).map((g) => (
            <li key={g}>
              <button
                type="button"
                onClick={() => setSearch({ gender: search.gender === g ? undefined : g })}
                className={
                  search.gender === g ? "text-accent capitalize" : "capitalize text-muted-foreground hover:text-foreground"
                }
              >
                {g}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Price</p>
        <ul className="mt-3 space-y-2 text-sm">
          {priceBands.map((b, i) => (
            <li key={b.label}>
              <button
                type="button"
                onClick={() => setBand(band === i ? null : i)}
                className={band === i ? "text-accent" : "text-muted-foreground hover:text-foreground"}
              >
                {b.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Material</p>
        <ul className="mt-3 space-y-2 text-sm">
          {materials.map((m) => (
            <li key={m}>
              <button
                type="button"
                onClick={() => setMaterial(material === m ? null : m)}
                className={material === m ? "text-accent" : "text-muted-foreground hover:text-foreground"}
              >
                {m}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <label className="flex items-center gap-2 text-sm text-muted-foreground">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => setInStockOnly(e.target.checked)}
          className="size-4 accent-[oklch(0.545_0.142_35)]"
        />
        In stock only
      </label>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <h1 className="text-3xl sm:text-4xl">
        {search.category ? categories.find((c) => c.slug === search.category)?.name : "All Winter Wear"}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">{list.length} products</p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          defaultValue={search.q ?? ""}
          placeholder="Search by name, material, colour or SKU"
          onChange={(e) => setSearch({ q: e.target.value || undefined })}
          className="w-full rounded-full border border-border bg-card px-5 py-3 text-sm outline-none focus:border-accent sm:max-w-sm"
        />
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm lg:hidden"
          >
            <SlidersHorizontal className="size-4" /> Filters
          </button>
          <select
            value={search.sort ?? "recommended"}
            onChange={(e) => setSearch({ sort: e.target.value as Search["sort"] })}
            className="rounded-full border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-accent"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-10 flex gap-10">
        <aside className="hidden w-56 shrink-0 lg:block">{filters}</aside>

        <div className="flex-1">
          {list.length === 0 ? (
            <div className="rounded-lg border border-border bg-card py-24 text-center">
              <p className="font-display text-xl">Nothing matches those filters</p>
              <p className="mt-2 text-sm text-muted-foreground">Try clearing a filter or searching again.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
              {list.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-80 overflow-y-auto bg-background p-6">
            <div className="mb-6 flex items-center justify-between">
              <p className="font-display text-lg">Filters</p>
              <button type="button" aria-label="Close" onClick={() => setFiltersOpen(false)}>
                <X className="size-5" />
              </button>
            </div>
            {filters}
          </div>
        </div>
      )}
    </div>
  );
}

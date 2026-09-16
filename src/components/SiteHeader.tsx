import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { categories } from "@/lib/products";

const nav = [
  { label: "Men", search: { gender: "men" } },
  { label: "Women", search: { gender: "women" } },
  { label: "Kids", search: { gender: "kids" } },
  { label: "Shawls", search: { category: "shawls" } },
  { label: "Sweaters", search: { category: "sweaters" } },
  { label: "Accessories", search: { category: "caps" } },
  { label: "New Arrivals", search: { sort: "newest" } },
] as const;

export function SiteHeader() {
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);
  const [mega, setMega] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-primary py-2 text-center text-[11px] uppercase tracking-[0.22em] text-primary-foreground">
        Free Shipping on Orders Above ₹999
      </div>

      <div className="border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5">
          <div className="flex items-center gap-8">
            <button
              type="button"
              aria-label="Open menu"
              className="lg:hidden"
              onClick={() => setMenu(true)}
            >
              <Menu className="size-5" />
            </button>
            <Link to="/" className="font-display text-xl tracking-tight">
              YOUR BRAND
            </Link>
            <nav className="hidden items-center gap-6 text-[13px] text-muted-foreground lg:flex">
              {nav.map((item) => (
                <Link
                  key={item.label}
                  to="/shop"
                  search={item.search}
                  className="transition-colors hover:text-foreground"
                  onMouseEnter={() => setMega(item.label === "Shawls" || item.label === "Sweaters")}
                  onMouseLeave={() => setMega(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/shop"
                search={{ sort: "discount" }}
                className="font-semibold text-accent transition-colors hover:text-foreground"
              >
                Sale
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4 text-foreground">
            <Link to="/shop" aria-label="Search" className="hover:text-accent">
              <Search className="size-[18px]" />
            </Link>
            <Link to="/account" aria-label="Account" className="hidden hover:text-accent sm:block">
              <User className="size-[18px]" />
            </Link>
            <Link to="/account" aria-label="Wishlist" className="hidden hover:text-accent sm:block">
              <Heart className="size-[18px]" />
            </Link>
            <button
              type="button"
              aria-label="Open cart"
              onClick={() => setOpen(true)}
              className="relative hover:text-accent"
            >
              <ShoppingBag className="size-[18px]" />
              {count > 0 && (
                <span className="absolute -right-2 -top-1.5 grid size-4 place-items-center rounded-full bg-accent text-[9px] font-semibold text-accent-foreground">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {mega && (
          <div
            className="hidden border-t border-border bg-background lg:block"
            onMouseEnter={() => setMega(true)}
            onMouseLeave={() => setMega(false)}
          >
            <div className="mx-auto grid max-w-7xl grid-cols-6 gap-6 px-5 py-8">
              {categories.map((c) => (
                <Link key={c.slug} to="/shop" search={{ category: c.slug }} className="group">
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    width={800}
                    height={1008}
                    className="aspect-square w-full rounded-md object-cover"
                  />
                  <p className="mt-2 text-sm">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.blurb}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {menu && (
        <div className="fixed inset-0 z-50 bg-background lg:hidden">
          <div className="flex h-16 items-center justify-between border-b border-border px-5">
            <span className="font-display text-xl">YOUR BRAND</span>
            <button type="button" aria-label="Close menu" onClick={() => setMenu(false)}>
              <X className="size-5" />
            </button>
          </div>
          <nav className="flex flex-col px-5 py-4">
            {nav.map((item) => (
              <Link
                key={item.label}
                to="/shop"
                search={item.search}
                onClick={() => setMenu(false)}
                className="border-b border-border py-4 text-base"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/shop"
              search={{ sort: "discount" }}
              onClick={() => setMenu(false)}
              className="py-4 text-base font-semibold text-accent"
            >
              Sale
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { findProduct, type Product } from "./products";

export type CartLine = {
  slug: string;
  size: string;
  color: string;
  qty: number;
};

type CartState = {
  lines: CartLine[];
  wishlist: string[];
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (line: CartLine) => void;
  remove: (index: number) => void;
  setQty: (index: number, qty: number) => void;
  toggleWishlist: (slug: string) => void;
  count: number;
  subtotal: number;
  mrpTotal: number;
  shipping: number;
  total: number;
  product: (slug: string) => Product | undefined;
};

const FREE_SHIPPING_THRESHOLD = 999;
const SHIPPING_FEE = 79;

const CartContext = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("yb-cart");
      if (raw) setLines(JSON.parse(raw));
      const wl = localStorage.getItem("yb-wishlist");
      if (wl) setWishlist(JSON.parse(wl));
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("yb-cart", JSON.stringify(lines));
  }, [lines]);

  useEffect(() => {
    localStorage.setItem("yb-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const value = useMemo<CartState>(() => {
    const subtotal = lines.reduce((sum, l) => sum + (findProduct(l.slug)?.price ?? 0) * l.qty, 0);
    const mrpTotal = lines.reduce((sum, l) => sum + (findProduct(l.slug)?.mrp ?? 0) * l.qty, 0);
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

    return {
      lines,
      wishlist,
      open,
      setOpen,
      add: (line) =>
        setLines((prev) => {
          const i = prev.findIndex(
            (l) => l.slug === line.slug && l.size === line.size && l.color === line.color,
          );
          if (i === -1) return [...prev, line];
          const next = [...prev];
          next[i] = { ...next[i], qty: next[i].qty + line.qty };
          return next;
        }),
      remove: (index) => setLines((prev) => prev.filter((_, i) => i !== index)),
      setQty: (index, qty) =>
        setLines((prev) =>
          prev.map((l, i) => (i === index ? { ...l, qty: Math.max(1, Math.min(10, qty)) } : l)),
        ),
      toggleWishlist: (slug) =>
        setWishlist((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug])),
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal,
      mrpTotal,
      shipping,
      total: subtotal + shipping,
      product: findProduct,
    };
  }, [lines, wishlist, open]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export { FREE_SHIPPING_THRESHOLD };

import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { FREE_SHIPPING_THRESHOLD, useCart } from "@/lib/cart";
import { formatINR } from "@/lib/products";

export function CartDrawer() {
  const { open, setOpen, lines, product, setQty, remove, subtotal, shipping, total } = useCart();
  if (!open) return null;

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="Close cart"
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-lg">Your Bag</h2>
          <button type="button" aria-label="Close" onClick={() => setOpen(false)}>
            <X className="size-5" />
          </button>
        </div>

        <div className="border-b border-border px-5 py-4">
          <p className="text-xs text-muted-foreground">
            {remaining > 0
              ? `Add ${formatINR(remaining)} more for free shipping`
              : "You have free shipping"}
          </p>
          <div className="mt-2 h-1 rounded-full bg-muted">
            <div className="h-1 rounded-full bg-accent transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5">
          {lines.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-sm text-muted-foreground">Your bag is empty.</p>
              <Link
                to="/shop"
                onClick={() => setOpen(false)}
                className="mt-4 inline-block rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground"
              >
                Start shopping
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {lines.map((line, i) => {
                const p = product(line.slug);
                if (!p) return null;
                return (
                  <li key={`${line.slug}-${line.size}-${line.color}`} className="flex gap-4 py-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      width={800}
                      height={1008}
                      className="size-24 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {line.size} · {line.color}
                      </p>
                      <p className="mt-1 text-sm font-semibold">{formatINR(p.price * line.qty)}</p>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="flex items-center rounded-full border border-border">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            className="px-2 py-1"
                            onClick={() => setQty(i, line.qty - 1)}
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="min-w-6 text-center text-xs">{line.qty}</span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            className="px-2 py-1"
                            onClick={() => setQty(i, line.qty + 1)}
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <button
                          type="button"
                          className="text-xs text-muted-foreground underline underline-offset-4"
                          onClick={() => remove(i)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-border px-5 py-5">
            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>{formatINR(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd>{shipping === 0 ? "Free" : formatINR(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-2 font-semibold">
                <dt>Total</dt>
                <dd>{formatINR(total)}</dd>
              </div>
            </dl>
            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              className="mt-4 block rounded-full bg-accent py-3.5 text-center text-sm font-medium text-accent-foreground"
            >
              View Bag & Checkout
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}

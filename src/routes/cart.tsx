import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { FREE_SHIPPING_THRESHOLD, useCart } from "@/lib/cart";
import { formatINR } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag | YOUR BRAND" },
      {
        name: "description",
        content: "Review your woollen wear selection, apply a coupon and proceed to checkout.",
      },
      { property: "og:title", content: "Your Bag | YOUR BRAND" },
      { property: "og:description", content: "Review your selection and checkout securely." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, product, setQty, remove, subtotal, mrpTotal, shipping, total } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponMsg, setCouponMsg] = useState<string | null>(null);

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-28 text-center">
        <h1 className="text-3xl">Your bag is empty</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Nothing here yet. Browse the winter collection and add something warm.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-block rounded-full bg-primary px-7 py-3.5 text-sm text-primary-foreground"
        >
          Shop winter wear
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <h1 className="text-3xl sm:text-4xl">Your Bag</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {subtotal >= FREE_SHIPPING_THRESHOLD
          ? "Free shipping applied."
          : `Add ${formatINR(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping.`}
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <ul className="divide-y divide-border border-y border-border">
          {lines.map((line, i) => {
            const p = product(line.slug);
            if (!p) return null;
            return (
              <li key={`${line.slug}-${line.size}-${line.color}`} className="flex gap-5 py-6">
                <Link to="/product/$slug" params={{ slug: p.slug }}>
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={800}
                    height={1008}
                    className="size-32 rounded-md object-cover"
                  />
                </Link>
                <div className="flex-1">
                  <p className="font-medium">{p.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Size {line.size} · {line.color}
                  </p>
                  <p className="mt-2 font-semibold">{formatINR(p.price * line.qty)}</p>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex items-center rounded-full border border-border">
                      <button type="button" aria-label="Decrease" className="px-3 py-1.5" onClick={() => setQty(i, line.qty - 1)}>
                        <Minus className="size-3" />
                      </button>
                      <span className="min-w-7 text-center text-xs">{line.qty}</span>
                      <button type="button" aria-label="Increase" className="px-3 py-1.5" onClick={() => setQty(i, line.qty + 1)}>
                        <Plus className="size-3" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(i)}
                      className="text-xs text-muted-foreground underline underline-offset-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="h-fit rounded-lg border border-border bg-card p-6">
          <h2 className="font-display text-xl">Order Summary</h2>
          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal (MRP)</dt>
              <dd>{formatINR(mrpTotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Discount</dt>
              <dd className="text-accent">− {formatINR(mrpTotal - subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd>{shipping === 0 ? "Free" : formatINR(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
              <dt>Total</dt>
              <dd>{formatINR(total)}</dd>
            </div>
          </dl>

          <div className="mt-6">
            <div className="flex gap-2">
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                placeholder="Coupon code"
                className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
              />
              <button
                type="button"
                onClick={() =>
                  setCouponMsg(
                    coupon
                      ? "Coupons activate once your store backend is connected."
                      : "Enter a coupon code first.",
                  )
                }
                className="rounded-full border border-border px-5 py-2.5 text-sm"
              >
                Apply
              </button>
            </div>
            {couponMsg && <p className="mt-2 text-xs text-muted-foreground">{couponMsg}</p>}
          </div>

          <Link
            to="/checkout"
            className="mt-6 block rounded-full bg-accent py-3.5 text-center text-sm font-medium text-accent-foreground"
          >
            Proceed to Checkout
          </Link>
          <p className="mt-3 text-center text-xs text-muted-foreground">Free shipping above ₹999</p>
        </aside>
      </div>
    </div>
  );
}

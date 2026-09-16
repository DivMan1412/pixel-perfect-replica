import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | YOUR BRAND" },
      {
        name: "description",
        content: "Enter your delivery details and choose a payment method to complete your order.",
      },
      { property: "og:title", content: "Checkout | YOUR BRAND" },
      { property: "og:description", content: "Secure checkout for your winter wear order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});

const steps = ["Contact", "Address", "Shipping", "Payment"];

function CheckoutPage() {
  const { lines, product, subtotal, shipping, total } = useCart();
  const [step, setStep] = useState(0);

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-28 text-center">
        <h1 className="text-3xl">Nothing to check out</h1>
        <Link
          to="/shop"
          className="mt-8 inline-block rounded-full bg-primary px-7 py-3.5 text-sm text-primary-foreground"
        >
          Shop winter wear
        </Link>
      </div>
    );
  }

  const field =
    "w-full rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none focus:border-accent";

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-3xl sm:text-4xl">Checkout</h1>

      <ol className="mt-8 flex flex-wrap gap-4 text-xs uppercase tracking-[0.18em]">
        {steps.map((s, i) => (
          <li key={s} className={i === step ? "text-accent" : "text-muted-foreground"}>
            {i + 1}. {s}
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {step === 0 && (
            <>
              <input className={field} placeholder="Full name" autoComplete="name" />
              <input className={field} placeholder="Mobile number" inputMode="tel" autoComplete="tel" />
              <input className={field} placeholder="Email address" type="email" autoComplete="email" />
            </>
          )}
          {step === 1 && (
            <>
              <input className={field} placeholder="Flat / House no., Building" />
              <input className={field} placeholder="Area, Street, Locality" />
              <input className={field} placeholder="Landmark (optional)" />
              <div className="grid grid-cols-2 gap-4">
                <input className={field} placeholder="City" />
                <input className={field} placeholder="State" />
              </div>
              <input className={field} placeholder="6-digit PIN code" inputMode="numeric" maxLength={6} />
            </>
          )}
          {step === 2 && (
            <div className="space-y-3">
              {["Standard delivery · 3–6 days", "Express delivery · 1–3 days"].map((s) => (
                <label key={s} className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 text-sm">
                  <input type="radio" name="shipping" className="accent-[oklch(0.545_0.142_35)]" defaultChecked={s.startsWith("Standard")} />
                  {s}
                </label>
              ))}
            </div>
          )}
          {step === 3 && (
            <div className="space-y-3">
              {["UPI", "Credit / Debit Card", "Net Banking", "Cash on Delivery"].map((m) => (
                <label key={m} className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 text-sm">
                  <input type="radio" name="payment" className="accent-[oklch(0.545_0.142_35)]" />
                  {m}
                </label>
              ))}
              <p className="rounded-lg bg-muted p-4 text-xs text-muted-foreground">
                Payments are not live yet. A real payment gateway can be connected to this step, after
                which orders will be confirmed and tracked for real.
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="rounded-full border border-border px-6 py-3 text-sm"
              >
                Back
              </button>
            )}
            <button
              type="button"
              disabled={step === steps.length - 1}
              onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
              className="rounded-full bg-primary px-7 py-3 text-sm text-primary-foreground disabled:opacity-40"
            >
              Continue
            </button>
          </div>
        </form>

        <aside className="h-fit rounded-lg border border-border bg-card p-6">
          <h2 className="font-display text-xl">Order Summary</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {lines.map((line) => {
              const p = product(line.slug);
              if (!p) return null;
              return (
                <li key={`${line.slug}-${line.size}-${line.color}`} className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    {p.name} × {line.qty}
                  </span>
                  <span>{formatINR(p.price * line.qty)}</span>
                </li>
              );
            })}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
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
        </aside>
      </div>
    </div>
  );
}

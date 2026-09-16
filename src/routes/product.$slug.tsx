import { useState } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { Heart, Minus, Plus, Truck } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/lib/cart";
import { discount, findProduct, formatINR, products } from "@/lib/products";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = findProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    const title = p ? `${p.name} — ${formatINR(p.price)} | YOUR BRAND` : "Product | YOUR BRAND";
    const description = p
      ? `${p.description.slice(0, 150)}`
      : "Premium woollen wear made in our own unit.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add, setOpen, wishlist, toggleWishlist } = useCart();
  const [size, setSize] = useState(product.sizes[0]!);
  const [color, setColor] = useState(product.colors[0]!);
  const [qty, setQty] = useState(1);
  const [pincode, setPincode] = useState("");
  const [delivery, setDelivery] = useState<string | null>(null);
  const saved = wishlist.includes(product.slug);

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  const checkPincode = () => {
    if (!/^\d{6}$/.test(pincode)) {
      setDelivery("Enter a valid 6-digit PIN code.");
      return;
    }
    setDelivery("Serviceable. Standard delivery in 3–6 working days.");
  };

  const addToBag = () => {
    add({ slug: product.slug, size, color, qty });
    setOpen(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <img
            src={product.image}
            alt={product.name}
            width={800}
            height={1008}
            className="w-full rounded-lg object-cover"
          />
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <img
                key={i}
                src={product.image}
                alt={`${product.name} view ${i + 1}`}
                loading="lazy"
                width={800}
                height={1008}
                className="aspect-square w-full rounded-md object-cover opacity-80"
              />
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">{product.material}</p>
          <h1 className="mt-3 text-3xl sm:text-4xl">{product.name}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            <span className="text-accent">★</span> {product.rating} · {product.reviews} reviews
          </p>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-2xl font-semibold">{formatINR(product.price)}</span>
            <span className="text-sm text-muted-foreground line-through">{formatINR(product.mrp)}</span>
            <span className="text-sm font-semibold text-accent">{discount(product)}% off</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Inclusive of all taxes</p>

          <div className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Colour</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    color === c ? "border-accent text-accent" : "border-border text-muted-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Size</p>
              <button type="button" className="text-xs underline underline-offset-4">
                Size guide
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`min-w-14 rounded-full border px-4 py-2 text-sm transition-colors ${
                    size === s ? "border-accent text-accent" : "border-border text-muted-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            {product.stock > 0 ? `In stock · ${product.stock} available` : "Currently out of stock"}
          </p>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-full border border-border">
              <button type="button" aria-label="Decrease" className="px-3 py-2.5" onClick={() => setQty(Math.max(1, qty - 1))}>
                <Minus className="size-4" />
              </button>
              <span className="min-w-8 text-center text-sm">{qty}</span>
              <button type="button" aria-label="Increase" className="px-3 py-2.5" onClick={() => setQty(Math.min(10, qty + 1))}>
                <Plus className="size-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => toggleWishlist(product.slug)}
              aria-label="Wishlist"
              className="grid size-11 place-items-center rounded-full border border-border hover:text-accent"
            >
              <Heart className="size-4" fill={saved ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={addToBag}
              className="flex-1 rounded-full bg-primary py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent"
            >
              Add to Bag
            </button>
            <button
              type="button"
              onClick={addToBag}
              className="flex-1 rounded-full border border-primary py-3.5 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Buy Now
            </button>
          </div>

          <div className="mt-8 rounded-lg border border-border bg-card p-5">
            <p className="flex items-center gap-2 text-sm font-medium">
              <Truck className="size-4" /> Check delivery
            </p>
            <div className="mt-3 flex gap-2">
              <input
                inputMode="numeric"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter 6-digit PIN code"
                className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
              />
              <button
                type="button"
                onClick={checkPincode}
                className="rounded-full bg-accent px-5 py-2.5 text-sm text-accent-foreground"
              >
                Check
              </button>
            </div>
            {delivery && <p className="mt-3 text-xs text-muted-foreground">{delivery}</p>}
            <p className="mt-3 text-xs text-muted-foreground">
              Free shipping above ₹999 · 7-day returns on unused items
            </p>
          </div>

          <div className="mt-10 space-y-6 text-sm">
            <section>
              <h2 className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">Description</h2>
              <p className="mt-2 text-muted-foreground">{product.description}</p>
            </section>
            <section>
              <h2 className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">Specifications</h2>
              <dl className="mt-2 divide-y divide-border">
                {product.specs.map((s) => (
                  <div key={s.label} className="flex justify-between py-2">
                    <dt className="text-muted-foreground">{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
            <section>
              <h2 className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">Wash & care</h2>
              <p className="mt-2 text-muted-foreground">{product.care}</p>
            </section>
          </div>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="text-2xl">You may also like</h2>
        <div className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

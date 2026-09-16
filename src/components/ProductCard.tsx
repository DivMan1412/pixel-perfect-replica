import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { discount, formatINR, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

export function ProductCard({ product }: { product: Product }) {
  const { add, setOpen, wishlist, toggleWishlist } = useCart();
  const saved = wishlist.includes(product.slug);
  const off = discount(product);

  return (
    <article className="group">
      <div className="relative overflow-hidden rounded-lg bg-wool">
        <Link to="/product/$slug" params={{ slug: product.slug }}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={800}
            height={1008}
            className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        {off > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">
            {off}% OFF
          </span>
        )}
        <button
          type="button"
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWishlist(product.slug)}
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-card/85 text-foreground backdrop-blur transition-colors hover:text-accent"
        >
          <Heart className="size-4" fill={saved ? "currentColor" : "none"} />
        </button>
        <button
          type="button"
          onClick={() => {
            add({
              slug: product.slug,
              size: product.sizes[0] ?? "One Size",
              color: product.colors[0] ?? "Default",
              qty: 1,
            });
            setOpen(true);
          }}
          className="absolute inset-x-3 bottom-3 rounded-full bg-primary/90 py-2.5 text-sm font-medium text-primary-foreground opacity-0 backdrop-blur transition-all duration-300 hover:bg-primary group-hover:opacity-100 max-sm:opacity-100"
        >
          Quick Add
        </button>
      </div>

      <div className="mt-3 space-y-1">
        <p className="text-[11px] text-muted-foreground">
          <span className="text-accent">★</span> {product.rating} ({product.reviews})
        </p>
        <h3 className="font-sans text-sm font-medium tracking-normal">
          <Link to="/product/$slug" params={{ slug: product.slug }} className="hover:text-accent">
            {product.name}
          </Link>
        </h3>
        <p className="flex items-center gap-2 text-sm">
          <span className="font-semibold">{formatINR(product.price)}</span>
          <span className="text-xs text-muted-foreground line-through">{formatINR(product.mrp)}</span>
        </p>
      </div>
    </article>
  );
}

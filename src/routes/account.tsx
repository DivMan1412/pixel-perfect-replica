import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/products";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account & Wishlist | YOUR BRAND" },
      {
        name: "description",
        content: "View your saved woollen wear, orders and addresses in your YOUR BRAND account.",
      },
      { property: "og:title", content: "My Account | YOUR BRAND" },
      { property: "og:description", content: "Your wishlist, orders and saved addresses." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const { wishlist, product, toggleWishlist } = useCart();
  const saved = wishlist.map(product).filter(Boolean);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <h1 className="text-3xl sm:text-4xl">My Account</h1>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        Your wishlist is saved on this device. Sign-in, order history and saved addresses switch on once
        the store backend is connected.
      </p>

      <section className="mt-12">
        <h2 className="text-2xl">Wishlist</h2>
        {saved.length === 0 ? (
          <div className="mt-6 rounded-lg border border-border bg-card py-16 text-center">
            <p className="text-sm text-muted-foreground">Nothing saved yet.</p>
            <Link
              to="/shop"
              className="mt-5 inline-block rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {saved.map((p) => (
              <li key={p!.slug}>
                <Link to="/product/$slug" params={{ slug: p!.slug }}>
                  <img
                    src={p!.image}
                    alt={p!.name}
                    loading="lazy"
                    width={800}
                    height={1008}
                    className="aspect-[4/5] w-full rounded-lg object-cover"
                  />
                </Link>
                <p className="mt-3 text-sm font-medium">{p!.name}</p>
                <p className="text-sm">{formatINR(p!.price)}</p>
                <button
                  type="button"
                  onClick={() => toggleWishlist(p!.slug)}
                  className="mt-1 text-xs text-muted-foreground underline underline-offset-4"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-16">
        <h2 className="text-2xl">My Orders</h2>
        <div className="mt-6 rounded-lg border border-border bg-card py-16 text-center">
          <p className="text-sm text-muted-foreground">
            Orders will appear here once accounts and payments are connected.
          </p>
        </div>
      </section>
    </div>
  );
}

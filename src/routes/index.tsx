import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/lib/products";
import hero from "@/assets/hero-winter.jpg";
import factory from "@/assets/factory.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Premium Woollen Wear, Made for Winter | YOUR BRAND" },
      {
        name: "description",
        content:
          "Hand-loomed shawls, wool sweaters, caps, scarves, gloves and socks made in our own unit. Free shipping above ₹999 across India.",
      },
      { property: "og:title", content: "Premium Woollen Wear, Made for Winter | YOUR BRAND" },
      {
        property: "og:description",
        content: "Shawls, sweaters and winter accessories made in our own unit and sent straight to you.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const collections = [
  "Everyday Winter",
  "Premium Wool",
  "Traditional Collection",
  "Winter Essentials",
  "Gifts",
];

const reviews = [
  {
    text: "The pashmina has a weight I did not expect. It genuinely feels hand-made.",
    name: "Ananya M",
    city: "Bengaluru",
  },
  {
    text: "Bought the cable knit for my father. Warm, roomy, and the wool does not itch.",
    name: "Rohit S",
    city: "Pune",
  },
  {
    text: "Delivery was quick and the cap is exactly the colour shown on the site.",
    name: "Meera K",
    city: "Delhi",
  },
];

function Home() {
  const newArrivals = products.slice(0, 4);
  const bestSellers = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 lg:grid-cols-2 lg:py-20">
        <div>
          <p className="eyebrow">Winter Collection</p>
          <h1 className="mt-5 text-5xl leading-[0.95] sm:text-6xl xl:text-7xl">Wrap Yourself in Winter</h1>
          <p className="mt-6 max-w-md text-base text-muted-foreground">
            Premium woollen wear, made for winter. Shawls and knitwear woven in our own unit, then sent
            straight to your door — no middlemen in between.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/shop"
              search={{ gender: "men" }}
              className="rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent"
            >
              Shop Men
            </Link>
            <Link
              to="/shop"
              search={{ gender: "women" }}
              className="rounded-full border border-primary px-7 py-3.5 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Shop Women
            </Link>
          </div>
        </div>
        <img
          src={hero}
          alt="Woman wrapped in a hand-loomed cream wool shawl in the mountains"
          width={1600}
          height={1200}
          className="aspect-[4/3] w-full rounded-xl object-cover"
        />
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 py-14">
        <h2 className="text-3xl sm:text-4xl">Shop by Category</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <Link key={c.slug} to="/shop" search={{ category: c.slug }} className="group">
              <div className="overflow-hidden rounded-lg bg-wool">
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  width={800}
                  height={1008}
                  className="aspect-[6/7] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="mt-3 text-sm font-medium">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* New arrivals */}
      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl sm:text-4xl">New Arrivals</h2>
          <Link to="/shop" search={{ sort: "newest" }} className="text-sm text-accent hover:text-foreground">
            View all
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {newArrivals.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Editorial banner */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-primary-foreground/60">
              The Winter Collection
            </p>
            <h2 className="mt-5 text-4xl sm:text-5xl">Warmth you can feel the weight of</h2>
            <p className="mt-5 max-w-md text-primary-foreground/70">
              Dense weaves, honest wool and finishing done by hand. Built to stay in your wardrobe for
              many winters, not one.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-block rounded-full bg-background px-7 py-3.5 text-sm font-medium text-foreground"
            >
              Explore the collection
            </Link>
          </div>
          <img
            src={categories[0]!.image}
            alt="Stack of folded hand-loomed wool shawls"
            loading="lazy"
            width={800}
            height={1008}
            className="aspect-[4/3] w-full rounded-xl object-cover"
          />
        </div>
      </section>

      {/* Best sellers */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <h2 className="text-3xl sm:text-4xl">Best Sellers</h2>
        <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {bestSellers.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Collections */}
      <section className="mx-auto max-w-7xl px-5 py-10">
        <h2 className="text-3xl sm:text-4xl">Shop by Collection</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {collections.map((c) => (
            <Link
              key={c}
              to="/shop"
              className="rounded-full border border-border bg-card px-5 py-3 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      {/* Manufacturing story */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-2">
        <img
          src={factory}
          alt="Hands weaving wool on a wooden handloom in our workshop"
          loading="lazy"
          width={1200}
          height={1408}
          className="aspect-[4/5] w-full rounded-xl object-cover"
        />
        <div>
          <p className="eyebrow">Our manufacturing</p>
          <h2 className="mt-5 text-4xl">Made by Us, Delivered to You</h2>
          <p className="mt-5 max-w-md text-muted-foreground">
            We choose the wool ourselves, weave it in our own unit and check every piece before it is
            packed. Because nothing is outsourced, we keep the quality high and the price fair.
          </p>
          <dl className="mt-8 grid max-w-md grid-cols-3 gap-6">
            <div>
              <dt className="font-display text-2xl">Own unit</dt>
              <dd className="mt-1 text-xs text-muted-foreground">Manufacturing</dd>
            </div>
            <div>
              <dt className="font-display text-2xl">Piece-wise</dt>
              <dd className="mt-1 text-xs text-muted-foreground">Quality checks</dd>
            </div>
            <div>
              <dt className="font-display text-2xl">Direct</dt>
              <dd className="mt-1 text-xs text-muted-foreground">No middlemen</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-7xl px-5 py-14">
        <h2 className="text-3xl sm:text-4xl">Worn and Loved</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.name} className="rounded-lg border border-border bg-card p-6">
              <div className="text-sm tracking-widest text-accent">★★★★★</div>
              <blockquote className="mt-3 font-display text-lg leading-snug">{r.text}</blockquote>
              <figcaption className="mt-4 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {r.name} · {r.city}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Instagram grid */}
      <section className="mx-auto max-w-7xl px-5 py-14">
        <h2 className="text-3xl sm:text-4xl">From Our Instagram</h2>
        <div className="mt-8 grid grid-cols-3 gap-3 lg:grid-cols-6">
          {categories.map((c) => (
            <img
              key={c.slug}
              src={c.image}
              alt={`${c.name} on our Instagram`}
              loading="lazy"
              width={800}
              height={1008}
              className="aspect-square w-full rounded-md object-cover"
            />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid items-center gap-8 rounded-xl border border-border bg-card px-6 py-14 sm:px-14 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl sm:text-4xl">Get 10% Off Your First Order</h2>
            <p className="mt-3 max-w-sm text-muted-foreground">
              Join our list for new arrivals and seasonal offers. One email, not ten.
            </p>
          </div>
          <form className="flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 rounded-full border border-border bg-background px-5 py-3.5 text-sm outline-none focus:border-accent"
            />
            <button
              type="submit"
              className="rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-foreground"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

import { Link } from "@tanstack/react-router";

const columns = [
  { title: "Shop", links: ["Shawls", "Sweaters", "Caps", "Scarves", "Gloves", "Socks"] },
  { title: "Help", links: ["Contact", "FAQs", "Shipping", "Returns & Refunds", "Track Order"] },
  { title: "Company", links: ["About Us", "Privacy Policy", "Terms & Conditions", "Customer Support"] },
  { title: "Follow", links: ["Instagram", "Facebook", "WhatsApp"] },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <p className="font-display text-2xl">YOUR BRAND</p>
            <p className="mt-3 max-w-xs text-sm text-primary-foreground/70">
              Woollen wear made in our own unit and sent straight to your door.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] uppercase tracking-[0.2em] text-primary-foreground/50">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link to="/shop" className="transition-colors hover:text-primary-foreground">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-12 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} YOUR BRAND. All prices in ₹ and inclusive of taxes.
        </p>
      </div>
    </footer>
  );
}

import shawls from "@/assets/cat-shawls.jpg";
import sweaters from "@/assets/cat-sweaters.jpg";
import caps from "@/assets/cat-caps.jpg";
import scarves from "@/assets/cat-scarves.jpg";
import gloves from "@/assets/cat-gloves.jpg";
import socks from "@/assets/cat-socks.jpg";

export type Category = "shawls" | "sweaters" | "caps" | "scarves" | "gloves" | "socks";
export type Gender = "men" | "women" | "kids" | "unisex";

export type Product = {
  slug: string;
  name: string;
  sku: string;
  category: Category;
  gender: Gender;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  image: string;
  material: string;
  colors: string[];
  sizes: string[];
  stock: number;
  description: string;
  care: string;
  specs: { label: string; value: string }[];
};

export const categories: { slug: Category; name: string; image: string; blurb: string }[] = [
  { slug: "shawls", name: "Shawls", image: shawls, blurb: "Hand-loomed wraps" },
  { slug: "sweaters", name: "Sweaters", image: sweaters, blurb: "Knits for every day" },
  { slug: "caps", name: "Caps", image: caps, blurb: "Warm to the ears" },
  { slug: "scarves", name: "Scarves", image: scarves, blurb: "Soft, light layers" },
  { slug: "gloves", name: "Gloves", image: gloves, blurb: "Snug and flexible" },
  { slug: "socks", name: "Socks", image: socks, blurb: "Thick winter pairs" },
];

const image: Record<Category, string> = { shawls, sweaters, caps, scarves, gloves, socks };

const baseCare = "Dry clean recommended. Hand wash cold with wool detergent. Dry flat in shade.";

function make(p: Omit<Product, "image" | "care" | "specs" | "sku"> & { sku: string }): Product {
  return {
    ...p,
    image: image[p.category],
    care: baseCare,
    specs: [
      { label: "Material", value: p.material },
      { label: "Weave", value: "Hand-loomed" },
      { label: "Origin", value: "Made in our own unit, India" },
      { label: "SKU", value: p.sku },
    ],
  };
}

export const products: Product[] = [
  make({
    slug: "mulberry-pashmina-shawl",
    name: "Mulberry Pashmina Shawl",
    sku: "YB-SHW-001",
    category: "shawls",
    gender: "women",
    price: 4199,
    mrp: 5999,
    rating: 4.8,
    reviews: 212,
    material: "Pure Pashmina Wool",
    colors: ["Ivory", "Walnut", "Charcoal"],
    sizes: ["One Size"],
    stock: 14,
    description:
      "A featherweight pashmina wrap woven on a hand loom over four days. Warm without weight, with a soft selvedge finish on all four sides.",
  }),
  make({
    slug: "kullu-border-wool-shawl",
    name: "Kullu Border Wool Shawl",
    sku: "YB-SHW-002",
    category: "shawls",
    gender: "unisex",
    price: 2799,
    mrp: 3499,
    rating: 4.6,
    reviews: 128,
    material: "Merino Wool Blend",
    colors: ["Oat", "Rust"],
    sizes: ["One Size"],
    stock: 22,
    description:
      "A traditional geometric border woven into a dense merino blend body. Our most versatile everyday shawl for Indian winters.",
  }),
  make({
    slug: "cable-knit-wool-sweater",
    name: "Cable-Knit Wool Sweater",
    sku: "YB-SWT-001",
    category: "sweaters",
    gender: "men",
    price: 3199,
    mrp: 3999,
    rating: 4.7,
    reviews: 96,
    material: "Lambswool",
    colors: ["Oat", "Moss", "Navy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 31,
    description:
      "A classic cable front knitted in lambswool, cut with a relaxed body and ribbed cuffs that hold their shape through the season.",
  }),
  make({
    slug: "merino-crew-sweater",
    name: "Merino Crew Sweater",
    sku: "YB-SWT-002",
    category: "sweaters",
    gender: "women",
    price: 2490,
    mrp: 3200,
    rating: 4.5,
    reviews: 74,
    material: "Extra-fine Merino",
    colors: ["Ivory", "Slate"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 18,
    description:
      "Fine-gauge merino in a clean crew neck. Thin enough to layer under a coat, warm enough to wear on its own indoors.",
  }),
  make({
    slug: "kids-wool-pullover",
    name: "Kids Wool Pullover",
    sku: "YB-SWT-003",
    category: "sweaters",
    gender: "kids",
    price: 1490,
    mrp: 1899,
    rating: 4.6,
    reviews: 52,
    material: "Soft Wool Blend",
    colors: ["Mustard", "Ivory"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    stock: 26,
    description:
      "A non-itch wool blend pullover for children, knitted with a softer yarn and a wide neck opening for easy dressing.",
  }),
  make({
    slug: "ribbed-merino-cap",
    name: "Ribbed Merino Cap",
    sku: "YB-CAP-001",
    category: "caps",
    gender: "unisex",
    price: 899,
    mrp: 1199,
    rating: 4.9,
    reviews: 143,
    material: "Merino Wool",
    colors: ["Charcoal", "Ivory", "Rust"],
    sizes: ["One Size"],
    stock: 60,
    description:
      "A deep-cuff ribbed cap that sits close to the head and covers the ears fully. Knitted seamless, so there is nothing to rub.",
  }),
  make({
    slug: "handloom-wool-scarf",
    name: "Handloom Wool Scarf",
    sku: "YB-SCF-001",
    category: "scarves",
    gender: "unisex",
    price: 1290,
    mrp: 1699,
    rating: 4.4,
    reviews: 61,
    material: "Wool",
    colors: ["Grey", "Camel"],
    sizes: ["One Size"],
    stock: 40,
    description:
      "A long hand-loomed scarf with hand-knotted fringes, light enough to loop twice without bulk at the neck.",
  }),
  make({
    slug: "camel-knit-gloves",
    name: "Camel Knit Gloves",
    sku: "YB-GLV-001",
    category: "gloves",
    gender: "unisex",
    price: 799,
    mrp: 999,
    rating: 4.3,
    reviews: 38,
    material: "Wool Blend",
    colors: ["Camel", "Charcoal"],
    sizes: ["S/M", "L/XL"],
    stock: 45,
    description:
      "Close-knit gloves with a ribbed wrist that stays put under a sleeve. Enough stretch to keep full finger movement.",
  }),
  make({
    slug: "thick-winter-socks-pack",
    name: "Thick Winter Socks (Pack of 2)",
    sku: "YB-SCK-001",
    category: "socks",
    gender: "unisex",
    price: 649,
    mrp: 899,
    rating: 4.7,
    reviews: 187,
    material: "Wool Blend",
    colors: ["Oat / Grey"],
    sizes: ["Free Size"],
    stock: 80,
    description:
      "Two pairs of thick ribbed wool socks with a cushioned sole and a soft top band that does not bite into the calf.",
  }),
];

export const discount = (p: Product) => Math.round(((p.mrp - p.price) / p.mrp) * 100);

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const findProduct = (slug: string) => products.find((p) => p.slug === slug);

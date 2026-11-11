import {
  Search,
  Users,
  Handshake,
  ShoppingCart,
  Factory,
  Ship,
  FileCheck2,
  type LucideIcon,
} from "lucide-react";

export const BUSINESS = {
  name: "Tujaze Container Na Steve",
  tagline: "China to Kenya, seamlessly.",
  promise: "You choose. We source. We deliver.",
  founder: "Stephen Collins Kariuki",
  whatsappDisplay: "+254 716 456 964",
  whatsappDigits: "254716456964",
  email: "tujazecontainernasteve@gmail.com",
} as const;

export const whatsappChatUrl = (text?: string) =>
  `https://wa.me/${BUSINESS.whatsappDigits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const emailUrl = (subject = "Sourcing enquiry") =>
  `mailto:${BUSINESS.email}?subject=${encodeURIComponent(subject)}`;

export type Service = {
  slug: string;
  title: string;
  short: string;
  detail: string;
  icon: LucideIcon;
};

export const SERVICES: Service[] = [
  {
    slug: "product-sourcing",
    title: "Product sourcing",
    short: "Find the right products and potential suppliers in China.",
    detail:
      "Share what you are looking for — a link, a photo or a description — and we help identify matching products and potential suppliers in China.",
    icon: Search,
  },
  {
    slug: "supplier-identification",
    title: "Supplier identification",
    short: "Suppliers matched to your requirements.",
    detail:
      "We look for suppliers that fit your product, quantity and quality needs, so you are not left guessing between hundreds of online listings.",
    icon: Users,
  },
  {
    slug: "price-negotiation",
    title: "Price negotiation",
    short: "Support with supplier discussions and pricing.",
    detail:
      "We assist with supplier conversations and pricing discussions, helping you understand the offer before you commit.",
    icon: Handshake,
  },
  {
    slug: "purchasing-coordination",
    title: "Purchasing coordination",
    short: "Purchases coordinated with your chosen supplier.",
    detail:
      "Once you approve a supplier and terms, we help coordinate the purchase so your order moves forward with clarity.",
    icon: ShoppingCart,
  },
  {
    slug: "factory-visits",
    title: "Factory visits",
    short: "On-the-ground visits to suppliers, on request.",
    detail:
      "Where a request calls for it, a factory visit can be discussed to see a supplier’s operations first-hand. Availability is confirmed per enquiry.",
    icon: Factory,
  },
  {
    slug: "shipping-consolidation",
    title: "Shipping & consolidation",
    short: "Goods moved and consolidated for the journey.",
    detail:
      "We coordinate the movement of your sourced goods and can consolidate items from different suppliers. Quotations depend on cargo and destination.",
    icon: Ship,
  },
  {
    slug: "customs-delivery",
    title: "Customs & delivery coordination",
    short: "Help getting goods through to Kenya.",
    detail:
      "We help coordinate the customs and delivery steps involved in getting your goods to Kenya, keeping you informed along the way.",
    icon: FileCheck2,
  },
];

export const PREVIEW_STEPS = [
  { title: "Tell us what you need", text: "Share product links, photos, quantities and any details." },
  { title: "We identify suppliers", text: "We review your request and look for suitable suppliers." },
  { title: "We coordinate sourcing", text: "Pricing, negotiation and purchasing, coordinated with you." },
  { title: "We arrange delivery", text: "Shipping and delivery to Kenya, arranged and communicated." },
];

export const FULL_STEPS = [
  {
    title: "Share your requirements",
    text: "Send us product links, pictures, quantities and any relevant details — the more you share, the faster we can help.",
  },
  {
    title: "Supplier sourcing",
    text: "Tujaze reviews your request and identifies potential suppliers that match what you need.",
  },
  {
    title: "Quotation and negotiation",
    text: "You receive the relevant sourcing information and pricing, with support on supplier discussions.",
  },
  {
    title: "Purchase coordination",
    text: "Once you approve the proposed arrangement, the purchase is coordinated with the supplier.",
  },
  {
    title: "Shipping and delivery",
    text: "Shipping, consolidation and delivery arrangements are communicated to you through to Kenya.",
  },
];

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/contact", label: "Contact" },
] as const;

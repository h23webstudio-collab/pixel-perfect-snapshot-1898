import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Info, Users2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/site/PageIntro";
import { ClosingCta } from "@/components/site/ClosingCta";
import { SERVICES } from "@/lib/site";
import factory from "@/assets/factory-inspection.jpg";
import airFreight from "@/assets/air-freight.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Tujaze Container Na Steve" },
      {
        name: "description",
        content:
          "Product sourcing, supplier identification, price negotiation, purchasing, factory visits, shipping, consolidation and customs coordination from China to Kenya.",
      },
      { property: "og:title", content: "Sourcing & shipping services — Tujaze Container Na Steve" },
      {
        property: "og:description",
        content: "Choose the sourcing support you need, from finding suppliers to getting goods to Kenya.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const PRICING = [
  { label: "Initial consultation", price: "Free", note: "A first conversation about what you need." },
  { label: "Market checks", price: "Free", note: "Subject to availability." },
  { label: "Dedicated sourcing", price: "From USD 100", note: "Final fee depends on the scope of your request." },
  { label: "Supplier contacts", price: "USD 100", note: "Contacts for 10 suppliers. Details confirmed on enquiry." },
];

function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Our services"
        title="Sourcing support for every step of the journey."
        image={factory}
        imageAlt="Product samples being inspected in a warehouse"
      >
        <p>
          Choose the help you need. Each service can be arranged on its own or combined — what’s included is
          agreed with you for each request.
        </p>
      </PageIntro>

      <section className="section-y">
        <div className="container-site">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <li
                key={s.slug}
                id={s.slug}
                className="card-lift flex scroll-mt-28 flex-col rounded-2xl border border-border bg-card p-8 shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-full bg-accent">
                    <s.icon className="size-6 text-burgundy" strokeWidth={1.5} />
                  </span>
                  <span className="font-display text-sm text-gold-muted">0{i + 1}</span>
                </div>
                <h2 className="mt-7 text-2xl text-ink">{s.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
                <Link
                  to="/request-quote"
                  search={{ service: s.title }}
                  className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-burgundy transition-colors hover:text-gold-muted"
                >
                  Enquire about {s.title.toLowerCase()} <ArrowRight className="size-4" />
                </Link>
              </li>
            ))}

            <li className="relative overflow-hidden rounded-2xl md:col-span-2 lg:col-span-2">
              <img
                src={airFreight}
                alt="Cargo pallets being loaded onto a freight aircraft at night"
                width={1408}
                height={1008}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 hero-scrim" />
              <div className="relative flex h-full min-h-72 flex-col justify-end p-8 md:p-10">
                <p className="eyebrow-light">Not sure what you need?</p>
                <p className="mt-3 max-w-md font-display text-3xl leading-tight text-on-dark">
                  Start with a free consultation and we’ll point you in the right direction.
                </p>
                <Button asChild variant="gold" className="mt-6 self-start">
                  <Link to="/request-quote">
                    Start a request <ArrowRight />
                  </Link>
                </Button>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Pricing guide */}
      <section className="section-y bg-secondary">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="eyebrow">Pricing guide</p>
            <h2 className="mt-4 text-4xl leading-tight text-burgundy md:text-5xl">Clear starting points.</h2>
            <div className="mt-6 flex gap-3 rounded-xl border border-gold/40 bg-card p-5 text-sm leading-relaxed text-ink-soft">
              <Info className="mt-0.5 size-5 shrink-0 text-gold-muted" />
              <p>
                These are service fees only. Product costs, shipping and import charges are quoted separately,
                and depend on your specific request.
              </p>
            </div>
          </div>
          <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {PRICING.map((p) => (
              <li key={p.label} className="flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between md:p-7">
                <div>
                  <p className="text-lg font-semibold text-ink">{p.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{p.note}</p>
                </div>
                <p className="shrink-0 font-display text-2xl text-burgundy">{p.price}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Community — upcoming */}
      <section className="section-y pb-0 md:pb-0">
        <div className="container-site">
          <div className="flex flex-col gap-8 rounded-2xl border border-dashed border-gold-muted/60 p-8 md:flex-row md:items-center md:p-10">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-accent">
              <Users2 className="size-7 text-burgundy" strokeWidth={1.5} />
            </span>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl text-ink">WhatsApp community</h2>
                <span className="rounded-full bg-burgundy px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-on-dark">
                  Coming soon
                </span>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Community groups for sourcing tips and updates are planned — a free group, a KSh 2,000 group
                and a KSh 5,000 VIP group. Not yet launched; details will be shared once they open.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}

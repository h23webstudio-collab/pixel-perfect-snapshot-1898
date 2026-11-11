import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Quote } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ClosingCta } from "@/components/site/ClosingCta";
import { SERVICES, PREVIEW_STEPS, BUSINESS } from "@/lib/site";
import portDusk from "@/assets/port-dusk.jpg";
import cargoShip from "@/assets/cargo-ship-aerial.jpg";
import founderSuit from "@/assets/founder-suit.jpg.asset.json";
import founderVest from "@/assets/founder-vest.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tujaze Container Na Steve — China to Kenya, seamlessly" },
      {
        name: "description",
        content:
          "Your China sourcing partner. Supplier identification, price negotiation, purchasing and shipping coordination for Kenyan individuals and businesses.",
      },
      { property: "og:title", content: "Tujaze Container Na Steve — China to Kenya, seamlessly" },
      {
        property: "og:description",
        content: "You choose. We source. We deliver. China-to-Kenya sourcing and shipping coordination.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const HIGHLIGHTS = [
  "Product sourcing",
  "Supplier identification",
  "Price negotiation",
  "Purchasing coordination",
  "Shipping and logistics",
  "Customs and delivery coordination",
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden surface-burgundy">
        <img
          src={portDusk}
          alt="Container port at dusk with a cargo ship being loaded"
          width={1600}
          height={1104}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 hero-scrim-mobile md:hero-scrim" />
        <div className="container-site relative grid items-end gap-10 pb-16 pt-24 md:grid-cols-[1.25fr_1fr] md:pb-0 md:pt-28 lg:pt-32">
          <div className="pb-4 md:pb-28 fade-up">
            <p className="eyebrow-light">Your China sourcing partner</p>
            <h1 className="mt-6 text-5xl leading-[1.02] text-on-dark sm:text-6xl lg:text-7xl">
              China to Kenya,
              <br />
              <em className="text-gold">seamlessly.</em>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-on-dark-muted md:text-lg">
              From finding the right suppliers to negotiating prices and coordinating delivery, Tujaze makes
              sourcing products from China easier.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="gold" size="xl">
                <Link to="/request-quote">
                  Start Your Sourcing Request <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outlineLight" size="xl">
                <Link to="/services">Explore Our Services</Link>
              </Button>
            </div>
            <p className="mt-10 text-sm tracking-wide text-on-dark-muted">{BUSINESS.promise}</p>
          </div>

          <div className="relative hidden justify-end md:flex">
            <div className="relative w-full max-w-sm">
              <div className="absolute -inset-x-6 bottom-0 top-16 rounded-t-[10rem] border border-gold/30" />
              <img
                src={founderSuit.url}
                alt="Stephen Collins Kariuki, founder of Tujaze Container Na Steve, in a pinstripe suit"
                width={959}
                height={1500}
                className="relative w-full rounded-t-[10rem] object-cover object-top"
                style={{ aspectRatio: "959 / 1240" }}
              />
              <div className="absolute -left-10 bottom-10 rounded-xl bg-ivory px-5 py-4 text-ink shadow-lift">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gold-muted">Founder</p>
                <p className="mt-1 font-display text-lg">Stephen Collins Kariuki</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-b border-border bg-card">
        <div className="container-site">
          <ul className="grid grid-cols-2 divide-border md:grid-cols-3 lg:grid-cols-6 lg:divide-x">
            {HIGHLIGHTS.map((h, i) => (
              <li key={h} className="flex items-start gap-3 px-2 py-6 lg:px-5">
                <span className="mt-0.5 font-display text-sm text-gold-muted">0{i + 1}</span>
                <span className="text-sm font-semibold leading-snug text-ink-soft">{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works preview */}
      <section className="section-y">
        <div className="container-site">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow">How it works</p>
              <h2 className="mt-4 text-4xl leading-tight text-burgundy md:text-5xl">
                Four clear stages, from idea to delivery.
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/how-it-works">
                See the full process <ArrowRight />
              </Link>
            </Button>
          </div>

          <ol className="relative mt-14 grid gap-0 md:grid-cols-4 md:gap-8">
            <span className="absolute left-[1.15rem] top-2 bottom-2 w-px bg-border md:hidden" aria-hidden="true" />
            <span className="absolute left-0 right-0 top-[1.2rem] hidden h-px bg-border md:block" aria-hidden="true" />
            {PREVIEW_STEPS.map((s, i) => (
              <li key={s.title} className="relative flex gap-5 pb-10 md:block md:pb-0">
                <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-gold bg-background font-display text-lg text-burgundy">
                  {i + 1}
                </span>
                <div className="md:mt-7">
                  <h3 className="text-xl text-ink md:text-2xl">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Services preview */}
      <section className="section-y surface-dark">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="eyebrow-light">What we do</p>
              <h2 className="mt-4 text-4xl leading-tight text-on-dark md:text-5xl">
                Sourcing support, end to end.
              </h2>
              <p className="mt-5 text-on-dark-muted">
                Pick the help you need — from finding a supplier to coordinating how your goods reach Kenya.
              </p>
              <img
                src={cargoShip}
                alt="Aerial view of a container ship at sea"
                width={1408}
                height={1008}
                loading="lazy"
                className="mt-8 hidden aspect-[4/3] w-full rounded-2xl object-cover lg:block"
              />
              <Button asChild variant="gold" className="mt-8">
                <Link to="/services">
                  View all services <ArrowRight />
                </Link>
              </Button>
            </div>

            <ul className="grid gap-px overflow-hidden rounded-2xl bg-line-dark sm:grid-cols-2">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.slug} className="group bg-ink p-7 transition-colors hover:bg-ink-soft md:p-9">
                  <s.icon className="size-7 text-gold" strokeWidth={1.5} />
                  <h3 className="mt-6 text-2xl text-on-dark">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-on-dark-muted">{s.short}</p>
                  <Link
                    to="/services"
                    hash={s.slug}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-colors hover:text-on-dark"
                  >
                    Learn more <ArrowUpRight className="size-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section-y">
        <div className="container-site grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <div className="relative">
            <div className="absolute -bottom-5 -right-5 h-full w-full rounded-3xl border border-gold/50" aria-hidden="true" />
            <img
              src={founderVest.url}
              alt="Stephen Collins Kariuki smiling in a pinstripe waistcoat and burgundy tie"
              width={700}
              height={580}
              loading="lazy"
              className="relative aspect-[7/6] w-full rounded-3xl object-cover object-top"
            />
          </div>
          <div>
            <p className="eyebrow">Meet the founder</p>
            <h2 className="mt-4 text-4xl leading-tight text-burgundy md:text-5xl">
              Stephen Collins Kariuki
            </h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Founder & sourcing partner
            </p>
            <figure className="mt-8">
              <Quote className="size-8 text-gold" strokeWidth={1.25} />
              <blockquote className="mt-4 font-display text-2xl leading-snug text-ink md:text-[1.7rem]">
                At Tujaze Container Na Steve, our focus is making product sourcing from China clearer, more
                accessible and easier to navigate for Kenyan individuals and businesses.
              </blockquote>
            </figure>
            <Button asChild className="mt-10" size="lg">
              <Link to="/contact">
                Talk to Stephen <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}

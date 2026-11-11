import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/site/PageIntro";
import { ClosingCta } from "@/components/site/ClosingCta";
import { FULL_STEPS } from "@/lib/site";
import cargoShip from "@/assets/cargo-ship-aerial.jpg";
import founderSite from "@/assets/founder-site.jpg.asset.json";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — Tujaze Container Na Steve" },
      {
        name: "description",
        content:
          "How sourcing from China to Kenya works with Tujaze: share your requirements, supplier sourcing, quotation, purchase coordination, shipping and delivery.",
      },
      { property: "og:title", content: "How sourcing from China works — Tujaze" },
      {
        property: "og:description",
        content: "Five clear steps from your product idea to delivery in Kenya.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/how-it-works" },
    ],
    links: [{ rel: "canonical", href: "/how-it-works" }],
  }),
  component: HowItWorksPage,
});

function HowItWorksPage() {
  return (
    <>
      <PageIntro
        eyebrow="How it works"
        title="Sourcing from China, step by step."
        image={cargoShip}
        imageAlt="Container ship sailing across the ocean"
      >
        <p>New to importing? Here’s what happens from the moment you share your request.</p>
      </PageIntro>

      <section className="section-y">
        <div className="container-site grid gap-16 lg:grid-cols-[1.5fr_1fr]">
          <ol className="relative">
            <span className="absolute left-6 top-6 bottom-6 w-px bg-border" aria-hidden="true" />
            {FULL_STEPS.map((s, i) => (
              <li key={s.title} className="relative flex gap-6 pb-12 last:pb-0 md:gap-10">
                <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-burgundy font-display text-xl text-on-dark ring-8 ring-background">
                  {i + 1}
                </span>
                <div className="pt-1.5">
                  <p className="eyebrow">Step {i + 1}</p>
                  <h2 className="mt-2 text-3xl leading-tight text-ink">{s.title}</h2>
                  <p className="mt-3 max-w-lg leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <figure className="overflow-hidden rounded-2xl bg-ink">
              <img
                src={founderSite.url}
                alt="Stephen in a hard hat and Tujaze branded safety vest at a container port"
                width={370}
                height={530}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <figcaption className="p-5 text-sm text-on-dark-muted">
                Stephen coordinates sourcing and shipping between China and Kenya.
              </figcaption>
            </figure>
            <div className="flex gap-3 rounded-2xl border border-gold/40 bg-card p-6 text-sm leading-relaxed text-ink-soft">
              <Info className="mt-0.5 size-5 shrink-0 text-gold-muted" />
              <p>
                Exact processes, timelines, shipping charges and import costs depend on your specific request.
                We’ll talk you through them before anything is confirmed.
              </p>
            </div>
            <Button asChild size="lg" className="w-full">
              <Link to="/request-quote">
                Share your requirements <ArrowRight />
              </Link>
            </Button>
          </aside>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, ImageIcon, Send } from "lucide-react";

import { QuoteForm } from "@/components/site/QuoteForm";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { BUSINESS, whatsappChatUrl } from "@/lib/site";

type QuoteSearch = { service?: string | undefined };

export const Route = createFileRoute("/request-quote")({
  validateSearch: (search: Record<string, unknown>): QuoteSearch => ({
    service:
      typeof search["service"] === "string" && search["service"].length < 80 ? search["service"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Request a Quote — Tujaze Container Na Steve" },
      {
        name: "description",
        content:
          "Send a China sourcing request: product, quantity, budget and a photo, shared straight to Tujaze on WhatsApp.",
      },
      { property: "og:title", content: "Request a sourcing quote — Tujaze" },
      {
        property: "og:description",
        content: "Tell us what you need and share it with Tujaze on WhatsApp in a minute.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/request-quote" },
    ],
    links: [{ rel: "canonical", href: "/request-quote" }],
  }),
  component: RequestQuotePage,
});

const HOW = [
  { icon: MessageCircle, text: "Fill in your product details below." },
  { icon: ImageIcon, text: "Add a photo of the product if you have one." },
  { icon: Send, text: "Share it to Tujaze on WhatsApp and tap send." },
];

function RequestQuotePage() {
  const { service } = Route.useSearch();

  return (
    <>
      <section className="surface-burgundy">
        <div className="container-site py-16 md:py-24">
          <div className="max-w-2xl fade-up">
            <p className="eyebrow-light">Request a quote</p>
            <h1 className="mt-5 text-4xl leading-[1.08] text-on-dark md:text-6xl">Tell us what you’re looking for.</h1>
            <p className="mt-6 text-on-dark-muted md:text-lg">
              Share a few details and we’ll come back to you with sourcing options. The initial consultation is free.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-site grid gap-10 lg:grid-cols-[1.7fr_1fr] lg:gap-16">
          <div className="-mt-8 rounded-3xl border border-border bg-background p-6 shadow-lift sm:p-10 md:-mt-12">
            <QuoteForm initialService={service} />
          </div>

          <aside className="space-y-8 lg:pt-16">
            <div>
              <p className="eyebrow">How this works</p>
              <ol className="mt-5 space-y-5">
                {HOW.map((h, i) => (
                  <li key={h.text} className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent">
                      <h.icon className="size-5 text-burgundy" strokeWidth={1.5} />
                    </span>
                    <p className="pt-2 text-sm text-ink-soft">
                      <span className="font-semibold text-ink">{i + 1}. </span>
                      {h.text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl surface-dark p-7">
              <p className="font-display text-2xl text-on-dark">Prefer to just chat?</p>
              <p className="mt-2 text-sm text-on-dark-muted">Message us directly on WhatsApp.</p>
              <a
                href={whatsappChatUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 font-semibold text-gold hover:text-on-dark"
              >
                <WhatsAppIcon className="size-5" /> {BUSINESS.whatsappDisplay}
              </a>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Quotes depend on your specific request. Product costs, shipping and import charges are quoted separately.
              See our <Link to="/services" className="underline underline-offset-2 hover:text-burgundy">services and pricing guide</Link>.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}

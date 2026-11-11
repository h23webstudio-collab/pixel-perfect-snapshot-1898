import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { BUSINESS, emailUrl, whatsappChatUrl } from "@/lib/site";
import brandedVest from "@/assets/branded-vest.jpg.asset.json";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Tujaze Container Na Steve" },
      {
        name: "description",
        content: `Reach Tujaze Container Na Steve on WhatsApp ${BUSINESS.whatsappDisplay} or email ${BUSINESS.email} for China sourcing enquiries.`,
      },
      { property: "og:title", content: "Contact Tujaze Container Na Steve" },
      {
        property: "og:description",
        content: "Chat on WhatsApp or send an email to start your China sourcing enquiry.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[26rem] surface-burgundy md:h-[30rem]" aria-hidden="true" />
      <div className="container-site relative pb-24 pt-20 md:pt-28">
        <div className="max-w-2xl fade-up">
          <p className="eyebrow-light">Contact</p>
          <h1 className="mt-5 text-4xl leading-[1.08] text-on-dark md:text-6xl">Let’s talk about what you need.</h1>
          <p className="mt-6 text-on-dark-muted md:text-lg">
            Have a product in mind, or just a question about importing from China? Reach out — the first
            consultation is free.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1fr_0.9fr]">
          <a
            href={whatsappChatUrl("Hello Tujaze Container Na Steve, I'd like to ask about sourcing a product from China.")}
            target="_blank"
            rel="noopener noreferrer"
            className="card-lift group flex flex-col rounded-2xl border border-border bg-card p-8 shadow-soft"
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-burgundy text-gold">
              <WhatsAppIcon className="size-7" />
            </span>
            <p className="eyebrow mt-8">WhatsApp</p>
            <p className="mt-2 font-display text-3xl text-ink">{BUSINESS.whatsappDisplay}</p>
            <p className="mt-3 text-sm text-muted-foreground">The quickest way to reach us. Send a message any time.</p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-burgundy group-hover:text-gold-muted">
              Chat on WhatsApp <ArrowRight className="size-4" />
            </span>
          </a>

          <a
            href={emailUrl()}
            className="card-lift group flex flex-col rounded-2xl border border-border bg-card p-8 shadow-soft"
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-burgundy text-gold">
              <Mail className="size-7" strokeWidth={1.5} />
            </span>
            <p className="eyebrow mt-8">Email</p>
            <p className="mt-2 break-all font-display text-2xl text-ink">{BUSINESS.email}</p>
            <p className="mt-3 text-sm text-muted-foreground">Best for detailed requests with several products.</p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-burgundy group-hover:text-gold-muted">
              Send an email <ArrowRight className="size-4" />
            </span>
          </a>

          <div className="flex flex-col overflow-hidden rounded-2xl surface-dark">
            <img
              src={brandedVest.url}
              alt="Tujaze Container Na Steve logo on a branded work vest"
              width={539}
              height={443}
              loading="lazy"
              className="aspect-[5/3] w-full object-cover"
            />
            <div className="flex flex-1 flex-col p-8">
              <p className="font-display text-2xl text-on-dark">Ready with the details?</p>
              <p className="mt-3 text-sm text-on-dark-muted">
                Fill in a short request with your product, quantity and a photo — then share it with us on WhatsApp.
              </p>
              <Button asChild variant="gold" className="mt-auto self-start">
                <Link to="/request-quote">
                  Request a Quote <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <dl className="mt-16 grid gap-6 border-t border-border pt-10 text-sm sm:grid-cols-3">
          <div>
            <dt className="eyebrow">Business</dt>
            <dd className="mt-2 text-ink">{BUSINESS.name}</dd>
          </div>
          <div>
            <dt className="eyebrow">Founder</dt>
            <dd className="mt-2 text-ink">{BUSINESS.founder}</dd>
          </div>
          <div>
            <dt className="eyebrow">Focus</dt>
            <dd className="mt-2 text-ink">China-to-Kenya sourcing & shipping</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

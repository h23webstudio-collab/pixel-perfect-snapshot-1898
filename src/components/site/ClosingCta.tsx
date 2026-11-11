import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { whatsappChatUrl } from "@/lib/site";

export function ClosingCta() {
  return (
    <section className="section-y">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-3xl surface-burgundy px-7 py-14 md:px-16 md:py-20">
          <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full border border-gold/20" />
          <div className="pointer-events-none absolute -right-8 -top-8 size-48 rounded-full border border-gold/15" />
          <div className="relative max-w-2xl">
            <span className="gold-rule" />
            <h2 className="mt-6 text-3xl leading-tight text-on-dark md:text-5xl">
              Ready to source something from China?
            </h2>
            <p className="mt-4 text-on-dark-muted md:text-lg">
              Tell us what you’re looking for and let’s explore how we can help.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="gold" size="lg">
                <Link to="/request-quote">
                  Submit a Sourcing Request <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outlineLight" size="lg">
                <a href={whatsappChatUrl()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-4" /> Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

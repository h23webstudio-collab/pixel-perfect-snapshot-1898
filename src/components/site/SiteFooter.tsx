import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";

import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { BUSINESS, NAV_LINKS, emailUrl, whatsappChatUrl } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="surface-dark">
      <div className="container-site grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo tone="light" />
          <p className="mt-6 font-display text-2xl text-on-dark">{BUSINESS.tagline}</p>
          <p className="mt-2 text-sm text-on-dark-muted">{BUSINESS.promise}</p>
        </div>

        <div>
          <p className="eyebrow-light">Explore</p>
          <ul className="mt-5 space-y-3 text-sm">
            {[...NAV_LINKS, { to: "/request-quote", label: "Request a Quote" } as const].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-on-dark-muted transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow-light">Get in touch</p>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a
                href={whatsappChatUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-on-dark-muted transition-colors hover:text-gold"
              >
                <WhatsAppIcon className="size-4 text-gold" /> {BUSINESS.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={emailUrl()}
                className="flex items-center gap-3 break-all text-on-dark-muted transition-colors hover:text-gold"
              >
                <Mail className="size-4 shrink-0 text-gold" /> {BUSINESS.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line-dark">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-on-dark-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {BUSINESS.name}. China to Kenya sourcing & shipping.</p>
          <p>Product costs, shipping and import charges are quoted per request.</p>
        </div>
      </div>
    </footer>
  );
}

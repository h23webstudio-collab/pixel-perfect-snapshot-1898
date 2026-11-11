import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, ArrowRight } from "lucide-react";

import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS, BUSINESS, whatsappChatUrl } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="container-site flex h-18 items-center justify-between gap-6 py-3">
        <Link to="/" aria-label={`${BUSINESS.name} — home`} className="rounded-md">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="relative py-1 text-sm font-medium text-ink-soft/80 transition-colors hover:text-burgundy data-[status=active]:text-burgundy data-[status=active]:after:absolute data-[status=active]:after:inset-x-0 data-[status=active]:after:-bottom-1 data-[status=active]:after:h-px data-[status=active]:after:bg-gold"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="default" size="sm" className="h-10 px-5">
            <Link to="/request-quote">
              Request a Quote <ArrowRight />
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button asChild size="sm" className="h-9 px-4">
            <Link to="/request-quote">Get a Quote</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="!size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm border-l-0 bg-ink p-0 text-on-dark">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex h-full flex-col px-7 pb-8 pt-16">
                <Logo tone="light" />
                <nav aria-label="Mobile" className="mt-10 flex flex-col">
                  {[...NAV_LINKS, { to: "/request-quote", label: "Request a Quote" } as const].map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => setOpen(false)}
                      activeOptions={{ exact: l.to === "/" }}
                      className="border-b border-line-dark py-4 font-display text-2xl text-on-dark transition-colors hover:text-gold data-[status=active]:text-gold"
                    >
                      {l.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto space-y-3">
                  <Button asChild variant="gold" size="lg" className="w-full">
                    <a href={whatsappChatUrl()} target="_blank" rel="noopener noreferrer">
                      <WhatsAppIcon className="size-5" /> Chat on WhatsApp
                    </a>
                  </Button>
                  <p className="text-center text-xs text-on-dark-muted">{BUSINESS.whatsappDisplay}</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

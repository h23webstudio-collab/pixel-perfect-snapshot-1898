import { cn } from "@/lib/utils";

/** Clean website treatment of the Tujaze ship-and-plane mark. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 40" fill="none" aria-hidden="true" className={cn("text-gold", className)}>
      <path d="M4 34a20 20 0 0 1 36-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M9 27h27l-3.5 6.5a2 2 0 0 1-1.8 1H13.2a2 2 0 0 1-1.8-1L9 27Z"
        fill="currentColor"
      />
      <rect x="13" y="21" width="4" height="5" rx="0.5" fill="currentColor" opacity="0.85" />
      <rect x="18" y="19" width="4" height="7" rx="0.5" fill="currentColor" opacity="0.7" />
      <rect x="23" y="21" width="4" height="5" rx="0.5" fill="currentColor" opacity="0.85" />
      <path
        d="M36.5 6.5 46 3.5l-2.2 2.6-5 1.8 3.4 4.6-1.7.5-4.6-3.8-3.3 1.2.6-1.6 3.4-1.2-1.9-1.8 1.8-.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="h-9 w-11 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-sans text-[1.05rem] font-extrabold tracking-[0.12em]",
            tone === "light" ? "text-on-dark" : "text-burgundy",
          )}
        >
          TUJAZE
        </span>
        <span
          className={cn(
            "mt-1 font-sans text-[0.58rem] font-semibold tracking-[0.24em]",
            tone === "light" ? "text-gold" : "text-gold-muted",
          )}
        >
          CONTAINER NA STEVE
        </span>
      </span>
    </span>
  );
}

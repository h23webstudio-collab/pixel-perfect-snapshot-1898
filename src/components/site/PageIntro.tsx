import type { ReactNode } from "react";

/** Inner-page header band on burgundy. */
export function PageIntro({
  eyebrow,
  title,
  children,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative overflow-hidden surface-burgundy">
      {image && (
        <>
          <img
            src={image}
            alt={imageAlt ?? ""}
            className="absolute inset-0 h-full w-full object-cover opacity-30"
            width={1600}
            height={1000}
          />
          <div className="absolute inset-0 hero-scrim" />
        </>
      )}
      <div className="container-site relative py-20 md:py-28">
        <div className="max-w-2xl fade-up">
          <p className="eyebrow-light">{eyebrow}</p>
          <h1 className="mt-5 text-4xl leading-[1.08] text-on-dark md:text-6xl">{title}</h1>
          {children && <div className="mt-6 text-base leading-relaxed text-on-dark-muted md:text-lg">{children}</div>}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { SupportForm } from "@/components/SupportForm";
import { site, support } from "@/config/site";

export const metadata: Metadata = {
  title: "Support",
  description: support.description,
  alternates: { canonical: "/support" },
  openGraph: { title: `Support | ${site.name}`, description: support.description, url: "/support" },
  twitter: { title: `Support | ${site.name}`, description: support.description },
};

export default function SupportPage() {
  return (
    <main className="flex-1">
      <div className="mx-auto max-w-6xl px-6">
        <nav aria-label="Main" className="flex items-center justify-between border-b border-line py-7">
          <Link href="/" className="font-display text-xl font-medium tracking-tight text-ink hover:text-amber">
            Amick <span className="text-amber">[Labs]</span>
          </Link>
          <Link href="/" className="font-mono text-xs text-ink-muted hover:text-amber">← Back to the lab</Link>
        </nav>
        <section className="relative py-16 md:py-24" aria-labelledby="support-title">
          <div className="graticule pointer-events-none absolute inset-0 -z-10" />
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-dim">Contact / Support</p>
          <h1 id="support-title" className="glow-text mt-6 max-w-3xl font-display text-5xl font-medium leading-[1.05] tracking-[-0.04em] text-ink md:text-7xl">
            {support.heading} <span className="text-amber-depth">{support.headingAccent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted">{support.intro}</p>
        </section>
        <div className="grid gap-12 border-t border-line pt-10 pb-20 md:grid-cols-[1fr_2fr] md:gap-20">
          <aside className="text-sm leading-relaxed text-ink-muted">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber-dim">On the other end</p>
            <p className="mt-4 font-display text-2xl font-medium text-ink">Nathan Amick</p>
            <p className="mt-3">{support.aside}</p>
            <p className="mt-6 border-t border-line pt-6">{support.privacy}</p>
          </aside>
          <SupportForm />
        </div>
        <footer className="flex flex-wrap justify-between gap-3 border-t border-line py-8 font-mono text-[11px] tracking-wider text-ink-muted">
          <span>© {new Date().getFullYear()} {site.legalName}</span>
          <span>{site.location}</span>
        </footer>
      </div>
    </main>
  );
}

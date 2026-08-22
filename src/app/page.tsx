import { Trace } from "@/components/Trace";
import { practices, readouts, site, subjects, writing } from "@/config/site";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-dim">
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <main className="flex-1">
      {/* ── Top bar ───────────────────────────────────────────── */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 font-mono text-xs tracking-wider text-ink-muted">
        <span className="text-ink">
          <span className="text-amber">◆</span> {site.name.toUpperCase()}
        </span>
      </header>

      {/* ── Hero: the instrument ──────────────────────────────── */}
      <section className="relative mx-auto max-w-6xl px-6 pt-10 pb-24 md:pt-16">
        <div className="graticule pointer-events-none absolute inset-0 -z-10" />

        <div className="rise relative">
          <p className="font-mono text-[11px] tracking-[0.22em] text-ink-faint">
            {site.legalName.toUpperCase()} · <span className="text-amber">●</span> ACTIVE
          </p>
          <h1 className="glow-text mt-6 font-display text-[clamp(3rem,10vw,8.5rem)] font-medium leading-[0.9] tracking-[-0.04em] text-ink">
            Amick <em className="text-amber">Labs</em>
          </h1>

          {/* the trace: flat until you move or scroll */}
          <div className="mt-10 h-24 w-full cursor-crosshair">
            <Trace className="block h-full w-full" />
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-3 border-t border-line pt-4 font-mono text-xs">
            {readouts.map((r) => (
              <div key={r.label} className="flex items-baseline gap-3">
                <span className="text-[10px] tracking-[0.2em] text-ink-faint">{r.label}</span>
                <span className="text-amber">{r.value}</span>
              </div>
            ))}
          </div>
        </div>

        <p
          className="rise mt-16 max-w-2xl font-display text-3xl font-medium leading-tight tracking-[-0.02em] text-ink md:text-4xl"
          style={{ animationDelay: "120ms" }}
        >
          {site.tagline}
        </p>
        <p
          className="rise mt-6 max-w-xl text-base leading-relaxed text-ink-muted"
          style={{ animationDelay: "220ms" }}
        >
          {site.intro}
        </p>
      </section>

      {/* ── Practices ─────────────────────────────────────────── */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Eyebrow>What I do</Eyebrow>
          <div className="mt-10 grid gap-px bg-line md:grid-cols-3">
            {practices.map((p) => (
              <article key={p.key} className="group bg-bg p-8 transition-colors hover:bg-bg-raised">
                <h2 className="font-display text-3xl font-medium tracking-[-0.02em] text-ink">
                  {p.title}
                  <span className="text-amber transition-opacity group-hover:opacity-100 md:opacity-0">
                    .
                  </span>
                </h2>
                <p className="mt-3 text-ink">{p.lead}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">{p.body}</p>
                <p className="mt-8 font-mono text-[11px] tracking-wider text-ink-faint">
                  {p.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Subjects ──────────────────────────────────────────── */}
      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1fr_2fr]">
          <div>
            <Eyebrow>Subjects taught</Eyebrow>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
              I adapt every course to the room. These are the areas I cover most often.
            </p>
          </div>
          <dl className="divide-y divide-line border-y border-line">
            {subjects.map((s) => (
              <div key={s.area} className="grid gap-2 py-5 sm:grid-cols-[12rem_1fr]">
                <dt className="font-display text-xl font-medium tracking-[-0.01em] text-ink">{s.area}</dt>
                <dd className="flex flex-wrap gap-x-4 gap-y-1 self-center font-mono text-xs text-ink-muted">
                  {s.topics.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Writing (no links yet, on purpose) ────────────────── */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-baseline gap-4">
            <Eyebrow>Writing</Eyebrow>
            <span className="font-mono text-[11px] tracking-wider text-ink-faint">
              [ {writing.status.toUpperCase()} ]
            </span>
          </div>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted">{writing.body}</p>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-14 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>More about me</Eyebrow>
            <a
              href={site.person.url}
              rel="me"
              className="glow-text mt-3 inline-block font-display text-2xl font-medium tracking-[-0.02em] text-ink transition-colors hover:text-amber md:text-3xl"
            >
              {site.person.urlLabel} ↗
            </a>
          </div>
          <div className="font-mono text-[11px] leading-relaxed tracking-wider text-ink-faint">
            <div>© {new Date().getFullYear()} {site.legalName}</div>
            <div>{site.location}</div>
          </div>
        </div>
      </footer>
    </main>
  );
}

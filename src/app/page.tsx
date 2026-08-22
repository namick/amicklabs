import { Scope } from "@/components/Scope";
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
        <a
          href={site.person.url}
          className="transition-colors hover:text-amber"
          rel="me"
        >
          {site.person.urlLabel} ↗
        </a>
      </header>

      {/* ── Hero: the instrument ──────────────────────────────── */}
      <section className="relative mx-auto max-w-6xl px-6 pt-10 pb-24 md:pt-16">
        <div className="graticule pointer-events-none absolute inset-0 -z-10" />

        <div className="rise relative overflow-hidden rounded-sm border border-line-strong bg-bg-raised">
          {/* bezel header */}
          <div className="flex items-center justify-between border-b border-line px-4 py-2 font-mono text-[11px] tracking-widest text-ink-faint">
            <span>CH1 · {site.legalName.toUpperCase()}</span>
            <span className="hidden sm:inline">XY MODE · 1 V/DIV</span>
            <span>
              <span className="blink text-amber">●</span> RUN
            </span>
          </div>

          <div className="relative">
            <Scope className="block h-[42vh] min-h-[280px] w-full md:h-[52vh]" />
            {/* wordmark sits on the screen itself */}
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-6 md:p-10">
              <h1 className="glow-text font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.9] tracking-tight text-ink">
                Amick <em className="text-amber">Labs</em>
              </h1>
            </div>
          </div>

          {/* readouts */}
          <div className="grid grid-cols-3 divide-x divide-line border-t border-line font-mono text-xs">
            {readouts.map((r) => (
              <div key={r.label} className="px-4 py-3">
                <div className="text-[10px] tracking-[0.2em] text-ink-faint">{r.label}</div>
                <div className="mt-1 text-amber">{r.value}</div>
              </div>
            ))}
          </div>
        </div>

        <p
          className="rise mt-12 max-w-2xl font-display text-3xl leading-snug text-ink md:text-4xl"
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
          <Eyebrow>What the lab does</Eyebrow>
          <div className="mt-10 grid gap-px bg-line md:grid-cols-3">
            {practices.map((p) => (
              <article key={p.key} className="group bg-bg p-8 transition-colors hover:bg-bg-raised">
                <h2 className="font-display text-4xl text-ink">
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
              Courses are adapted to the room. These are the areas covered most often.
            </p>
          </div>
          <dl className="divide-y divide-line border-y border-line">
            {subjects.map((s) => (
              <div key={s.area} className="grid gap-2 py-5 sm:grid-cols-[12rem_1fr]">
                <dt className="font-display text-2xl text-ink">{s.area}</dt>
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
            <Eyebrow>The person behind it</Eyebrow>
            <a
              href={site.person.url}
              rel="me"
              className="glow-text mt-3 inline-block font-display text-4xl text-ink transition-colors hover:text-amber md:text-5xl"
            >
              {site.person.name} ↗
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

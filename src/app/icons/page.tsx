/* TEMPORARY — favicon options. Delete /icons and public/icon-options when chosen. */

const options = [
  { f: "1-brackets", name: "Brackets", note: "Just the [ ] from the wordmark. Reads at 16px." },
  { f: "2-monogram", name: "A + rule", note: "Monogram with an amber baseline." },
  { f: "3-trace", name: "Trace", note: "The hero line with one blip." },
  { f: "4-dot", name: "Indicator", note: "The ● ACTIVE dot, with a faint ring." },
  { f: "5-al", name: "AL", note: "Two-letter lockup, L in amber." },
  { f: "6-graticule", name: "Graticule", note: "Scope crosshair. Busiest at 16px." },
  { f: "7-bracket-l", name: "[L]", note: "Bracketed L, straight from the wordmark." },
  { f: "8-inverted", name: "Brackets, inverted", note: "Amber tile, dark brackets. Loudest in a tab strip." },
];

function Icon({ f, size }: { f: string; size: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/icon-options/${f}.svg`} alt="" width={size} height={size} />;
}

export default function IconsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-dim">
        Temporary · icon options · delete /icons when done
      </p>
      <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {options.map((o, i) => (
          <div key={o.f} className="bg-bg p-6">
            <div className="flex items-end gap-5">
              <Icon f={o.f} size={96} />
              <Icon f={o.f} size={32} />
              <Icon f={o.f} size={16} />
            </div>
            <div className="mt-5 inline-flex items-center gap-2 rounded-t-md border border-b-0 border-line-strong bg-bg-raised px-3 py-1.5 text-xs text-ink-muted">
              <Icon f={o.f} size={16} />
              Amick Labs
            </div>
            <div className="mt-4 font-mono text-xs text-ink-faint">{String(i + 1).padStart(2, "0")}</div>
            <div className="text-sm text-ink">{o.name}</div>
            <p className="mt-1 text-sm text-ink-muted">{o.note}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

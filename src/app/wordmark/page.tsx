import {
  Space_Grotesk,
  Newsreader,
  Instrument_Serif,
  Fraunces,
  Playfair_Display,
  Cormorant_Garamond,
  Bricolage_Grotesque,
  JetBrains_Mono,
  Inter,
} from "next/font/google";

/** TEMPORARY — wordmark options. Delete /wordmark when chosen. */

const sg = Space_Grotesk({ subsets: ["latin"] });
const newsreader = Newsreader({ subsets: ["latin"], style: "italic", weight: ["300", "400"] });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic" });
const fraunces = Fraunces({ subsets: ["latin"], style: "italic", axes: ["SOFT", "WONK", "opsz"] });
const playfair = Playfair_Display({ subsets: ["latin"], style: "italic" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], style: "italic", weight: ["300", "400"] });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });
const jb = JetBrains_Mono({ subsets: ["latin"], style: ["normal", "italic"] });
const inter = Inter({ subsets: ["latin"], style: ["normal", "italic"] });

const big = "text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] tracking-[-0.04em]";
const A = ({ children }: { children: React.ReactNode }) => (
  <span className={`${sg.className} font-medium text-ink`}>{children}</span>
);

const options: { n: number; name: string; note: string; el: React.ReactNode }[] = [
  {
    n: 1, name: "Space Grotesk + Newsreader italic",
    note: "True italic from your personal site's serif. Sans/serif contrast does the work.",
    el: <A>Amick <em className={`${newsreader.className} font-light text-amber`} style={{ letterSpacing: "-0.02em" }}>Labs</em></A>,
  },
  {
    n: 2, name: "Space Grotesk + Instrument Serif italic",
    note: "Sharper, more condensed serif italic. Closest to the very first version.",
    el: <A>Amick <em className={`${instrument.className} text-amber`} style={{ letterSpacing: "-0.01em" }}>Labs</em></A>,
  },
  {
    n: 3, name: "Space Grotesk + Fraunces italic",
    note: "Soft, slightly wonky italic. Warmest of the serifs.",
    el: <A>Amick <em className={`${fraunces.className} text-amber`} style={{ fontVariationSettings: '"SOFT" 80, "WONK" 1', fontWeight: 400, letterSpacing: "-0.02em" }}>Labs</em></A>,
  },
  {
    n: 4, name: "Space Grotesk + Playfair italic",
    note: "High-contrast Didone italic. Most formal.",
    el: <A>Amick <em className={`${playfair.className} text-amber`}>Labs</em></A>,
  },
  {
    n: 5, name: "Space Grotesk + Cormorant italic",
    note: "Delicate, calligraphic. Very light against the heavy sans.",
    el: <A>Amick <em className={`${cormorant.className} text-amber`} style={{ fontWeight: 400 }}>Labs</em></A>,
  },
  {
    n: 6, name: "Space Grotesk + JetBrains Mono italic",
    note: "Monospace italic. Code-flavoured, no serif at all.",
    el: <A>Amick <em className={`${jb.className} text-amber`} style={{ fontWeight: 300, letterSpacing: "-0.03em" }}>Labs</em></A>,
  },
  {
    n: 7, name: "Space Grotesk, weight contrast",
    note: "No italic. Bold 'Amick', light 'Labs'. Quiet and modern.",
    el: <span className={`${sg.className} text-ink`}><span className="font-bold">Amick</span> <span className="font-light text-amber">Labs</span></span>,
  },
  {
    n: 8, name: "Space Grotesk, outlined Labs",
    note: "No italic. 'Labs' as a hollow amber outline.",
    el: <span className={`${sg.className} font-medium text-ink`}>Amick <span style={{ WebkitTextStroke: "2px #ffb000", color: "transparent" }}>Labs</span></span>,
  },
  {
    n: 9, name: "Space Grotesk, mono suffix",
    note: "'Labs' set small in mono, like a version tag or unit label.",
    el: <span className={`${sg.className} font-medium text-ink`}>Amick<span className={`${jb.className} ml-4 align-baseline text-[0.38em] font-medium tracking-[0.2em] text-amber`}>LABS</span></span>,
  },
  {
    n: 10, name: "Space Grotesk, bracketed",
    note: "Instrument/terminal flavour: Amick [Labs].",
    el: <span className={`${sg.className} font-medium text-ink`}>Amick <span className="font-light text-ink-faint">[</span><span className="text-amber">Labs</span><span className="font-light text-ink-faint">]</span></span>,
  },
  {
    n: 11, name: "Space Grotesk, underscored",
    note: "Same colour throughout; 'Labs' carries a 2px amber rule underneath instead.",
    el: <span className={`${sg.className} font-medium text-ink`}>Amick <span className="border-b-[0.06em] border-amber pb-[0.02em]">Labs</span></span>,
  },
  {
    n: 12, name: "Bricolage Grotesque, tight",
    note: "A whole different sans just for the wordmark. Denser, more character, no italic needed.",
    el: <span className={`${bricolage.className} text-ink`} style={{ fontWeight: 700, letterSpacing: "-0.05em" }}>Amick <span className="text-amber">Labs</span></span>,
  },
  {
    n: 13, name: "Inter italic (true)",
    note: "Your personal site's body font, which does have a real italic. Neutral and safe.",
    el: <span className={`${inter.className} text-ink`} style={{ fontWeight: 600 }}>Amick <em className="font-normal text-amber">Labs</em></span>,
  },
  {
    n: 14, name: "Lowercase, dot-separated",
    note: "amick.labs — reads like a domain / package name.",
    el: <span className={`${sg.className} font-medium lowercase text-ink`}>amick<span className="text-amber">.</span><span className="text-amber">labs</span></span>,
  },
];

export default function WordmarkPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-dim">
        Temporary · wordmark options · delete /wordmark when done
      </p>
      <div className="mt-10 divide-y divide-line border-y border-line">
        {options.map((o) => (
          <section key={o.n} className="grid gap-6 py-12 md:grid-cols-[3rem_1fr_18rem]">
            <div className="font-mono text-xs text-ink-faint">{String(o.n).padStart(2, "0")}</div>
            <div className={big}>{o.el}</div>
            <div>
              <div className="text-sm text-ink">{o.name}</div>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{o.note}</p>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

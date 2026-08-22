import {
  Newsreader,
  Instrument_Serif,
  Fraunces,
  Playfair_Display,
  DM_Serif_Display,
  Cormorant_Garamond,
  Space_Grotesk,
  Syne,
  Bricolage_Grotesque,
  JetBrains_Mono,
} from "next/font/google";

/**
 * TEMPORARY font comparison page. Delete this folder once a font is chosen.
 * Visit /fonts.
 */

const newsreader = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], weight: ["300", "400", "500"] });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"] });
const fraunces = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], axes: ["SOFT", "WONK", "opsz"] });
const playfair = Playfair_Display({ subsets: ["latin"], style: ["normal", "italic"] });
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400", style: ["normal", "italic"] });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500"], style: ["normal", "italic"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const syne = Syne({ subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], style: ["normal", "italic"] });

const candidates = [
  { n: 1, name: "Newsreader", note: "Same as nathanamick.com. Editorial serif, calm, optical sizes.", cls: newsreader.className, style: { fontWeight: 300 } },
  { n: 2, name: "Instrument Serif", note: "Current site font. Condensed, high-contrast, very display-only.", cls: instrument.className },
  { n: 3, name: "Fraunces", note: "Soft 'wonky' old-style serif with personality. Variable, lots of range.", cls: fraunces.className, style: { fontWeight: 400, fontVariationSettings: '"SOFT" 60, "WONK" 1' } },
  { n: 4, name: "Playfair Display", note: "Classic high-contrast Didone. Elegant, a bit formal.", cls: playfair.className },
  { n: 5, name: "DM Serif Display", note: "Chunky, warm, confident. Reads well small and large.", cls: dmSerif.className },
  { n: 6, name: "Cormorant Garamond", note: "Delicate Garamond. Refined, light, luxurious.", cls: cormorant.className, style: { fontWeight: 300 } },
  { n: 7, name: "Space Grotesk", note: "Geometric grotesque with quirks. Technical, friendly.", cls: spaceGrotesk.className, style: { fontWeight: 500, letterSpacing: "-0.02em" } },
  { n: 8, name: "Syne", note: "Wide, idiosyncratic sans. Art-school energy, very distinctive.", cls: syne.className, style: { fontWeight: 700, letterSpacing: "-0.01em" } },
  { n: 9, name: "Bricolage Grotesque", note: "Grotesque with a bit of wobble. Contemporary, characterful.", cls: bricolage.className, style: { fontWeight: 600, letterSpacing: "-0.03em" } },
  { n: 10, name: "JetBrains Mono", note: "Monospace wordmark. Leans fully into the instrument/terminal idea.", cls: jetbrains.className, style: { fontWeight: 400, letterSpacing: "-0.02em" } },
];

export default function FontsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-dim">
        Temporary · font comparison · delete /fonts when done
      </p>
      <div className="mt-10 divide-y divide-line border-y border-line">
        {candidates.map((c) => (
          <section key={c.n} className="grid gap-6 py-12 md:grid-cols-[3rem_1fr_18rem]">
            <div className="font-mono text-xs text-ink-faint">{String(c.n).padStart(2, "0")}</div>
            <div className={c.cls} style={c.style}>
              <div className="text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-tight text-ink">
                Amick <span className="text-amber">Labs</span>
              </div>
              <div className="mt-3 text-[clamp(1.5rem,3.5vw,2.5rem)] leading-tight text-ink-muted">
                Nathan Amick
              </div>
              <div className="mt-4 max-w-xl text-xl leading-snug text-ink">
                Teaching engineers. Building things. Occasionally both at once.
              </div>
              <div className="mt-3 max-w-xl text-xl italic leading-snug text-ink-muted">
                Teaching engineers. Building things. Occasionally both at once.
              </div>
            </div>
            <div>
              <div className="font-sans text-sm text-ink">{c.name}</div>
              <p className="mt-1 font-sans text-sm leading-relaxed text-ink-muted">{c.note}</p>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

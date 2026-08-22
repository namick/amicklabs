# amicklabs.com

The placeholder site for Amick Labs LLC. Next.js 16 (App Router), Tailwind v4, pnpm.

```bash
pnpm dev     # http://localhost:3000
pnpm build
pnpm lint
```

## Where things live

- **Copy** — all of it is in `src/config/site.ts`. The components in `src/app/page.tsx`
  just render whatever is there. If I want to change a sentence, that's the file.
- **Colors and fonts** — tokens at the top of `src/app/globals.css`. Space Grotesk for
  display, Geist for body, Geist Mono for the readouts.
- **The amber line in the hero** — `src/components/Trace.tsx`. It's flat until the
  mouse moves or the page scrolls, ripples, then settles. The two knobs are
  `energy *= 0.94` (how fast it settles) and the `0.42` amplitude multiplier.
- **The wordmark gradient** — `.text-amber-depth` in `globals.css`.

## Decisions I already made, so I stop re-deciding them

- One outbound link only (nathanamick.com, in the footer). Everything else about
  me lives over there. Don't duplicate the blog, the socials, or the projects here.
- No empty links. The Writing section stays link-free until there's something to
  link to.
- I can't name training partners yet. When I can, `practices[0]` has a TODO.
- `founded` in `site.ts` is a guess. Fix it when I look it up.
- Tried an outlined "Labs" in the wordmark. Chrome draws a hairline gap wherever
  the text fill meets `-webkit-text-stroke`, with every font. Would need SVG.
  Didn't like the neon look anyway. Moved on.

## Things I might add later

None of these exist yet, so nothing on the page points at them:

- A courses list: length, format, audience, one-line outcome each
- Partner names / logos, once allowed
- A couple of testimonials
- An availability line ("booking Q1 2027")
- Talks and workshops
- Open source / Labs projects with a sentence each
- The blog itself — probably `/notes` with MDX; the home page section is already
  waiting for links
- A mailto or contact form, if I ever want inbound here instead of via the
  personal site
- Legal footer bits (state of formation, privacy policy) if I add analytics or a form

## Deploy

Standard Next.js. `vercel` from this directory, or connect the repo in the dashboard.
If the domain ever changes, update `site.url` in `src/config/site.ts`. It must match the host
Vercel actually serves (currently www; the apex redirects to it), or Search Console will
reject the sitemap.

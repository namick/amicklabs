# amicklabs.com

Placeholder site for **Amick Labs LLC** — Next.js 16 (App Router), Tailwind v4, pnpm.

```bash
pnpm dev     # http://localhost:3000
pnpm build
pnpm lint
```

## Editing the content

Every word on the page comes from **`src/config/site.ts`**. Change copy there; the
components in `src/app/page.tsx` only render it. Items marked `TODO` in that file
are obvious placeholders (founding year, location).

Design tokens (colors, fonts) live at the top of `src/app/globals.css`.
The oscilloscope hero is `src/components/Scope.tsx`.

## Ideas for filling this out later

Things a one-person training/consulting LLC site commonly carries — none are
wired up yet, so nothing on the page links anywhere that doesn't exist:

- **Courses catalog** — a list of the courses you teach with length (e.g. "3 days"),
  format (live online / on-site), audience level, and a one-line outcome.
- **Training partners** — logos or names once you're allowed to name them.
- **Testimonials** — two or three short quotes from students or client leads.
- **Availability / calendar** — "Booking Q1 2027" style line, or a link to a
  scheduling tool.
- **Talks & workshops** — conference talks, meetup sessions, recorded videos.
- **Open source / Labs** — a few repos with a sentence each.
- **Writing** — the dev blog. Suggested route: `/notes` with MDX; the section on
  the home page is already there and just needs links.
- **Newsletter signup** — only if you'll actually send one.
- **Contact** — currently routes everything to nathanamick.com. Add a mailto or
  form when you want direct inbound.
- **Legal footer** — state of formation, business address if required, privacy
  policy if you add analytics or a form.

## Deploy

Standard Next.js — `vercel` from this directory, or connect the repo in the
Vercel dashboard. Update `metadataBase` in `src/app/layout.tsx` if the domain
differs from `amicklabs.com`.

# amicklabs.com

The company site for Amick Labs LLC. Next.js 16 (App Router), Tailwind v4, pnpm.

```bash
pnpm dev     # http://localhost:3000
pnpm build
pnpm lint
pnpm test    # Node.js 22.18+; mocked email requests, no email sent
```

## Where things live

- Copy for the home page and support introduction lives in `src/config/site.ts`.
  Form labels and feedback live in `src/components/SupportForm.tsx`.
- **Colors and fonts** — tokens at the top of `src/app/globals.css`. Space Grotesk for
  display, Geist for body, Geist Mono for the readouts.
- **The amber line in the hero** — `src/components/Trace.tsx`. It's flat until the
  mouse moves or the page scrolls, ripples, then settles. The two knobs are
  `energy *= 0.94` (how fast it settles) and the `0.42` amplitude multiplier.
- **The wordmark gradient** — `.text-amber-depth` in `globals.css`.

## Decisions I already made, so I stop re-deciding them

- nathanamick.com is the one link about me. Everything else about me lives over
  there. Don't duplicate the blog, the socials, or the projects here.
- The footer also has a contact email, a support form and links to Studio and its legal pages,
  because Stripe needs the LLC's business, contact and policies findable here.
- No empty links. The Writing section stays link-free until there's something to
  link to.
- I can't name training partners yet. When I can, `practices[0]` has a TODO.
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

## Deploy

Standard Next.js. `vercel` from this directory, or connect the repo in the dashboard.
If the domain ever changes, update `site.url` in `src/config/site.ts`. It must match the host
Vercel serves as primary. The apex is canonical; in Vercel's domain settings `www` must be
set to redirect to `amicklabs.com`, not the other way round, or Search Console rejects the sitemap.


## Support email setup

`/support` sends plain-text email through the Resend REST API. The sender and
recipient come from server environment variables. The visitor's validated email
becomes `reply_to`, so replies go to the visitor.

1. Copy `.env.example` to `.env.local` for development. Keep real values out of git.
2. Set `RESEND_API_KEY` to a Resend sending key authorized for your sender domain.
3. Verify the sender domain in Resend, including its required DNS records, and set
   `SUPPORT_FROM_EMAIL` to a bare address on that domain. Display names are not accepted.
4. Set `SUPPORT_TO_EMAIL` to Nathan's chosen inbox. This address stays on the server.
   The public fallback link uses `site.email`, currently `hello@amicklabs.com`.
5. Add all three variables to the intended Vercel environment and redeploy. Do not
   prefix them with `NEXT_PUBLIC_`. A build can pass without them, but the form
   returns an explicit configuration error and cannot send until they are set.
6. Submit a real message after deployment. Confirm inbox receipt and test Reply.
   A success response means Resend accepted the message, not confirmed delivery.
   Check Resend's email dashboard for delivery failures or bounces.

### Abuse controls

The handler checks same-origin JSON requests, caps the streamed body at 24 KB,
trims and bounds each field, rejects header control characters, and checks a
honeypot. Each form fetches an HMAC-signed token, valid after three seconds and
for one hour. The Resend API key signs it on the server. Key rotation invalidates
open forms; the client refreshes rejected tokens without clearing the fields.
The token also supplies a stable Resend idempotency key for retries, so an
uncertain network result can be retried with the same form. Keep the fields
unchanged when retrying an uncertain send. Resend retains idempotency keys for
24 hours. See the [Resend idempotency reference](https://resend.com/docs/dashboard/emails/idempotency-keys).
Provider requests time out after ten seconds. Logs contain status or
failure category only, never message contents or addresses.

These checks work across Vercel instances, but they do not stop a bot that fetches
fresh tokens. Before public use, add a Vercel Firewall rate-limit rule for
`POST /api/support`, starting at five requests per minute per IP and adjusting for
real traffic. Use the persistent edge rule rather than a process-local counter.
If that feature is unavailable on the hosting plan, use a shared rate-limit store
or a server-verified bot challenge before opening the form to traffic. No edge
rule, challenge, credentials or verified sender is provisioned by this code.

The form sends the name, email and message through Resend and into the recipient's
mailbox. It stores no submissions in an app database. Its inline notice explains
this and asks visitors to omit passwords and API keys. Review the linked Studio
privacy policy for contact-form coverage before publishing.

### Support tests

`pnpm test` uses Node's test runner and native TypeScript stripping. It covers
field validation, body limits, origin checks, honeypot and signed token failures,
missing configuration, the outgoing email payload, stable retry keys, provider
errors, network errors, timeouts and missing acceptance receipts. All requests to
Resend are mocked. No test needs credentials or sends real email.

/**
 * Home page copy and support page introduction. Form labels live in SupportForm.tsx.
 * Anything marked TODO is a placeholder worth replacing with your own words.
 */

export const site = {
  name: "Amick Labs",
  /** Canonical origin. Must match the host Vercel serves as primary (www should redirect here). */
  url: "https://amicklabs.com",
  legalName: "Amick Labs LLC",
  entity: "An Indiana limited liability company",
  email: "hello@amicklabs.com",
  tagline: "Teaching engineers. Building things. Occasionally both at once.",
  /** One honest paragraph about what the company is. */
  intro:
    "Amick Labs LLC is my independent practice. I'm Nathan Amick, a software engineer with twenty-five years of production work. Most weeks I'm teaching other engineers. The rest I'm consulting on software, producing videos for subscription clients, and building the things I teach about.",
  location: "Indianapolis, IN",
  person: {
    name: "Nathan Amick",
    url: "https://nathanamick.com",
    urlLabel: "nathanamick.com",
    /** Small tag shown beside the link so it's clear it leaves this site. */
    urlTag: "personal site",
  },
} as const;

/** The four things the company does. Order is the order on the page. */
export const practices = [
  {
    key: "teaching",
    title: "Teaching",
    lead: "Instructor-led technical training.",
    body:
      "I teach multi-day courses and workshops through established training partners, and run private sessions for individuals and engineering teams. I also mentor engineers one-to-one into AI-native practice, from seasoned SREs to first-time programmers. Everything is live and hands-on, built around the questions people actually ask.",
    // TODO: once you can name partners, list them here.
    detail: "Through training partners, directly with teams, and one-to-one.",
  },
  {
    key: "consulting",
    title: "Consulting",
    lead: "Short engagements, clear outcomes.",
    body:
      "I take on architecture reviews, proof-of-concept builds, and fractional engineering for teams that need a senior hand for a defined stretch of time. Lately that means agentic systems that do real work in production, not demos.",
    detail: "My availability is limited. My email is at the bottom of this page.",
  },
  {
    key: "video",
    title: "Video",
    lead: "Video production, by weekly subscription.",
    body:
      "I turn a client's raw footage, outlines and sketches into finished videos, with titles, descriptions, thumbnails and captions. I make them with my own tools and AI agents. Clients subscribe, send material from their phones and review each cut in Studio.",
    detail: "Two finished videos a week. Weekly price set per client.",
  },
  {
    key: "labs",
    title: "Labs",
    lead: "Experiments, tools, and open source.",
    body:
      "My side projects, internal tooling, and the occasional thing that escapes into the wild: multi-agent research systems, self-generating coursework, and a video series on consciousness for engineers. Most of it is for my own learning and research.",
    detail: "Notes and write-ups live here.",
  },
] as const;

/** Subjects taught. Each is a label + a few concrete examples. */
export const subjects = [
  {
    area: "AI & Agent engineering",
    topics: ["Building with LLMs", "Agents & tools", "RAG", "Evaluation"],
  },
  {
    area: "Web & TypeScript",
    topics: ["React", "Next.js", "Node.js", "TypeScript", "Testing"],
  },
  {
    area: "Cloud & DevOps",
    topics: ["GCP","AWS", "Containers", "CI/CD", "Infrastructure as code", "Vercel/Convex"],
  },
  {
    area: "Fundamentals",
    topics: ["Python", "Java", "Go", "System design", "Software architecture"],
  },
] as const;

/** Shown in the "Writing" section. No links until there's something to link. */
export const writing = {
  status: "In progress",
  body:
    "I'm working on long-form notes from the classroom — the explanations that worked, the ones that didn't, and the things worth writing down. ",
} as const;

/** Small instrument-panel readouts in the hero. Purely decorative — change or remove. */
export const readouts = [
  { label: "MODE", value: "TEACH / BUILD" },
  { label: "STATUS", value: "ACTIVE" },
] as const;

/** Footer links. The legal pages live on Studio. */
export const footerLinks = [
  { label: "Support", href: "/support" },
  { label: "Studio", href: "https://studio.amicklabs.com" },
  { label: "Terms", href: "https://studio.amicklabs.com/terms" },
  { label: "Privacy", href: "https://studio.amicklabs.com/privacy" },
  { label: "Refunds", href: "https://studio.amicklabs.com/refunds" },
] as const;


export const support = {
  heading: "Need a hand?",
  headingAccent: "Let's talk.",
  description: "Contact Nathan Amick for help with an Amick Labs product, course, or project.",
  intro: "Have a question about something I've built or taught? Tell me what's going on. This form sends your message straight to my inbox.",
  aside: "It's me reading these. A little context helps, whether you're stuck on a tool, following up on a course, or asking about working together.",
  privacy: "Your name, email and message are sent through Resend so I can read and reply. Please leave out passwords, API keys and other private account details.",
} as const;

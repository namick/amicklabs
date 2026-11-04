/**
 * All site copy lives here. Edit freely — components only read from this file.
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
      "I turn a client's raw footage, outlines and sketches into finished videos, with titles, descriptions, thumbnails and captions. I make them with my own tools and AI agents. Clients subscribe, send material from their phones and review each cut in Studio, and either of us can stop at any time.",
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

/** Footer links. Add only once these pages are live: the README's no-empty-links rule still holds. Legal links (terms, privacy, refunds) get added once Studio's pages are live. */
export const footerLinks = [
  { label: "Studio", href: "https://studio.amicklabs.com" },
] as const;

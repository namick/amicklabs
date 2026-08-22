/**
 * All site copy lives here. Edit freely — components only read from this file.
 * Anything marked TODO is a placeholder worth replacing with your own words.
 */

export const site = {
  name: "Amick Labs",
  /** Canonical origin. Must match the host Vercel serves as primary (www should redirect here). */
  url: "https://amicklabs.com",
  legalName: "Amick Labs LLC",
  tagline: "Teaching engineers. Building things. Occasionally both at once.",
  /** One honest paragraph about what the company is. */
  intro:
    "Amick Labs is my independent practice. I'm Nathan Amick, a software engineer with twenty-five years of production work, now pointed at teaching: most weeks I'm teaching other engineers, and the rest I'm building the things I teach about.",
  founded: "2020", // TODO: real founding year
  location: "Indianapolis, IN",
  person: {
    name: "Nathan Amick",
    url: "https://nathanamick.com",
    urlLabel: "nathanamick.com",
    /** Small tag shown beside the link so it's clear it leaves this site. */
    urlTag: "personal site",
  },
} as const;

/** The three things the company does. Order is the order on the page. */
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
    detail: "My availability is limited. Reach me through my personal site.",
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
  { label: "EST", value: site.founded },
  { label: "MODE", value: "TEACH / BUILD" },
  { label: "STATUS", value: "ACTIVE" },
] as const;

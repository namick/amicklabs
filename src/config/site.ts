/**
 * All site copy lives here. Edit freely — components only read from this file.
 * Anything marked TODO is a placeholder worth replacing with your own words.
 */

export const site = {
  name: "Amick Labs",
  legalName: "Amick Labs LLC",
  tagline: "Teaching engineers. Building things. Occasionally both at once.",
  /** One honest paragraph about what the company is. */
  intro:
    "Amick Labs is the independent practice of Nathan Amick — a software engineer who spends most weeks teaching other engineers, and the rest building the things he teaches about.",
  founded: "2020", // TODO: real founding year
  location: "United States", // TODO: city / state if you want it shown
  person: {
    name: "Nathan Amick",
    url: "https://nathanamick.com",
    urlLabel: "nathanamick.com",
  },
} as const;

/** The three things the company does. Order is the order on the page. */
export const practices = [
  {
    key: "teaching",
    title: "Teaching",
    lead: "Instructor-led technical training.",
    body:
      "Multi-day courses and workshops delivered through established training partners, plus private sessions for engineering teams. Live, hands-on, and built around the questions people actually ask.",
    // TODO: once you can name partners, list them here.
    detail: "Delivered through training partners and direct to teams.",
  },
  {
    key: "consulting",
    title: "Consulting",
    lead: "Short engagements, clear outcomes.",
    body:
      "Architecture reviews, proof-of-concept builds, and fractional engineering for teams who need a senior hand for a defined stretch of time.",
    detail: "Limited availability. Reach out via the personal site.",
  },
  {
    key: "labs",
    title: "Labs",
    lead: "Experiments, tools, and open source.",
    body:
      "The reason for the name. Side projects, internal tooling, and the occasional thing that escapes into the wild. Most of it is research for the classroom.",
    detail: "Notes and write-ups will land here eventually.",
  },
] as const;

/** Subjects taught. Each is a label + a few concrete examples. */
export const subjects = [
  {
    area: "Web & TypeScript",
    topics: ["React", "Next.js", "Node.js", "TypeScript", "Testing"],
  },
  {
    area: "Cloud & DevOps",
    topics: ["AWS", "Containers", "Kubernetes", "CI/CD", "Infrastructure as code"],
  },
  {
    area: "AI & LLM engineering",
    topics: ["Building with LLMs", "Agents & tools", "RAG", "Evaluation"],
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
    "Long-form notes from the classroom — the explanations that worked, the ones that didn't, and the things worth writing down. Nothing published yet; when there is, it'll be here.",
} as const;

/** Small instrument-panel readouts in the hero. Purely decorative — change or remove. */
export const readouts = [
  { label: "EST", value: site.founded },
  { label: "MODE", value: "TEACH / BUILD" },
  { label: "STATUS", value: "ACTIVE" },
] as const;

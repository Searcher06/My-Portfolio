import type { Profile } from "@/types/content";

export const profile: Profile = {
  name: "Alex Morgan",
  headline: "Senior Full-Stack Engineer crafting scalable products with exceptional UX.",
  location: "San Francisco, CA",
  bio: "I architect and ship high-performance web applications that scale to millions of users. With 6+ years of experience across startups and enterprise, I specialize in building robust backend systems, intuitive frontend experiences, and leading cross-functional teams to deliver measurable business impact. My focus is on clean code, system design, and creating products users love.",
  skills: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "PostgreSQL",
    "Redis",
    "AWS",
    "Docker",
    "Kubernetes",
    "GraphQL",
    "REST APIs",
    "Jest/Cypress",
    "CI/CD",
  ],
  socialLinks: [
    { label: "GitHub", href: "https://github.com/alexmorgan" },
    { label: "LinkedIn", href: "https://linkedin.com/in/alexmorgan" },
    { label: "Twitter", href: "https://twitter.com/alexmorgan" },
  ],
};

export const contentPrompts = {
  headlineTemplate:
    "I help [target users/companies] achieve [result] by building [type of software].",
  bioTemplate:
    "I am a [role] with [X years] building [product types]. I specialize in [strengths]. Recently, I delivered [impact] using [tools/stack].",
  projectTemplate: {
    problem:
      "Who had the problem, what pain existed, and why it mattered to the business.",
    solution:
      "What you designed and built, key technical decisions, and why they were chosen.",
    impact:
      "Measured result: performance gains, conversion change, reduced manual work, or delivery speed.",
  },
};
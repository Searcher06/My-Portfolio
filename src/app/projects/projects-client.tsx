"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

type ProjectDetail = {
  name: string;
  tagline: string;
  icon: string;
  image: string;
  status: string;
  challenge: string;
  solution: string;
  impact: string[];
  stack: { name: string; iconUrl: string }[];
  highlights: string[];
  liveUrl?: string;
  repoUrl?: string;
};

const projects: ProjectDetail[] = [
  {
    name: "Findora",
    tagline: "Trust-based lost and found platform for real communities.",
    icon: "verified_user",
    image: "/og/findora-placeholder.svg",
    status: "Live",
    challenge:
      "Most lost-and-found systems fail because reports are unstructured, communication is scattered, and ownership handovers are hard to verify.",
    solution:
      "Built a full-stack workflow with secure authentication, item reporting with image uploads, real-time chat, and a two-step code exchange to verify final handovers.",
    impact: [
      "Made item recovery safer with a verified handover process instead of guess-based claims.",
      "Improved response speed through searchable reports, status filters, and direct finder-owner chat.",
      "Enabled moderation and accountability with role-based controls, flags, and audit visibility.",
    ],
    stack: [
      { name: "React", iconUrl: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Express", iconUrl: "https://cdn.simpleicons.org/express/FFFFFF" },
      { name: "Node.js", iconUrl: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
      { name: "MongoDB", iconUrl: "https://cdn.simpleicons.org/mongodb/47A248" },
      { name: "Socket.IO", iconUrl: "https://cdn.simpleicons.org/socketdotio/010101" },
      { name: "Cloudinary", iconUrl: "https://cdn.simpleicons.org/cloudinary/3448C5" },
    ],
    highlights: ["2-step code handover verification", "Real-time secure chat", "Admin moderation and trust points"],
  },
  {
    name: "Brillit",
    tagline: "Personalized educational video platform powered by AI and fast search.",
    icon: "smart_display",
    image: "/og/opsboard-placeholder.svg",
    status: "Live",
    challenge:
      "Educational platforms often show generic content, making it hard for learners to discover videos that match their interests and learning path.",
    solution:
      "Built a full-stack learning platform with JWT auth, Google Gemini-driven recommendations, and Typesense-powered typo-tolerant search for faster discovery.",
    impact: [
      "Improved learning relevance with personalized suggestions based on watch history and selected interests.",
      "Reduced search friction with blazing-fast, typo-tolerant video discovery across educational content.",
      "Enabled smooth user retention with secure profiles, Cloudinary media handling, and seamless YouTube playback.",
    ],
    stack: [
      { name: "React", iconUrl: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Express", iconUrl: "https://cdn.simpleicons.org/express/FFFFFF" },
      { name: "Node.js", iconUrl: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
      { name: "MongoDB", iconUrl: "https://cdn.simpleicons.org/mongodb/47A248" },
      { name: "Typesense", iconUrl: "/icons/typesense.svg" },
      { name: "Google Gemini", iconUrl: "https://cdn.simpleicons.org/googlegemini/8E75FF" },
      { name: "Cloudinary", iconUrl: "https://cdn.simpleicons.org/cloudinary/3448C5" },
    ],
    highlights: ["Gemini-powered recommendations", "Typesense search engine", "JWT auth and profile personalization"],
    liveUrl: "https://brillit.vercel.app/",
    repoUrl: "https://github.com/Searcher06/Brillit.io",
  },
  {
    name: "SignalAuth",
    tagline: "Adaptive authentication for secure, low-friction product access.",
    icon: "shield_lock",
    image: "/og/signalauth-placeholder.svg",
    status: "Architecture completed",
    challenge:
      "B2B products often trade off strong security for smooth onboarding, hurting either trust or conversion.",
    solution:
      "Implemented adaptive policies using risk signals, device trust scoring, and session governance controls.",
    impact: [
      "Balanced onboarding speed with stronger account protection.",
      "Enabled risk-based auth decisions instead of one-size-fits-all friction.",
      "Reduced exposure to high-risk sessions through governance rules.",
    ],
    stack: [
      { name: "Node.js", iconUrl: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
      { name: "Redis", iconUrl: "https://cdn.simpleicons.org/redis/DC382D" },
      { name: "Sentry", iconUrl: "https://cdn.simpleicons.org/sentry/362D59" },
      { name: "JWT", iconUrl: "https://cdn.simpleicons.org/jsonwebtokens/000000" },
      { name: "Auth0", iconUrl: "https://cdn.simpleicons.org/auth0/EB5424" },
    ],
    highlights: ["Adaptive auth rules", "Device trust layer", "Session governance"],
  },
  {
    name: "HiringFlow",
    tagline: "Structured hiring pipeline for fairer and faster candidate decisions.",
    icon: "group",
    image: "/og/hiringflow-placeholder.svg",
    status: "Production-ready prototype",
    challenge:
      "Candidate feedback is usually inconsistent, slowing decisions and introducing evaluation bias.",
    solution:
      "Created a standardized scoring workflow with calibration checkpoints and API-first integrations across hiring stages.",
    impact: [
      "Improved decision quality with normalized interviewer scorecards.",
      "Reduced turnaround time by structuring feedback loops and ownership.",
      "Made process health measurable with stage-level pipeline visibility.",
    ],
    stack: [
      { name: "React", iconUrl: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Express", iconUrl: "https://cdn.simpleicons.org/express/FFFFFF" },
      { name: "MongoDB", iconUrl: "https://cdn.simpleicons.org/mongodb/47A248" },
      { name: "Postman", iconUrl: "https://cdn.simpleicons.org/postman/FF6C37" },
      { name: "Google Analytics", iconUrl: "https://cdn.simpleicons.org/googleanalytics/E37400" },
    ],
    highlights: ["Score normalization", "Interviewer calibration", "Pipeline analytics"],
  },
];

export default function ProjectsClientPage() {
  const reduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } },
  };

  return (
    <main className="relative overflow-hidden pb-20">
      <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <nav className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-transparent px-3 py-3 backdrop-blur-xl shadow-[0_18px_38px_-28px_rgba(99,102,241,0.35)] sm:h-20 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-white sm:gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#6366F1] to-[#818CF8] text-base text-[#061117] sm:h-10 sm:w-10">A</span>
            <span className="text-sm sm:text-base">Ahmad Ibrahim</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/" className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-[#A5B4FC]/45 hover:text-white sm:px-4 sm:text-sm">
              Home
            </Link>
            <Link href="/contact" className="rounded-lg border border-[#A5B4FC]/40 bg-[#A5B4FC]/10 px-3 py-2 text-xs font-semibold text-[#C7D2FE] sm:px-4 sm:text-sm">
              Contact
            </Link>
          </div>
        </nav>
      </header>

      <div className="mx-auto w-full max-w-7xl px-4 pt-28 sm:px-6 lg:px-8">
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#111a2a] via-[#0f1624] to-[#0b101a] p-5 sm:p-8 lg:p-10"
        >
          <div className="pointer-events-none absolute -right-20 -top-16 h-52 w-52 rounded-full bg-indigo-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 bottom-0 h-44 w-44 rounded-full bg-[#a5b4fc]/12 blur-3xl" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c7d2fe]">Project Portfolio</p>
          <h1 className="mt-3 text-2xl font-bold text-white sm:text-4xl lg:text-5xl">Detailed Project Breakdowns</h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-300 sm:text-base">
            A deeper look at how I approach complex product challenges, design resilient systems, and deliver business-ready outcomes.
          </p>
        </motion.section>

        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="mt-8 grid gap-5 lg:grid-cols-2"
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              variants={fadeUp}
              whileHover={reduceMotion ? undefined : { y: -3 }}
              className={`group relative overflow-hidden rounded-3xl border border-[#c7d2fe]/20 bg-gradient-to-br from-[#1a2435] via-[#121a29] to-[#0d1420] p-5 shadow-[0_10px_22px_-18px_rgba(129,140,248,0.2)] transition duration-300 hover:border-[#a5b4fc]/45 hover:shadow-[0_14px_28px_-20px_rgba(129,140,248,0.3)] sm:p-6 ${
                index === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(255,255,255,0.1),transparent_42%)] opacity-60" />

              <div className="relative flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/25 text-[#a5b4fc]">
                    <span className="material-symbols-outlined text-[20px]">{project.icon}</span>
                  </div>
                  <h2 className="mt-3 text-xl font-bold text-white sm:text-2xl">{project.name}</h2>
                  <p className="mt-1 text-sm text-slate-300">{project.tagline}</p>
                </div>
                <span className="w-fit rounded-full border border-[#a5b4fc]/40 bg-[#a5b4fc]/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#dbe3ff]">
                  {project.status}
                </span>
              </div>

              <div className="relative mt-5 space-y-3 text-sm text-slate-300">
                <div className="overflow-hidden rounded-2xl border border-white/10">
                  <Image
                    src={project.image}
                    alt={`${project.name} project preview`}
                    width={1200}
                    height={700}
                    className={`w-full object-cover ${index === 0 ? "h-56 lg:h-72" : "h-40 sm:h-44"}`}
                  />
                </div>
                <p><span className="font-semibold text-slate-100">Challenge:</span> {project.challenge}</p>
                <p><span className="font-semibold text-slate-100">Solution:</span> {project.solution}</p>
              </div>

              <div className="relative mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#c7d2fe]">Key Impact</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {project.impact.map((point) => (
                    <li key={point} className="flex items-start gap-2 rounded-lg border border-white/10 bg-black/20 p-2.5">
                      <span className="material-symbols-outlined mt-0.5 text-[16px] text-[#a5b4fc]">done</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Technology Stack</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item.name} className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-2.5 py-1 text-xs text-slate-200 sm:px-3">
                      <img src={item.iconUrl} alt={`${item.name} logo`} width={14} height={14} className="h-3.5 w-3.5" loading="lazy" />
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative mt-5 border-t border-white/10 pt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Project Highlights</p>
                <p className="mt-2 text-sm text-slate-300">{project.highlights.join(" • ")}</p>
                {(project.liveUrl || project.repoUrl) && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center rounded-lg border border-[#a5b4fc]/40 bg-[#a5b4fc]/10 px-3 py-1.5 text-xs font-semibold text-[#dbe3ff] hover:border-[#c7d2fe] hover:text-white"
                      >
                        Live Site
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-[#a5b4fc]/45 hover:text-white"
                      >
                        GitHub Repo
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </motion.section>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="mt-8"
        >
          <Link href="/" className="inline-flex text-sm font-semibold text-[#c7d2fe] hover:text-white">
            Back to home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

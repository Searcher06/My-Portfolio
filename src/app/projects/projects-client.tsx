"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

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
    name: "Primary Colours School Management System",
    tagline: "School operations platform for payment review and item fulfillment workflows.",
    icon: "school",
    image: "/og/primary-colours-placeholder.svg",
    status: "Live",
    challenge:
      "School operations were slowed by disconnected processes for fee setup, payment verification, and item handover, making accountability and fulfillment tracking difficult.",
    solution:
      "Built an end-to-end school management workflow with role-based access, configurable academic structures and fee items, parent payment submissions with evidence uploads, admin item-level review actions, and staff collection tracking.",
    impact: [
      "Improved fee collection operations with a structured review pipeline for pending, accepted, partial, and rejected submissions.",
      "Reduced fulfillment bottlenecks by routing accepted items directly to staff based on role assignments.",
      "Increased operational visibility through admin dashboards, configuration health checks, and PDF reporting.",
    ],
    stack: [
      { name: "React", iconUrl: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Node.js", iconUrl: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
      { name: "Express", iconUrl: "https://cdn.simpleicons.org/express/FFFFFF" },
      { name: "MongoDB", iconUrl: "https://cdn.simpleicons.org/mongodb/47A248" },
      { name: "Mongoose", iconUrl: "https://cdn.simpleicons.org/mongoose/880000" },
      { name: "Tailwind CSS", iconUrl: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
    ],
    highlights: ["Item-level admin approval flow", "Role-based staff assignment routing", "Payment evidence and fulfillment tracking"],
  },
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
  const rm = !!reduceMotion;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerAnim = {
    hidden: { opacity: 0, y: rm ? 0 : 48, scale: rm ? 1 : 0.97 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: rm ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
  };

  const impactList = {
    hidden: {},
    show: { transition: { staggerChildren: rm ? 0 : 0.07, delayChildren: 0.1 } },
  };

  const impactItem = {
    hidden: { opacity: 0, x: rm ? 0 : -18 },
    show: { opacity: 1, x: 0, transition: { duration: 0.38, ease: "easeOut" as const } },
  };

  const stackContainer = {
    hidden: {},
    show: { transition: { staggerChildren: rm ? 0 : 0.055 } },
  };

  const stackBadge = {
    hidden: { opacity: 0, scale: rm ? 1 : 0.72 },
    show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 380, damping: 18 } },
  };

  return (
    <main className="relative overflow-hidden pb-20">

      {/* ── Navigation ── */}
      <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-3 sm:px-6 lg:px-8">
        <nav className={`mx-auto flex h-[3.75rem] w-full max-w-7xl items-center justify-between rounded-2xl border px-4 backdrop-blur-2xl transition-all duration-500 sm:h-[4.25rem] sm:px-7 ${
          scrolled
            ? "border-white/[0.1] bg-[#020817]/95 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06),0_28px_64px_-20px_rgba(37,99,235,0.45)]"
            : "border-white/[0.06] bg-[#020817]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_4px_24px_rgba(37,99,235,0.1)]"
        }`}>

          {/* Logo */}
          <Link href="/" className="inline-flex shrink-0 items-center gap-3">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-[#2563EB] to-[#38BDF8] text-sm font-bold text-white shadow-[0_4px_16px_rgba(37,99,235,0.5)] sm:h-10 sm:w-10 sm:text-base">
              A
              <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
            </span>
            <span className="hidden text-sm font-semibold text-white sm:block sm:text-[0.9375rem]">Ahmad Ibrahim</span>
          </Link>

          {/* Right side */}
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/"
              className="nav-icon-btn inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-slate-300 transition-all hover:border-white/[0.14] hover:bg-white/[0.07] hover:text-white sm:h-auto sm:w-auto sm:gap-1.5 sm:rounded-xl sm:px-4 sm:py-2"
            >
              <span className="material-symbols-outlined text-[15px]">arrow_back</span>
              <span className="hidden text-xs font-semibold sm:block sm:text-sm">Home</span>
            </Link>
            <Link
              href="/contact"
              className="hidden items-center gap-1.5 rounded-xl border border-[#3B82F6] bg-[#2563EB]/10 px-4 py-2 text-sm font-semibold text-[#3B82F6] transition-all hover:border-[#2563EB] hover:bg-[#2563EB] hover:text-white hover:shadow-[0_4px_20px_rgba(37,99,235,0.5)] sm:inline-flex"
            >
              Hire Me
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* ── Background atmosphere ── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-60 left-1/2 h-[50rem] w-[50rem] -translate-x-1/2 rounded-full bg-[#2563EB]/10 blur-[150px]" />
        <div className="absolute -right-40 top-[30%] h-[22rem] w-[22rem] rounded-full bg-sky-600/7 blur-[110px]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 pt-28 sm:px-6 lg:px-8">

        {/* ── Page header ── */}
        <motion.section
          variants={headerAnim}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="dark-surface relative overflow-hidden rounded-3xl border border-white/[0.07] bg-linear-to-b from-[#112040] via-[#0E1E35] to-[#08101C] p-5 sm:p-8 lg:p-10"
        >
          <div className="pointer-events-none absolute -right-20 -top-16 h-52 w-52 rounded-full bg-blue-500/16 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 bottom-0 h-44 w-44 rounded-full bg-sky-700/10 blur-3xl" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#93C5FD]">Project Portfolio</p>
          <h1 className="mt-3 text-2xl font-bold text-white sm:text-4xl lg:text-5xl">Detailed Project Breakdowns</h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-400 sm:text-base">
            A deeper look at how I approach complex product challenges, design resilient systems, and deliver business-ready outcomes.
          </p>
        </motion.section>

        {/* ── Projects grid ── */}
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {projects.map((project, index) => {
            const slideX = rm ? 0 : index === 0 ? 0 : (index - 1) % 2 === 0 ? -52 : 52;
            const slideY = rm ? 0 : index === 0 ? 52 : 20;
            return (
              <motion.article
                key={project.name}
                initial={{ opacity: 0, x: slideX, y: slideY }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.06 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index === 0 ? 0 : (index - 1) * 0.08 }}
                whileHover={rm ? undefined : { y: -6, scale: 1.012, transition: { type: "spring", stiffness: 260, damping: 22 } }}
                className={`dark-surface group relative overflow-hidden rounded-3xl border border-[#BFDBFE]/10 bg-linear-to-br from-[#152540] via-[#111E35] to-[#0C1525] p-5 transition-colors duration-300 hover:border-[#93C5FD]/32 hover:shadow-[0_16px_36px_-20px_rgba(59,130,246,0.35)] sm:p-6 ${
                  index === 0 ? "lg:col-span-2" : ""
                }`}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(255,255,255,0.06),transparent_42%)] opacity-60" />

                {/* Header row */}
                <div className="relative flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-[#2563EB]/10 text-[#60A5FA]">
                      <span className="material-symbols-outlined text-[20px]">{project.icon}</span>
                    </div>
                    <h2 className="mt-3 text-xl font-bold text-white sm:text-2xl">{project.name}</h2>
                    <p className="mt-1 text-sm text-slate-400">{project.tagline}</p>
                  </div>
                  <span className="w-fit rounded-full border border-[#93C5FD]/28 bg-[#2563EB]/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#BFDBFE]">
                    {project.status}
                  </span>
                </div>

                {/* Image + text */}
                <div className="relative mt-5 space-y-3 text-sm text-slate-400">
                  <div className="overflow-hidden rounded-2xl border border-white/[0.07]">
                    <Image
                      src={project.image}
                      alt={`${project.name} project preview`}
                      width={1200}
                      height={700}
                      className={`w-full object-cover ${index === 0 ? "h-56 lg:h-72" : "h-40 sm:h-44"}`}
                    />
                  </div>
                  <p><span className="font-semibold text-slate-200">Challenge:</span> {project.challenge}</p>
                  <p><span className="font-semibold text-slate-200">Solution:</span> {project.solution}</p>
                </div>

                {/* Key impact — staggered slide-in */}
                <div className="relative mt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#93C5FD]">Key Impact</p>
                  <motion.ul
                    className="mt-3 space-y-2 text-sm text-slate-400"
                    variants={impactList}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                  >
                    {project.impact.map((point) => (
                      <motion.li
                        key={point}
                        variants={impactItem}
                        className="flex items-start gap-2 rounded-lg border border-white/[0.07] bg-black/20 p-2.5"
                      >
                        <span className="material-symbols-outlined mt-0.5 text-[16px] text-[#60A5FA]">done</span>
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

                {/* Tech stack — pop-in badges */}
                <div className="relative mt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Technology Stack</p>
                  <motion.div
                    className="mt-2 flex flex-wrap gap-2"
                    variants={stackContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    {project.stack.map((item) => (
                      <motion.span
                        key={item.name}
                        variants={stackBadge}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-xs text-slate-300 sm:px-3"
                      >
                        <img src={item.iconUrl} alt={`${item.name} logo`} width={14} height={14} className="h-3.5 w-3.5" loading="lazy" />
                        {item.name}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>

                {/* Highlights + links */}
                <div className="relative mt-5 border-t border-white/[0.07] pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Project Highlights</p>
                  <p className="mt-2 text-sm text-slate-400">{project.highlights.join(" · ")}</p>
                  {(project.liveUrl ?? project.repoUrl) && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#93C5FD]/28 bg-[#2563EB]/10 px-3 py-1.5 text-xs font-semibold text-[#BFDBFE] transition hover:border-[#93C5FD]/55 hover:text-white"
                        >
                          <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                          Live Site
                        </a>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-[#60A5FA]/40 hover:text-white"
                        >
                          <img src="https://cdn.simpleicons.org/github/FFFFFF" alt="GitHub" className="h-3.5 w-3.5" />
                          GitHub Repo
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="mt-8"
        >
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#93C5FD] transition hover:text-white">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

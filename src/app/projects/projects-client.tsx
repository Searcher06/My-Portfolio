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

const toProjectId = (name: string) =>
  name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const projects: ProjectDetail[] = [
  {
    name: "School Payment & Distribution Management System",
    tagline: "Payment review and item fulfillment workflow platform.",
    icon: "school",
    image: "/schoolmanagement.png",
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
    image: "/findorabrowse.png",
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
    liveUrl: "https://findora-snowy.vercel.app/",
  },
  {
    name: "Brillit",
    tagline: "Personalized educational video platform powered by AI and fast search.",
    icon: "smart_display",
    image: "/brillitbrowse.png",
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
    name: "Vestlee",
    tagline: "AI-powered job application assistant — tailored CVs, cover letters, Gmail tracking, and mock interviews.",
    icon: "work",
    image: "/vestleepic.png",
    status: "In Progress",
    challenge:
      "Applying for jobs is a full-time job in itself. Developers waste hours tweaking CVs and writing cover letters for every role, with no reliable way to track applications or prepare for interviews systematically.",
    solution:
      "Built a full-stack AI job application assistant with CV parsing, Groq-powered CV tailoring and cover letter generation, ATS match scoring, Gmail OAuth integration for automatic application tracking, real-time voice mock interviews via Deepgram, and a comprehensive CV audit system — all backed by a structured profile builder and PDF export.",
    impact: [
      "Eliminates hours of manual CV and cover letter customization per application with AI-generated, role-specific documents.",
      "Auto-tracks application statuses by scanning connected Gmail for confirmations, interview invites, and rejections.",
      "Helps developers prepare with real-time AI voice mock interviews and detailed post-session feedback on communication, technical depth, and confidence.",
      "ATS match scoring identifies keyword gaps before applying, improving pass rates through applicant tracking systems.",
    ],
    stack: [
      { name: "Next.js", iconUrl: "https://cdn.simpleicons.org/nextdotjs/FFFFFF" },
      { name: "React", iconUrl: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "TypeScript", iconUrl: "https://cdn.simpleicons.org/typescript/3178C6" },
      { name: "Tailwind CSS", iconUrl: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
      { name: "Node.js", iconUrl: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
      { name: "Express", iconUrl: "https://cdn.simpleicons.org/express/FFFFFF" },
      { name: "MongoDB", iconUrl: "https://cdn.simpleicons.org/mongodb/47A248" },
      { name: "Groq / Llama 3.1", iconUrl: "https://cdn.simpleicons.org/meta/0081FB" },
      { name: "Deepgram", iconUrl: "https://cdn.simpleicons.org/deepgram/00B293" },
      { name: "Google APIs", iconUrl: "https://cdn.simpleicons.org/google/4285F4" },
      { name: "Docker", iconUrl: "https://cdn.simpleicons.org/docker/2496ED" },
      { name: "Zustand", iconUrl: "https://cdn.simpleicons.org/zustand/FF4154" },
    ],
    highlights: [
      "AI CV tailoring + ATS match scoring",
      "Gmail OAuth for auto application tracking",
      "Real-time voice mock interviews with Deepgram",
      "AI CV audit with one-click automated fixes",
      "PDF export for tailored CVs",
    ],
    liveUrl: "https://vestlee.vercel.app/",
    repoUrl: "https://github.com/Searcher06/Vestlee",
  },
];

export default function ProjectsClientPage() {
  const reduceMotion = useReducedMotion();
  const rm = !!reduceMotion;
  const [scrolled, setScrolled] = useState(false);
  const [highlightedProjectId, setHighlightedProjectId] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const syncHighlightFromHash = () => {
      const hashId = window.location.hash.replace(/^#/, "");
      if (!hashId) {
        setHighlightedProjectId(null);
        return;
      }

      setHighlightedProjectId(hashId);
      timeoutId = setTimeout(() => setHighlightedProjectId(null), 2600);
    };

    syncHighlightFromHash();
    window.addEventListener("hashchange", syncHighlightFromHash);

    return () => {
      window.removeEventListener("hashchange", syncHighlightFromHash);
      if (timeoutId) clearTimeout(timeoutId);
    };
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
            ? "border-white/[0.1] bg-[#0c0c0e]/95 shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]"
            : "border-white/[0.06] bg-[#0c0c0e]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
        }`}>

          {/* Logo */}
          <Link href="/" className="inline-flex shrink-0 items-center gap-3">
            <Image src="/ahmadlogo.png" alt="Ahmad logo" width={44} height={44} className="h-9 w-auto sm:h-10" />
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

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-60 left-1/2 h-[50rem] w-[50rem] -translate-x-1/2 rounded-full bg-[#2563EB]/[0.04] blur-[180px]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 pt-28 sm:px-6 lg:px-8">

        {/* ── Page header ── */}
        <motion.section
          variants={headerAnim}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="dark-surface relative overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-b from-[#1a1a1f] via-[#141416] to-[#111113] p-5 sm:p-8 lg:p-10"
        >
          <div className="pointer-events-none absolute -right-20 -top-16 h-52 w-52 rounded-full bg-white/[0.02] blur-3xl" />
          <div className="pointer-events-none absolute -left-20 bottom-0 h-44 w-44 rounded-full bg-white/[0.015] blur-3xl" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#93C5FD]">Project Portfolio</p>
          <h1 className="mt-3 text-2xl font-bold text-white sm:text-4xl lg:text-5xl">Detailed Project Breakdowns</h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-400 sm:text-base">
            A deeper look at how I approach complex product challenges, design resilient systems, and deliver business-ready outcomes.
          </p>
        </motion.section>

        {/* ── Projects grid ── */}
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {projects.map((project, index) => {
            const projectId = toProjectId(project.name);
            const isHighlighted = highlightedProjectId === projectId;
            const slideX = rm ? 0 : index === 0 ? 0 : (index - 1) % 2 === 0 ? -52 : 52;
            const slideY = rm ? 0 : index === 0 ? 52 : 20;
            return (
              <motion.article
                key={project.name}
                id={projectId}
                initial={{ opacity: 0, x: slideX, y: slideY }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.06 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index === 0 ? 0 : (index - 1) * 0.08 }}
                whileHover={rm ? undefined : { y: -6, scale: 1.012, transition: { type: "spring", stiffness: 260, damping: 22 } }}
                className={`dark-surface group relative scroll-mt-28 flex h-full flex-col overflow-hidden rounded-2xl border bg-gradient-to-br from-[#1c1c22] via-[#161618] to-[#131315] p-4 transition-all duration-300 sm:p-5 ${
                  isHighlighted
                    ? "border-[#60A5FA]/80 shadow-[0_0_0_1px_rgba(96,165,250,0.45),0_0_40px_-14px_rgba(96,165,250,0.9)]"
                    : "border-[#BFDBFE]/10 hover:border-[#93C5FD]/32 hover:shadow-[0_16px_36px_-20px_rgba(59,130,246,0.35)]"
                }`}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(255,255,255,0.06),transparent_42%)] opacity-60" />
                {isHighlighted ? (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-[#93C5FD]/55 bg-[#60A5FA]/20 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#BFDBFE] animate-pulse">
                    <span className="material-symbols-outlined text-[14px]">my_location</span>
                    Selected
                  </span>
                ) : null}

                {/* Header row */}
                <div className="relative flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-[#2563EB]/10 text-[#60A5FA]">
                      <span className="material-symbols-outlined text-[20px]">{project.icon}</span>
                    </div>
                    <h2 className="mt-3 text-lg font-bold text-white sm:text-xl">{project.name}</h2>
                    <p className="mt-1 text-sm text-slate-400 line-clamp-2">{project.tagline}</p>
                  </div>
                  <span className="w-fit whitespace-nowrap rounded-full bg-[#2563EB]/10 px-2.5 py-1 text-[11px] font-semibold text-[#BFDBFE]">
                    {project.status}
                  </span>
                </div>

                {/* Image + text */}
                <div className="relative mt-4 space-y-3 text-sm text-slate-400">
                  <div className="overflow-hidden rounded-2xl bg-white">
                    <Image
                      src={project.image}
                      alt={`${project.name} project preview`}
                      width={1200}
                      height={700}
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="line-clamp-3"><span className="font-semibold text-slate-200">Challenge:</span> {project.challenge}</p>
                  <p className="line-clamp-3"><span className="font-semibold text-slate-200">Solution:</span> {project.solution}</p>
                </div>

                {/* Key impact — staggered slide-in */}
                <div className="relative mt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#93C5FD]">Key Impact</p>
                  <motion.ul
                    className="mt-2.5 space-y-2 text-sm text-slate-400"
                    variants={impactList}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                  >
                    {project.impact.map((point) => (
                      <motion.li
                        key={point}
                        variants={impactItem}
                        className="flex items-start gap-2 rounded-lg border border-white/[0.07] bg-black/20 p-2"
                      >
                        <span className="material-symbols-outlined mt-0.5 text-[16px] text-[#60A5FA]">done</span>
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

                {/* Tech stack — pop-in badges */}
                <div className="relative mt-4">
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
                <div className="relative mt-auto border-t border-white/[0.07] pt-4">
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

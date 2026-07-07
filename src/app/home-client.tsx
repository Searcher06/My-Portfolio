"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

type Tool = {
  name: string;
  iconUrl: string;
};

type ProjectCard = {
  name: string;
  image: string;
  problem: string;
  solution: string;
  tools: Tool[];
  href: string;
  liveUrl?: string;
};

type SkillItem = {
  name: string;
  iconUrl: string;
};

const truncateText = (text: string, maxLength: number) =>
  text.length > maxLength ? `${text.slice(0, maxLength).trimEnd()}...` : text;

const credibilityPoints = [
  "From rough idea to working product — without losing what made the idea good",
  "Every feature ships with the edge cases already thought through",
  "Code that the next developer can actually read, change, and trust",
];

const quickStats = [
  { label: "Projects Built", value: "8", trend: "+4 this year" },
  { label: "Workflows Improved", value: "3", trend: "Across different product types" },
  { label: "Performance Gain", value: "35%", trend: "Faster app experience for users" },
  { label: "Current Focus", value: "Findora", trend: "A trust-first product for real communities" },
];

const findoraFeatures = [
  "Secure auth with email verification, password reset, and role-based access",
  "Lost/found item reporting with image uploads, search, and filter tools",
  "Real-time chat plus 2-step handover code verification for trusted returns",
  "Admin dashboard for user management, item moderation, and audit logs",
  "Trust points and profile stats that reward verified successful returns",
];

const otherProjects: ProjectCard[] = [
  {
    name: "School Payment & Distribution Management System",
    image: "/schoolmanagement.png",
    problem:
      "School fee tracking and item distribution were fragmented, making payment review, role assignment, and fulfillment difficult to manage end-to-end.",
    solution:
      "Built a full workflow covering fee configuration, parent payment submissions, admin item-level review, role-based staff routing, and collection tracking with reporting.",
    tools: [
      { name: "React", iconUrl: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Node.js", iconUrl: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
      { name: "Express", iconUrl: "https://cdn.simpleicons.org/express/FFFFFF" },
      { name: "MongoDB", iconUrl: "https://cdn.simpleicons.org/mongodb/47A248" },
    ],
    href: "/projects#school-payment-and-distribution-management-system",
  },
  {
    name: "Brillit",
    image: "/brillitbrowse.png",
    problem:
      "Learners struggle to find the right educational videos quickly, and generic feeds rarely match personal learning goals.",
    solution:
      "Built a personalized educational video platform with AI-powered recommendations, typo-tolerant search, and secure user profiles.",
    tools: [
      { name: "Node.js", iconUrl: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
      { name: "MongoDB", iconUrl: "https://cdn.simpleicons.org/mongodb/47A248" },
      { name: "Typesense", iconUrl: "/icons/typesense.svg" },
    ],
    href: "/projects#brillit",
    liveUrl: "https://brillit.vercel.app/",
  },
  {
    name: "Vestlee",
    image: "/vestlee.png",
    problem:
      "Applying for jobs is a full-time job. Developers waste hours tweaking CVs and writing cover letters per role, with no reliable way to track applications or prepare for interviews.",
    solution:
      "Built an AI job application assistant with CV tailoring, ATS match scoring, Gmail-based application tracking, real-time voice mock interviews, and a CV audit system with one-click fixes.",
    tools: [
      { name: "Next.js", iconUrl: "https://cdn.simpleicons.org/nextdotjs/FFFFFF" },
      { name: "TypeScript", iconUrl: "https://cdn.simpleicons.org/typescript/3178C6" },
      { name: "Node.js", iconUrl: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
      { name: "Express", iconUrl: "https://cdn.simpleicons.org/express/FFFFFF" },
      { name: "MongoDB", iconUrl: "https://cdn.simpleicons.org/mongodb/47A248" },
      { name: "Groq / Llama 3.1", iconUrl: "https://cdn.simpleicons.org/meta/0081FB" },
      { name: "Deepgram", iconUrl: "https://cdn.simpleicons.org/deepgram/00B293" },
      { name: "Google APIs", iconUrl: "https://cdn.simpleicons.org/google/4285F4" },
    ],
    href: "/projects#vestlee",
    liveUrl: "https://vestlee.vercel.app/",
  },
];

const findoraLiveUrl = "https://findora-snowy.vercel.app/";

const currentlyExploring = [
  { title: "AI systems for real-world products", note: "Exploring how AI can power useful features inside scalable web applications.", icon: "smart_toy" },
  { title: "System design patterns", note: "Reusable architecture for high-change product teams.", icon: "schema" },
  { title: "Backend performance", note: "Profiling and tuning under realistic production load.", icon: "speed" },
];

const services = [
  { title: "Frontend Development", description: "I create clear, engaging product experiences that make it easy for people to use your platform.", icon: "web" },
  { title: "Backend Development", description: "I build the core systems behind your product so they stay fast, secure, and dependable as you grow.", icon: "dns" },
  { title: "API Integration", description: "I connect your tools and services so your product runs as one smooth, connected experience.", icon: "api" },
  { title: "Responsive Design", description: "I make sure your product looks clean and works well on phones, tablets, and desktop screens.", icon: "devices" },
  { title: "Cloud Solutions", description: "I set up cloud infrastructure that keeps your product online, stable, and ready for increasing demand.", icon: "cloud" },
];

const skillGroups = [
  {
    label: "Frontend",
    items: [
      { name: "HTML", iconUrl: "https://cdn.simpleicons.org/html5/E34F26" },
      { name: "CSS", iconUrl: "https://cdn.simpleicons.org/css/1572B6" },
      { name: "JavaScript", iconUrl: "https://cdn.simpleicons.org/javascript/F7DF1E" },
      { name: "React.js", iconUrl: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Tailwind CSS", iconUrl: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
    ] satisfies SkillItem[],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", iconUrl: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
      { name: "Express.js", iconUrl: "https://cdn.simpleicons.org/express/FFFFFF" },
    ] satisfies SkillItem[],
  },
  {
    label: "Databases",
    items: [
      { name: "PostgreSQL", iconUrl: "https://cdn.simpleicons.org/postgresql/4169E1" },
      { name: "MongoDB", iconUrl: "https://cdn.simpleicons.org/mongodb/47A248" },
    ] satisfies SkillItem[],
  },
  {
    label: "Languages",
    items: [
      { name: "TypeScript", iconUrl: "https://cdn.simpleicons.org/typescript/3178C6" },
      { name: "JavaScript", iconUrl: "https://cdn.simpleicons.org/javascript/F7DF1E" },
    ] satisfies SkillItem[],
  },
  {
    label: "Tools",
    items: [
      { name: "Git", iconUrl: "https://cdn.simpleicons.org/git/F05032" },
      { name: "GitHub", iconUrl: "https://cdn.simpleicons.org/github/FFFFFF" },
    ] satisfies SkillItem[],
  },
];

const workExperience = [
  {
    role: "Backend Engineer",
    company: "Auvra",
    period: "Jan 13, 2026 - Present",
    location: "Remote",
    summary: "Owning backend architecture and core services for a trust-critical platform focused on reliability, compliance, and scale.",
    highlights: [
      "Architected scalable APIs and service layers that support high-growth product requirements and faster feature delivery.",
      "Integrated critical third-party flows including payment rails, KYC checks, and blockchain-related operations.",
      "Enforced backend quality standards across security, data integrity, and performance optimization through code review and testing routines.",
      "Partnered with product and design to convert fast-moving requirements into resilient backend implementations.",
    ],
  },
  {
    role: "Fullstack Engineer (Contract)",
    company: "School Fee & Management System Project",
    period: "Feb 2026 - Apr 26, 2026",
    location: "Kano, Nigeria",
    summary: "Delivered a complete fee and distribution workflow platform that digitized school finance and fulfillment operations.",
    highlights: [
      "Built end-to-end flows for fee setup, parent payment submissions, verification decisions, and item collection tracking.",
      "Implemented role-based workflows that reduced operational bottlenecks between admin reviewers and distribution staff.",
      "Improved accountability with item-level auditability and reporting-friendly data structures for management visibility.",
    ],
  },
  {
    role: "Software Engineer Intern (Backend)",
    company: "BOI BUK Innovation Hub",
    period: "Mar 9, 2026 - Present",
    location: "Bayero University Kano, Nigeria",
    summary: "Building backend foundations for a centralized digital platform connecting innovation hubs across Bayero University Kano.",
    highlights: [
      "Mapped PRD requirements into backend modules for hubs directory, programs, events, and communication workflows.",
      "Contributed API and service design for both public platform experiences and admin-console operations.",
      "Supported scalable architecture decisions around role-based access, content lifecycle management, and institutional operations.",
    ],
  },
];

const navItems = [
  { label: "Home", href: "#home", icon: "house" },
  { label: "Projects", href: "#projects", icon: "rocket_launch" },
  { label: "Services", href: "#services", icon: "design_services" },
  { label: "Experience", href: "#journey", icon: "deployed_code_history" },
  { label: "About", href: "#about", icon: "person" },
  { label: "Contact", href: "#contact", icon: "chat" },
];

export default function HomeClient() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } },
  };

  const sectionReveal = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 40, scale: reduceMotion ? 1 : 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.75, ease: EASE } },
  };

  const cardReveal = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  return (
    <main className="relative overflow-hidden">

      {/* ── Navigation ── */}
      <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-3 sm:px-6 lg:px-8">
        <nav className={`mx-auto flex h-[4.25rem] w-full max-w-7xl items-center justify-between rounded-2xl border px-5 backdrop-blur-2xl transition-all duration-500 sm:h-[4.25rem] sm:px-7 ${
          scrolled
            ? "border-white/[0.08] bg-[#020817]/80 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05),0_28px_64px_-20px_rgba(37,99,235,0.35)]"
            : "border-transparent bg-[#020817]/30 shadow-none"
        }`}>
          <a href="#home" className="inline-flex items-center gap-3 shrink-0">
            <Image src="/ahmadlogo.png" alt="Ahmad Ibrahim logo" width={44} height={44} className="h-9 w-auto sm:h-10" />
            <span className="text-sm font-semibold text-white sm:text-[0.9375rem]">Ahmad Ibrahim</span>
          </a>
          <ul className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="group relative inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium text-slate-400 transition-colors duration-200 hover:text-white">
                  {item.label}
                  <span className="absolute bottom-1.5 left-4 right-4 h-px origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#2563EB] to-[#38BDF8] transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2.5 shrink-0">
            <a href="#contact" className="hidden items-center gap-1.5 rounded-xl bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/[0.11] hover:text-white lg:inline-flex">
              Hire Me
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              className="nav-icon-btn relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.04] text-slate-400 transition-colors hover:border-white/[0.14] hover:bg-white/[0.07] lg:hidden"
              aria-label="Toggle navigation"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileNavOpen ? "close" : "menu"}
                  className="material-symbols-outlined text-[20px]"
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.16 }}
                >
                  {mobileNavOpen ? "close" : "menu"}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile nav dropdown ── */}
      <AnimatePresence>
        {mobileNavOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileNavOpen(false)}
            />
            <motion.div
              className="mobile-nav-panel fixed inset-x-4 top-[4.5rem] z-50 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#050D1C]/96 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.85),0_0_0_1px_rgba(37,99,235,0.12)] backdrop-blur-2xl sm:inset-x-6 lg:hidden"
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 28 } }}
              exit={{ opacity: 0, y: -8, scale: 0.97, transition: { duration: 0.16 } }}
            >
              <motion.div
                className="p-2"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
                initial="hidden"
                animate="show"
              >
                <p className="px-4 pb-1.5 pt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">Menu</p>
                {navItems.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileNavOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                    variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0, transition: { duration: 0.28 } } }}
                  >
                    <span>{item.label}</span>
                    <span className="material-symbols-outlined text-[15px] text-slate-600">chevron_right</span>
                  </motion.a>
                ))}
              </motion.div>
              <div className="p-3 pt-1">
                <a
                  href="#contact"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#38BDF8] py-3 text-sm font-semibold text-white shadow-[0_8px_28px_-6px_rgba(37,99,235,0.55),0_2px_8px_rgba(37,99,235,0.3)]"
                >
                  Hire Me
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Background atmosphere ── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-72 left-1/2 h-[56rem] w-[56rem] -translate-x-1/2 rounded-full bg-[#2563EB]/10 blur-[160px]" />
        <div className="absolute -left-44 top-[38%] h-[24rem] w-[24rem] rounded-full bg-blue-600/8 blur-[120px]" />
        <div className="absolute -right-44 top-[55%] h-[28rem] w-[28rem] rounded-full bg-sky-500/7 blur-[130px]" />
      </div>

      {/* ── Hero ── */}
      <motion.section
        id="home"
        aria-label="Introduction"
        className="mx-auto grid w-full max-w-7xl gap-8 px-4 pb-16 pt-28 sm:gap-10 sm:px-6 sm:pb-20 sm:pt-32 sm:min-h-[88vh] lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14 lg:min-h-[95vh] lg:px-8 lg:pt-36"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(96,165,250,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.35) 1px, transparent 1px)", backgroundSize: "52px 52px" }} />
        </div>
        <motion.div className="relative z-10 w-full space-y-6 lg:max-w-none" variants={fadeUp}>
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] font-medium tracking-wide text-slate-400 sm:text-[11px]">
              <span className="flex items-center gap-1.5 text-[#60A5FA]">
                <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-[#60A5FA]" />
                Available now
              </span>
              <span className="h-3 w-px bg-slate-700" aria-hidden="true" />
              <span>Backend &amp; Full-stack</span>
              <span className="h-3 w-px bg-slate-700" aria-hidden="true" />
              <span>Remote</span>
            </div>
            <h1 className="text-[2.35rem] font-bold leading-[1.08] tracking-tight text-white xs:text-4xl sm:text-5xl md:text-6xl xl:text-7xl">
              Turning ideas into{" "}
              <span className="hero-gradient bg-gradient-to-r from-[#60A5FA] via-[#93C5FD] to-[#BFDBFE] bg-clip-text text-transparent">
                products that hold.
              </span>
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base lg:text-lg">
              I&apos;m Ahmad Ibrahim — a software engineer building modern web applications and backend systems that stay reliable under real-world use.
            </p>
          </div>
          <motion.div className="flex w-full flex-col gap-3 xs:flex-row xs:flex-wrap" variants={fadeUp}>
            <motion.div whileHover={reduceMotion ? undefined : { y: -2 }} className="w-full xs:w-auto">
              <Link href="/projects" className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold sm:text-base">
                View Projects
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </motion.div>
            <motion.div whileHover={reduceMotion ? undefined : { y: -2 }} className="w-full xs:w-auto">
              <a href="https://github.com/Searcher06" target="_blank" rel="noreferrer" className="btn-secondary inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold sm:text-base">
                <img src="https://cdn.simpleicons.org/github/FFFFFF" alt="" className="h-[1.05rem] w-[1.05rem] theme-icon-invert" loading="eager" />
                GitHub
              </a>
            </motion.div>
          </motion.div>
          <div className="grid grid-cols-3 gap-3 pt-2 lg:hidden">
            {[{ value: "7+", label: "Projects" }, { value: "35%", label: "Perf. gain" }, { value: "2022", label: "Started" }].map((s) => (
              <div key={s.label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-3 text-center">
                <p className="text-base font-bold text-white sm:text-lg">{s.value}</p>
                <p className="mt-0.5 text-[10px] text-slate-500 sm:text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: profile card */}
        <motion.aside className="relative z-10 mx-auto mt-4 hidden w-full max-w-[34rem] lg:mx-0 lg:mt-0 lg:block lg:max-w-none" variants={fadeUp}>
          <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-[#2563EB]/25 via-sky-500/12 to-transparent blur-xl" />
          <div className="force-dark dark-surface relative rounded-[2rem] border border-white/[0.09] bg-gradient-to-br from-[#102038] via-[#0E1E35] to-[#080E1C] p-5 shadow-[0_32px_80px_-24px_rgba(37,99,235,0.4)] sm:p-7">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Image src="/ahmadlogo.png" alt="Ahmad Ibrahim logo" width={52} height={52} className="h-11 w-auto" />
                <div>
                  <p className="text-sm font-semibold text-white">Ahmad Ibrahim</p>
                  <p className="text-xs text-slate-500">Backend-Focused Full-Stack Engineer</p>
                </div>
              </div>
              <span className="rounded-full border border-sky-400/35 bg-blue-500/12 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-sky-200">Active</span>
            </div>
            <div className="terminal-block space-y-3 rounded-2xl border border-white/[0.07] bg-black/40 p-4 font-mono text-xs sm:text-sm">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
                </div>
                <p className="text-[11px] text-slate-500">profile.ts</p>
                <span className="rounded border border-[#93C5FD]/20 bg-[#93C5FD]/[0.07] px-1.5 py-0.5 text-[10px] text-[#BFDBFE]">v2026</span>
              </div>
              <p><span className="text-[#93C5FD]">name</span>: <span className="text-slate-200">&quot;Ahmad Ibrahim&quot;</span></p>
              <p><span className="text-[#93C5FD]">role</span>: <span className="text-slate-200">&quot;Backend-Focused Full-Stack Engineer&quot;</span></p>
              <p><span className="text-[#93C5FD]">focus</span>: <span className="text-slate-200">&quot;Trust systems, auth, APIs&quot;</span></p>
              <p><span className="text-[#93C5FD]">core</span>: <span className="text-slate-200">[&quot;Node.js&quot;, &quot;PostgreSQL&quot;, &quot;React&quot;]</span></p>
              <p><span className="text-[#93C5FD]">currently</span>: <span className="text-slate-200">&quot;Building Findora&quot;</span></p>
              <p><span className="text-[#93C5FD]">style</span>: <span className="text-slate-200">&quot;Fast execution, high ownership&quot;</span></p>
              <p><span className="text-[#93C5FD]">status</span>: <span className="text-sky-400">&quot;available_now&quot;</span></p>
            </div>
          </div>
        </motion.aside>
      </motion.section>

      {/* ── Credibility bar ── */}
      <motion.section aria-label="Core principles" className="border-y border-white/[0.06] bg-gradient-to-r from-white/[0.01] via-white/[0.025] to-white/[0.01]" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <div className="mx-auto grid w-full max-w-7xl gap-2 px-4 py-4 sm:px-6 sm:py-5 md:grid-cols-3 lg:px-8">
          {credibilityPoints.map((point) => (
            <p key={point} className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2.5 text-xs font-medium text-slate-300 sm:text-sm">{point}</p>
          ))}
        </div>
      </motion.section>

      {/* ── Quick stats ── */}
      <motion.section id="projects" aria-label="Key statistics" className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <motion.div className="grid grid-cols-2 gap-3 xl:grid-cols-4" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
          {quickStats.map((stat) => (
            <motion.article key={stat.label} variants={cardReveal} whileHover={reduceMotion ? undefined : { y: -8, scale: 1.02 }} transition={{ type: "spring", stiffness: 240, damping: 16 }} className="dark-surface rounded-2xl border border-white/[0.07] bg-[#0C1929]/90 p-4 sm:p-5 transition shadow-[0_14px_30px_-22px_rgba(37,99,235,0.22)] hover:border-[#2563EB]/25">
              <p className="text-[10px] uppercase tracking-[0.14em] text-[#93C5FD] sm:text-xs">{stat.label}</p>
              <p className="mt-1.5 text-2xl font-bold text-white sm:mt-2 sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">{stat.trend}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      {/* ── Featured project: Findora ── */}
      <motion.section aria-label="Featured project: Findora" className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
        <div className="dark-surface relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-[#112040] via-[#0E1E35] to-[#080D1C] p-5 sm:rounded-3xl sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-20 -top-16 h-56 w-56 rounded-full bg-blue-600/16 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 bottom-0 h-44 w-44 rounded-full bg-sky-700/10 blur-3xl" />
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#93C5FD] sm:text-xs">Featured Project</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:mt-3 sm:text-3xl lg:text-4xl">Findora</h2>
          <p className="mt-1.5 text-sm text-slate-400 sm:mt-2 sm:text-lg">Built for the moment between losing something and getting it back</p>
          <div className="mt-6 grid gap-6 sm:mt-8 lg:grid-cols-[1fr_0.9fr] lg:gap-8">
            <div className="space-y-4 text-slate-400 sm:space-y-5">
              <div className="overflow-hidden rounded-xl border border-white/[0.07] sm:rounded-2xl">
                <Image src="/findorabrowse.png" alt="Findora lost and found platform — browse items screen" width={1200} height={700} className="h-auto w-full" />
              </div>
              <p className="text-sm sm:text-base"><span className="font-semibold text-slate-200">Problem:</span> In my department, lost items were reported the only way everyone knew — a WhatsApp group. Posts got buried within hours, claims were unverifiable, and items rarely made it back to their owners.</p>
              <p className="text-sm sm:text-base"><span className="font-semibold text-slate-200">Why it matters:</span> A WhatsApp message is not a recovery system. Without structure, verification, or accountability, the loudest message wins — not the rightful owner.</p>
              <p className="text-sm sm:text-base"><span className="font-semibold text-slate-200">Solution:</span> I built Findora specifically for this environment — a department-scale lost and found platform with secure auth, structured item reports, real-time chat, two-step handover verification, and moderation controls so recovery is a process, not a guess.</p>
            </div>
            <div className="rounded-xl border border-[#93C5FD]/18 bg-gradient-to-b from-[#0D1E34] to-[#08101C] p-4 shadow-[0_20px_52px_-28px_rgba(37,99,235,0.6)] sm:rounded-2xl sm:p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-white">Key Features</p>
                <span className="rounded-full border border-[#93C5FD]/28 bg-[#2563EB]/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-[#BFDBFE]">Core</span>
              </div>
              <ul className="mt-3 space-y-2 text-xs text-slate-400 sm:mt-4 sm:space-y-3 sm:text-sm">
                {findoraFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 rounded-lg border border-white/[0.07] bg-black/25 p-2.5 sm:gap-3 sm:rounded-xl sm:p-3">
                    <span className="material-symbols-outlined mt-0.5 text-[14px] text-[#60A5FA] sm:text-[16px]">verified</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center sm:mt-4">
                {[["Flow", "Secure"], ["Claims", "Verified"], ["Status", "Tracked"]].map(([sub, main]) => (
                  <div key={main} className="rounded-lg border border-white/[0.07] bg-black/25 p-2">
                    <p className="text-[9px] uppercase tracking-[0.12em] text-slate-500 sm:text-[10px]">{sub}</p>
                    <p className="text-[11px] font-semibold text-white sm:text-xs">{main}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:gap-3">
                <Link href={findoraLiveUrl} target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold sm:px-5 sm:py-3">Live Demo</Link>
                <Link href="/projects" className="btn-secondary inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold sm:px-5 sm:py-3">View Project Details</Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── Other projects ── */}
      <motion.section aria-label="Selected projects" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Selected Projects</h2>
          <Link href="/projects" className="text-sm font-semibold text-[#60A5FA] transition hover:text-[#BFDBFE]">View All Projects</Link>
        </div>
        <motion.div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
          {otherProjects.map((project) => (
            <motion.article key={project.name} variants={cardReveal} whileHover={reduceMotion ? undefined : { y: -10, scale: 1.02 }} transition={{ type: "spring", stiffness: 220, damping: 18 }} className="dark-surface group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0D1929]/90 p-4 transition hover:border-[#93C5FD]/28 hover:shadow-[0_20px_50px_-30px_rgba(37,99,235,0.4)] sm:p-5">
              <div className="overflow-hidden rounded-xl bg-white">
                <Image src={project.image} alt={`${project.name} — project preview`} width={1200} height={700} className="w-full h-auto transition duration-500 group-hover:scale-[1.02]" />
              </div>
              <h3 className="mt-4 min-h-[3.5rem] text-lg font-semibold text-white">{project.name}</h3>
              <p className="mt-3 text-sm text-slate-400"><span className="font-medium text-slate-200">Problem:</span> {truncateText(project.problem, 120)}</p>
              <p className="mt-2 text-sm text-slate-400"><span className="font-medium text-slate-200">Solution:</span> {truncateText(project.solution, 130)}</p>
              <div className="mt-4">
                <p className="mb-2 text-xs uppercase tracking-[0.15em] text-slate-500">Tools Used</p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span key={tool.name} className="inline-flex items-center gap-1.5 rounded-full border border-[#93C5FD]/20 bg-[#2563EB]/[0.08] px-2.5 py-1 text-xs font-medium text-[#BFDBFE]">
                      <img src={tool.iconUrl} alt={`${tool.name} logo`} width={14} height={14} className="h-3.5 w-3.5" loading="lazy" />
                      {tool.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-auto border-t border-white/[0.07] pt-4">
                <div className={`grid gap-2 ${project.liveUrl ? "grid-cols-[1fr_auto]" : "grid-cols-1"}`}>
                  <Link href={project.href} className="group/details inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-white/[0.09] bg-white/[0.04] px-4 text-sm font-semibold text-slate-200 transition hover:border-white/[0.18] hover:bg-white/[0.08] hover:text-white">
                    View details
                    <span className="material-symbols-outlined text-[15px] transition-transform group-hover/details:translate-x-0.5">arrow_forward</span>
                  </Link>
                  {project.liveUrl && (
                    <Link href={project.liveUrl} target="_blank" rel="noreferrer" className="group/live inline-flex h-11 min-w-[7.75rem] items-center justify-center gap-1.5 rounded-xl bg-white px-4 text-sm font-bold text-[#06101F] shadow-[0_14px_32px_-18px_rgba(255,255,255,0.85),0_10px_26px_-20px_rgba(56,189,248,0.9)] transition hover:bg-[#DBEAFE]">
                      Live site
                      <span className="material-symbols-outlined text-[15px] transition-transform group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5">north_east</span>
                    </Link>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      {/* ── Services ── */}
      <motion.section id="services" aria-label="Services and expertise" className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Services &amp; Expertise</h2>
          <p className="text-sm text-slate-500">What I can help your team build and scale.</p>
        </div>
        <motion.div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
          {services.map((service) => (
            <motion.article key={service.title} variants={cardReveal} whileHover={reduceMotion ? undefined : { y: -8, scale: 1.01 }} className="dark-surface group relative overflow-hidden rounded-2xl border border-[#BFDBFE]/10 bg-gradient-to-br from-[#152540] via-[#111E35] to-[#0C1828] p-5 transition hover:border-[#93C5FD]/32 hover:shadow-[0_16px_36px_-22px_rgba(59,130,246,0.38)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(255,255,255,0.07),transparent_42%)] opacity-70" />
              <div className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition duration-500 group-hover:translate-x-[260%] group-hover:opacity-100" />
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-[#2563EB]/10 text-[#60A5FA]">
                <span className="material-symbols-outlined text-[20px]">{service.icon}</span>
              </div>
              <h3 className="relative mt-4 text-lg font-semibold text-white">{service.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-slate-400">{service.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      {/* ── Currently exploring ── */}
      <motion.section aria-label="Currently exploring" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
        <div className="dark-surface relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-r from-[#0E1E35] via-[#0C1A2E] to-[#0D1C32] p-6 shadow-[0_20px_50px_-30px_rgba(37,99,235,0.22)]">
          <div className="pointer-events-none absolute -right-16 -top-10 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl" />
          <h2 className="text-xl font-bold text-white">Currently exploring:</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {currentlyExploring.map((item) => (
              <article key={item.title} className="group rounded-xl border border-white/[0.07] bg-black/20 p-4 transition hover:-translate-y-1 hover:border-[#93C5FD]/28 hover:shadow-[0_16px_28px_-22px_rgba(37,99,235,0.3)]">
                <span className="material-symbols-outlined text-[#60A5FA]">{item.icon}</span>
                <p className="mt-2 font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-sm text-slate-400">{item.note}</p>
              </article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Skills ── */}
      <motion.section aria-label="Technical skills" className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
        <h2 className="text-2xl font-bold text-white sm:text-3xl">Skills</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <article key={group.label} className="dark-surface rounded-2xl border border-white/[0.07] bg-[#0D1B2E]/80 p-5 shadow-[0_12px_30px_-25px_rgba(37,99,235,0.22)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#BFDBFE]">{group.label}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item.name} className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-sm text-slate-300">
                    <img src={item.iconUrl} alt={`${item.name} logo`} width={14} height={14} className="h-3.5 w-3.5" loading="lazy" />
                    {item.name}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </motion.section>

      {/* ── Work Experience ── */}
      <motion.section id="journey" aria-label="Work experience" className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#93C5FD]">Career</p>
            <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">Work Experience</h2>
          </div>
        </div>
        <motion.div className="relative mt-8 space-y-4 sm:mt-10 sm:space-y-5" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>
          <div className="absolute left-[1.1rem] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-[#2563EB]/60 via-[#93C5FD]/40 to-transparent sm:block" />
          {workExperience.map((job, index) => (
            <motion.article key={`${job.role}-${job.company}`} variants={{ hidden: { opacity: 0, y: reduceMotion ? 0 : 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }} className="group relative sm:pl-12">
              <div className="absolute left-[0.6rem] top-6 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[#2563EB] bg-white shadow-[0_0_10px_rgba(37,99,235,0.7)] transition-all duration-300 group-hover:border-[#60A5FA] group-hover:shadow-[0_0_16px_rgba(96,165,250,0.8)] sm:block" />
              <div className="dark-surface group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#0D1E34] via-[#0B1828] to-[#080F1C] p-5 transition-all duration-300 hover:border-[#2563EB]/30 hover:shadow-[0_20px_48px_-24px_rgba(37,99,235,0.35)] sm:p-6">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2563EB]/50 to-transparent" />
                <div className="pointer-events-none absolute -right-16 -top-12 h-32 w-32 rounded-full bg-blue-600/8 blur-3xl" />
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-base font-bold leading-snug text-white sm:text-lg">{job.role}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-[#60A5FA]">{job.company}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-600" />
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                        <span className="material-symbols-outlined text-[13px]">location_on</span>
                        {job.location}
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 text-[11px] font-medium text-slate-500">
                    <span className="material-symbols-outlined text-[13px]">calendar_today</span>
                    {job.period}
                  </span>
                </div>
                <div className="my-4 h-px bg-gradient-to-r from-white/[0.06] via-white/[0.04] to-transparent" />
                <p className="text-sm leading-relaxed text-slate-400">{job.summary}</p>
                <ul className="mt-4 space-y-2.5">
                  {job.highlights.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-slate-400">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2563EB]/15">
                        <span className="material-symbols-outlined text-[13px] text-[#60A5FA]">arrow_forward</span>
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <span className="pointer-events-none absolute bottom-4 right-5 text-[4rem] font-black leading-none text-white/[0.025] select-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      {/* ── CTA ── */}
      <motion.section aria-label="Call to action" className="mx-auto w-full max-w-4xl px-4 py-10 text-center sm:px-6 sm:py-14 lg:px-8" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
        <p className="text-lg font-semibold text-white sm:text-xl lg:text-2xl">Want to see how I design real systems?</p>
        <Link href="/projects" className="btn-primary mt-5 inline-flex rounded-xl px-6 py-3 text-sm font-semibold sm:mt-6 sm:text-base">
          View Full Project Breakdown
        </Link>
      </motion.section>

      {/* ── About ── */}
      <motion.section id="about" aria-label="About Ahmad Ibrahim" className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#93C5FD]">Who I am</p>
        <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">About Me</h2>
        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16">
          {/* Photo side */}
          <div className="relative mx-auto flex w-full max-w-[280px] items-center justify-center sm:max-w-[320px] lg:mx-0 lg:max-w-none">
            <div className="absolute h-[88%] w-[88%] animate-spin-slow rounded-full border-2 border-dashed border-[#2563EB]/40" />
            <div className="absolute h-[78%] w-[78%] rounded-full bg-gradient-to-br from-[#2563EB]/20 via-[#38BDF8]/10 to-transparent blur-2xl" />
            <div className="relative z-10 h-[72%] w-[72%] overflow-hidden rounded-full ring-2 ring-[#2563EB]/30 ring-offset-4 ring-offset-transparent">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1e3a8a]/60 to-[#0c1a3a]/80" />
              <Image src="/me3.png" alt="Ahmad Ibrahim — Backend-Focused Full-Stack Engineer" width={447} height={558} className="relative z-10 h-full w-full object-cover object-top" priority />
            </div>
            <div className="about-chip absolute right-0 top-[12%] z-20 flex items-center gap-2 rounded-2xl border border-white/[0.1] bg-white/[0.07] px-3 py-2 shadow-lg backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
              <span className="text-xs font-semibold text-white">Available for work</span>
            </div>
            <div className="about-chip absolute bottom-[14%] left-0 z-20 flex items-center gap-2 rounded-2xl border border-white/[0.1] bg-white/[0.07] px-3 py-2 shadow-lg backdrop-blur-md">
              <span className="material-symbols-outlined text-[14px] text-[#60A5FA]">code</span>
              <span className="text-xs font-semibold text-white">Backend Engineer</span>
            </div>
          </div>
          {/* Text side */}
          <div className="flex flex-col justify-center space-y-5 text-sm leading-relaxed text-slate-400 sm:text-base">
            <p className="text-lg font-bold leading-snug text-white sm:text-xl lg:text-2xl">Building software that does what it promises.</p>
            <p>I&apos;m Ahmad Ibrahim, a BSc Software Engineering student and full-stack developer focused on building reliable web applications and backend systems. I enjoy turning ideas into scalable products designed to solve real problems, stay maintainable, and hold up under real-world use.</p>
            <p>Currently exploring AI-powered product experiences, scalable system design, and backend performance optimization.</p>
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[{ value: "8+", label: "Projects" }, { value: "2022", label: "Started" }, { value: "3+", label: "Roles" }].map((s) => (
                <div key={s.label} className="dark-surface rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-3 text-center">
                  <p className="text-lg font-bold text-white">{s.value}</p>
                  <p className="mt-0.5 text-[11px] text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── Contact ── */}
      <motion.section id="contact" aria-label="Contact Ahmad Ibrahim" className="mx-auto w-full max-w-5xl px-4 pb-16 pt-8 sm:pb-20 sm:px-6 lg:px-8" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
        <h2 className="text-2xl font-bold text-white sm:text-3xl">Contact</h2>
        <div className="mt-5 grid gap-5 sm:mt-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
          <form className="dark-surface rounded-2xl border border-white/[0.07] bg-[#0C1929]/85 p-4 shadow-[0_20px_40px_-30px_rgba(37,99,235,0.22)] sm:p-5">
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              <label className="text-sm text-slate-400">
                Name
                <input type="text" className="mt-1 w-full rounded-lg border border-white/10 bg-black/25 px-3 py-3 text-sm text-white outline-none ring-[#2563EB]/60 placeholder:text-slate-600 focus:border-[#2563EB]/40 focus:ring-1" placeholder="Your name" />
              </label>
              <label className="text-sm text-slate-400">
                Email
                <input type="email" className="mt-1 w-full rounded-lg border border-white/10 bg-black/25 px-3 py-3 text-sm text-white outline-none ring-[#2563EB]/60 placeholder:text-slate-600 focus:border-[#2563EB]/40 focus:ring-1" placeholder="you@example.com" />
              </label>
            </div>
            <label className="mt-3 block text-sm text-slate-400 sm:mt-4">
              Subject
              <input type="text" className="mt-1 w-full rounded-lg border border-white/10 bg-black/25 px-3 py-3 text-sm text-white outline-none ring-[#2563EB]/60 placeholder:text-slate-600 focus:border-[#2563EB]/40 focus:ring-1" placeholder="Project discussion" />
            </label>
            <label className="mt-3 block text-sm text-slate-400 sm:mt-4">
              Message
              <textarea rows={4} className="mt-1 w-full rounded-lg border border-white/10 bg-black/25 px-3 py-3 text-sm text-white outline-none ring-[#2563EB]/60 placeholder:text-slate-600 focus:border-[#2563EB]/40 focus:ring-1" placeholder="Tell me about your product or idea" />
            </label>
            <div className="mt-3 flex flex-col gap-2 xs:flex-row xs:flex-wrap sm:mt-4 sm:gap-3">
              <button type="button" className="btn-primary inline-flex w-full items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold xs:w-auto">Send Message</button>
              <button type="button" className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-[#60A5FA]/40 hover:text-white xs:w-auto">
                <span className="material-symbols-outlined text-[18px]">download</span>
                Download CV
              </button>
            </div>
          </form>
          <aside className="dark-surface relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#0E1E34] via-[#0B1826] to-[#07101A] p-4 shadow-[0_24px_55px_-35px_rgba(37,99,235,0.75)] sm:p-5">
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#93C5FD]/12 blur-2xl" />
            <p className="text-xs uppercase tracking-[0.14em] text-[#93C5FD] sm:text-sm">Reach me directly</p>
            <p className="mt-1.5 text-xs text-slate-500 sm:mt-2">Fastest channels to reach Ahmad Ibrahim for collaboration.</p>
            <div className="mt-4 space-y-2 sm:mt-5">
              {[
                { icon: "https://cdn.simpleicons.org/gmail/EA4335", label: "Email", handle: "ahmadibrahimsearcher@gmail.com", href: "mailto:ahmadibrahimsearcher@gmail.com" },
                { icon: "https://cdn.simpleicons.org/github/FFFFFF", label: "GitHub", handle: "@Searcher06", href: "https://github.com/Searcher06" },
                { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg", label: "LinkedIn", handle: "/in/ahmadibrahim06", href: "https://www.linkedin.com/in/ahmadibrahim06" },
                { icon: "https://cdn.simpleicons.org/x/FFFFFF", label: "X / Twitter", handle: "@undefined_dev", href: "https://x.com/undefined_dev" },
              ].map((contact) => (
                <a key={contact.label} href={contact.href} target={contact.href.startsWith("http") ? "_blank" : undefined} rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined} className="group flex items-center justify-between rounded-xl border border-white/[0.07] bg-black/20 px-3 py-3 transition hover:border-[#93C5FD]/32 hover:bg-black/35">
                  <span className="flex items-center gap-2 text-sm text-slate-300">
                    <img src={contact.icon} alt={`${contact.label} icon`} className="h-4 w-4 shrink-0" loading="lazy" />
                    {contact.label}
                  </span>
                  <span className="ml-2 truncate text-xs text-[#60A5FA]">{contact.handle}</span>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </motion.section>
    </main>
  );
}

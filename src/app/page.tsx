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
};

type SkillItem = {
  name: string;
  iconUrl: string;
};

const credibilityPoints = [
  "Building Findora — a safer lost and found experience",
  "Focused on products that improve trust and user confidence",
  "Designing reliable software that supports business growth",
];

const quickStats = [
  { label: "Projects Built", value: "7", trend: "+3 this year" },
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
    name: "Brillit",
    image: "/og/opsboard-placeholder.svg",
    problem:
      "Learners struggle to find the right educational videos quickly, and generic feeds rarely match personal learning goals.",
    solution:
      "Built a personalized educational video platform with AI-powered recommendations, typo-tolerant search, and secure user profiles.",
    tools: [
      { name: "Node.js", iconUrl: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
      { name: "MongoDB", iconUrl: "https://cdn.simpleicons.org/mongodb/47A248" },
      { name: "Typesense", iconUrl: "/icons/typesense.svg" },
    ],
    href: "/projects",
  },
  {
    name: "HiringFlow",
    image: "/og/hiringflow-placeholder.svg",
    problem:
      "Recruiting pipelines break when candidate data is inconsistent and feedback loops are slow.",
    solution:
      "Designed a structured hiring pipeline with score normalization, interviewer calibration, and API-first integrations.",
    tools: [
      { name: "React", iconUrl: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Express", iconUrl: "https://cdn.simpleicons.org/express/FFFFFF" },
      { name: "MongoDB", iconUrl: "https://cdn.simpleicons.org/mongodb/47A248" },
    ],
    href: "/projects",
  },
  {
    name: "SignalAuth",
    image: "/og/signalauth-placeholder.svg",
    problem:
      "B2B products struggle to balance secure authentication with low-friction onboarding.",
    solution:
      "Implemented adaptive auth policies with device trust, risk scoring, and session governance.",
    tools: [
      { name: "Auth0", iconUrl: "https://cdn.simpleicons.org/auth0/EB5424" },
      { name: "Sentry", iconUrl: "https://cdn.simpleicons.org/sentry/362D59" },
      { name: "Redis", iconUrl: "https://cdn.simpleicons.org/redis/DC382D" },
    ],
    href: "/projects",
  },
];

const currentlyExploring = [
  { title: "Better auth flows", note: "Lower friction onboarding with stronger trust boundaries.", icon: "verified_user" },
  { title: "System design patterns", note: "Reusable architecture for high-change product teams.", icon: "schema" },
  { title: "Backend performance", note: "Profiling and tuning under realistic production load.", icon: "speed" },
];

const services = [
  {
    title: "Frontend Development",
    description: "I create clear, engaging product experiences that make it easy for people to use your platform.",
    icon: "web",
  },
  {
    title: "Backend Development",
    description: "I build the core systems behind your product so they stay fast, secure, and dependable as you grow.",
    icon: "dns",
  },
  {
    title: "API Integration",
    description: "I connect your tools and services so your product runs as one smooth, connected experience.",
    icon: "api",
  },
  {
    title: "Responsive Design",
    description: "I make sure your product looks clean and works well on phones, tablets, and desktop screens.",
    icon: "devices",
  },
  {
    title: "Cloud Solutions",
    description: "I set up cloud infrastructure that keeps your product online, stable, and ready for increasing demand.",
    icon: "cloud",
  },
];

const skillGroups = [
  {
    label: "Systems",
    items: [
      { name: "Auth & Authorization", iconUrl: "https://cdn.simpleicons.org/auth0/EB5424" },
      { name: "API Design", iconUrl: "https://cdn.simpleicons.org/openapiinitiative/6BA539" },
      { name: "Database Modeling", iconUrl: "https://cdn.simpleicons.org/postgresql/4169E1" },
    ] satisfies SkillItem[],
  },
  {
    label: "Frontend",
    items: [
      { name: "React", iconUrl: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "UI Architecture", iconUrl: "https://cdn.simpleicons.org/figma/F24E1E" },
    ] satisfies SkillItem[],
  },
  {
    label: "Tools",
    items: [
      { name: "Node.js", iconUrl: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
      { name: "Express", iconUrl: "https://cdn.simpleicons.org/express/FFFFFF" },
      { name: "MongoDB", iconUrl: "https://cdn.simpleicons.org/mongodb/47A248" },
    ] satisfies SkillItem[],
  },
];

const roadmap = [
  {
    year: "2022",
    title: "Started Coding Journey",
    highlight: "Built first full CRUD apps and learned JS fundamentals.",
    metric: "6 mini projects shipped",
  },
  {
    year: "2023",
    title: "Backend Foundation",
    highlight: "Moved into API design, auth flows, and data modeling patterns.",
    metric: "12 REST endpoints in production-like builds",
  },
  {
    year: "2024",
    title: "Architecture Phase",
    highlight: "Designed larger workflows with roles, states, and failure handling.",
    metric: "4 complete multi-module products",
  },
  {
    year: "2025",
    title: "Trust-Critical Focus",
    highlight: "Shifted strongly into abuse-resistant and verification-heavy systems.",
    metric: "Findora architecture direction established",
  },
  {
    year: "2026",
    title: "Execution at Scale",
    highlight: "Refining reliability, speed, and design polish for real-world deployment.",
    metric: "Current year: production-grade momentum",
  },
];

const navItems = [
  { label: "Home", href: "#home", icon: "house" },
  { label: "Projects", href: "#projects", icon: "rocket_launch" },
  { label: "Services", href: "#services", icon: "design_services" },
  { label: "Journey", href: "#journey", icon: "deployed_code_history" },
  { label: "Contact", href: "#contact", icon: "chat" },
];

export default function HomePage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.12 } },
  };

  const sectionReveal = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 48, scale: reduceMotion ? 1 : 0.985 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7 } },
  };

  const cardReveal = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.52 } },
  };

  return (
    <main className="relative overflow-hidden">

      {/* ── Navigation ── */}
      <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-3 sm:px-6 lg:px-8">
        <nav className={`mx-auto flex h-[3.75rem] w-full max-w-7xl items-center justify-between rounded-2xl border px-5 backdrop-blur-2xl transition-all duration-500 sm:h-[4.25rem] sm:px-7 ${
          scrolled
            ? "border-white/[0.1] bg-[#020817]/95 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06),0_28px_64px_-20px_rgba(37,99,235,0.45)]"
            : "border-white/[0.06] bg-[#020817]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_4px_24px_rgba(37,99,235,0.1)]"
        }`}>

          {/* Logo */}
          <a href="#home" className="inline-flex items-center gap-3 shrink-0">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#38BDF8] text-sm font-bold text-white shadow-[0_4px_16px_rgba(37,99,235,0.5)] sm:h-10 sm:w-10 sm:text-base">
              A
              <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
            </span>
            <span className="text-sm font-semibold text-white sm:text-[0.9375rem]">Ahmad Ibrahim</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-0.5 md:flex">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="group relative inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium text-slate-400 transition-colors duration-200 hover:text-white"
                >
                  {item.label}
                  <span className="absolute bottom-1.5 left-4 right-4 h-px origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#2563EB] to-[#38BDF8] transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="#contact"
              className="hidden items-center gap-1.5 rounded-xl border border-[#3B82F6] bg-[#2563EB]/10 px-4 py-2 text-sm font-semibold text-[#3B82F6] transition-all duration-200 hover:border-[#2563EB] hover:bg-[#2563EB] hover:text-white hover:shadow-[0_4px_24px_rgba(37,99,235,0.5)] md:inline-flex"
            >
              Hire Me
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              className="nav-icon-btn relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.04] text-slate-400 transition-colors hover:border-white/[0.14] hover:bg-white/[0.07] md:hidden"
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
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileNavOpen(false)}
            />
            <motion.div
              className="mobile-nav-panel fixed inset-x-4 top-[4.5rem] z-50 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#050D1C]/96 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.85),0_0_0_1px_rgba(37,99,235,0.12)] backdrop-blur-2xl sm:inset-x-6 md:hidden"
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
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                    variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0, transition: { duration: 0.28 } } }}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#2563EB]/20 bg-[#2563EB]/10 text-[#60A5FA]">
                      <span className="material-symbols-outlined text-[17px]">{item.icon}</span>
                    </span>
                    <span>{item.label}</span>
                    <span className="material-symbols-outlined ml-auto text-[16px] text-slate-600">chevron_right</span>
                  </motion.a>
                ))}
              </motion.div>
              <div className="border-t border-white/[0.06] p-3">
                <a
                  href="#contact"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#38BDF8] py-3 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(37,99,235,0.4)]"
                >
                  <span className="material-symbols-outlined text-[18px]">handshake</span>
                  Hire Me
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
        className="mx-auto grid min-h-[110svh] w-full max-w-7xl gap-8 px-4 pb-16 pt-28 sm:min-h-[95vh] sm:gap-10 sm:px-6 sm:pt-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14 lg:px-8 lg:pt-36"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Grid overlay */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(96,165,250,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.35) 1px, transparent 1px)",
              backgroundSize: "52px 52px",
            }}
          />
        </div>

        {/* Left: headline */}
        <motion.div className="relative z-10 mx-auto w-full max-w-[34rem] space-y-7 lg:mx-0 lg:max-w-none" variants={fadeUp}>
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2563EB]/30 bg-[#2563EB]/[0.08] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#93C5FD]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#60A5FA]" />
              Open to work · jobs · gigs · collabs
            </div>
            <h1 className="text-[2.2rem] font-bold leading-[1.06] tracking-tight text-white sm:text-5xl md:text-6xl xl:text-7xl">
              I build software where{" "}
              <span className="hero-gradient bg-gradient-to-r from-[#60A5FA] via-[#93C5FD] to-[#BFDBFE] bg-clip-text text-transparent">
                failure isn&apos;t an option.
              </span>
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
              I help teams design and launch systems that protect users, prevent costly mistakes, and perform reliably under pressure.
            </p>
          </div>
          <motion.div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap" variants={fadeUp}>
            <motion.div whileHover={reduceMotion ? undefined : { y: -2 }}>
              <Link
                href="/projects"
                className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold sm:w-auto sm:text-base"
              >
                View Projects
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right: profile card */}
        <motion.aside className="relative z-10 mx-auto mt-4 w-full max-w-[34rem] lg:mx-0 lg:mt-0 lg:max-w-none" variants={fadeUp}>
          <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-[#2563EB]/25 via-sky-500/12 to-transparent blur-xl" />
          <div className="force-dark dark-surface relative rounded-[2rem] border border-white/[0.09] bg-gradient-to-br from-[#102038] via-[#0E1E35] to-[#080E1C] p-5 shadow-[0_32px_80px_-24px_rgba(37,99,235,0.4)] sm:p-7">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#38BDF8] p-[1px] shadow-[0_4px_14px_rgba(37,99,235,0.4)]">
                  <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#07101C] text-sm font-bold text-[#BFDBFE]">
                    AF
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Ahmad Ibrahim</p>
                  <p className="text-xs text-slate-500">Backend-Focused Full-Stack Engineer</p>
                </div>
              </div>
              <span className="rounded-full border border-sky-400/35 bg-blue-500/12 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-sky-200">
                Active
              </span>
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
              <p><span className="text-[#93C5FD]">status</span>: <span className="text-sky-400">&quot;open_for_collaboration&quot;</span></p>
            </div>
          </div>
        </motion.aside>
      </motion.section>

      {/* ── Credibility bar ── */}
      <motion.section
        className="border-y border-white/[0.06] bg-gradient-to-r from-white/[0.01] via-white/[0.025] to-white/[0.01]"
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="mx-auto grid w-full max-w-7xl gap-2 px-4 py-5 sm:px-6 md:grid-cols-3 lg:px-8">
          {credibilityPoints.map((point) => (
            <p
              key={point}
              className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2.5 text-sm font-medium text-slate-300 sm:text-base"
            >
              {point}
            </p>
          ))}
        </div>
      </motion.section>

      {/* ── Quick stats ── */}
      <motion.section
        id="projects"
        className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {quickStats.map((stat) => (
            <motion.article
              key={stat.label}
              variants={cardReveal}
              whileHover={reduceMotion ? undefined : { y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 240, damping: 16 }}
              className="dark-surface rounded-2xl border border-white/[0.07] bg-[#0C1929]/90 p-5 transition shadow-[0_14px_30px_-22px_rgba(37,99,235,0.22)] hover:border-[#2563EB]/25 hover:shadow-[0_20x_40px_-22px_rgba(37,99,235,0.38)]"
            >
              <p className="text-xs uppercase tracking-[0.14em] text-[#93C5FD]">{stat.label}</p>
              <p className="mt-2 text-3xl font-bold text-white">{stat.value}</p>
              <p className="mt-1 text-xs text-slate-500">{stat.trend}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      {/* ── Featured project: Findora ── */}
      <motion.section
        className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
      >
        <div className="dark-surface relative overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-b from-[#112040] via-[#0E1E35] to-[#080D1C] p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-20 -top-16 h-56 w-56 rounded-full bg-blue-600/16 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 bottom-0 h-44 w-44 rounded-full bg-sky-700/10 blur-3xl" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#93C5FD]">Featured Project</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Findora</h2>
          <p className="mt-2 text-lg text-slate-400">Built for the moment between losing something and getting it back</p>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-5 text-slate-400">
              <div className="overflow-hidden rounded-2xl border border-white/[0.07]">
                <Image
                  src="/og/findora-placeholder.svg"
                  alt="Findora dashboard preview"
                  width={1200}
                  height={700}
                  className="h-auto w-full"
                />
              </div>
              <p>
                <span className="font-semibold text-slate-200">Problem:</span> In my department, lost items were reported the only way
                everyone knew — a WhatsApp group. Posts got buried within hours, claims were unverifiable, and items rarely made it back
                to their owners.
              </p>
              <p>
                <span className="font-semibold text-slate-200">Why it matters:</span> A WhatsApp message is not a recovery system. Without
                structure, verification, or accountability, the loudest message wins — not the rightful owner.
              </p>
              <p>
                <span className="font-semibold text-slate-200">Solution:</span> I built Findora specifically for this environment — a
                department-scale lost and found platform with secure auth, structured item reports, real-time chat, two-step handover
                verification, and moderation controls so recovery is a process, not a guess.
              </p>
            </div>
            <div className="rounded-2xl border border-[#93C5FD]/18 bg-gradient-to-b from-[#0D1E34] to-[#08101C] p-5 shadow-[0_20px_52px_-28px_rgba(37,99,235,0.6)]">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-white">Key Features</p>
                <span className="rounded-full border border-[#93C5FD]/28 bg-[#2563EB]/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-[#BFDBFE]">
                  Core
                </span>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-slate-400 sm:text-base">
                {findoraFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-black/25 p-3">
                    <span className="material-symbols-outlined mt-0.5 text-[16px] text-[#60A5FA]">verified</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[["Flow", "Secure"], ["Claims", "Verified"], ["Status", "Tracked"]].map(([sub, main]) => (
                  <div key={main} className="rounded-lg border border-white/[0.07] bg-black/25 p-2">
                    <p className="text-[10px] uppercase tracking-[0.12em] text-slate-500">{sub}</p>
                    <p className="text-xs font-semibold text-white">{main}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/projects"
                  className="btn-primary inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold"
                >
                  View Project Details
                </Link>
                <Link
                  href="/projects"
                  className="btn-secondary inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold"
                >
                  Live Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── Other projects ── */}
      <motion.section
        className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
      >
        <div className="flex items-end justify-between gap-3">
          <h3 className="text-2xl font-bold text-white sm:text-3xl">Other Projects</h3>
          <Link href="/projects" className="text-sm font-semibold text-[#60A5FA] transition hover:text-[#BFDBFE]">
            View All Projects
          </Link>
        </div>
        <motion.div
          className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {otherProjects.map((project) => (
            <motion.article
              key={project.name}
              variants={cardReveal}
              whileHover={reduceMotion ? undefined : { y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="dark-surface group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0E1E32]/90 p-4 transition duration-300 hover:border-[#2563EB]/28 hover:shadow-[0_20px_48px_-24px_rgba(37,99,235,0.42)] sm:p-5"
            >
              <div className="overflow-hidden rounded-xl border border-white/[0.07]">
                <Image
                  src={project.image}
                  alt={`${project.name} preview`}
                  width={1200}
                  height={700}
                  className="h-40 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <h4 className="mt-4 text-lg font-semibold text-white">{project.name}</h4>
              <p className="mt-3 text-sm text-slate-400">
                <span className="font-medium text-slate-200">Problem:</span> {project.problem}
              </p>
              <p className="mt-2 text-sm text-slate-400">
                <span className="font-medium text-slate-200">Solution:</span> {project.solution}
              </p>
              <div className="mt-4">
                <p className="mb-2 text-xs uppercase tracking-[0.15em] text-slate-500">Tools Used</p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool.name}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#93C5FD]/20 bg-[#2563EB]/[0.08] px-2.5 py-1 text-xs font-medium text-[#BFDBFE]"
                    >
                      <img src={tool.iconUrl} alt={`${tool.name} logo`} width={14} height={14} className="h-3.5 w-3.5" loading="lazy" />
                      {tool.name}
                    </span>
                  ))}
                </div>
              </div>
              <Link href={project.href} className="mt-4 inline-flex text-sm font-semibold text-[#60A5FA] transition hover:text-[#BFDBFE]">
                View Project
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      {/* ── Services ── */}
      <motion.section
        id="services"
        className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h3 className="text-2xl font-bold text-white sm:text-3xl">Services & Expertise</h3>
          <p className="text-sm text-slate-500">What I can help your team build and scale.</p>
        </div>
        <motion.div
          className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {services.map((service) => (
            <motion.article
              key={service.title}
              variants={cardReveal}
              whileHover={reduceMotion ? undefined : { y: -8, scale: 1.01 }}
              className="dark-surface group relative overflow-hidden rounded-2xl border border-[#BFDBFE]/10 bg-gradient-to-br from-[#152540] via-[#111E35] to-[#0C1828] p-5 transition hover:border-[#93C5FD]/32 hover:shadow-[0_16px_36px_-22px_rgba(59,130,246,0.38)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(255,255,255,0.07),transparent_42%)] opacity-70" />
              <div className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition duration-500 group-hover:translate-x-[260%] group-hover:opacity-100" />
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-[#2563EB]/10 text-[#60A5FA]">
                <span className="material-symbols-outlined text-[20px]">{service.icon}</span>
              </div>
              <h4 className="relative mt-4 text-lg font-semibold text-white">{service.title}</h4>
              <p className="relative mt-2 text-sm leading-relaxed text-slate-400">{service.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      {/* ── Currently exploring ── */}
      <motion.section
        className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
      >
        <div className="dark-surface relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-r from-[#0E1E35] via-[#0C1A2E] to-[#0D1C32] p-6 shadow-[0_20px_50px_-30px_rgba(37,99,235,0.22)]">
          <div className="pointer-events-none absolute -right-16 -top-10 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl" />
          <h3 className="text-xl font-bold text-white">Currently exploring:</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {currentlyExploring.map((item) => (
              <article
                key={item.title}
                className="group rounded-xl border border-white/[0.07] bg-black/20 p-4 transition hover:-translate-y-1 hover:border-[#93C5FD]/28 hover:shadow-[0_16px_28px_-22px_rgba(37,99,235,0.3)]"
              >
                <span className="material-symbols-outlined text-[#60A5FA]">{item.icon}</span>
                <p className="mt-2 font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-sm text-slate-400">{item.note}</p>
              </article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Skills ── */}
      <motion.section
        className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
      >
        <h3 className="text-2xl font-bold text-white sm:text-3xl">Skills</h3>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <article
              key={group.label}
              className="dark-surface rounded-2xl border border-white/[0.07] bg-[#0D1B2E]/80 p-5 shadow-[0_12px_30px_-25px_rgba(37,99,235,0.22)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#BFDBFE]">{group.label}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item.name}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-sm text-slate-300"
                  >
                    <img src={item.iconUrl} alt={`${item.name} logo`} width={14} height={14} className="h-3.5 w-3.5" loading="lazy" />
                    {item.name}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </motion.section>

      {/* ── Journey ── */}
      <motion.section
        id="journey"
        className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8"
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
      >
        <h3 className="text-2xl font-bold text-white sm:text-3xl">Experience Journey (2022 – 2026)</h3>
        <div className="relative mt-8">
          <div className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#2563EB] via-[#3B82F6] to-[#93C5FD] md:block" />
          <motion.div className="space-y-5" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }}>
            {roadmap.map((step, index) => (
              <motion.div
                key={step.year}
                variants={{
                  hidden: { opacity: 0, x: reduceMotion ? 0 : index % 2 === 0 ? -48 : 48, y: reduceMotion ? 0 : 12 },
                  show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.58 } },
                }}
                className={`flex md:items-center ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}
              >
                <article
                  className={`dark-surface relative w-full rounded-2xl border border-white/[0.07] bg-[#0C1A2C]/85 p-4 shadow-[0_15px_35px_-25px_rgba(37,99,235,0.32)] md:w-[46%] ${index % 2 === 0 ? "md:mr-[54%]" : "md:ml-[54%]"}`}
                >
                  <div
                    className={`absolute top-8 hidden h-3 w-3 rounded-full bg-[#2563EB] shadow-[0_0_10px_rgba(37,99,235,0.7)] md:block ${index % 2 === 0 ? "-right-8" : "-left-8"}`}
                  />
                  <p className="text-xs uppercase tracking-[0.15em] text-[#93C5FD]">{step.year}</p>
                  <p className="mt-2 text-base font-semibold text-white">{step.title}</p>
                  <p className="mt-2 text-sm text-slate-400">{step.highlight}</p>
                  <p className="mt-3 rounded-lg border border-white/[0.07] bg-black/20 px-2 py-1 text-xs text-slate-500">{step.metric}</p>
                </article>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── CTA ── */}
      <motion.section
        className="mx-auto w-full max-w-4xl px-4 py-14 text-center sm:px-6 lg:px-8"
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
      >
        <p className="text-xl font-semibold text-white sm:text-2xl">Want to see how I design real systems?</p>
        <Link href="/projects" className="btn-primary mt-6 inline-flex rounded-xl px-6 py-3 text-sm font-semibold sm:text-base">
          View Full Project Breakdown
        </Link>
      </motion.section>

      {/* ── About ── */}
      <motion.section
        className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8"
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
      >
        <h3 className="text-2xl font-bold text-white sm:text-3xl">About</h3>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-400 sm:text-base">
          <p>
            I am Ahmad Ibrahim, a BSc Software Engineering student and full-stack developer. I build products that help businesses run
            better and give users a smoother, safer experience.
          </p>
          <p>
            My strength is turning unclear ideas into clear execution. I break big goals into practical features, build them with
            reliability in mind, and make sure teams can maintain and improve the product over time.
          </p>
          <p>
            Right now, I am focused on trust-based products like Findora, where strong user confidence, operational stability, and
            business value matter just as much as clean code.
          </p>
        </div>
      </motion.section>

      {/* ── Contact ── */}
      <motion.section
        id="contact"
        className="mx-auto w-full max-w-5xl px-4 pb-20 pt-8 sm:px-6 lg:px-8"
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
      >
        <h3 className="text-2xl font-bold text-white sm:text-3xl">Contact</h3>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <form className="dark-surface rounded-2xl border border-white/[0.07] bg-[#0C1929]/85 p-5 shadow-[0_20px_40px_-30px_rgba(37,99,235,0.22)]">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm text-slate-400">
                Name
                <input
                  type="text"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/25 px-3 py-2.5 text-white outline-none ring-[#2563EB] placeholder:text-slate-600 focus:border-[#2563EB]/50 focus:ring-2"
                  placeholder="Your name"
                />
              </label>
              <label className="text-sm text-slate-400">
                Email
                <input
                  type="email"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/25 px-3 py-2.5 text-white outline-none ring-[#2563EB] placeholder:text-slate-600 focus:border-[#2563EB]/50 focus:ring-2"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label className="mt-4 block text-sm text-slate-400">
              Subject
              <input
                type="text"
                className="mt-1 w-full rounded-lg border border-white/10 bg-black/25 px-3 py-2.5 text-white outline-none ring-[#2563EB] placeholder:text-slate-600 focus:border-[#2563EB]/50 focus:ring-2"
                placeholder="Project discussion"
              />
            </label>
            <label className="mt-4 block text-sm text-slate-400">
              Message
              <textarea
                rows={5}
                className="mt-1 w-full rounded-lg border border-white/10 bg-black/25 px-3 py-2.5 text-white outline-none ring-[#2563EB] placeholder:text-slate-600 focus:border-[#2563EB]/50 focus:ring-2"
                placeholder="Tell me about your product or idea"
              />
            </label>
            <div className="mt-4 flex flex-wrap gap-3">
              <button type="button" className="btn-primary inline-flex rounded-xl px-6 py-3 text-sm font-semibold">
                Send Message
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-[#60A5FA]/40 hover:text-white"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                Download CV
              </button>
            </div>
          </form>

          <aside className="dark-surface relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#0E1E34] via-[#0B1826] to-[#07101A] p-5 shadow-[0_24px_55px_-35px_rgba(37,99,235,0.75)]">
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#93C5FD]/12 blur-2xl" />
            <p className="text-sm uppercase tracking-[0.14em] text-[#93C5FD]">Reach me directly</p>
            <p className="mt-2 text-xs text-slate-500">Fastest channels to reach Ahmad Ibrahim for collaboration.</p>
            <div className="mt-5 space-y-2">
              {[
                { icon: "https://cdn.simpleicons.org/gmail/EA4335", label: "Email", handle: "ahmad@example.com", href: "mailto:ahmad@example.com" },
                { icon: "https://cdn.simpleicons.org/github/FFFFFF", label: "GitHub", handle: "@ahmad", href: "https://github.com/ahmad" },
                { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg", label: "LinkedIn", handle: "/in/ahmad", href: "https://linkedin.com/in/ahmad" },
                { icon: "https://cdn.simpleicons.org/x/FFFFFF", label: "X / Twitter", handle: "@ahmad", href: "https://x.com/ahmad" },
                { icon: "https://cdn.simpleicons.org/discord/5865F2", label: "Discord", handle: "ahmad.dev", href: "#" },
              ].map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between rounded-xl border border-white/[0.07] bg-black/20 px-3 py-2.5 transition hover:border-[#93C5FD]/32 hover:bg-black/35"
                >
                  <span className="flex items-center gap-2 text-sm text-slate-300">
                    <img src={contact.icon} alt={`${contact.label} logo`} className="h-4 w-4" loading="lazy" />
                    {contact.label}
                  </span>
                  <span className="text-xs text-[#60A5FA]">{contact.handle}</span>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </motion.section>
    </main>
  );
}

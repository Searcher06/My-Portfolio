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
  "Rough idea → working product",
  "Ships with edge cases thought through",
  "Code the next dev can actually trust",
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
    image: "/vestleepic.png",
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
  {
    title: "AI systems for real-world products",
    note: "Exploring how AI can power genuinely useful features — recommendations, voice interfaces, and intelligent automation that solves real problems inside scalable web applications.",
    icon: "smart_toy",
    accent: "text-[#93C5FD]",
    accentBg: "bg-[#93C5FD]/10",
    accentBorder: "border-[#93C5FD]/20",
  },
  {
    title: "System design patterns",
    note: "Studying reusable architecture decisions for high-change product teams — event-driven systems, service boundaries, and patterns that scale without a full rewrite.",
    icon: "schema",
    accent: "text-[#60A5FA]",
    accentBg: "bg-[#60A5FA]/10",
    accentBorder: "border-[#60A5FA]/20",
  },
  {
    title: "Backend performance",
    note: "Profiling and tuning under realistic production load — query optimisation, caching strategies, and identifying bottlenecks that move real numbers in production.",
    icon: "speed",
    accent: "text-[#BFDBFE]",
    accentBg: "bg-[#BFDBFE]/10",
    accentBorder: "border-[#BFDBFE]/20",
  },
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

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sendingForm, setSendingForm] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSendingForm(true);
    setSubmitStatus(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSubmitStatus({ success: true, message: "Thank you! Your message has been sent successfully." });
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setSubmitStatus({ success: false, message: "Something went wrong. Please try again or email directly." });
    } finally {
      setSendingForm(false);
    }
  };

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
            ? "border-white/[0.08] bg-[#0c0c0e]/80 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]"
            : "border-transparent bg-[#0c0c0e]/30 shadow-none"
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
              className="mobile-nav-panel fixed inset-x-4 top-[4.5rem] z-50 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111113]/96 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur-2xl sm:inset-x-6 lg:hidden"
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
        <div className="absolute -top-72 left-1/2 h-[56rem] w-[56rem] -translate-x-1/2 rounded-full bg-[#2563EB]/[0.05] blur-[180px]" />
      </div>

      {/* ── Hero ── */}
      <motion.section
        id="home"
        aria-label="Introduction"
        className="relative mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-7xl items-center justify-center px-4 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-20 left-1/2 h-[30rem] w-[38rem] -translate-x-1/2 rounded-full bg-[#2563EB]/[0.08] blur-[120px]" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>
        <motion.article variants={fadeUp} className="profile-hero-card relative w-full max-w-[38rem] overflow-visible rounded-[2rem] border border-white/[0.12] bg-[#f7f5ef] text-slate-900 shadow-[0_35px_100px_-35px_rgba(0,0,0,0.75)]">
          <div className="relative h-36 overflow-hidden rounded-t-[2rem] bg-[#182a49] sm:h-48">
            <Image src="/me3.png" alt="Ahmad Ibrahim" fill priority sizes="(max-width: 640px) 100vw, 608px" className="object-cover object-[center_34%] opacity-75" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#10203a]/85 via-[#142c50]/15 to-[#10203a]/10" />
            <span className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/25 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-white backdrop-blur-md sm:right-6 sm:top-5 sm:text-xs">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Available for remote roles
            </span>
            <div className="absolute bottom-0 left-6 translate-y-1/2 rounded-2xl bg-[#f7f5ef] p-1.5 shadow-lg sm:left-8">
              <div className="relative h-[4.5rem] w-[4.5rem] overflow-hidden rounded-xl sm:h-24 sm:w-24">
                <Image src="/me3.png" alt="Portrait of Ahmad Ibrahim" fill sizes="96px" className="object-cover object-top" />
              </div>
            </div>
          </div>
          <div className="px-5 pb-6 pt-14 sm:px-8 sm:pb-8 sm:pt-16">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#2563EB]">Backend · Full-stack · Kano, Nigeria</p>
                <h1 className="font-serif text-3xl tracking-tight text-slate-950 sm:text-4xl">Hey, I&apos;m Ahmad</h1>
              </div>
              <a href="mailto:ahmadibrahimsearcher@gmail.com" className="inline-flex items-center gap-1.5 rounded-full bg-[#2563EB] px-4 py-2.5 text-xs font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#1d4ed8] sm:text-sm">
                Let&apos;s talk <span className="material-symbols-outlined text-[16px]">north_east</span>
              </a>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              I build dependable web products and backend systems, with a focus on the details that make people trust the software they use.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { label: "Projects", href: "#projects" },
                { label: "About me", href: "#about" },
                { label: "My experience", href: "#journey" },
                { label: "GitHub", href: "https://github.com/Searcher06" },
              ].map((item) => (
                <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined} className="inline-flex items-center rounded-full border border-slate-300/80 bg-white/75 px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-[#2563EB]/40 hover:bg-white hover:text-[#1d4ed8]">
                  {item.label}
                </a>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-2 border-t border-slate-300/70 pt-4 text-xs text-slate-500">
              <span className="material-symbols-outlined text-[16px] text-[#2563EB]">terminal</span>
              Currently building <span className="font-semibold text-slate-800">Findora</span>
              <span className="ml-auto hidden font-mono text-[10px] text-slate-400 sm:inline">reliable by design</span>
            </div>
          </div>
          <div className="pointer-events-none absolute -bottom-3 left-10 h-7 w-24 -rotate-3 bg-[#93C5FD]/70 shadow-sm" />
        </motion.article>
      </motion.section>

      {/* ── Marquee strip ── */}
      <div className="relative overflow-hidden border-y border-white/[0.06] bg-gradient-to-r from-white/[0.01] via-white/[0.02] to-white/[0.01] py-3.5">
        {/* fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0c0c0e] to-transparent z-10 dark-fade-left" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0c0c0e] to-transparent z-10 dark-fade-right" />
        <div className="marquee-track flex w-max items-center gap-0">
          {[...Array(2)].map((_, pass) => (
            <div key={pass} className="flex items-center" aria-hidden={pass === 1}>
              {[
                { text: "Node.js",           icon: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
                { text: "PostgreSQL",        icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
                { text: "REST APIs",         icon: "https://cdn.simpleicons.org/postman/FF6C37" },
                { text: "React",             icon: "https://cdn.simpleicons.org/react/61DAFB" },
                { text: "TypeScript",        icon: "https://cdn.simpleicons.org/typescript/3178C6" },
                { text: "Auth & Security",   icon: "https://cdn.simpleicons.org/jsonwebtokens/FFFFFF" },
                { text: "MongoDB",           icon: "https://cdn.simpleicons.org/mongodb/47A248" },
                { text: "Next.js",           icon: "https://cdn.simpleicons.org/nextdotjs/FFFFFF" },
                { text: "Real-time Systems", icon: "https://cdn.simpleicons.org/socketdotio/FFFFFF" },
                { text: "Payment Rails",     icon: "https://cdn.simpleicons.org/stripe/6772E5" },
                { text: "Git",               icon: "https://cdn.simpleicons.org/git/F05032" },
                { text: "Express.js",        icon: "https://cdn.simpleicons.org/express/FFFFFF" },
              ].map((item) => (
                <span key={item.text} className="flex items-center gap-8 px-6">
                  <span className="flex items-center gap-2.5 text-sm font-medium text-slate-400">
                    <img src={item.icon} alt="" aria-hidden="true" className="h-4 w-4 shrink-0 opacity-70" loading="lazy" />
                    {item.text}
                  </span>
                  <span className="h-1 w-1 shrink-0 rounded-full bg-white/[0.15]" aria-hidden="true" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Credibility bar ── */}
      <motion.section aria-label="Core principles" className="border-y border-white/[0.06] bg-gradient-to-r from-white/[0.01] via-white/[0.025] to-white/[0.01] mt-8 sm:mt-12" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <div className="mx-auto grid w-full max-w-7xl gap-2 px-4 py-4 sm:px-6 sm:py-5 md:grid-cols-3 lg:px-8">
          {credibilityPoints.map((point, i) => (
            <p key={point} className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-semibold ${
              i === 0 ? "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-300" :
              i === 1 ? "border-white/[0.07] bg-white/[0.025] text-slate-300" :
                        "border-white/[0.07] bg-white/[0.025] text-slate-300"
            }`}>
              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${i === 0 ? "bg-emerald-400" : "bg-slate-600"}`} />
              {point}
            </p>
          ))}
        </div>
      </motion.section>

      {/* ── Quick stats ── */}
      <motion.section id="projects" aria-label="Key statistics" className="mx-auto w-full max-w-7xl px-4 pt-16 pb-0 sm:px-6 sm:pt-24 lg:px-8" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <motion.div className="grid grid-cols-2 gap-3 lg:grid-cols-4" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
          {/* Wide accent card */}
          <motion.article variants={cardReveal} whileHover={reduceMotion ? undefined : { y: -8, scale: 1.02 }} transition={{ type: "spring", stiffness: 240, damping: 16 }}
            className="dark-surface col-span-2 flex flex-col justify-between rounded-2xl border border-[#2563EB]/25 bg-gradient-to-br from-[#2563EB]/[0.12] via-[#2563EB]/[0.06] to-transparent p-5 sm:p-6">
            <p className="text-[10px] uppercase tracking-[0.14em] text-[#60A5FA] sm:text-xs">{quickStats[0].label}</p>
            <p className="mt-2 text-4xl font-black text-white sm:text-5xl">{quickStats[0].value}</p>
            <p className="mt-1.5 text-xs text-[#93C5FD]/70">{quickStats[0].trend}</p>
          </motion.article>
          {/* Two regular cards */}
          {quickStats.slice(1, 3).map((stat) => (
            <motion.article key={stat.label} variants={cardReveal} whileHover={reduceMotion ? undefined : { y: -8, scale: 1.02 }} transition={{ type: "spring", stiffness: 240, damping: 16 }}
              className="dark-surface flex flex-col justify-between rounded-2xl border border-white/[0.07] bg-[#161618]/90 p-4 sm:p-5 transition hover:border-white/[0.14]">
              <p className="text-[10px] uppercase tracking-[0.14em] text-[#93C5FD] sm:text-xs">{stat.label}</p>
              <p className="mt-1.5 text-2xl font-bold text-white sm:mt-2 sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">{stat.trend}</p>
            </motion.article>
          ))}
          {/* Bottom wide card */}
          <motion.article variants={cardReveal} whileHover={reduceMotion ? undefined : { y: -8, scale: 1.02 }} transition={{ type: "spring", stiffness: 240, damping: 16 }}
            className="dark-surface col-span-2 flex flex-col justify-between rounded-2xl border border-[#38BDF8]/20 bg-gradient-to-br from-[#38BDF8]/[0.08] via-[#2563EB]/[0.05] to-transparent p-5 sm:p-6">
            <p className="text-[10px] uppercase tracking-[0.14em] text-[#38BDF8] sm:text-xs">{quickStats[3].label}</p>
            <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">{quickStats[3].value}</p>
            <p className="mt-1.5 text-xs text-[#93C5FD]/70">{quickStats[3].trend}</p>
          </motion.article>
        </motion.div>
      </motion.section>

      {/* ── Featured project: Findora ── */}
      <motion.section
        aria-label="Featured project: Findora"
        className="mx-auto w-full max-w-7xl px-4 pt-10 pb-16 sm:px-6 sm:pt-12 sm:pb-24 lg:px-8 lg:pb-32"
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
      >
        {/* Label row */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#93C5FD]">Featured Project</span>
          <div className="h-px flex-1 bg-gradient-to-r from-[#2563EB]/30 to-transparent" />
          <Link href={findoraLiveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-[#60A5FA]">
            Live site
            <span className="material-symbols-outlined text-[13px]">north_east</span>
          </Link>
        </div>

        {/* Display headline */}
        <div className="mb-8 sm:mb-10">
          <h2
            className="text-[3.5rem] font-extrabold leading-[0.95] tracking-tight text-white xs:text-6xl sm:text-7xl md:text-8xl lg:text-[7rem]"
            style={{ fontFamily: "Instrument Serif, Georgia, serif" }}
          >
            Findora
          </h2>
          <p className="mt-3 max-w-2xl text-base text-slate-400 sm:text-lg lg:text-xl">
            A trust-first lost &amp; found platform built for real communities — because a WhatsApp group is not a recovery system.
          </p>
        </div>

        {/* Outcome metrics */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:mb-10 sm:grid-cols-4">
          {[
            { value: "2-step",    label: "Handover verification" },
            { value: "Real-time", label: "Chat between claimants" },
            { value: "RBAC",      label: "Role-based moderation" },
            { value: "100%",      label: "Structured recovery flow" },
          ].map((m) => (
            <div key={m.label} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-4 sm:px-5 sm:py-5">
              <p className="text-xl font-black text-white sm:text-2xl" style={{ fontFamily: "Instrument Serif, Georgia, serif" }}>{m.value}</p>
              <p className="mt-1 text-xs text-slate-500">{m.label}</p>
            </div>
          ))}
        </div>


        {/* Case study body */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-12">

          {/* Left: narrative + features + CTAs */}
          <div className="space-y-7">
            <div className="space-y-5 text-sm leading-relaxed text-slate-400 sm:text-base">
              <div>
                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">The Problem</p>
                <p>Lost items in my department were reported through a WhatsApp group. Posts got buried within hours, claims were unverifiable, and items rarely made it back to their rightful owners. The loudest message won — not the legitimate claimant.</p>
              </div>
              <div>
                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">The Solution</p>
                <p>I built Findora as a structured recovery system — secure auth, image-based item reports, real-time chat, two-step handover code verification, and an admin dashboard for moderation. Every return becomes a verifiable process.</p>
              </div>
            </div>

            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">What I built</p>
              <ul className="space-y-2.5">
                {findoraFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-slate-400">
                    <span className="material-symbols-outlined mt-0.5 shrink-0 text-[15px] text-[#60A5FA]">check_circle</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href={findoraLiveUrl} target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold">
                Live Demo
                <span className="material-symbols-outlined text-[16px]">north_east</span>
              </Link>
              <Link href="/projects" className="btn-secondary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold">
                Full Case Study
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Right: floating perspective mockup */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {/* Ambient glow — subtle on mobile, stronger on desktop */}
            <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-[#2563EB]/[0.1] blur-[40px] lg:-inset-4 lg:bg-[#2563EB]/[0.15] lg:blur-[60px]" />
            {/* Tilt wrapper — flat on mobile, 3D on desktop */}
            <div className="mockup-tilt relative w-full">
              {/* Drop shadow beneath frame — desktop only */}
              <div className="absolute -bottom-6 left-4 right-4 hidden h-16 rounded-2xl bg-[#2563EB]/20 blur-2xl lg:block" />
              {/* Browser frame */}
              <div className="relative overflow-hidden rounded-xl border border-white/[0.12] bg-[#0f0f11] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)] lg:rounded-2xl lg:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.06)]">
                {/* Title bar */}
                <div className="flex items-center gap-2 border-b border-white/[0.07] bg-[#1a1a1f] px-3 py-2 sm:px-4 sm:py-2.5">
                  <span className="h-2 w-2 rounded-full bg-[#FF5F57] sm:h-2.5 sm:w-2.5" />
                  <span className="h-2 w-2 rounded-full bg-[#FEBC2E] sm:h-2.5 sm:w-2.5" />
                  <span className="h-2 w-2 rounded-full bg-[#28C840] sm:h-2.5 sm:w-2.5" />
                  <div className="mx-2 flex flex-1 items-center gap-1.5 rounded-md bg-white/[0.06] px-2 py-0.5 sm:mx-3 sm:px-3 sm:py-1">
                    <span className="material-symbols-outlined text-[10px] text-slate-600 sm:text-[11px]">lock</span>
                    <span className="text-[10px] text-slate-500 sm:text-[11px]">findora-snowy.vercel.app</span>
                  </div>
                </div>
                {/* Screenshot */}
                <Image
                  src="/findorabrowse.png"
                  alt="Findora lost and found platform — browse items screen"
                  width={900}
                  height={620}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>

        </div>
      </motion.section>

      {/* ── Other projects ── */}
      <motion.section aria-label="Selected projects" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3 sm:mb-10">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#93C5FD]">A few things I&apos;ve worked on</p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: "Instrument Serif, Georgia, serif" }}>Products built to solve real problems</h2>
          </div>
          <Link href="/projects" className="text-sm font-semibold text-[#60A5FA] transition hover:text-[#BFDBFE]">View All Projects</Link>
        </div>
        <motion.div className="divide-y divide-white/[0.12]" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
          {otherProjects.map((project, index) => (
            <motion.article key={project.name} variants={cardReveal} className="grid gap-6 py-8 first:pt-0 last:pb-0 sm:gap-9 sm:py-12 lg:grid-cols-2 lg:items-center lg:gap-14">
              <div className={`group relative ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="absolute -inset-2 rotate-1 rounded-[1.6rem] bg-[#f7f5ef] shadow-lg" />
                <div className="relative overflow-hidden rounded-2xl border-[5px] border-[#f7f5ef] bg-white shadow-[0_18px_45px_-26px_rgba(0,0,0,0.7)]">
                  <Image src={project.image} alt={`${project.name} — project preview`} width={1200} height={700} className="h-auto w-full transition duration-500 group-hover:scale-[1.015]" />
                </div>
                <span className="absolute -bottom-3 right-5 rounded-full bg-[#DBEAFE] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#1d4ed8] shadow-sm">Selected work · 0{index + 1}</span>
              </div>
              <div className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#93C5FD]">{index === 0 ? "School operations" : index === 1 ? "Education platform" : "AI career assistant"}</p>
                <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl" style={{ fontFamily: "Instrument Serif, Georgia, serif" }}>{project.name}</h3>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-400 sm:text-base">
                  <p><span className="font-semibold text-slate-200">The challenge</span><br />{truncateText(project.problem, 190)}</p>
                  <p><span className="font-semibold text-slate-200">What I built</span><br />{truncateText(project.solution, 210)}</p>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span key={tool.name} className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-slate-300">
                      <img src={tool.iconUrl} alt="" aria-hidden="true" width={14} height={14} className="h-3.5 w-3.5" loading="lazy" />
                      {tool.name}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={project.href} className="inline-flex items-center gap-1.5 rounded-full bg-[#f7f5ef] px-5 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-white">
                    Read the case study <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                  {project.liveUrl && <Link href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-2 py-2.5 text-sm font-semibold text-[#93C5FD] transition hover:text-white">Visit live site <span className="material-symbols-outlined text-[16px]">north_east</span></Link>}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      {/* ── Services ── */}
      <motion.section id="services" aria-label="Services and expertise" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Services &amp; Expertise</h2>
          <p className="text-sm text-slate-500">What I can help your team build.</p>
        </div>
        <motion.div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>

          {/* ── Feature card: tall, col 1, rows 1+2 ── */}
          <motion.article
            variants={cardReveal}
            whileHover={reduceMotion ? undefined : { y: -8, scale: 1.01 }}
            className="dark-surface group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#161618]/90 p-6 transition hover:border-white/[0.14] sm:col-span-2 lg:col-span-1 lg:row-span-2"
          >
            <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-[#2563EB] to-[#38BDF8]" />
            <div className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition duration-500 group-hover:translate-x-[260%] group-hover:opacity-100" />

            {/* Top */}
            <div>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#2563EB]/20 bg-[#2563EB]/10 text-[#60A5FA]">
                <span className="material-symbols-outlined text-[20px]">dns</span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">Backend Development</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {services.find(s => s.title === "Backend Development")?.description}
              </p>
            </div>

            {/* Middle: grows to fill */}
            <ul className="mt-6 flex-1 space-y-2.5">
              {[
                "Scalable REST & event-driven API design",
                "JWT / session auth, RBAC & OAuth flows",
                "Schema design, indexing & query optimisation",
                "Payment rails, KYC & webhook integrations",
                "Real-time systems with WebSockets",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-slate-400">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-[#60A5FA]" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Bottom: tags */}
            <div className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.06] pt-5">
              {["Node.js", "PostgreSQL", "REST APIs", "Auth"].map((t) => (
                <span key={t} className="rounded-full border border-[#60A5FA]/20 bg-[#2563EB]/10 px-2.5 py-1 text-[11px] font-medium text-[#93C5FD]">{t}</span>
              ))}
            </div>
          </motion.article>

          {/* ── 4 regular cards: cols 2-3, rows 1-2 ── */}
          {services.filter((s) => s.title !== "Backend Development").map((service) => (
            <motion.article key={service.title} variants={cardReveal} whileHover={reduceMotion ? undefined : { y: -8, scale: 1.01 }}
              className="dark-surface group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#161618]/90 p-6 transition hover:border-white/[0.14]">
              <div className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition duration-500 group-hover:translate-x-[260%] group-hover:opacity-100" />
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#2563EB]/20 bg-[#2563EB]/10 text-[#60A5FA]">
                <span className="material-symbols-outlined text-[20px]">{service.icon}</span>
              </div>
              <h3 className="relative mt-4 text-base font-semibold text-white">{service.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-slate-500">{service.description}</p>
            </motion.article>
          ))}

        </motion.div>
      </motion.section>

      {/* ── Currently exploring ── */}
      <motion.section
        aria-label="Currently exploring"
        className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
      >
        <div className="dark-surface relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#131315] via-[#111113] to-[#0f0f11] p-6 shadow-[0_32px_72px_-20px_rgba(0,0,0,0.4)] sm:p-8 lg:p-10">

          {/* Ambient glows */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#2563EB]/[0.04] blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-16 right-10 h-56 w-56 rounded-full bg-white/[0.015] blur-[80px]" />

          {/* Header */}
          <div className="relative mb-8 flex items-center gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#93C5FD]">What I&apos;m into right now</p>
              <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">Currently Exploring</h2>
            </div>
            <div className="ml-2 hidden h-px flex-1 bg-gradient-to-r from-[#2563EB]/30 to-transparent sm:block" />
          </div>

          {/* Cards */}
          <motion.div
            className="relative grid gap-4 sm:gap-5 lg:grid-cols-3"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {currentlyExploring.map((item, i) => (
              <motion.article
                key={item.title}
                variants={cardReveal}
                whileHover={reduceMotion ? undefined : { y: -7, transition: { type: "spring", stiffness: 280, damping: 22 } }}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-white/[0.03] p-5 transition-all duration-300 hover:bg-white/[0.06] sm:p-6 ${item.accentBorder}`}
              >
                {/* Top shimmer on hover */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Icon */}
                <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border ${item.accentBg} ${item.accentBorder}`}>
                  <span className={`material-symbols-outlined text-[24px] ${item.accent}`}>{item.icon}</span>
                </div>

                {/* Number + title */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-[0.9375rem] font-bold leading-snug text-white sm:text-base">{item.title}</h3>
                  <span className="mt-0.5 shrink-0 text-[2rem] font-black leading-none tabular-nums text-white/[0.06] transition-colors duration-300 group-hover:text-white/[0.12]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Note */}
                <p className="mt-3 flex-1 text-sm leading-[1.75] text-slate-400 transition-colors duration-300 group-hover:text-slate-300">{item.note}</p>

                {/* Bottom accent line */}
                <div className={`mt-5 h-[2px] w-8 rounded-full transition-all duration-500 group-hover:w-full ${item.accentBg}`} />
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── Skills ── */}
      <motion.section aria-label="Technical skills" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#93C5FD]">Core Stack</p>
            <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">Built across the whole stack.</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-400">
            Structured engineering across frontend, backend, databases, and DevOps tools to deliver resilient and scalable systems.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {skillGroups.map((group, idx) => (
            <article 
              key={group.label} 
              className="dark-surface group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.07] bg-[#141416] p-6 transition-all duration-300 hover:border-white/[0.14] hover:bg-[#161618] hover:shadow-[0_16px_36px_-20px_rgba(0,0,0,0.5)]"
            >
              {/* Corner Index */}
              <div className="absolute right-4 top-4 text-xs font-bold font-mono text-slate-700 transition-colors group-hover:text-[#60A5FA]/40">
                {String(idx + 1).padStart(2, "0")}
              </div>

              <div>
                {/* Title */}
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition-colors group-hover:text-slate-400">
                  {group.label}
                </h3>
                
                {/* Visual Accent */}
                <div className="my-4 h-px w-full bg-gradient-to-r from-white/[0.08] to-transparent" />

                {/* Items List */}
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item.name} className="flex items-center gap-2.5">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white/[0.03] p-1 border border-white/[0.04] transition-colors group-hover:bg-white/[0.06]">
                        <img 
                          src={item.iconUrl} 
                          alt={`${item.name} logo`} 
                          width={14} 
                          height={14} 
                          className="h-3.5 w-3.5 object-contain" 
                          loading="lazy" 
                        />
                      </div>
                      <span className="text-xs font-medium text-slate-300 transition-colors group-hover:text-white">
                        {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </motion.section>

      {/* ── Work Experience ── */}
      <motion.section id="journey" aria-label="Work experience" className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
        <div className="mb-10 sm:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#93C5FD]">Career</p>
          <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">Work Experience</h2>
        </div>
        <motion.div className="relative space-y-0" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.08 }}>
          <div className="experience-rail absolute left-0 top-2 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-[#2563EB]/70 via-[#2563EB]/30 to-transparent sm:block" />
          {workExperience.map((job, index) => (
            <motion.article
              key={`${job.role}-${job.company}`}
              variants={{ hidden: { opacity: 0, y: reduceMotion ? 0 : 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
              className={`relative sm:pl-10 ${index !== workExperience.length - 1 ? "pb-10 sm:pb-12" : ""}`}
            >
              <div className="absolute left-0 top-[1.4rem] hidden -translate-x-1/2 sm:block">
                <span className="experience-dot flex h-2.5 w-2.5 rounded-full bg-[#2563EB] shadow-[0_0_0_4px_rgba(37,99,235,0.15),0_0_12px_rgba(37,99,235,0.5)]" />
              </div>

              {/* Card */}
              <div className="dark-surface group rounded-2xl border border-white/[0.07] bg-[#141416] p-5 transition-all duration-300 hover:border-white/[0.14] sm:p-6 lg:p-7">
                {/* Top row */}
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
                  <div>
                    <h3 className="text-base font-bold text-white sm:text-[1.05rem]">{job.role}</h3>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                      <span className="text-sm font-semibold text-[#60A5FA]">{job.company}</span>
                      <span className="hidden h-3.5 w-px bg-white/20 sm:block" aria-hidden="true" />
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <span className="material-symbols-outlined text-[13px]">location_on</span>
                        {job.location}
                      </span>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium tabular-nums text-slate-400">
                    {job.period}
                  </span>
                </div>

                {/* Divider */}
                <div className="my-4 h-px w-full bg-white/[0.06]" />

                {/* Summary */}
                <p className="text-sm leading-[1.75] text-slate-400">{job.summary}</p>

                {/* Highlights */}
                <ul className="mt-5 space-y-3">
                  {job.highlights.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB]" aria-hidden="true" />
                      <span className="text-sm leading-relaxed text-slate-400">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      {/* ── About ── */}
      <motion.section id="about" aria-label="About Ahmad Ibrahim" className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#93C5FD]">Who I am</p>
        <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">About Me</h2>
        <div className="about-paper relative mt-8 rounded-[1.5rem] border border-[#e7e1d4] bg-[#f7f5ef] p-5 shadow-[0_24px_70px_-38px_rgba(0,0,0,0.7)] sm:p-8 lg:p-10">
          <span className="pointer-events-none absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 -rotate-2 bg-[#93C5FD]/70 shadow-sm" />
          <div className="grid gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-12">
          {/* Photo side */}
          <div className="relative mx-auto w-full max-w-[300px] rotate-[-2deg] rounded-sm border border-slate-200 bg-white p-3 pb-12 shadow-[0_16px_38px_-18px_rgba(15,23,42,0.35)] transition-transform duration-300 hover:rotate-0 sm:max-w-[340px]">
            <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
              <Image src="/me3.png" alt="Ahmad Ibrahim — Backend-Focused Full-Stack Engineer" fill sizes="(max-width: 640px) 280px, 340px" className="object-cover object-top" />
            </div>
            <p className="absolute inset-x-0 bottom-3 text-center font-serif text-lg italic text-slate-500">Ahmad Ibrahim · Kano</p>
            <span className="absolute -top-3 left-1/2 h-7 w-20 -translate-x-1/2 rotate-3 bg-[#93C5FD]/70 shadow-sm" />
          </div>
          {/* Text side */}
          <div className="flex flex-col justify-center space-y-5 text-sm leading-relaxed text-slate-600 sm:text-base">
            <p className="text-2xl font-bold leading-snug text-slate-950 sm:text-3xl" style={{ fontFamily: "Instrument Serif, Georgia, serif", fontStyle: "italic" }}>Building software that does what it promises.</p>
            <p>I&apos;m Ahmad Ibrahim, a BSc Software Engineering student and full-stack developer focused on building reliable web applications and backend systems. I enjoy turning ideas into scalable products designed to solve real problems, stay maintainable, and hold up under real-world use.</p>
            <p>Currently exploring AI-powered product experiences, scalable system design, and backend performance optimization.</p>
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[{ value: "8+", label: "Projects" }, { value: "2022", label: "Started" }, { value: "3+", label: "Roles" }].map((s) => (
                <div key={s.label} className="rounded-xl border border-slate-200 bg-white/80 px-3 py-3 text-center shadow-sm">
                  <p className="text-lg font-bold text-slate-900">{s.value}</p>
                  <p className="mt-0.5 text-[11px] text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </motion.section>

      {/* ── Contact & Call to Action ── */}
      <motion.section 
        id="contact" 
        aria-label="Contact Ahmad Ibrahim" 
        className="mx-auto w-full max-w-5xl px-4 pb-24 pt-16 sm:pb-32 sm:px-6 lg:px-8" 
        variants={sectionReveal} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, amount: 0.18 }}
      >
        <div className="dark-surface relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-[#1a1a1f] via-[#141416] to-[#111113] p-6 sm:p-10 lg:p-12 shadow-[0_32px_80px_-24px_rgba(0,0,0,0.6)]">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#2563EB]/[0.08] blur-3xl" />
          <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-[#2563EB]/[0.05] blur-3xl" />
          <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/[0.04]" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-14">

            {/* ── Left: copy + channels ── */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-3.5 py-1.5 text-xs font-semibold text-emerald-400 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Available for work
              </div>

              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-[2.75rem] leading-[1.08]" style={{ fontFamily: "Instrument Serif, Georgia, serif" }}>
                  Have a good idea?<br /><span className="italic">Let&apos;s build it.</span>
                </h2>
                <p className="mt-3 max-w-md text-sm text-slate-400 leading-relaxed sm:text-[0.9375rem]">
                  Open to full-time remote roles, freelance backend and full-stack projects, and long-term engineering collaborations. Based in Kano, Nigeria — remote-first.
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-white/[0.07]">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 pt-1">Direct channels</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {[
                    { icon: "https://cdn.simpleicons.org/gmail/EA4335", label: "Email", handle: "ahmadibrahimsearcher@gmail.com", href: "mailto:ahmadibrahimsearcher@gmail.com" },
                    { icon: "https://cdn.simpleicons.org/github/FFFFFF", label: "GitHub", handle: "@Searcher06", href: "https://github.com/Searcher06" },
                    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg", label: "LinkedIn", handle: "/in/ahmadibrahim06", href: "https://www.linkedin.com/in/ahmadibrahim06" },
                    { icon: "https://cdn.simpleicons.org/x/FFFFFF", label: "X", handle: "@undefined_dev", href: "https://x.com/undefined_dev" },
                  ].map((ch) => (
                    <a
                      key={ch.label}
                      href={ch.href}
                      target={ch.href.startsWith("http") ? "_blank" : undefined}
                      rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.04] px-3.5 py-3 transition-all duration-200 hover:bg-white/[0.08] hover:border-white/[0.14]"
                    >
                      <img src={ch.icon} alt={ch.label} className="h-4 w-4 shrink-0" loading="lazy" />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <span className="text-[11px] font-semibold leading-tight text-white">{ch.label}</span>
                        <span className="truncate text-[10px] leading-tight text-slate-500 group-hover:text-slate-300 transition-colors">{ch.handle}</span>
                      </div>
                      <span className="material-symbols-outlined shrink-0 text-[13px] text-slate-600 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-slate-400">arrow_forward</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right: form ── */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
              <h3 className="text-base font-bold text-white mb-5 tracking-tight">Send a direct message</h3>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="form-name" className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-1.5">Full Name</label>
                  <input
                    type="text"
                    id="form-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-[#60A5FA]/60 focus:bg-white/[0.07] focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="form-email" className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-1.5">Email Address</label>
                  <input
                    type="email"
                    id="form-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-[#60A5FA]/60 focus:bg-white/[0.07] focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="form-message" className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-1.5">Message</label>
                  <textarea
                    id="form-message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Tell me about your project, role, or timeline..."
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-[#60A5FA]/60 focus:bg-white/[0.07] focus:outline-none resize-none transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sendingForm}
                  className="group relative mt-1 flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-[#2563EB] to-[#38BDF8] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(37,99,235,0.35)] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(37,99,235,0.55)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none disabled:opacity-50 disabled:pointer-events-none"
                >
                  {/* shine sweep */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  {sendingForm ? (
                    <span className="flex items-center gap-2">
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Sending…
                    </span>
                  ) : (
                    <span className="flex items-center gap-2.5">
                      Send Message
                      <span className="material-symbols-outlined text-[17px] transition-transform duration-300 group-hover:translate-x-0.5">arrow_forward</span>
                    </span>
                  )}
                </button>
                {submitStatus && (
                  <p className={`text-xs mt-2 text-center font-medium ${submitStatus.success ? "text-emerald-400" : "text-rose-400"}`}>
                    {submitStatus.message}
                  </p>
                )}
              </form>
            </div>

          </div>
        </div>
      </motion.section>
    </main>
  );
}

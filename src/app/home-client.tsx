"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

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
  "Rough idea to working product",
  "Ships with edge cases thought through",
  "Code the next dev can actually trust",
];

const findoraFeatures = [
  "Post lost or found items with photos",
  "Search reports and get suggested matches",
  "Chat and confirm returns with a five-digit code",
  "Help admins review reports and manage users",
];

const otherProjects: ProjectCard[] = [
  {
    name: "School Payment & Distribution Management System",
    image: "/schoolmanagement.png",
    problem:
      "The school needed one place to manage fee payments and hand out school items.",
    solution:
      "Built a system where parents submit payments, admins review them, and staff track item collection.",
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
      "Finding the right learning video can take too long.",
    solution:
      "Built a learning app with personal video suggestions and fast search that handles misspelled words.",
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
      "Job applications take time: tailoring CVs, writing letters, and tracking replies.",
    solution:
      "Built an assistant for role-specific CVs and letters, Gmail tracking, CV checks, and voice interview practice.",
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
const emailDraftHref = "mailto:ahmadibrahimsearcher@gmail.com?subject=Project%20or%20work%20inquiry&body=Hi%20Ahmad%2C%0D%0A%0D%0AI%27d%20like%20to%20talk%20about%20a%20project%20or%20opportunity.%0D%0A%0D%0AThanks%2C%0D%0A";
const cvUrl = "https://drive.google.com/file/d/1RgAANbhgDxLBSMivdDQ-DWHRH0kNjC-5/view?usp=sharing";

const currentlyExploring = [
  {
    title: "AI systems for real-world products",
    note: "Exploring useful AI features such as recommendations, voice interfaces, and automation for real products.",
    icon: "smart_toy",
    accent: "text-[#93C5FD]",
    accentBg: "bg-[#93C5FD]/10",
    accentBorder: "border-[#93C5FD]/20",
  },
  {
    title: "System design patterns",
    note: "Studying event-driven systems and service boundaries that help products grow without a full rewrite.",
    icon: "schema",
    accent: "text-[#60A5FA]",
    accentBg: "bg-[#60A5FA]/10",
    accentBorder: "border-[#60A5FA]/20",
  },
  {
    title: "Backend performance",
    note: "Improving query performance, caching, and the parts of a system that slow users down.",
    icon: "speed",
    accent: "text-[#BFDBFE]",
    accentBg: "bg-[#BFDBFE]/10",
    accentBorder: "border-[#BFDBFE]/20",
  },
];

const services = [
  { title: "Frontend Development", description: "Clear, responsive interfaces that make your product easy to use.", icon: "web", tone: "bg-blue-100 text-blue-700" },
  { title: "Backend Development", description: "Secure APIs and dependable systems built to support real product needs.", icon: "dns", tone: "bg-violet-100 text-violet-700" },
  { title: "API Integration", description: "Connect payments, email, identity, and other tools into one smooth workflow.", icon: "api", tone: "bg-emerald-100 text-emerald-700" },
  { title: "Responsive Design", description: "Layouts that feel natural on phones, tablets, laptops, and large screens.", icon: "devices", tone: "bg-amber-100 text-amber-700" },
  { title: "Cloud Solutions", description: "Practical deployment and infrastructure for stable, growing applications.", icon: "cloud", tone: "bg-sky-100 text-sky-700" },
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
    period: "Jan 13, 2026 to Present",
    location: "Remote",
    summary: "Building backend services for a trust-focused platform with demanding reliability needs.",
    highlights: [
      "Designed APIs and services for product growth and faster delivery.",
      "Integrated payment, KYC, and blockchain workflows.",
      "Set security, data integrity, and performance standards through reviews and tests.",
      "Worked with product and design to ship resilient features.",
    ],
  },
  {
    role: "Full-Stack Engineer (Contract)",
    company: "Primary Colours School",
    period: "Feb 2026 to Apr 26, 2026",
    location: "Nigeria",
    summary: "Built a school system to review fee payments and track item handovers.",
    highlights: [
      "Created a form for parents to send payment details and proof.",
      "Helped admins review payments and assign items to staff.",
      "Added tools to track collections and view payment reports.",
    ],
  },
  {
    role: "Software Engineer Intern (Backend)",
    company: "BOI BUK Innovation Hub",
    period: "Mar 9, 2026 to Present",
    location: "Bayero University, Nigeria",
    summary: "Developing backend foundations for a platform connecting innovation hubs at BUK.",
    highlights: [
      "Mapped hub, program, event, and communication needs into backend modules.",
      "Contributed API and admin console design.",
      "Supported access control and content management architecture.",
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

      {/* â”€â”€ Navigation â”€â”€ */}
      <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-3 sm:px-6 lg:px-8">
        <nav className={`mx-auto flex h-[3.75rem] w-full max-w-7xl items-center justify-between rounded-2xl border px-3 backdrop-blur-2xl transition-all duration-500 sm:h-[4.25rem] sm:px-7 ${
          scrolled
            ? "border-white/[0.08] bg-[#0c0c0e]/80 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]"
            : "border-transparent bg-[#0c0c0e]/30 shadow-none"
        }`}>
          <a href="#home" className="inline-flex shrink-0 items-center gap-2 sm:gap-3">
            <Image src="/ahmad-mark.svg" alt="Ahmad Ibrahim logo" width={44} height={44} className="h-8 w-8 sm:h-10 sm:w-10" />
            <span className="text-xs font-semibold text-white sm:text-[0.9375rem]">Ahmad Ibrahim</span>
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
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
            <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="hidden items-center gap-1 text-sm font-medium text-slate-400 transition-colors hover:text-white sm:inline-flex" aria-label="View Ahmad Ibrahim's CV">
              View CV
              <span className="material-symbols-outlined text-[15px]" aria-hidden="true">open_in_new</span>
            </a>
            <a href="https://github.com/Searcher06" target="_blank" rel="noreferrer" aria-label="Ahmad Ibrahim on GitHub" className="nav-icon-btn inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-slate-300 transition-colors hover:border-white/[0.14] hover:bg-white/[0.07] hover:text-white">
              <img src="https://cdn.simpleicons.org/github/FFFFFF" alt="" aria-hidden="true" className="h-[18px] w-[18px]" />
            </a>
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

      {/* â”€â”€ Mobile nav dropdown â”€â”€ */}
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
              className="mobile-nav-panel fixed inset-x-3 top-[5.25rem] z-50 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111113]/96 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur-2xl sm:inset-x-6 lg:hidden"
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
                <motion.a
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Ahmad Ibrahim's CV"
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/[0.06]"
                  variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0, transition: { duration: 0.28 } } }}
                >
                  <span>View CV</span>
                  <span className="material-symbols-outlined text-[15px] text-slate-500" aria-hidden="true">open_in_new</span>
                </motion.a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* â”€â”€ Background atmosphere â”€â”€ */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-72 left-1/2 h-[56rem] w-[56rem] -translate-x-1/2 rounded-full bg-[#2563EB]/[0.05] blur-[180px]" />
      </div>

      {/* â”€â”€ Hero â”€â”€ */}
      <motion.section
        id="home"
        aria-label="Introduction"
        className="relative mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-7xl items-start justify-center px-4 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pt-36"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-20 left-1/2 h-[30rem] w-[38rem] -translate-x-1/2 rounded-full bg-[#2563EB]/[0.08] blur-[120px]" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>
        <motion.article variants={fadeUp} className="profile-hero-card relative w-full max-w-[38rem] overflow-visible rounded-[2rem] border border-white/[0.12] bg-[#f7f5ef] text-slate-900 shadow-[0_35px_100px_-35px_rgba(0,0,0,0.75)] lg:max-w-[44rem]">
          <div className="relative h-32 sm:h-44 lg:h-52">
            <div className="absolute inset-0 overflow-hidden rounded-t-[2rem] bg-black">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_62%),linear-gradient(135deg,#000,#111)]" />
              <Image src="/ahmad-mark-white.svg" alt="Ahmad Ibrahim logo" width={520} height={520} className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_8px_24px_rgba(0,0,0,0.25)] sm:h-[440px] sm:w-[440px] lg:h-[520px] lg:w-[520px]" />
              <span className="force-dark absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-[#0c1628]/75 px-3 py-1.5 text-[10px] font-semibold tracking-wide backdrop-blur-md sm:right-6 sm:top-5 sm:text-xs">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-white">Available for remote roles</span>
              </span>
            </div>
            <div className="absolute bottom-0 left-6 translate-y-1/2 rounded-2xl bg-[#f7f5ef] p-1.5 shadow-lg sm:left-8">
              <div className="relative h-[4.5rem] w-[4.5rem] overflow-hidden rounded-xl sm:h-24 sm:w-24">
                <Image src="/ahmad-mark.svg" alt="Ahmad Ibrahim logo" fill sizes="96px" className="object-contain" />
              </div>
            </div>
          </div>
          <div className="px-5 pb-6 pt-14 sm:px-8 sm:pb-8 sm:pt-16">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#2563EB]">Software Engineer</p>
                <h1 className="font-serif text-3xl tracking-tight text-slate-950 sm:text-4xl">Hey, I&apos;m Ahmad</h1>
              </div>
              <a href="mailto:ahmadibrahimsearcher@gmail.com" className="inline-flex items-center gap-1.5 rounded-full bg-[#2563EB] px-4 py-2.5 text-xs font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#1d4ed8] sm:text-sm">
                Let&apos;s talk <span className="material-symbols-outlined text-[16px]">north_east</span>
              </a>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-[#475569] sm:text-base">
              I build software that helps businesses grow, operate smarter, and create more value.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { label: "Projects", href: "#projects" },
                { label: "About me", href: "#about" },
                { label: "My experience", href: "#journey" },
                { label: "GitHub", href: "https://github.com/Searcher06" },
                { label: "View CV", href: cvUrl },
              ].map((item) => (
                <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined} className={item.label === "View CV" ? "inline-flex items-center gap-1 px-1 py-2 text-xs font-medium text-slate-500 transition hover:text-[#1d4ed8]" : "inline-flex items-center rounded-full border border-slate-300/80 bg-white/75 px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-[#2563EB]/40 hover:bg-white hover:text-[#1d4ed8]"}>
                  {item.label}
                  {item.label === "View CV" && <span className="material-symbols-outlined text-[14px]" aria-hidden="true">open_in_new</span>}
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

      {/* â”€â”€ Marquee strip â”€â”€ */}
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

      {/* â”€â”€ Credibility bar â”€â”€ */}
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

      {/* â”€â”€ Featured project: Findora â”€â”€ */}
      <motion.section
        id="projects"
        aria-label="Featured project: Findora"
        className="mx-auto w-full max-w-7xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-24 lg:px-8 lg:pb-32"
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
            A simple way to report lost items, connect with finders, and verify safe handovers.
          </p>
        </div>

        {/* Outcome metrics */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:mb-10 sm:grid-cols-4">
          {[
            { value: "2-step",    label: "Verified handovers" },
            { value: "Live",      label: "Chat between users" },
            { value: "Photo",     label: "Lost item reports" },
            { value: "Admin",     label: "Report moderation" },
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
                <p>Lost item posts in my department disappeared in busy WhatsApp chats, and ownership was hard to verify.</p>
              </div>
              <div>
                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">The Solution</p>
                <p>Findora brings photo reports, search, live chat, and two-step handover codes into one moderated platform.</p>
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
            {/* Ambient glow, subtle on mobile and stronger on desktop */}
            <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-[#2563EB]/[0.1] blur-[40px] lg:-inset-4 lg:bg-[#2563EB]/[0.15] lg:blur-[60px]" />
            {/* Tilt wrapper, flat on mobile and 3D on desktop */}
            <div className="mockup-tilt relative w-full">
              {/* Drop shadow beneath frame on desktop */}
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
                  alt="Findora lost and found platform, browse items screen"
                  width={900}
                  height={620}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>

        </div>
      </motion.section>

      {/* â”€â”€ Other projects â”€â”€ */}
      <motion.section aria-label="Selected projects" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3 sm:mb-10">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#93C5FD]">A few things I&apos;ve worked on</p>
            <h2 className="-rotate-1 font-handwriting text-3xl leading-[1.1] text-slate-200 sm:text-4xl lg:text-5xl">Products built to solve real problems</h2>
          </div>
          <Link href="/projects" className="text-sm font-semibold text-[#60A5FA] transition hover:text-[#BFDBFE]">View All Projects</Link>
        </div>
        <motion.div className="divide-y divide-white/[0.12]" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
          {otherProjects.map((project, index) => (
            <motion.article key={project.name} variants={cardReveal} className="grid gap-6 py-8 first:pt-0 last:pb-0 sm:gap-9 sm:py-12 lg:grid-cols-2 lg:items-center lg:gap-14">
              <div className={`group relative ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="absolute -inset-2 rotate-1 rounded-[1.6rem] bg-[#f7f5ef] shadow-lg" />
                <div className="relative overflow-hidden rounded-2xl border-[5px] border-[#f7f5ef] bg-white shadow-[0_18px_45px_-26px_rgba(0,0,0,0.7)]">
                  <Image src={project.image} alt={`${project.name}, project preview`} width={1200} height={700} className="h-auto w-full transition duration-500 group-hover:scale-[1.015]" />
                </div>
                <span className="absolute -bottom-3 right-5 rounded-full bg-[#DBEAFE] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#1d4ed8] shadow-sm">Selected work Â· 0{index + 1}</span>
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

      {/* â”€â”€ Services â”€â”€ */}
      <motion.section id="services" aria-label="Services and expertise" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3 sm:mb-10">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#93C5FD]">How I can help</p>
            <h2 className="-rotate-1 font-handwriting text-3xl leading-[1.1] text-slate-200 sm:text-4xl lg:text-5xl">Services &amp; Expertise</h2>
          </div>
          <p className="max-w-sm text-sm text-slate-400">Practical engineering for products that need to work well and grow.</p>
        </div>
        <motion.div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              variants={cardReveal}
              whileHover={reduceMotion ? undefined : { y: -6 }}
              className="group flex min-h-64 flex-col rounded-[1.75rem] border border-[#e7e1d4] bg-[#f7f5ef] p-6 shadow-[0_12px_32px_-24px_rgba(0,0,0,0.65)] transition duration-300 hover:border-[#c9d8f5] hover:bg-white hover:shadow-[0_20px_42px_-24px_rgba(0,0,0,0.55)] sm:p-7"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${service.tone}`}>
                  <span className="material-symbols-outlined text-[24px]" aria-hidden="true">{service.icon}</span>
                </span>
                <span className="font-mono text-xs font-semibold tracking-widest text-slate-400">0{index + 1}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 sm:text-xl">{service.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{service.description}</p>
              <a href="#contact" className="mt-5 inline-flex w-fit items-center gap-1.5 border-t border-slate-200 pt-4 text-sm font-semibold text-[#1d4ed8] transition group-hover:text-[#1e40af]">
                Discuss a project <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1" aria-hidden="true">arrow_forward</span>
              </a>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      {/* â”€â”€ Currently exploring â”€â”€ */}
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
              <h2 className="mt-1 -rotate-1 font-handwriting text-3xl leading-[1.1] text-slate-200 sm:text-4xl lg:text-5xl">Currently Exploring</h2>
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

      {/* â”€â”€ Skills â”€â”€ */}
      <motion.section aria-label="Technical skills" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#93C5FD]">Core Stack</p>
            <h2 className="mt-1 -rotate-1 font-handwriting text-3xl leading-[1.1] text-slate-200 sm:text-4xl lg:text-5xl">Built across the whole stack.</h2>
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

      {/* â”€â”€ Work Experience â”€â”€ */}
      <motion.section id="journey" aria-label="Work experience" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
        <div className="mb-8 sm:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#93C5FD]">Career history</p>
          <h2 className="mt-1 -rotate-1 font-handwriting text-3xl leading-[1.1] text-slate-200 sm:text-4xl lg:text-5xl">Experience</h2>
        </div>
        <motion.div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.08 }}>
          {workExperience.map((job, index) => (
            <motion.article
              key={`${job.role}-${job.company}`}
              variants={cardReveal}
              whileHover={reduceMotion ? undefined : { y: -3 }}
              className={`group relative flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition duration-300 hover:border-white/[0.14] hover:bg-white/[0.045] sm:p-6 ${index === 2 ? "md:col-span-2 xl:col-span-1" : ""}`}
            >
              <div className="mb-5 flex items-start justify-between gap-3">
                <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-[#60A5FA]">0{index + 1}</span>
                <span className="text-right text-[11px] leading-relaxed text-slate-500">{job.period}</span>
              </div>
              <h3 className="font-serif text-xl leading-tight text-white sm:text-2xl">{job.role}</h3>
              <p className="mt-1 text-sm font-semibold text-[#93C5FD]">{job.company}</p>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                <span className="material-symbols-outlined text-[14px]" aria-hidden="true">location_on</span>
                {job.location}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-slate-400">{job.summary}</p>
              <div className="mt-5 border-t border-white/[0.08] pt-4">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Selected contributions</p>
                <ul className="space-y-2.5">
                  {job.highlights.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-400">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#60A5FA]" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      {/* â”€â”€ About â”€â”€ */}
      <motion.section id="about" aria-label="About Ahmad Ibrahim" className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#93C5FD]">Who I am</p>
        <h2 className="mt-1 -rotate-1 font-handwriting text-3xl leading-[1.1] text-slate-200 sm:text-4xl lg:text-5xl">About Me</h2>
        <div className="about-paper relative mt-8 rounded-[1.5rem] border border-[#e7e1d4] bg-[#f7f5ef] p-5 shadow-[0_24px_70px_-38px_rgba(0,0,0,0.7)] sm:p-8 lg:p-10">
          <span className="pointer-events-none absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 -rotate-2 bg-[#93C5FD]/70 shadow-sm" />
          <div className="grid gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-12">
          {/* Branded profile panel */}
          <div className="relative mx-auto w-full max-w-[340px]">
            <div className="relative flex aspect-[4/4.5] flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#08090b] p-6 text-white shadow-[0_24px_55px_-24px_rgba(15,23,42,0.55)] sm:p-8">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(255,255,255,0.11),transparent_55%),linear-gradient(145deg,#111318,#030405_70%)]" />
              <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">Software Engineer</span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.65)]" aria-label="Available for work" />
              </div>
              <div className="relative z-10 flex flex-1 items-center justify-center py-5">
                <Image src="/ahmad-mark-white.svg" alt="Ahmad Ibrahim monogram" width={300} height={300} className="h-44 w-44 drop-shadow-[0_12px_32px_rgba(255,255,255,0.12)] sm:h-52 sm:w-52" />
              </div>
              <div className="relative z-10 flex items-end justify-between border-t border-white/15 pt-4">
                <div>
                  <p className="font-serif text-2xl leading-none sm:text-3xl">Ahmad Ibrahim</p>
                  <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">Software Engineer Â· Nigeria</p>
                </div>
                <span className="font-mono text-[10px] text-white/35">01 / 01</span>
              </div>
            </div>
            <span className="pointer-events-none absolute -bottom-2 -right-2 h-12 w-16 -rotate-6 rounded-sm bg-[#93C5FD]/70 shadow-sm" />
          </div>
          {/* Text side */}
          <div className="flex flex-col justify-center space-y-5 text-sm leading-relaxed text-slate-600 sm:text-base">
            <p className="text-2xl font-bold leading-snug text-slate-950 sm:text-3xl" style={{ fontFamily: "Instrument Serif, Georgia, serif", fontStyle: "italic" }}>Building software that does what it promises.</p>
            <p>Hi there, my name is Ahmad Ibrahim and I am a Software Engineer currently studying for my BSc degree in Software Engineering.</p>
            <p>I design software that helps businesses be more efficient, provides a good customer experience, and transforms great ideas into valuable products.</p>
            <p>In addition to developing effective software solutions, I aim to understand the problems being solved, who will use the software, and the engineering practices needed for robust software design.</p>
            <p>From a technical perspective, I have a passion for back-end engineering, software design, and building intelligent solutions using AI technologies.</p>
            <div className="border-t border-slate-200 pt-3" aria-label="How I approach software">
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Understand the problem", icon: "search" },
                  { label: "Design for people", icon: "groups" },
                  { label: "Build robust software", icon: "verified" },
                ].map((area) => (
                  <span key={area.label} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
                    <span className="material-symbols-outlined text-[15px] text-[#2563EB]" aria-hidden="true">{area.icon}</span>
                    {area.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
          </div>
        </div>
      </motion.section>

      {/* â”€â”€ Contact & Call to Action â”€â”€ */}
      <motion.section 
        id="contact" 
        aria-label="Contact Ahmad Ibrahim" 
        className="mx-auto w-full max-w-5xl px-4 pb-24 pt-16 sm:pb-32 sm:px-6 lg:px-8" 
        variants={sectionReveal} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, amount: 0.18 }}
      >
        <div className="relative rounded-3xl border border-[#e7e1d4] bg-[#f7f5ef] p-5 shadow-[0_24px_70px_-42px_rgba(0,0,0,0.55)] sm:p-8 lg:p-10">
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-14">

            {/* â”€â”€ Left: copy + channels â”€â”€ */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-800">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                Available for work
              </div>

              <div>
                <h2 className="text-3xl font-medium leading-[1.08] tracking-tight text-slate-950 sm:text-4xl md:text-[2.75rem]" style={{ fontFamily: "Instrument Serif, Georgia, serif" }}>
                  Have a good idea?<br /><span className="italic">Let&apos;s build it.</span>
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">
                  Open to remote roles, freelance projects, and long-term engineering work. Based in Nigeria and available remotely.
                </p>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <p className="mb-1 text-xs font-semibold text-slate-700">Or find me here</p>
                <div className="grid gap-x-6 sm:grid-cols-2">
                  {[
                    { icon: "https://cdn.simpleicons.org/gmail/EA4335", label: "Email", handle: "ahmadibrahimsearcher@gmail.com", href: "mailto:ahmadibrahimsearcher@gmail.com" },
                    { icon: "https://cdn.simpleicons.org/whatsapp/25D366", label: "WhatsApp", handle: "+234 813 939 2918", href: "https://wa.me/2348139392918" },
                    { icon: "https://cdn.simpleicons.org/github/0F172A", label: "GitHub", handle: "@Searcher06", href: "https://github.com/Searcher06" },
                    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg", label: "LinkedIn", handle: "/in/ahmadibrahim06", href: "https://www.linkedin.com/in/ahmadibrahim06" },
                    { icon: "https://cdn.simpleicons.org/x/0F172A", label: "X", handle: "@undefined_dev", href: "https://x.com/undefined_dev" },
                  ].map((ch) => (
                    <a
                      key={ch.label}
                      href={ch.href}
                      target={ch.href.startsWith("http") ? "_blank" : undefined}
                      rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex min-w-0 items-center gap-3 border-b border-slate-200 py-3 transition-colors hover:border-[#60A5FA]/60"
                    >
                      <img src={ch.icon} alt="" aria-hidden="true" className="h-4 w-4 shrink-0" loading="lazy" />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <span className="text-xs font-semibold leading-tight text-slate-800">{ch.label}</span>
                        <span className="truncate text-[11px] leading-tight text-slate-500 transition-colors group-hover:text-slate-700">{ch.handle}</span>
                      </div>
                      <span className="material-symbols-outlined shrink-0 text-[15px] text-slate-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-slate-700">arrow_forward</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* â”€â”€ Right: email draft CTA â”€â”€ */}
            <div className="flex h-full flex-col justify-center border-t border-slate-200 pt-6 sm:pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Email</p>
              <h3 className="mt-2 font-serif text-2xl text-slate-950 sm:text-3xl">Have a project in mind?</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
                Send me a message and tell me a little about it.
              </p>
              <a href={emailDraftHref} className="mt-5 inline-flex w-fit items-center gap-2 border-b border-slate-400 pb-1 text-sm font-medium text-slate-900 transition-colors hover:border-slate-900">
                ahmadibrahimsearcher@gmail.com
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">north_east</span>
              </a>
            </div>

          </div>
        </div>
      </motion.section>
    </main>
  );
}

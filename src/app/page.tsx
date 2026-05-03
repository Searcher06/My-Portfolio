"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  "Building Findora - trust-based lost and found system",
  "Focused on backend-heavy applications",
  "Designing systems with real-world constraints",
];

const quickStats = [
  { label: "Systems Designed", value: "14", trend: "+4 this year" },
  { label: "APIs Shipped", value: "31", trend: "Across product domains" },
  { label: "Avg. P95 Gain", value: "38%", trend: "From backend tuning" },
  { label: "Active Build", value: "Findora", trend: "Trust-focused product" },
];

const findoraFeatures = [
  "Smart claim verification and owner-proof flow",
  "Role-aware moderation dashboard for dispute handling",
  "Incident timeline tracking with status notifications",
];

const otherProjects: ProjectCard[] = [
  {
    name: "OpsBoard",
    image: "/og/opsboard-placeholder.svg",
    problem: "Small teams lose operational visibility when incidents are tracked across scattered tools.",
    solution: "Built a unified incident and runbook workspace with ownership, escalation, and audit trails.",
    tools: [
      { name: "Node.js", iconUrl: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
      { name: "PostgreSQL", iconUrl: "https://cdn.simpleicons.org/postgresql/4169E1" },
      { name: "Event Workflows", iconUrl: "https://cdn.simpleicons.org/apachekafka/231F20" },
    ],
    href: "/projects",
  },
  {
    name: "HiringFlow",
    image: "/og/hiringflow-placeholder.svg",
    problem: "Recruiting pipelines break when candidate data is inconsistent and feedback loops are slow.",
    solution: "Designed a structured hiring pipeline with score normalization, interviewer calibration, and API-first integrations.",
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
    problem: "B2B products struggle to balance secure authentication with low-friction onboarding.",
    solution: "Implemented adaptive auth policies with device trust, risk scoring, and session governance.",
    tools: [
      { name: "Auth Design", iconUrl: "https://cdn.simpleicons.org/auth0/EB5424" },
      { name: "Risk Scoring", iconUrl: "https://cdn.simpleicons.org/sentry/362D59" },
      { name: "Redis", iconUrl: "https://cdn.simpleicons.org/redis/DC382D" },
    ],
    href: "/projects",
  },
];

const thinkingItems = [
  {
    title: "Authentication architecture under real threat models",
    summary: "How to design auth that survives abuse without destroying onboarding conversion.",
    href: "/about",
    icon: "shield",
  },
  {
    title: "Fraud prevention without false-positive chaos",
    summary: "Practical controls for blocking abuse while protecting legitimate users.",
    href: "/about",
    icon: "gpp_maybe",
  },
  {
    title: "API structure for scale and ownership",
    summary: "Resource boundaries, versioning discipline, and operational clarity for teams.",
    href: "/about",
    icon: "lan",
  },
  {
    title: "Designing backend systems with failure as a first-class input",
    summary: "Building for retries, partial outages, and observability from day one.",
    href: "/about",
    icon: "settings_ethernet",
  },
];

const currentlyExploring = [
  { title: "Better auth flows", note: "Lower friction onboarding with stronger trust boundaries.", icon: "verified_user" },
  { title: "System design patterns", note: "Reusable architecture for high-change product teams.", icon: "schema" },
  { title: "Backend performance", note: "Profiling and tuning under realistic production load.", icon: "speed" },
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
    title: "System Thinking Phase",
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
  { label: "Home", href: "#home", icon: "home" },
  { label: "Projects", href: "#projects", icon: "work" },
  { label: "Thinking", href: "#thinking", icon: "lightbulb" },
  { label: "Journey", href: "#journey", icon: "timeline" },
  { label: "Contact", href: "#contact", icon: "mail" },
];

export default function HomePage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-visible");
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" },
    );

    const elements = document.querySelectorAll("[data-reveal]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative overflow-hidden">
      <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <nav className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-[#0b1018]/80 px-4 py-3 backdrop-blur-xl shadow-[0_24px_55px_-25px_rgba(0,212,170,0.45)] sm:h-20 sm:px-6">
          <a href="#home" className="inline-flex items-center gap-3 text-sm font-semibold text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#00d4aa] to-[#2aa8ff] text-base text-[#061117]">A</span>
            <span className="text-base">Ahmad Ibrahim</span>
          </a>

          <ul className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white">
                  <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="hidden items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-[#8ff0da]/45 hover:text-white md:inline-flex"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              Download CV
            </button>
            <a href="#contact" className="hidden rounded-lg border border-[#8ff0da]/40 bg-[#8ff0da]/10 px-4 py-2 text-sm font-semibold text-[#a7f3d0] md:inline-flex">
              Contact
            </a>
            <button
              type="button"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white md:hidden"
              aria-label="Toggle navigation"
            >
              <span className="material-symbols-outlined text-[20px]">menu</span>
            </button>
          </div>
        </nav>
      </header>

      {mobileNavOpen && (
        <>
          <button
            type="button"
            aria-label="Close mobile menu"
            onClick={() => setMobileNavOpen(false)}
            className="fixed inset-0 z-40 bg-black/45 md:hidden"
          />
          <aside className="fixed right-3 top-24 z-50 flex gap-2 md:hidden">
            <div className="w-14 rounded-2xl border border-white/15 bg-[#070d15]/95 p-2 backdrop-blur-xl">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <a
                    key={`mini-${item.label}`}
                    href={item.href}
                    onClick={() => setMobileNavOpen(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#8ff0da]"
                  >
                    <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="w-56 rounded-2xl border border-white/15 bg-[#0b101a]/95 p-3 backdrop-blur-xl shadow-[0_25px_55px_-30px_rgba(0,212,170,0.6)]">
              <p className="mb-2 px-2 text-xs uppercase tracking-[0.15em] text-slate-400">Navigation</p>
              <div className="space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileNavOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#8ff0da]">{item.icon}</span>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </>
      )}

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-64 left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-[#00d4aa]/15 blur-[140px]" />
        <div className="absolute -left-32 top-[35%] h-[20rem] w-[20rem] rounded-full bg-blue-400/15 blur-[100px]" />
        <div className="absolute -right-32 top-[52%] h-[24rem] w-[24rem] rounded-full bg-emerald-300/15 blur-[110px]" />
      </div>

      <section id="home" data-reveal className="scroll-hidden mx-auto grid min-h-[95vh] w-full max-w-7xl gap-8 px-4 pb-16 pt-28 sm:gap-10 sm:px-6 sm:pt-34 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14 lg:px-8 lg:pt-40">
        <div className="mx-auto w-full max-w-[34rem] space-y-7 lg:mx-0 lg:max-w-none lg:space-y-8">
          <div className="inline-flex items-center rounded-full border border-[#2aa8ff]/35 bg-gradient-to-r from-[#00d4aa]/20 via-[#2aa8ff]/15 to-transparent px-3 py-1.5 shadow-[0_10px_25px_-14px_rgba(42,168,255,0.9)]">
            <p className="animate-pulse text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b7fbef]">
              Architecting Trust-Driven Systems
            </p>
          </div>
          <div className="space-y-5">
            <h1 className="text-[2.45rem] font-bold leading-[1.04] tracking-tight text-white sm:text-5xl md:text-6xl xl:text-7xl">
              I build trust-critical software for products that cannot fail quietly.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg lg:text-xl">
              Backend-heavy engineering for authentication, abuse-resistant workflows, and system architecture that stays stable under real-world pressure.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/projects" className="btn-primary inline-flex w-full items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition hover:scale-[1.02] sm:w-auto sm:text-base">
              View Projects
            </Link>
            <Link href="#thinking" className="btn-secondary inline-flex w-full items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition hover:scale-[1.02] sm:w-auto sm:text-base">
              See My Thinking
            </Link>
          </div>
        </div>

        <aside className="relative mx-auto w-full max-w-[34rem] lg:mx-0 lg:max-w-none">
          <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-[#00d4aa]/35 via-cyan-400/20 to-transparent blur-xl" />
          <div className="relative rounded-[2rem] border border-white/15 bg-gradient-to-br from-[#141d2a] via-[#111723] to-[#0a0e15] p-5 shadow-[0_30px_80px_-25px_rgba(0,212,170,0.35)] sm:p-7">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#00d4aa] to-[#2aa8ff] p-[1px]">
                  <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#0f141c] text-sm font-bold text-[#9cebdc]">AF</div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Ahmad Ibrahim</p>
                  <p className="text-xs text-slate-400">Backend-Focused Full-Stack Engineer</p>
                </div>
              </div>
              <span className="rounded-full border border-emerald-300/40 bg-emerald-300/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-200">Active</span>
            </div>

            <div className="space-y-3 rounded-2xl border border-white/15 bg-black/35 p-4 font-mono text-xs sm:text-sm">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-slate-400">profile.ts</p>
                <span className="rounded border border-[#8ff0da]/30 bg-[#8ff0da]/10 px-1.5 py-0.5 text-[10px] text-[#9cebdc]">v2026</span>
              </div>
              <p><span className="text-[#8ff0da]">name</span>: <span className="text-slate-200">&quot;Ahmad Ibrahim&quot;</span></p>
              <p><span className="text-[#8ff0da]">role</span>: <span className="text-slate-200">&quot;Backend-Focused Full-Stack Engineer&quot;</span></p>
              <p><span className="text-[#8ff0da]">focus</span>: <span className="text-slate-200">&quot;Trust systems, auth, APIs&quot;</span></p>
              <p><span className="text-[#8ff0da]">core</span>: <span className="text-slate-200">[&quot;Node.js&quot;, &quot;PostgreSQL&quot;, &quot;React&quot;]</span></p>
              <p><span className="text-[#8ff0da]">currently</span>: <span className="text-slate-200">&quot;Building Findora&quot;</span></p>
              <p><span className="text-[#8ff0da]">style</span>: <span className="text-slate-200">&quot;Fast execution, high ownership&quot;</span></p>
              <p><span className="text-[#8ff0da]">status</span>: <span className="text-emerald-300">&quot;open_for_collaboration&quot;</span></p>
            </div>
          </div>
        </aside>
      </section>

      <section data-reveal className="scroll-hidden border-y border-white/10 bg-gradient-to-r from-white/[0.02] via-white/[0.05] to-white/[0.02]">
        <div className="mx-auto grid w-full max-w-7xl gap-2 px-4 py-5 sm:px-6 md:grid-cols-3 lg:px-8">
          {credibilityPoints.map((point) => (
            <p key={point} className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm font-medium text-slate-200 sm:text-base">{point}</p>
          ))}
        </div>
      </section>

      <section id="projects" data-reveal className="scroll-hidden mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {quickStats.map((stat) => (
            <article key={stat.label} className="rounded-2xl border border-white/10 bg-[#0d131d]/90 p-4 shadow-[0_14px_30px_-22px_rgba(42,168,255,0.65)] transition duration-300 hover:-translate-y-1 hover:scale-[1.01]">
              <p className="text-xs uppercase tracking-[0.14em] text-[#9cebdc]">{stat.label}</p>
              <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
              <p className="mt-1 text-xs text-slate-400">{stat.trend}</p>
            </article>
          ))}
        </div>
      </section>

      <section data-reveal className="scroll-hidden mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#161f2d] via-[#101620] to-[#0b0f16] p-6 sm:p-8 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9cebdc]">Featured Project</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Findora</h2>
          <p className="mt-2 text-lg text-slate-300">A trust-based lost and found system for real communities.</p>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-5 text-slate-300">
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <Image src="/og/findora-placeholder.svg" alt="Findora dashboard preview" width={1200} height={700} className="h-auto w-full" />
              </div>
              <p><span className="font-semibold text-white">Problem:</span> People lose valuables every day, but recovery workflows are fragmented, unverified, and easy to abuse. Most existing systems fail when trust is lowest.</p>
              <p><span className="font-semibold text-white">Why it matters:</span> Failed recovery does not just lose items; it erodes confidence in communities and organizations.</p>
              <p><span className="font-semibold text-white">Solution:</span> I designed Findora as a trust workflow, not just a listing board, with structured claim validation, moderation controls, and status transparency for every report.</p>
            </div>
            <div className="rounded-2xl border border-[#8ff0da]/25 bg-gradient-to-b from-[#0e1520] to-[#0b1118] p-5 backdrop-blur-sm shadow-[0_18px_42px_-28px_rgba(0,212,170,0.75)]">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-white">Key Features</p>
                <span className="rounded-full border border-[#8ff0da]/35 bg-[#8ff0da]/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-[#a7f3d0]">Core</span>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-slate-300 sm:text-base">
                {findoraFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/25 p-3">
                    <span className="material-symbols-outlined text-[16px] text-[#8ff0da]">verified</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg border border-white/10 bg-black/25 p-2">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-slate-400">Flow</p>
                  <p className="text-xs font-semibold text-white">Secure</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/25 p-2">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-slate-400">Claims</p>
                  <p className="text-xs font-semibold text-white">Verified</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/25 p-2">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-slate-400">Status</p>
                  <p className="text-xs font-semibold text-white">Tracked</p>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/projects" className="btn-primary inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold">View Case Study</Link>
                <Link href="/projects" className="btn-secondary inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold">Live Demo</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-reveal className="scroll-hidden mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <h3 className="text-2xl font-bold text-white sm:text-3xl">Other Projects</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {otherProjects.map((project) => (
            <article key={project.name} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#11151f]/90 p-4 transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-[#00d4aa]/40 hover:shadow-[0_20px_45px_-25px_rgba(0,212,170,0.55)] sm:p-5">
              <div className="overflow-hidden rounded-xl border border-white/10">
                <Image src={project.image} alt={`${project.name} preview`} width={1200} height={700} className="h-40 w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
              </div>
              <h4 className="mt-4 text-lg font-semibold text-white">{project.name}</h4>
              <p className="mt-3 text-sm text-slate-300"><span className="font-medium text-slate-100">Problem:</span> {project.problem}</p>
              <p className="mt-2 text-sm text-slate-300"><span className="font-medium text-slate-100">Solution:</span> {project.solution}</p>
              <div className="mt-4">
                <p className="mb-2 text-xs uppercase tracking-[0.15em] text-slate-400">Tools Used</p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span key={tool.name} className="inline-flex items-center gap-1.5 rounded-full border border-[#8ff0da]/30 bg-[#8ff0da]/10 px-2.5 py-1 text-xs font-medium text-[#a7f3d0]">
                      <img src={tool.iconUrl} alt={`${tool.name} logo`} width={14} height={14} className="h-3.5 w-3.5" loading="lazy" />
                      {tool.name}
                    </span>
                  ))}
                </div>
              </div>
              <Link href={project.href} className="mt-4 inline-flex text-sm font-semibold text-[#8ff0da] hover:text-[#b8fff1]">View Project</Link>
            </article>
          ))}
        </div>
      </section>

      <section id="thinking" data-reveal className="scroll-hidden mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-bold text-white sm:text-3xl">Thinking</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {thinkingItems.map((item) => (
            <Link key={item.title} href={item.href} className="group rounded-2xl border border-white/10 bg-gradient-to-br from-[#101722] to-[#0c121b] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#00d4aa]/50 hover:shadow-[0_16px_40px_-20px_rgba(0,212,170,0.45)]">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-black/30 text-[#8ff0da]">
                <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
              </div>
              <p className="mt-3 text-base font-semibold text-white">{item.title}</p>
              <p className="mt-2 text-sm text-slate-300">{item.summary}</p>
              <p className="mt-4 text-sm font-medium text-[#8ff0da]">Read insight</p>
            </Link>
          ))}
        </div>
      </section>

      <section data-reveal className="scroll-hidden mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-[#111926] via-[#0e1621] to-[#101b2a] p-6 shadow-[0_20px_50px_-30px_rgba(42,168,255,0.45)]">
          <div className="absolute -right-16 -top-10 h-32 w-32 rounded-full bg-cyan-300/20 blur-3xl" />
          <h3 className="text-xl font-bold text-white">Currently exploring:</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {currentlyExploring.map((item) => (
              <article key={item.title} className="group rounded-xl border border-white/10 bg-black/20 p-4 transition hover:-translate-y-1 hover:border-[#8ff0da]/50">
                <span className="material-symbols-outlined text-[#8ff0da]">{item.icon}</span>
                <p className="mt-2 font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-sm text-slate-300">{item.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section data-reveal className="scroll-hidden mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-bold text-white sm:text-3xl">Skills</h3>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <article key={group.label} className="rounded-2xl border border-white/10 bg-[#0f141d]/80 p-5 shadow-[0_12px_30px_-25px_rgba(42,168,255,0.7)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9cebdc]">{group.label}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item.name} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">
                    <img src={item.iconUrl} alt={`${item.name} logo`} width={14} height={14} className="h-3.5 w-3.5" loading="lazy" />
                    {item.name}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="journey" data-reveal className="scroll-hidden mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-bold text-white sm:text-3xl">Experience Journey (2022 - 2026)</h3>
        <div className="relative mt-8">
          <div className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#00d4aa] via-[#2aa8ff] to-[#8ff0da] md:block" />
          <div className="space-y-5">
            {roadmap.map((step, index) => (
              <div key={step.year} className={`flex md:items-center ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}>
                <article className={`relative w-full rounded-2xl border border-white/10 bg-[#101722]/85 p-4 shadow-[0_15px_35px_-25px_rgba(0,212,170,0.45)] md:w-[46%] ${index % 2 === 0 ? "md:mr-[54%]" : "md:ml-[54%]"}`}>
                  <div className={`absolute top-8 hidden h-3 w-3 rounded-full bg-[#00d4aa] md:block ${index % 2 === 0 ? "-right-8" : "-left-8"}`} />
                  <p className="text-xs uppercase tracking-[0.15em] text-[#9cebdc]">{step.year}</p>
                  <p className="mt-2 text-base font-semibold text-white">{step.title}</p>
                  <p className="mt-2 text-sm text-slate-300">{step.highlight}</p>
                  <p className="mt-3 rounded-lg border border-white/10 bg-black/20 px-2 py-1 text-xs text-slate-300">{step.metric}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-reveal className="scroll-hidden mx-auto w-full max-w-4xl px-4 py-14 text-center sm:px-6 lg:px-8">
        <p className="text-xl font-semibold text-white sm:text-2xl">Want to see how I design real systems?</p>
        <Link href="/projects" className="btn-primary mt-6 inline-flex rounded-xl px-6 py-3 text-sm font-semibold sm:text-base">
          View Case Studies
        </Link>
      </section>

      <section data-reveal className="scroll-hidden mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-bold text-white sm:text-3xl">About</h3>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-300 sm:text-base">
          <p>
            I am a backend-focused full-stack engineer who cares deeply about software trust. I build systems that keep working when usage spikes,
            edge cases appear, and real users do unpredictable things.
          </p>
          <p>
            My core strength is turning ambiguous product goals into reliable architecture: clean API boundaries, robust data models,
            verification workflows, and clear operational visibility for teams.
          </p>
          <p>
            Right now, I am focused on Findora and adjacent trust-critical products where ownership, reliability, and thoughtful UX matter just as much as code quality.
          </p>
        </div>
      </section>

      <section id="contact" data-reveal className="scroll-hidden mx-auto w-full max-w-5xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-bold text-white sm:text-3xl">Contact</h3>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <form className="rounded-2xl border border-white/10 bg-[#101722]/85 p-5 shadow-[0_20px_40px_-30px_rgba(42,168,255,0.7)]">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm text-slate-300">Name
                <input type="text" className="mt-1 w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2 text-white outline-none ring-[#00d4aa] focus:ring-2" placeholder="Your name" />
              </label>
              <label className="text-sm text-slate-300">Email
                <input type="email" className="mt-1 w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2 text-white outline-none ring-[#00d4aa] focus:ring-2" placeholder="you@example.com" />
              </label>
            </div>
            <label className="mt-4 block text-sm text-slate-300">Subject
              <input type="text" className="mt-1 w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2 text-white outline-none ring-[#00d4aa] focus:ring-2" placeholder="Project discussion" />
            </label>
            <label className="mt-4 block text-sm text-slate-300">Message
              <textarea rows={5} className="mt-1 w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2 text-white outline-none ring-[#00d4aa] focus:ring-2" placeholder="Tell me about your product or idea" />
            </label>
            <div className="mt-4 flex flex-wrap gap-3">
              <button type="button" className="btn-primary inline-flex rounded-xl px-6 py-3 text-sm font-semibold">Send Message</button>
              <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-[#8ff0da]/40 hover:text-white">
                <span className="material-symbols-outlined text-[18px]">download</span>
                Download CV
              </button>
            </div>
          </form>

          <aside className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#101722] via-[#101a28] to-[#0a121d] p-5 shadow-[0_24px_55px_-35px_rgba(0,212,170,0.9)]">
            <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#8ff0da]/20 blur-2xl" />
            <p className="text-sm uppercase tracking-[0.14em] text-[#9cebdc]">Reach me directly</p>
            <p className="mt-2 text-xs text-slate-400">Fastest channels to reach Ahmad Ibrahim for collaboration.</p>

            <div className="mt-5 space-y-2">
              <a href="mailto:ahmad@example.com" className="group flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 transition hover:border-[#8ff0da]/50 hover:bg-black/35">
                <span className="flex items-center gap-2 text-sm text-slate-200">
                  <img src="https://cdn.simpleicons.org/gmail/EA4335" alt="Gmail logo" className="h-4 w-4" loading="lazy" />
                  Email
                </span>
                <span className="text-xs text-[#8ff0da]">ahmad@example.com</span>
              </a>

              <a href="https://github.com/ahmad" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 transition hover:border-[#8ff0da]/50 hover:bg-black/35">
                <span className="flex items-center gap-2 text-sm text-slate-200">
                  <img src="https://cdn.simpleicons.org/github/FFFFFF" alt="GitHub logo" className="h-4 w-4" loading="lazy" />
                  GitHub
                </span>
                <span className="text-xs text-[#8ff0da]">@ahmad</span>
              </a>

              <a href="https://linkedin.com/in/ahmad" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 transition hover:border-[#8ff0da]/50 hover:bg-black/35">
                <span className="flex items-center gap-2 text-sm text-slate-200">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn logo" className="h-4 w-4" loading="lazy" />
                  LinkedIn
                </span>
                <span className="text-xs text-[#8ff0da]">/in/ahmad</span>
              </a>

              <a href="https://x.com/ahmad" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 transition hover:border-[#8ff0da]/50 hover:bg-black/35">
                <span className="flex items-center gap-2 text-sm text-slate-200">
                  <img src="https://cdn.simpleicons.org/x/FFFFFF" alt="X logo" className="h-4 w-4" loading="lazy" />
                  X / Twitter
                </span>
                <span className="text-xs text-[#8ff0da]">@ahmad</span>
              </a>

              <a href="#" className="group flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 transition hover:border-[#8ff0da]/50 hover:bg-black/35">
                <span className="flex items-center gap-2 text-sm text-slate-200">
                  <img src="https://cdn.simpleicons.org/discord/5865F2" alt="Discord logo" className="h-4 w-4" loading="lazy" />
                  Discord
                </span>
                <span className="text-xs text-[#8ff0da]">ahmad.dev</span>
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

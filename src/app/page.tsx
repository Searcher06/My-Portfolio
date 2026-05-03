import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type Tool = {
  name: string;
  icon: ReactNode;
};

type ProjectCard = {
  name: string;
  image: string;
  problem: string;
  solution: string;
  tools: Tool[];
  href: string;
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
      { name: "Node.js", icon: <span className="material-symbols-outlined text-[16px]">deployed_code</span> },
      { name: "PostgreSQL", icon: <span className="material-symbols-outlined text-[16px]">database</span> },
      { name: "Event Workflows", icon: <span className="material-symbols-outlined text-[16px]">account_tree</span> },
    ],
    href: "/projects",
  },
  {
    name: "HiringFlow",
    image: "/og/hiringflow-placeholder.svg",
    problem: "Recruiting pipelines break when candidate data is inconsistent and feedback loops are slow.",
    solution: "Designed a structured hiring pipeline with score normalization, interviewer calibration, and API-first integrations.",
    tools: [
      { name: "React", icon: <span className="material-symbols-outlined text-[16px]">web</span> },
      { name: "Express", icon: <span className="material-symbols-outlined text-[16px]">alt_route</span> },
      { name: "MongoDB", icon: <span className="material-symbols-outlined text-[16px]">storage</span> },
    ],
    href: "/projects",
  },
  {
    name: "SignalAuth",
    image: "/og/signalauth-placeholder.svg",
    problem: "B2B products struggle to balance secure authentication with low-friction onboarding.",
    solution: "Implemented adaptive auth policies with device trust, risk scoring, and session governance.",
    tools: [
      { name: "Auth Design", icon: <span className="material-symbols-outlined text-[16px]">shield_lock</span> },
      { name: "Risk Scoring", icon: <span className="material-symbols-outlined text-[16px]">monitoring</span> },
      { name: "Redis", icon: <span className="material-symbols-outlined text-[16px]">memory</span> },
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
  "better auth flows with lower friction and stronger trust",
  "system design patterns for high-change product teams",
  "backend performance tuning under realistic production load",
];

const skillGroups = [
  {
    label: "Systems",
    items: ["Auth & Authorization", "API Design", "Database Modeling"],
  },
  {
    label: "Frontend",
    items: ["React", "UI Architecture"],
  },
  {
    label: "Tools",
    items: ["Node.js", "Express", "MongoDB"],
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

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-64 left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-[#00d4aa]/15 blur-[140px]" />
        <div className="absolute -left-32 top-[35%] h-[20rem] w-[20rem] rounded-full bg-blue-400/15 blur-[100px]" />
        <div className="absolute -right-32 top-[52%] h-[24rem] w-[24rem] rounded-full bg-emerald-300/15 blur-[110px]" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <section className="mx-auto grid min-h-[95vh] w-full max-w-7xl gap-10 px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14 lg:px-8">
        <div className="space-y-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#00d4aa]/30 bg-[#00d4aa]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#8ff0da]">
            Building Real Systems
          </p>

          <div className="space-y-5">
            <h1 className="text-4xl font-bold leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl xl:text-7xl">
              I build trust-critical software for products that cannot fail quietly.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg lg:text-xl">
              Backend-heavy engineering for authentication, abuse-resistant workflows, and system architecture that stays stable under real-world pressure.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/projects" className="btn-primary inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold sm:text-base">
              View Projects
            </Link>
            <Link href="#thinking" className="btn-secondary inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold sm:text-base">
              See My Thinking
            </Link>
          </div>
        </div>

        <aside className="relative">
          <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-[#00d4aa]/35 via-cyan-400/20 to-transparent blur-xl" />
          <div className="relative rounded-[2rem] border border-white/15 bg-gradient-to-br from-[#141d2a] via-[#111723] to-[#0a0e15] p-5 shadow-[0_30px_80px_-25px_rgba(0,212,170,0.35)] sm:p-7">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#00d4aa] to-[#2aa8ff] p-[1px]">
                  <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#0f141c] text-sm font-bold text-[#9cebdc]">AF</div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Ahmad</p>
                  <p className="text-xs text-slate-400">Backend-Focused Full-Stack Engineer</p>
                </div>
              </div>
              <span className="rounded-full border border-emerald-300/40 bg-emerald-300/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-200">
                Active
              </span>
            </div>

            <div className="space-y-3 rounded-2xl border border-white/15 bg-black/30 p-4 font-mono text-xs sm:text-sm">
              <p className="text-slate-400">profile.ts</p>
              <p><span className="text-[#8ff0da]">focus</span>: <span className="text-slate-200">&quot;Trust systems, auth, APIs&quot;</span></p>
              <p><span className="text-[#8ff0da]">currently</span>: <span className="text-slate-200">&quot;Building Findora&quot;</span></p>
              <p><span className="text-[#8ff0da]">style</span>: <span className="text-slate-200">&quot;Fast execution, high ownership&quot;</span></p>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {["Auth", "API", "Systems"].map((chip) => (
                <div key={chip} className="rounded-xl border border-white/10 bg-white/[0.04] px-2 py-2 text-center text-[11px] font-semibold text-slate-200">
                  {chip}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="border-y border-white/10 bg-gradient-to-r from-white/[0.02] via-white/[0.05] to-white/[0.02]">
        <div className="mx-auto grid w-full max-w-7xl gap-2 px-4 py-5 sm:px-6 md:grid-cols-3 lg:px-8">
          {credibilityPoints.map((point) => (
            <p key={point} className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm font-medium text-slate-200 sm:text-base">{point}</p>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {quickStats.map((stat) => (
            <article key={stat.label} className="rounded-2xl border border-white/10 bg-[#0d131d]/90 p-4 shadow-[0_14px_30px_-22px_rgba(42,168,255,0.65)]">
              <p className="text-xs uppercase tracking-[0.14em] text-[#9cebdc]">{stat.label}</p>
              <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
              <p className="mt-1 text-xs text-slate-400">{stat.trend}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#161f2d] via-[#101620] to-[#0b0f16] p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl" />

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

            <div className="rounded-2xl border border-white/15 bg-black/30 p-5 backdrop-blur-sm">
              <p className="text-sm font-semibold text-white">Key Features</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-300 sm:text-base">
                {findoraFeatures.map((feature) => (
                  <li key={feature} className="flex gap-3"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#00d4aa]" />{feature}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/projects" className="btn-primary inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold">View Case Study</Link>
                <Link href="/projects" className="btn-secondary inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold">Live Demo</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <h3 className="text-2xl font-bold text-white sm:text-3xl">Other Projects</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {otherProjects.map((project) => (
            <article key={project.name} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#11151f]/90 p-4 transition duration-300 hover:-translate-y-1 hover:border-[#00d4aa]/40 hover:shadow-[0_20px_45px_-25px_rgba(0,212,170,0.55)] sm:p-5">
              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-cyan-300/15 blur-2xl transition group-hover:scale-125" />
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
                      {tool.icon}
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

      <section id="thinking" className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
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

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#111926] via-[#0e1621] to-[#101b2a] p-6 shadow-[0_20px_50px_-30px_rgba(42,168,255,0.45)]">
          <h3 className="text-xl font-bold text-white">Currently exploring:</h3>
          <ul className="mt-4 space-y-2 text-slate-300">
            {currentlyExploring.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm sm:text-base">
                <span className="material-symbols-outlined mt-0.5 text-[14px] text-[#8ff0da]">arrow_right</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-bold text-white sm:text-3xl">Skills</h3>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <article key={group.label} className="rounded-2xl border border-white/10 bg-[#0f141d]/80 p-5 shadow-[0_12px_30px_-25px_rgba(42,168,255,0.7)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9cebdc]">{group.label}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-bold text-white sm:text-3xl">Experience Journey (2022 - 2026)</h3>
        <div className="mt-6 grid gap-4 lg:grid-cols-5">
          {roadmap.map((step, index) => (
            <article key={step.year} className="relative rounded-2xl border border-white/10 bg-[#101722]/85 p-4 shadow-[0_15px_35px_-25px_rgba(0,212,170,0.45)]">
              {index < roadmap.length - 1 && (
                <div className="absolute -right-2 top-1/2 hidden h-[2px] w-4 -translate-y-1/2 bg-[#00d4aa]/50 lg:block" />
              )}
              <p className="text-xs uppercase tracking-[0.15em] text-[#9cebdc]">{step.year}</p>
              <p className="mt-2 text-base font-semibold text-white">{step.title}</p>
              <p className="mt-2 text-sm text-slate-300">{step.highlight}</p>
              <p className="mt-3 rounded-lg border border-white/10 bg-black/20 px-2 py-1 text-xs text-slate-300">{step.metric}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 py-14 text-center sm:px-6 lg:px-8">
        <p className="text-xl font-semibold text-white sm:text-2xl">Want to see how I design real systems?</p>
        <Link href="/projects" className="btn-primary mt-6 inline-flex rounded-xl px-6 py-3 text-sm font-semibold sm:text-base">
          View Case Studies
        </Link>
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-bold text-white sm:text-3xl">About</h3>
        <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
          I care about building software that people can trust when the stakes are real. My approach is simple: understand the failure modes, design for clarity, and ship systems that hold up in production, not just in demos.
        </p>
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-bold text-white sm:text-3xl">Contact</h3>
        <div className="mt-4 space-y-2 text-sm text-slate-300 sm:text-base">
          <p>Email: <a className="text-[#8ff0da]" href="mailto:ahmad@example.com">ahmad@example.com</a></p>
          <p>GitHub: <a className="text-[#8ff0da]" href="https://github.com" target="_blank" rel="noopener noreferrer">github.com/ahmad</a></p>
          <p className="pt-2 text-slate-400">Open to building real systems and solving meaningful problems.</p>
        </div>
      </section>
    </main>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
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

const toProjectId = (name: string) =>
  name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const projects: ProjectDetail[] = [
  {
    name: "School Payment & Distribution Management System",
    tagline: "A school system for fee payments and item collection.",
    icon: "school",
    image: "/schoolmanagement.png",
    status: "Live",
    challenge:
      "The school needed one clear way to collect fees, check payments, and track school items given to families.",
    solution:
      "Parents submit payment details and proof online. Admins review payments, then staff see assigned items and mark them collected.",
    impact: [
      "Parents can send payment details and proof online.",
      "Admins can review each payment and approve or reject items.",
      "Staff can see assigned items and mark them collected.",
      "Admins can view reports and find items without an assigned staff member.",
    ],
    stack: [
      { name: "React", iconUrl: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Node.js", iconUrl: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
      { name: "Express", iconUrl: "https://cdn.simpleicons.org/express/FFFFFF" },
      { name: "MongoDB", iconUrl: "https://cdn.simpleicons.org/mongodb/47A248" },
      { name: "Mongoose", iconUrl: "https://cdn.simpleicons.org/mongoose/880000" },
      { name: "Tailwind CSS", iconUrl: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
    ],
    highlights: ["Online payment submissions", "Payment review", "Item collection tracking"],
  },
  {
    name: "Findora",
    tagline: "A campus app that helps people find and return lost items.",
    icon: "verified_user",
    image: "/findorabrowse.png",
    status: "Live",
    challenge:
      "When something goes missing on campus, it can be hard to reach the person who found it and make sure it gets returned to the right owner.",
    solution:
      "Users can post and search reports, get suggested matches, chat, and confirm a return with a five-digit code.",
    impact: [
      "People can post lost or found items with photos and details.",
      "Search and match suggestions help connect lost items with found reports.",
      "A five-digit code helps both people confirm the handover.",
      "Admins can review reports and manage users.",
    ],
    stack: [
      { name: "React", iconUrl: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Express", iconUrl: "https://cdn.simpleicons.org/express/FFFFFF" },
      { name: "Node.js", iconUrl: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
      { name: "MongoDB", iconUrl: "https://cdn.simpleicons.org/mongodb/47A248" },
      { name: "Socket.IO", iconUrl: "https://cdn.simpleicons.org/socketdotio/010101" },
      { name: "Cloudinary", iconUrl: "https://cdn.simpleicons.org/cloudinary/3448C5" },
    ],
    highlights: ["Lost and found reports", "Chat and match suggestions", "Verified item returns"],
    liveUrl: "https://findora-snowy.vercel.app/",
  },
  {
    name: "Brillit",
    tagline: "A learning app that helps people find videos that fit their interests.",
    icon: "smart_display",
    image: "/brillitbrowse.png",
    status: "Live",
    challenge:
      "Learners can spend too much time searching for videos that match what they want to study.",
    solution:
      "Brillit suggests videos based on interests and watch history, with fast search that can handle misspelled words.",
    impact: [
      "Video suggestions reflect each learner's interests and watch history.",
      "Search helps people find videos, even when a word is misspelled.",
      "Learners can manage their profiles and watch videos in the app.",
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
    highlights: ["Personalized video suggestions", "Fast search", "In-app video playback"],
    liveUrl: "https://brillit.vercel.app/",
    repoUrl: "https://github.com/Searcher06/Brillit.io",
  },
  {
    name: "Vestlee",
    tagline: "A job search assistant for CVs, applications, and interview practice.",
    icon: "work",
    image: "/vestleepic.png",
    status: "In Progress",
    challenge:
      "Applying for jobs means tailoring documents, tracking replies, and finding time to practise for interviews.",
    solution:
      "Vestlee helps tailor CVs and cover letters, track updates from Gmail, check CVs against job posts, and practise interviews by voice.",
    impact: [
      "Create a CV and cover letter tailored to each role.",
      "Track application updates from a connected Gmail account.",
      "Compare a CV with a job post and spot missing keywords.",
      "Practise interviews by voice and get feedback.",
      "Review a CV and export the updated version as a PDF.",
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
      "CV and cover letter writing help",
      "Gmail application tracking",
      "Voice interview practice",
      "CV checks and PDF export",
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
    <main className="relative overflow-hidden bg-[#f5f3ee] pb-20 text-[#172033]">

      {/* ── Navigation ── */}
      <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-3 sm:px-6 lg:px-8">
        <nav className={`mx-auto flex h-[3.75rem] w-full max-w-7xl items-center justify-between rounded-2xl border px-4 backdrop-blur-2xl transition-all duration-500 sm:h-[4.25rem] sm:px-7 ${
          scrolled
            ? "border-[#e6e2da] bg-[#fbfaf7]/95 shadow-[0_8px_32px_rgba(25,35,55,0.1)]"
            : "border-white/80 bg-[#fbfaf7]/85 shadow-[0_2px_16px_rgba(25,35,55,0.06)]"
        }`}>

          {/* Logo */}
          <Link href="/" className="inline-flex shrink-0 items-center gap-3">
            <Image src="/ahmad-mark.svg" alt="Ahmad Ibrahim logo" width={44} height={44} className="h-9 w-9 sm:h-10 sm:w-10" />
            <span className="hidden text-sm font-semibold text-[#172033] sm:block sm:text-[0.9375rem]">Ahmad Ibrahim</span>
          </Link>

          {/* Right side */}
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/"
              className="nav-icon-btn inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5e2dc] bg-white text-slate-600 transition-all hover:border-[#bfdbfe] hover:text-[#2563eb] sm:h-auto sm:w-auto sm:gap-1.5 sm:rounded-xl sm:px-4 sm:py-2"
            >
              <span className="material-symbols-outlined text-[15px]">arrow_back</span>
              <span className="hidden text-xs font-semibold sm:block sm:text-sm">Home</span>
            </Link>
            <Link
              href="/contact"
              className="hidden items-center gap-1.5 rounded-xl border border-[#2563eb] bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#1d4ed8] sm:inline-flex"
            >
              Hire Me
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </Link>
            <a href="https://github.com/Searcher06" target="_blank" rel="noreferrer" aria-label="Ahmad Ibrahim on GitHub" className="nav-icon-btn inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5e2dc] bg-white text-[#536176] transition-colors hover:border-[#bfdbfe] hover:text-[#2563eb]">
              <img src="https://cdn.simpleicons.org/github/536176" alt="" aria-hidden="true" className="h-[18px] w-[18px]" />
            </a>
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
          className="relative overflow-hidden rounded-[2rem] border border-[#e8e4dc] bg-[#fbfaf7] p-6 shadow-[0_12px_36px_rgba(28,39,59,0.07)] sm:p-9 lg:p-12"
        >
          <div className="pointer-events-none absolute -right-20 -top-16 h-52 w-52 rounded-full bg-[#2563eb]/[0.06] blur-3xl" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2563eb]">Selected work / Product &amp; engineering</p>
          <h1 className="mt-3 -rotate-1 font-handwriting text-5xl font-semibold leading-none tracking-tight text-[#172033] sm:text-6xl lg:text-7xl">Projects, up close.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#68758a] sm:text-base">
            A closer look at the problems behind each product, the systems I built, and the details that made the work matter.
          </p>
        </motion.section>

        {/* Projects, presented as alternating case studies */}
        <div className="mt-8 divide-y divide-[#dedbd4]">
          {projects.map((project, index) => {
            const projectId = toProjectId(project.name);
            const isHighlighted = highlightedProjectId === projectId;
            const imageFirst = index % 2 === 1;
            return (
              <motion.article
                key={project.name}
                id={projectId}
                initial={{ opacity: 0, y: rm ? 0 : 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.06 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className={`scroll-mt-28 grid grid-cols-1 items-start gap-8 py-9 first:pt-2 last:pb-2 sm:py-12 lg:grid-cols-2 lg:gap-14 ${
                  isHighlighted
                    ? "rounded-2xl bg-[#eef4ff] px-4 shadow-[0_0_0_1px_rgba(96,165,250,0.32)] sm:px-6"
                    : ""
                }`}
              >
                {isHighlighted ? (
                  <span className="sr-only">Selected project</span>
                ) : null}

                <div className={`flex flex-col items-start text-left ${imageFirst ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-medium uppercase tracking-widest text-[#8992a0]">{String(index + 1).padStart(2, "0")} / Project</span>
                    <span className="rounded-full bg-[#eaf1ff] px-2.5 py-1 text-[11px] font-semibold text-[#2563eb]">{project.status}</span>
                  </div>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#dbeafe] bg-[#eff6ff] text-[#2563eb]">
                    <span className="material-symbols-outlined text-[20px]">{project.icon}</span>
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-[#172033] sm:text-3xl">{project.name}</h2>
                  <p className="mt-2 text-base font-medium leading-snug text-[#3c495d]">{project.tagline}</p>
                  <details className="group/details mt-5 w-full border-y border-[#e5e2dc] py-3">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-[#263247] [&::-webkit-details-marker]:hidden">
                      Read the project details
                      <span className="material-symbols-outlined text-[18px] text-[#2563eb] transition-transform group-open/details:rotate-180">expand_more</span>
                    </summary>
                    <div className="pt-3">
                      <p className="text-sm leading-7 text-[#68758a]"><span className="font-semibold text-[#263247]">The challenge. </span>{project.challenge}</p>
                      <p className="mt-3 text-sm leading-7 text-[#68758a]"><span className="font-semibold text-[#263247]">What I built. </span>{project.solution}</p>
                      <div className="mt-5 w-full">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2563eb]">Outcomes</p>
                        <motion.ul className="mt-2 space-y-2 text-sm leading-6 text-[#68758a]" variants={impactList} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
                          {project.impact.map((point) => (
                            <motion.li key={point} variants={impactItem} className="flex items-start gap-2">
                              <span className="material-symbols-outlined mt-0.5 text-[16px] text-[#2563eb]">done</span><span>{point}</span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </div>
                      <p className="mt-4 text-xs leading-5 text-[#718096]">{project.highlights.join(" / ")}</p>
                    </div>
                  </details>

                  <div className="mt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#718096]">Built with</p>
                    <motion.div className="mt-2 flex flex-wrap gap-2" variants={stackContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
                      {project.stack.map((item) => (
                        <motion.span key={item.name} variants={stackBadge} className="inline-flex items-center gap-1.5 rounded-full border border-[#e8e4dc] bg-white px-2.5 py-1 text-xs text-[#536176] sm:px-3">
                          <img src={item.iconUrl} alt={`${item.name} logo`} width={14} height={14} className="h-3.5 w-3.5" loading="lazy" />{item.name}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-[#2563eb] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#1d4ed8]">Live site<span className="material-symbols-outlined text-[14px]">north_east</span></a>}
                    {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e2dc] bg-white px-4 py-2 text-xs font-semibold text-[#536176] transition hover:border-[#bfdbfe] hover:text-[#2563eb]"><img src="https://cdn.simpleicons.org/github/536176" alt="" aria-hidden="true" className="h-3.5 w-3.5" />GitHub Repo</a>}
                  </div>
                </div>

                <div className={`w-full ${imageFirst ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="overflow-hidden rounded-2xl border border-[#e3e0d9] bg-white shadow-[0_8px_24px_rgba(28,39,59,0.07)] transition duration-300 hover:shadow-[0_16px_36px_rgba(28,39,59,0.12)]">
                    <div className="flex items-center gap-3 border-b border-[#e8e6e1] bg-[#f3f4f6] px-4 py-2.5">
                      <div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" /><span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" /></div>
                      <div className="flex-1 truncate rounded-md border border-[#e5e4e1] bg-white px-3 py-1 text-center font-mono text-[11px] text-[#68758a]">
                        {project.liveUrl ? project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "") : "Project preview"}
                      </div>
                    </div>
                    <div className="relative w-full overflow-hidden bg-white">
                      <Image src={project.image} alt={`${project.name} project preview`} width={1600} height={1000} sizes="(max-width: 1024px) calc(100vw - 32px), 560px" className="block h-auto w-full object-contain" />
                    </div>
                  </div>
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
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563eb] transition hover:text-[#172033]">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

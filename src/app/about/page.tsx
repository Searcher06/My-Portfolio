import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Ahmad Ibrahim — a backend-focused full-stack engineer from Kano, Nigeria. BSc Software Engineering student building reliable APIs, web applications, and trust-critical systems.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Ahmad Ibrahim | Backend-Focused Full-Stack Engineer",
    description:
      "BSc Software Engineering student building reliable APIs, web applications, and trust-critical systems. Available for remote roles and freelance projects.",
    url: "/about",
    images: [{ url: "/og/portfolio-og.svg", width: 1200, height: 630, alt: "Ahmad Ibrahim — About" }],
  },
};

const skills = [
  { label: "Frontend", items: ["HTML", "CSS", "JavaScript", "React.js", "Next.js", "Tailwind CSS"] },
  { label: "Backend", items: ["Node.js", "Express.js", "REST APIs"] },
  { label: "Databases", items: ["PostgreSQL", "MongoDB"] },
  { label: "Languages", items: ["TypeScript", "JavaScript"] },
  { label: "Tools", items: ["Git", "GitHub", "Docker (learning)", "Cloudinary"] },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about` },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="mx-auto w-full max-w-4xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#60A5FA] transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <span className="text-slate-300">About</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl ring-2 ring-[#2563EB]/30 sm:h-28 sm:w-28">
            <Image
              src="/me3.png"
              alt="Ahmad Ibrahim profile photo"
              width={112}
              height={112}
              className="h-full w-full object-cover object-top"
              priority
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">Ahmad Ibrahim</h1>
            <p className="mt-1 text-base text-[#60A5FA] font-medium">Backend-Focused Full-Stack Engineer</p>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">location_on</span>
                Kano, Nigeria · Remote
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Available for work
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <section className="mt-10 space-y-4 text-slate-300 leading-relaxed" aria-label="Biography">
          <h2 className="text-xl font-bold text-white">Who I am</h2>
          <p>
            I&apos;m a BSc Software Engineering student and full-stack developer focused on building reliable web applications and backend systems. I enjoy turning ideas into scalable products that solve real problems, stay maintainable, and hold up under real-world conditions.
          </p>
          <p>
            My work spans backend APIs, full-stack web applications, and trust-critical product features — from JWT authentication flows and payment integrations to real-time chat systems and admin dashboards. I care about writing code that the next developer can read, change, and trust.
          </p>
          <p>
            Currently exploring AI-powered product experiences, system design patterns, and backend performance optimization. I&apos;m open to full-time remote roles, freelance projects, and long-term collaborations.
          </p>
        </section>

        {/* Skills */}
        <section className="mt-10" aria-label="Technical skills">
          <h2 className="text-xl font-bold text-white mb-5">Technical Skills</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {skills.map((group) => (
              <div key={group.label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#93C5FD] mb-3">{group.label}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-sm text-slate-300">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mt-10" aria-label="Education">
          <h2 className="text-xl font-bold text-white mb-5">Education</h2>
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
            <p className="font-semibold text-white">BSc Software Engineering</p>
            <p className="mt-1 text-sm text-[#60A5FA]">Bayero University Kano (BUK)</p>
            <p className="mt-1 text-sm text-slate-400">2022 – Present · Kano, Nigeria</p>
          </div>
        </section>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/projects" className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold">
            View My Projects
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
          <Link href="/contact" className="btn-secondary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold">
            Get in Touch
          </Link>
        </div>
      </main>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ahmad Ibrahim for backend development, full-stack projects, API integrations, and remote engineering opportunities. Available for freelance and full-time roles.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Ahmad Ibrahim | Backend-Focused Full-Stack Engineer",
    description:
      "Available for remote backend and full-stack roles, freelance projects, and engineering collaborations. Reach out via email, GitHub, LinkedIn, or X.",
    url: "/contact",
    images: [{ url: "/og/portfolio-og.svg", width: 1200, height: 630, alt: "Contact Ahmad Ibrahim" }],
  },
};

const contactChannels = [
  {
    label: "Email",
    handle: "ahmadibrahimsearcher@gmail.com",
    href: "mailto:ahmadibrahimsearcher@gmail.com",
    icon: "https://cdn.simpleicons.org/gmail/EA4335",
    description: "Best for project discussions and opportunities.",
  },
  {
    label: "GitHub",
    handle: "@Searcher06",
    href: "https://github.com/Searcher06",
    icon: "https://cdn.simpleicons.org/github/FFFFFF",
    description: "Browse my open-source work and contributions.",
  },
  {
    label: "LinkedIn",
    handle: "/in/ahmadibrahim06",
    href: "https://www.linkedin.com/in/ahmadibrahim06",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
    description: "Professional profile and work history.",
  },
  {
    label: "X / Twitter",
    handle: "@undefined_dev",
    href: "https://x.com/undefined_dev",
    icon: "https://cdn.simpleicons.org/x/FFFFFF",
    description: "Thoughts on engineering and product building.",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Contact", item: `${siteUrl}/contact` },
  ],
};

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Ahmad Ibrahim",
  url: `${siteUrl}/contact`,
  description: "Contact Ahmad Ibrahim for backend development, full-stack engineering, and remote opportunities.",
  mainEntity: {
    "@type": "Person",
    name: "Ahmad Ibrahim",
    email: "ahmadibrahimsearcher@gmail.com",
    url: siteUrl,
    sameAs: [
      "https://github.com/Searcher06",
      "https://www.linkedin.com/in/ahmadibrahim06",
      "https://x.com/undefined_dev",
    ],
  },
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }} />
      <main className="mx-auto w-full max-w-3xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#60A5FA] transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <span className="text-slate-300">Contact</span>
        </nav>

        {/* Header */}
        <div className="mb-2 flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-xs font-semibold text-emerald-400">Available for work</span>
        </div>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Get in Touch</h1>
        <p className="mt-3 max-w-xl text-slate-400 leading-relaxed">
          Open to full-time remote roles, freelance backend and full-stack projects, and long-term engineering collaborations. Based in Kano, Nigeria — remote-first.
        </p>

        {/* Primary CTA */}
        <a
          href="mailto:ahmadibrahimsearcher@gmail.com"
          className="btn-primary mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold"
        >
          <span className="material-symbols-outlined text-[17px]">mail</span>
          Send me an email
        </a>

        {/* Channels */}
        <div className="mt-10 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">All channels</p>
          {contactChannels.map((ch) => (
            <a
              key={ch.label}
              href={ch.href}
              target={ch.href.startsWith("http") ? "_blank" : undefined}
              rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-4 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-4 transition-all duration-200 hover:border-white/[0.14] hover:bg-white/[0.06]"
            >
              <img src={ch.icon} alt={ch.label} className="h-5 w-5 shrink-0" loading="lazy" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">{ch.label}</p>
                <p className="text-xs text-slate-500">{ch.description}</p>
              </div>
              <span className="shrink-0 text-xs text-slate-500 transition-colors group-hover:text-[#60A5FA]">{ch.handle}</span>
              <span className="material-symbols-outlined text-[15px] text-slate-600 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-slate-400">arrow_forward</span>
            </a>
          ))}
        </div>

        <Link href="/" className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-[#93C5FD] hover:text-white transition-colors">
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to home
        </Link>
      </main>
    </>
  );
}

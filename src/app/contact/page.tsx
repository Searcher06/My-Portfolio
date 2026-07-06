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
  description:
    "Contact Ahmad Ibrahim for backend development, full-stack engineering, and remote opportunities.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <main className="mx-auto w-full max-w-4xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#60A5FA] transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <span className="text-slate-300">Contact</span>
        </nav>

        {/* Header */}
        <div className="mb-3 flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-sm font-medium text-emerald-400">Available for work</span>
        </div>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Get in Touch</h1>
        <p className="mt-3 max-w-xl text-slate-400 leading-relaxed">
          Open to full-time remote roles, freelance backend and full-stack projects, and long-term engineering collaborations. Pick a channel below or send a message.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

          {/* Contact form */}
          <section aria-label="Send a message">
            <h2 className="mb-4 text-lg font-semibold text-white">Send a Message</h2>
            <form className="space-y-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm text-slate-400">
                  Name
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    className="mt-1 w-full rounded-lg border border-white/10 bg-black/25 px-3 py-3 text-sm text-white outline-none ring-[#2563EB]/60 placeholder:text-slate-600 focus:border-[#2563EB]/40 focus:ring-1"
                    placeholder="Your name"
                  />
                </label>
                <label className="block text-sm text-slate-400">
                  Email
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    className="mt-1 w-full rounded-lg border border-white/10 bg-black/25 px-3 py-3 text-sm text-white outline-none ring-[#2563EB]/60 placeholder:text-slate-600 focus:border-[#2563EB]/40 focus:ring-1"
                    placeholder="you@example.com"
                  />
                </label>
              </div>
              <label className="block text-sm text-slate-400">
                Subject
                <input
                  type="text"
                  name="subject"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/25 px-3 py-3 text-sm text-white outline-none ring-[#2563EB]/60 placeholder:text-slate-600 focus:border-[#2563EB]/40 focus:ring-1"
                  placeholder="Project discussion, role opportunity, etc."
                />
              </label>
              <label className="block text-sm text-slate-400">
                Message
                <textarea
                  rows={5}
                  name="message"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/25 px-3 py-3 text-sm text-white outline-none ring-[#2563EB]/60 placeholder:text-slate-600 focus:border-[#2563EB]/40 focus:ring-1"
                  placeholder="Tell me about your product or idea..."
                />
              </label>
              <button
                type="button"
                className="btn-primary w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold sm:w-auto"
              >
                Send Message
                <span className="material-symbols-outlined text-[16px]">send</span>
              </button>
            </form>
          </section>

          {/* Direct channels */}
          <section aria-label="Direct contact channels">
            <h2 className="mb-4 text-lg font-semibold text-white">Direct Channels</h2>
            <div className="space-y-3">
              {contactChannels.map((ch) => (
                <a
                  key={ch.label}
                  href={ch.href}
                  target={ch.href.startsWith("http") ? "_blank" : undefined}
                  rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 transition hover:border-[#93C5FD]/30 hover:bg-white/[0.06]"
                >
                  <img src={ch.icon} alt={`${ch.label} icon`} className="mt-0.5 h-5 w-5 shrink-0" loading="lazy" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">{ch.label}</p>
                    <p className="text-xs text-[#60A5FA] truncate">{ch.handle}</p>
                    <p className="mt-1 text-xs text-slate-500">{ch.description}</p>
                  </div>
                  <span className="material-symbols-outlined ml-auto shrink-0 text-[16px] text-slate-600 transition group-hover:text-slate-400">arrow_forward</span>
                </a>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-4">
              <p className="text-sm font-semibold text-emerald-300">Remote-first · Worldwide</p>
              <p className="mt-1 text-xs text-slate-400">Based in Kano, Nigeria. Available for fully remote positions and async-friendly teams.</p>
            </div>
          </section>

        </div>

        <Link href="/" className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-[#93C5FD] hover:text-white transition-colors">
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to home
        </Link>
      </main>
    </>
  );
}

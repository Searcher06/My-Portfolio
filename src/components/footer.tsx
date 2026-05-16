"use client";

import Image from "next/image";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Journey", href: "#journey" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Searcher06",
    icon: "https://cdn.simpleicons.org/github/FFFFFF",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/ahmad",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
  },
  {
    label: "X",
    href: "https://x.com/ahmad",
    icon: "https://cdn.simpleicons.org/x/FFFFFF",
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-8 overflow-hidden border-t border-white/[0.06]">

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -bottom-32 left-1/2 h-[28rem] w-[52rem] -translate-x-1/2 rounded-full bg-[#2563EB]/10 blur-[120px]" />
      </div>

      {/* Top divider line with gradient */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#2563EB]/40 to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main footer body */}
        <div className="grid gap-10 py-14 sm:py-16 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8 lg:grid-cols-[1.6fr_1fr_1fr]">

          {/* Brand column */}
          <div className="space-y-5">
            <a href="#home" className="inline-flex items-center gap-3">
              <Image src="/ahmadlogo.png" alt="Ahmad logo" width={44} height={44} className="h-10 w-auto" />
              <span className="text-base font-semibold text-white">Ahmad Ibrahim</span>
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-slate-500">
              Building software that holds up — from the first commit to the last edge case.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="group flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] transition-all duration-300 hover:border-[#2563EB]/40 hover:bg-[#2563EB]/10 hover:shadow-[0_0_16px_rgba(37,99,235,0.25)]"
                >
                  <img src={s.icon} alt={s.label} className="h-4 w-4 opacity-60 transition-opacity group-hover:opacity-100" loading="lazy" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">Navigation</p>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors duration-200 hover:text-white"
                  >
                    <span className="h-px w-0 bg-[#60A5FA] transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Status / availability card */}
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">Status</p>
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#60A5FA]" />
                <span className="text-sm font-medium text-white">Available for work</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-500">
                Open to full-time roles, freelance projects, and collaborations. Remote-first.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#2563EB]/10 border border-[#2563EB]/25 px-3 py-2 text-xs font-semibold text-[#60A5FA] transition-all duration-300 hover:bg-[#2563EB]/20 hover:border-[#2563EB]/50"
              >
                Get in touch
                <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/[0.05] py-6 sm:flex-row">
          <p className="text-xs text-slate-600">
            © {year} Ahmad Ibrahim. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

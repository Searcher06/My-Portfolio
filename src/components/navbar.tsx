"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0c0c0e]/95 backdrop-blur-xl border-b border-white/[0.06]" : ""
        }`}
    >
      <nav className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Primary">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="group relative flex items-center gap-3"
            aria-label="Home - Alex Morgan Portfolio"
          >
            <Image src="/ahmadlogo.png" alt="Ahmad logo" width={48} height={48} className="h-10 w-auto sm:h-12" />
            <div className="flex flex-col">
              <span className="font-display font-bold text-base sm:text-lg text-[#f0f2f5] tracking-tight">Alex Morgan</span>
              <span className="text-[10px] sm:text-xs text-[#6366F1] font-semibold tracking-[0.15em] uppercase">Senior Full-Stack Engineer</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "text-[#6366F1] bg-[rgba(99,102,241,0.08)]"
                        : "text-[#8b95a8] hover:text-[#f0f2f5] hover:bg-[rgba(255,255,255,0.03)]"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#6366F1]/20 to-[#818CF8]/20" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
            >
              <span>Get in Touch</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden relative w-10 h-10 rounded-xl bg-[#111418] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#f0f2f5] hover:border-[#6366F1] transition-colors"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <div className="flex flex-col gap-1.5">
              <span className={`w-5 h-0.5 bg-[#f0f2f5] transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-5 h-0.5 bg-[#f0f2f5] transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
              <span className={`w-5 h-0.5 bg-[#f0f2f5] transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 px-2 mt-2 rounded-2xl bg-[#111418] border border-[rgba(255,255,255,0.08)]">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? "bg-[rgba(99,102,241,0.1)] text-[#6366F1]"
                      : "text-[#8b95a8] hover:bg-[rgba(255,255,255,0.03)] hover:text-[#f0f2f5]"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.05)]">
              <Link
                href="/contact"
                className="btn-primary w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-base font-semibold"
              >
                <span>Get in Touch</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

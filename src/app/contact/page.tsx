import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ahmad Ibrahim for backend, full-stack, and trust-focused product development opportunities.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">Contact</h1>
      <p className="mt-4 text-slate-300">GitHub: github.com/Searcher06</p>
      <p className="mt-1 text-slate-300">LinkedIn: linkedin.com/in/ahmad</p>
      <Link href="/" className="mt-6 inline-flex text-sm font-semibold text-[#93C5FD]">
        Back to home
      </Link>
    </main>
  );
}

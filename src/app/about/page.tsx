import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Ahmad Ibrahim, a backend-focused full-stack engineer building reliable and trust-critical software products.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">About</h1>
      <p className="mt-4 text-slate-300">
        I design and build trust-critical software with a backend-first mindset and product-level ownership.
      </p>
      <Link href="/" className="mt-6 inline-flex text-sm font-semibold text-[#93C5FD]">
        Back to home
      </Link>
    </main>
  );
}

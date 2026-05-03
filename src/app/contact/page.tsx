import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">Contact</h1>
      <p className="mt-4 text-slate-300">Email: ahmad@example.com</p>
      <p className="mt-1 text-slate-300">GitHub: github.com/ahmad</p>
      <Link href="/" className="mt-6 inline-flex text-sm font-semibold text-[#8ff0da]">
        Back to home
      </Link>
    </main>
  );
}

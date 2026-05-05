import Link from "next/link";

export default function ProjectsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">Projects</h1>
      <p className="mt-3 max-w-2xl text-slate-300">
        Case studies are being expanded. For now, the homepage highlights Findora and selected systems work.
      </p>
      <Link href="/" className="mt-6 inline-flex text-sm font-semibold text-[#C7D2FE]">
        Back to home
      </Link>
    </main>
  );
}

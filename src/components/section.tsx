import type { ReactNode } from "react";

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-5">
      <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#f0f2f5]">{title}</h2>
      {children}
    </section>
  );
}

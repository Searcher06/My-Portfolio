import type { Metadata } from "next";
import ProjectsClientPage from "./projects-client";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ahmadibrahim.vercel.app";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Detailed case studies of software projects built by Ahmad Ibrahim — including Findora (lost & found platform), Brillit (AI-powered learning), Vestlee (AI job application assistant), and more.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects | Ahmad Ibrahim",
    description:
      "Detailed case studies covering challenges, solutions, and impact across backend systems, full-stack web apps, and trust-critical products.",
    url: "/projects",
    images: [{ url: "/og/findora-placeholder.svg", width: 1200, height: 630, alt: "Ahmad Ibrahim — Projects" }],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Projects", item: `${siteUrl}/projects` },
  ],
};

const collectionPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Ahmad Ibrahim — Software Projects",
  url: `${siteUrl}/projects`,
  description:
    "A detailed collection of software projects by Ahmad Ibrahim, covering full-stack web applications, backend systems, and trust-critical product features.",
  author: {
    "@type": "Person",
    name: "Ahmad Ibrahim",
    url: siteUrl,
  },
};

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      <ProjectsClientPage />
    </>
  );
}

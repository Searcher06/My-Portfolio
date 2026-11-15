import type { Metadata } from "next";
import HomeClient from "./home-client";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ahmadibrahim.vercel.app";

export const metadata: Metadata = {
  title: "Ahmad Ibrahim | Software Engineer",
  description:
    "Ahmad Ibrahim is a software engineer building reliable web applications, APIs, and trust-critical systems. Available for remote roles and freelance projects.",
  keywords: [
    "Ahmad Ibrahim",
    "Full-Stack Engineer",
    "Backend Developer",
    "Node.js Developer",
    "React Developer",
    "Remote Software Engineer",
    "Available for hire",
    "API Development",
    "Freelance Backend Developer",
    "Nigeria software engineer",
    "Nigeria software engineer",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Ahmad Ibrahim | Software Engineer",
    description:
      "Building reliable web applications, APIs, and trust-critical systems. Available for remote roles and freelance projects.",
    siteName: "Ahmad Ibrahim Portfolio",
    images: [
      {
        url: "/og/portfolio-og.svg",
        width: 1200,
        height: 630,
        alt: "Ahmad Ibrahim, Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmad Ibrahim | Software Engineer",
    description:
      "Building reliable web applications, APIs, and trust-critical systems. Available for remote roles and freelance projects.",
    images: ["/og/portfolio-og.svg"],
    creator: "@undefined_dev",
  },
};

const projectsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Ahmad Ibrahim Software Projects",
  description: "A list of software projects built by Ahmad Ibrahim",
  url: `${siteUrl}/projects`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Findora",
      url: `${siteUrl}/projects#findora`,
      description:
        "A campus app for lost and found reports, match suggestions, and verified item returns.",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "School Payment & Distribution Management System",
      url: `${siteUrl}/projects#school-payment-and-distribution-management-system`,
      description:
        "A school system for online fee payments, admin review, and tracking item collection.",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Brillit",
      url: `${siteUrl}/projects#brillit`,
      description:
        "A learning app with personal video suggestions and fast search that handles misspelled words.",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Vestlee",
      url: `${siteUrl}/projects#vestlee`,
      description:
        "A job search assistant for tailored CVs and letters, Gmail tracking, CV checks, and voice interview practice.",
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
      <HomeClient />
    </>
  );
}

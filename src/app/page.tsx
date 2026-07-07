import type { Metadata } from "next";
import HomeClient from "./home-client";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Ahmad Ibrahim | Backend-Focused Full-Stack Engineer",
  description:
    "Ahmad Ibrahim is a backend-focused full-stack engineer building reliable web applications, APIs, and trust-critical systems. Available for remote roles and freelance projects.",
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
    "Kano developer",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Ahmad Ibrahim | Backend-Focused Full-Stack Engineer",
    description:
      "Building reliable web applications, APIs, and trust-critical systems. Available for remote roles and freelance projects.",
    siteName: "Ahmad Ibrahim Portfolio",
    images: [
      {
        url: "/og/portfolio-og.svg",
        width: 1200,
        height: 630,
        alt: "Ahmad Ibrahim — Backend-Focused Full-Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmad Ibrahim | Backend-Focused Full-Stack Engineer",
    description:
      "Building reliable web applications, APIs, and trust-critical systems. Available for remote roles and freelance projects.",
    images: ["/og/portfolio-og.svg"],
    creator: "@undefined_dev",
  },
};

const projectsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Ahmad Ibrahim — Software Projects",
  description: "A list of software projects built by Ahmad Ibrahim",
  url: `${siteUrl}/projects`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Findora",
      url: `${siteUrl}/projects#findora`,
      description:
        "Trust-based lost and found platform with real-time chat, 2-step handover verification, and admin moderation.",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "School Payment & Distribution Management System",
      url: `${siteUrl}/projects#school-payment-and-distribution-management-system`,
      description:
        "End-to-end school fee and item distribution workflow platform with role-based access and PDF reporting.",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Brillit",
      url: `${siteUrl}/projects#brillit`,
      description:
        "Personalized educational video platform with Gemini-powered recommendations and Typesense search.",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Vestlee",
      url: `${siteUrl}/projects#vestlee`,
      description:
        "AI-powered job application assistant with CV tailoring, ATS match scoring, Gmail application tracking, real-time voice mock interviews via Deepgram, and CV audit with one-click fixes.",
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

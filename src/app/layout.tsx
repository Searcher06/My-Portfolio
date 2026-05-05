import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const personName = "Ahmad Ibrahim";
const personTitle = "Backend-Focused Full-Stack Engineer";
const sameAsLinks = [
  "https://github.com/ahmad",
  "https://linkedin.com/in/ahmad",
  "https://x.com/ahmad",
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${personName} | ${personTitle}`,
    template: `%s | ${personName}`,
  },
  description:
    `Official portfolio of ${personName}. I design and build reliable software systems, APIs, and trust-critical product experiences.`,
  keywords: [
    "Ahmad Ibrahim",
    "Full-Stack Engineer",
    "Backend Developer",
    "Next.js Portfolio",
    "API Development",
    "Software Engineer",
  ],
  alternates: {
    canonical: "/",
  },
  authors: [{ name: personName, url: siteUrl }],
  creator: personName,
  publisher: personName,
  category: "Technology",
  openGraph: {
    type: "website",
    url: "/",
    title: `${personName} | ${personTitle}`,
    description:
      "I build software where failure is not an option. Explore projects, services, and contact details.",
    siteName: `${personName} Portfolio`,
    images: [
      {
        url: "/og/findora-placeholder.svg",
        width: 1200,
        height: 700,
        alt: "Ahmad Ibrahim portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personName} | ${personTitle}`,
    description:
      "I build software where failure is not an option. Explore projects and services.",
    images: ["/og/findora-placeholder.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personName,
    jobTitle: personTitle,
    url: siteUrl,
    image: `${siteUrl}/og/findora-placeholder.svg`,
    sameAs: sameAsLinks,
    knowsAbout: ["Backend Development", "API Design", "System Architecture", "Trust-Critical Software"],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${personName} Portfolio`,
    url: siteUrl,
    inLanguage: "en",
  };

  return (
    <html className="dark" lang="en">
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Noto+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const personName = "Ahmad Ibrahim";
const personTitle = "Backend-Focused Full-Stack Engineer";
const sameAsLinks = [
  "https://github.com/Searcher06",
  "https://linkedin.com/in/ahmad",
  "https://x.com/ahmad",
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/ahmadlogo.png",
    shortcut: "/ahmadlogo.png",
    apple: "/ahmadlogo.png",
  },
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
    "Node.js Developer",
    "Remote Software Engineer",
    "Available for hire",
    "API Development",
    "Freelance Backend Developer",
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
    <html lang="en">
      <head>
        {/* Prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');document.documentElement.classList.toggle('dark',t!=='light');}catch(e){document.documentElement.classList.add('dark');}})();` }} />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
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
      <body className="bg-[#020817] text-white font-display overflow-x-hidden antialiased">
        {children}
        <Footer />
      </body>
    </html>
  );
}

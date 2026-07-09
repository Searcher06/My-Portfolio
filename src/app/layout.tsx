import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const personName = "Ahmad Ibrahim";
const personTitle = "Backend-Focused Full-Stack Engineer";
const sameAsLinks = [
  "https://github.com/Searcher06",
  "https://www.linkedin.com/in/ahmadibrahim06",
  "https://x.com/undefined_dev",
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
    `Official portfolio of ${personName} — a backend-focused full-stack engineer building reliable web applications, APIs, and trust-critical product experiences. Available for remote roles and freelance projects.`,
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
    "software portfolio",
  ],
  authors: [{ name: personName, url: siteUrl }],
  creator: personName,
  publisher: personName,
  category: "Technology",
  openGraph: {
    type: "profile",
    url: siteUrl,
    title: `${personName} | ${personTitle}`,
    description:
      "Building reliable web applications, APIs, and trust-critical systems. Available for remote roles and freelance projects.",
    siteName: `${personName} Portfolio`,
    images: [
      {
        url: "/og/portfolio-og.svg",
        width: 1200,
        height: 630,
        alt: `${personName} — ${personTitle}`,
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${personName} | ${personTitle}`,
    description:
      "Building reliable web applications, APIs, and trust-critical systems. Available for remote roles.",
    images: ["/og/portfolio-og.svg"],
    creator: "@undefined_dev",
    site: "@undefined_dev",
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
    givenName: "Ahmad",
    familyName: "Ibrahim",
    jobTitle: personTitle,
    url: siteUrl,
    email: "ahmadibrahimsearcher@gmail.com",
    image: `${siteUrl}/me3.png`,
    sameAs: sameAsLinks,
    knowsAbout: [
      "Backend Development",
      "API Design",
      "System Architecture",
      "Trust-Critical Software",
      "Node.js",
      "React",
      "PostgreSQL",
      "MongoDB",
      "TypeScript",
      "Full-Stack Development",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Auvra",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Bayero University Kano",
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${personName} Portfolio`,
    url: siteUrl,
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: personName,
      url: siteUrl,
    },
  };

  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${personName} — Software Engineer Portfolio`,
    url: siteUrl,
    mainEntity: {
      "@type": "Person",
      name: personName,
      jobTitle: personTitle,
      url: siteUrl,
    },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
        />
      </head>
      <body className="bg-[#0c0c0e] text-white font-display overflow-x-hidden antialiased">
        {children}
        <Footer />
      </body>
    </html>
  );
}

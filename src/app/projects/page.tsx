import type { Metadata } from "next";
import ProjectsClientPage from "./projects-client";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse software projects and case-study highlights from Ahmad Ibrahim, focused on reliability, trust, and product impact.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  return <ProjectsClientPage />;
}

export type SocialLink = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  summary: string;
  problem: string;
  solution: string;
  stack: string[];
  impact: string;
  repoUrl: string;
  liveUrl: string;
  image: string;
};

export type Profile = {
  name: string;
  headline: string;
  location: string;
  bio: string;
  skills: string[];
  socialLinks: SocialLink[];
};
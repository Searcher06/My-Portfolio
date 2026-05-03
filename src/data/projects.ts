import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    title: "NexusPay - Real-time Payment Platform",
    summary:
      "A high-throughput payment processing platform handling 50K+ transactions per second with 99.99% uptime for fintech clients.",
    problem: "Legacy payment system couldn't scale beyond 500 TPS, causing 3% transaction failures during peak hours and $2M+ revenue loss monthly. Manual reconciliation took 40 hours weekly.",
    solution: "Architected event-driven microservices with Kafka for real-time transaction processing. Implemented Redis for caching and PostgreSQL with read replicas. Built idempotency layer and circuit breakers. Containerized with Docker/Kubernetes on AWS EKS with auto-scaling.",
    stack: ["Node.js", "TypeScript", "Kafka", "Redis", "PostgreSQL", "AWS", "Kubernetes", "Docker"],
    impact: "Scaled to 50K+ TPS with 99.99% uptime, reduced transaction failures to 0.01%, eliminated manual reconciliation saving 40 hrs/week, and processed $50M+ monthly volume.",
    repoUrl: "https://github.com/alexmorgan/nexuspay",
    liveUrl: "https://nexuspay.com",
    image: "/og/nexuspay-og.svg",
  },
  {
    title: "FlowState - Developer Productivity Suite",
    summary:
      "AI-powered development workflow platform that reduced CI/CD times by 70% for 200+ engineering teams.",
    problem: "Engineering teams wasted 15+ hours weekly on manual testing, deployment, and environment setup. Inconsistent staging environments caused 40% of bugs to reach production.",
    solution: "Built full-stack platform with Next.js frontend and Go microservices backend. Implemented WebAssembly for browser-based container execution. Created automated pipeline engine with intelligent caching and parallel execution. Integrated with GitHub Actions, Slack, and Jira.",
    stack: ["Next.js", "TypeScript", "Go", "WebAssembly", "MongoDB", "Docker", "WebSockets", "Redis"],
    impact: "Reduced CI/CD time from 45min to 13min average, decreased production bugs by 60%, saved teams 60+ hours weekly, acquired 200+ paying teams within 6 months.",
    repoUrl: "https://github.com/alexmorgan/flowstate",
    liveUrl: "https://flowstate.dev",
    image: "/og/flowstate-og.svg",
  },
  {
    title: "DataForge - Analytics Infrastructure",
    summary:
      "Enterprise data pipeline processing 2TB daily with sub-second query performance for business intelligence.",
    problem: "Data team couldn't deliver insights fast enough - batch processing took 8+ hours, queries timed out on large datasets, and data freshness was 24+ hours behind.",
    solution: "Designed streaming data pipeline with Apache Flink and Kafka. Built columnar storage layer with Apache Parquet. Implemented distributed query engine with Rust. Created caching layer with intelligent pre-fetching based on usage patterns.",
    stack: ["Rust", "Apache Flink", "Kafka", "PostgreSQL", "Apache Parquet", "Redis", "Python", "Airflow"],
    impact: "Enabled real-time analytics with 95% queries under 500ms, reduced data latency from 24hrs to 2 minutes, processed 2TB daily with 99.9% reliability, saved $400K annually in cloud costs.",
    repoUrl: "https://github.com/alexmorgan/dataforge",
    liveUrl: "https://dataforge.io",
    image: "/og/dataforge-og.svg",
  },
];
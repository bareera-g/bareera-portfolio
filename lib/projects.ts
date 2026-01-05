// lib/projects.ts

export type Project = {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    highlights: string[];
    tech: string[];
    links: {
      github?: string;
      demo?: string;
    };
    metrics?: string[];
  };
  
  export const projects: Project[] = [
    {
      slug: "search-engine-data-pipeline",
      title: "Search Engine Data Pipeline",
      subtitle: "Python • Crawling • ETL • Indexing",
      description:
        "Built an end-to-end system to crawl, process, and index web data for structured analysis and scalable search workflows.",
      tech: ["Python", "Crawling", "ETL", "Indexing", "Profiling"],
      highlights: [
        "Implemented ranking and filtering logic while maintaining performance and scalability.",
        "Improved system reliability with structured error handling, batching, and performance profiling.",
        "Built a clean pipeline architecture to support repeatable processing and indexing runs.",
      ],
      links: {
        github: "https://github.com/bareera-g", // replace with exact repo later
        demo: "",
      },
      metrics: ["Performance-focused batching + profiling"],
    },
    {
      slug: "gympal-full-stack-platform",
      title: "GymPal — Full-Stack Fitness Platform",
      subtitle: "Flask • Angular/Ionic • PostgreSQL • Gemini API",
      description:
        "Designed backend services and database schemas, built analytics pipelines, and shipped dashboards to improve user engagement and observability.",
      tech: ["Flask", "PostgreSQL", "Angular", "Ionic", "Gemini API", "Analytics"],
      highlights: [
        "Designed backend services and relational database schemas to support analytics and time-series reporting.",
        "Implemented monitoring pipelines to analyze user behavior and application performance.",
        "Built interactive dashboards that increased user engagement by 35%.",
      ],
      links: {
        github: "https://github.com/bareera-g", // replace with exact repo later
        demo: "",
      },
      metrics: ["+35% engagement uplift (dashboards)"],
    },
    {
      slug: "spotify-browser",
      title: "Spotify Browser",
      subtitle: "Angular • REST APIs • OAuth",
      description:
        "Developed a secure web app integrating OAuth and third-party APIs to explore music trends with reliable state handling and clear visualizations.",
      tech: ["Angular", "REST APIs", "OAuth", "State Management", "Error Handling"],
      highlights: [
        "Developed secure API integrations using OAuth to retrieve and analyze third-party data.",
        "Implemented robust error handling and state management to improve reliability.",
        "Delivered user-friendly visualizations for exploring music trends and usage data.",
      ],
      links: {
        github: "https://github.com/bareera-g", // replace with exact repo later
        demo: "",
      },
      metrics: ["Secure OAuth integration + resilient state flow"],
    },
  ];
  
  export function getProjectBySlug(slug: string) {
    return projects.find((p) => p.slug === slug);
  }

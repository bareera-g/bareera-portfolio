// lib/experience.ts

export type ExperienceItem = {
    org: string;
    location: string;
    role: string;
    dates: string;
    bullets: string[];
  };
  
  export const experience: ExperienceItem[] = [
    {
      org: "EdgeLab, UC Irvine",
      location: "Irvine, California",
      role: "Software Engineering Intern — Image Processing and Automation",
      dates: "February 2024 – Present",
      bullets: [
        "Designed and maintained scalable data pipelines to support research operations, improving accessibility and reliability of analytical workflows.",
        "Developed automated validation and quality-check processes to identify data inconsistencies and reduce operational risk.",
        "Built modular data processing components using Python, NumPy, and OpenCV, enabling efficient analysis and repeatable workflows.",
        "Partnered with cross-functional stakeholders to translate research and operational requirements into technical solutions.",
        "Strengthened system documentation and testing practices to improve maintainability and long-term usability.",
      ],
    },
    {
      org: "University Advancement and Alumni Relations, UC Irvine",
      location: "Irvine, California",
      role: "Web Engineering Student Worker",
      dates: "September 2024 – September 2025",
      bullets: [
        "Created automation and reporting workflows that reduced manual data processing by over 15 hours per cycle.",
        "Designed ETL pipelines to consolidate, clean, and validate data from multiple sources to support leadership reporting.",
        "Developed interactive dashboards to present insights clearly to non-technical stakeholders.",
        "Collaborated with cross-functional teams to gather requirements and ensure data accuracy across systems.",
      ],
    },
  ];
  
export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  problem: string
  solution: string
  role: string
  results: string[]
  stack: string[]
  links: {
    demo?: string
    github?: string
  }
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'ai-cashflow-copilot',
    title: 'AI Cashflow Copilot',
    tagline: 'AI-powered cashflow analysis with explainable financial decisions.',
    description:
      'Built an AI-powered cashflow analysis system processing 1,000+ transactions per run, reducing reconciliation time by 30–40% and enabling explainable scenario-based financial decisions.',
    problem:
      'Manual cashflow reconciliation is slow, error-prone, and lacks the transparency needed for confident financial planning at scale.',
    solution:
      'Developed an ETL-driven pipeline with LLM-powered analysis that processes transactions in bulk, surfaces anomalies, and generates explainable scenario projections for decision-makers.',
    role: 'Full-Stack Developer — Pipeline architecture, LLM integration, and analytics UI.',
    results: [
      'Processing 1,000+ transactions per run with automated reconciliation',
      'Reduced reconciliation time by 30–40%',
      'Explainable scenario-based financial decision support',
    ],
    stack: ['Python', 'ETL', 'LLMs', 'Analytics'],
    links: {
      github: 'https://github.com/bareera-g',
    },
  },
  {
    id: 'retinascan',
    title: 'RetinaScan',
    tagline: 'Retinal image analysis for early diabetic retinopathy detection.',
    description:
      'Built a full-stack retinal image analysis platform with preprocessing pipelines and PyTorch-based models to support early diabetic retinopathy detection and scalable clinical screening.',
    problem:
      'Diabetic retinopathy screening depends on specialist availability and manual image review, creating bottlenecks that delay early detection.',
    solution:
      'Built preprocessing pipelines and PyTorch-based classification models on a Next.js platform, enabling automated screening that can scale independently of specialist capacity.',
    role: 'Full-Stack Developer — Image pipeline, model integration, and clinical UI.',
    results: [
      'End-to-end retinal image preprocessing and classification pipeline',
      'PyTorch-based model supporting scalable clinical screening',
      'Full-stack platform with responsive clinical interface',
    ],
    stack: ['Next.js', 'TypeScript', 'PyTorch', 'OpenCV'],
    links: {
      github: 'https://github.com/bareera-g',
    },
  },
  {
    id: 'gym-pal',
    title: 'Gym Pal',
    tagline: 'A full-stack fitness platform with analytics and LLM-powered insights.',
    description:
      'Developed a full-stack fitness platform with time-series analytics and LLM-powered insights, reducing feature friction by ~25% through observability-driven iteration.',
    problem:
      'Fitness apps collect rich data but fail to surface actionable insights, leading to user drop-off and missed opportunities for personalized engagement.',
    solution:
      'Built time-series analytics with LLM-powered coaching insights on Flask + PostgreSQL, and shipped an observability layer that informed iterative UX improvements on Angular/Ionic.',
    role: 'Full-Stack Developer — Backend architecture, analytics pipeline, and dashboard UI.',
    results: [
      'Reduced feature friction by ~25% through observability-driven iteration',
      'Time-series analytics with LLM-powered personalized insights',
      'Observability layer informing iterative UX improvements',
    ],
    stack: ['Flask', 'Angular/Ionic', 'PostgreSQL'],
    links: {
      github: 'https://github.com/bareera-g',
    },
  },
]

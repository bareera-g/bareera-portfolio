# Bareera Gulraiz — Portfolio

Check out some of the project's I've worked on! 

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.
or bareeragulraiz.com (It's deployed now!)
## Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── App.tsx                     # Root: lazy-loads Hero3D → MainContent
├── main.tsx                    # Entry point
├── styles/global.css           # Tailwind + paper texture + blueprint grid
├── data/projects.ts            # Project data array (edit here)
├── hooks/useReducedMotion.ts
├── three/                      # 3D hero components (React Three Fiber)
│   ├── BoxScene.tsx            # Lights, camera rig, scene composition
│   ├── MovingBox.tsx           # Procedural box: walls, flaps, tape
│   └── MiniRoom.tsx            # Tiny room interior (desk, chair, plant)
├── components/
│   ├── Nav.tsx                 # Sticky nav + scroll progress bar
│   ├── RoomScene.tsx           # 2D SVG room renderer (4 room types)
│   ├── ProjectCard.tsx         # Project grid cards
│   └── ProjectModal.tsx        # Accessible case-study modal
└── sections/
    ├── Hero3D.tsx              # 3D Canvas + scroll driver + overlay text
    ├── MainContent.tsx         # Wrapper for all 2D sections
    ├── Hero.tsx                # (Legacy 2D hero, kept for reference)
    ├── HouseJourney.tsx        # Scroll-driven rooms → project morph
    ├── Projects.tsx            # Full project grid
    ├── About.tsx               # Philosophy / 3 principles
    └── Contact.tsx             # Email, LinkedIn, GitHub
```

